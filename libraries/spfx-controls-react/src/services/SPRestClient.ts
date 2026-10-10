import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Guid } from '@microsoft/sp-core-library';
import { ISiteUserInfo } from '../common/SPRestTypes';

interface IDigest {
  value: string;
  expires: number;
}

interface IRequestOptions {
  headers?: Record<string, string>;
  retrySafe?: boolean;
  maxAttempts?: number;
  retryConflicts?: boolean;
}

export class SPRestError extends Error {
  public readonly name = 'SPRestError';

  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly attempts: number,
    public readonly requestId?: string,
    public readonly retryAfter?: string,
    message?: string
  ) {
    super(message || `SharePoint request failed (${status} ${statusText}); attempts: ${attempts}${requestId ? `; request ID: ${requestId}` : ''}`);
    Object.setPrototypeOf(this, SPRestError.prototype);
  }
}

class DigestAcquisitionError extends Error {
  public readonly name = 'DigestAcquisitionError';
  public readonly status?: number;

  constructor(public readonly originalError: unknown) {
    super(`SharePoint digest acquisition failed: ${originalError instanceof Error ? originalError.message : String(originalError)}`);
    Object.setPrototypeOf(this, DigestAcquisitionError.prototype);
    if (originalError instanceof SPRestError) this.status = originalError.status;
  }
}

export function escapeODataString(value: string): string {
  return encodeURIComponent(value.replace(/'/g, "''")).replace(/'/g, '%27');
}

export function normalizeOData<T>(value: unknown): T {
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if ('d' in record) {
      const data = record.d;
      return (data && typeof data === 'object' && 'results' in data
        ? (data as { results: unknown }).results : data) as T;
    }
    if ('value' in record) return record.value as T;
  }
  return value as T;
}

export function retryDelay(retryAfter: string | undefined, attempt: number): number {
  if (retryAfter) {
    const seconds = /^\d+(?:\.\d+)?$/.test(retryAfter) ? Number(retryAfter) : NaN;
    const delay = Number.isFinite(seconds) ? seconds * 1000
      : /^[A-Za-z]{3,},?\s/.test(retryAfter) ? Date.parse(retryAfter) - Date.now() : NaN;
    if (Number.isFinite(delay)) return Math.max(0, delay);
  }
  return 100 * Math.pow(2, attempt - 1);
}

async function wait(delay: number): Promise<void> {
  // Long server delays must not overflow setTimeout into an immediate retry.
  while (delay > 0) {
    const slice = Math.min(delay, 2147483647);
    await new Promise<void>(resolve => setTimeout(resolve, slice));
    delay -= slice;
  }
}

interface IMessagePart {
  headers: Map<string, string>;
  body: string;
}

interface IBatchResponse extends IMessagePart {
  status: number;
}

function parseMessage(text: string): IMessagePart {
  const lines = text.split(/\r?\n/);
  const separator = lines.indexOf('');
  if (separator < 0) throw new Error('SharePoint batch response has no header/body separator.');
  const headers = new Map<string, string>();
  for (const line of lines.slice(0, separator)) {
    const header = /^([^:\s]+):[ \t]*(.*)$/.exec(line);
    if (!header || headers.has(header[1].toLowerCase())) throw new Error('SharePoint batch response contains invalid or duplicate headers.');
    headers.set(header[1].toLowerCase(), header[2].trim());
  }
  return { headers, body: lines.slice(separator + 1).join('\n') };
}

function parseMultipart(text: string, contentType: string): IMessagePart[] {
  const boundary = /(?:^|;)\s*boundary=(?:"([^"]+)"|([^;\s]+))/i.exec(contentType || '');
  if (!/^multipart\/mixed(?:\s*;|$)/i.test(contentType || '') || !boundary) {
    throw new Error('SharePoint batch response has no valid multipart boundary.');
  }
  const delimiter = `--${boundary[1] || boundary[2]}`;
  const parts: IMessagePart[] = [];
  let current: string[] | undefined;
  for (const line of text.split(/\r?\n/)) {
    const marker = line.trimEnd();
    if (marker === delimiter || marker === `${delimiter}--`) {
      if (current) parts.push(parseMessage(current.join('\n')));
      if (marker === `${delimiter}--`) return parts;
      current = [];
    } else if (current) {
      current.push(line);
    }
  }
  throw new Error('SharePoint batch response is missing its closing boundary.');
}

function parseBatchResponses(text: string, contentType: string): Map<string, IBatchResponse> {
  const responses = new Map<string, IBatchResponse>();
  for (const outer of parseMultipart(text, contentType)) {
    const outerType = outer.headers.get('content-type') || '';
    const parts = /^multipart\/mixed(?:\s*;|$)/i.test(outerType)
      ? parseMultipart(outer.body, outerType) : [outer];
    for (const part of parts) {
      const id = part.headers.get('content-id');
      if (!id || responses.has(id)) throw new Error('SharePoint batch response has a missing or duplicate Content-ID.');
      if (!/^application\/http(?:\s*;|$)/i.test(part.headers.get('content-type') || '')) {
        throw new Error('SharePoint batch response contains an unsupported part type.');
      }
      const statusLine = /^HTTP\/1\.[01] +(\d{3})[^\r\n]*\r?\n/.exec(part.body);
      if (!statusLine) throw new Error('SharePoint batch response has an invalid HTTP status line.');
      responses.set(id, {
        ...parseMessage(part.body.slice(statusLine[0].length)),
        status: Number(statusLine[1])
      });
    }
  }
  return responses;
}

export class SPRestClient {
  private static readonly digests = new WeakMap<SPHttpClient, Map<string, Promise<IDigest>>>();
  private disposed = false;
  public readonly webAbsoluteUrl: string;

  constructor(private readonly http: SPHttpClient, webAbsoluteUrl: string) {
    this.webAbsoluteUrl = webAbsoluteUrl.replace(/\/$/, '');
  }

  public dispose(): void {
    this.disposed = true;
  }

  private assertActive(): void {
    if (this.disposed) {
      const error = new Error('The SharePoint request is no longer active.');
      error.name = 'AbortError';
      throw error;
    }
  }

  public async get<T>(path: string): Promise<T> {
    return normalizeOData<T>(await this.getRaw<unknown>(path));
  }

  public async getRaw<T>(path: string): Promise<T> {
    return this.parse<T>(await this.send('GET', path, undefined, { retrySafe: true }));
  }

  public async post<T>(path: string, body?: unknown, options: IRequestOptions = {}): Promise<T> {
    return normalizeOData<T>(await this.parse<unknown>(await this.send('POST', path, body, options)));
  }

  public async ensureUser(loginName: string): Promise<ISiteUserInfo> {
    const user = await this.post<ISiteUserInfo>('/_api/web/ensureuser', { logonName: loginName }, { retrySafe: true });
    if (!user?.Id) throw new Error('SharePoint ensureuser returned no user ID.');
    return user;
  }

  public async ensureUsers(loginNames: string[]): Promise<ISiteUserInfo[]> {
    const results = new Map<string, ISiteUserInfo>();
    const requested = Array.from(new Set(loginNames)).map((loginName, index) => ({
      loginName, contentId: String(index + 1)
    }));
    let pending = requested.slice();
    for (let attempt = 1; pending.length && attempt <= 7; attempt++) {
      this.assertActive();
      const boundary = `batch_${Guid.newGuid().toString()}`;
      const changeset = `changeset_${Guid.newGuid().toString()}`;
      const requests = pending.map(request => [
        `--${changeset}`, 'Content-Type: application/http', 'Content-Transfer-Encoding: binary',
        `Content-ID: ${request.contentId}`, '',
        `POST ${this.webAbsoluteUrl}/_api/web/ensureuser HTTP/1.1`,
        'Content-Type: application/json;odata=verbose', 'Accept: application/json', '',
        JSON.stringify({ logonName: request.loginName })
      ].join('\r\n'));
      const body = [
        `--${boundary}`, `Content-Type: multipart/mixed; boundary=${changeset}`, '',
        ...requests, `--${changeset}--`, `--${boundary}--`, ''
      ].join('\r\n');
      const retry: typeof pending = [];
      let delay = 0;
      try {
        const response = await this.send('POST', '/_api/$batch', body, {
          headers: { 'Content-Type': `multipart/mixed; boundary=${boundary}` },
          retrySafe: true,
          maxAttempts: 1
        });
        const parts = parseBatchResponses(await response.text(), response.headers.get('Content-Type'));
        if (parts.size !== pending.length || pending.some(request => !parts.has(request.contentId))) {
          throw new Error('SharePoint batch response Content-IDs do not match its requests.');
        }
        pending.forEach(request => {
          const part = parts.get(request.contentId);
          const status = part.status;
          const retryAfter = part.headers.get('retry-after');
          if (status >= 200 && status < 300) {
            const user = normalizeOData<ISiteUserInfo>(JSON.parse(part.body));
            if (!user?.Id) throw new Error('SharePoint batch ensureuser returned no user ID.');
            results.set(request.contentId, user);
          } else if ([429, 503, 504].includes(status) && attempt < 7) {
            retry.push(request);
            delay = Math.max(delay, retryDelay(retryAfter, attempt));
          } else {
            console.error('[SPRestClient.ensureUsers]', new SPRestError(status, 'Batch operation failed', attempt));
          }
        });
      } catch (error) {
        if (error instanceof DigestAcquisitionError) {
          console.error('[SPRestClient.ensureUsers] Digest acquisition exhausted; batch was not sent.', error);
        } else if ((error instanceof SPRestError && [429, 503, 504].includes(error.status) || error instanceof TypeError) && attempt < 7) {
          retry.push(...pending);
          delay = retryDelay(error instanceof SPRestError ? error.retryAfter : undefined, attempt);
        } else if (error instanceof SPRestError || error instanceof TypeError) {
          console.error('[SPRestClient.ensureUsers] Unresolved batch entries.', { error, attempts: attempt, count: pending.length });
        } else {
          throw error;
        }
      }
      pending = retry;
      if (pending.length) await wait(delay);
    }
    return requested.map(request => results.get(request.contentId)).filter((user): user is ISiteUserInfo => user !== undefined);
  }

  public resolveUrl(path: string): string {
    const url = /^https?:\/\//i.test(path)
      ? new URL(path)
      : new URL(`${this.webAbsoluteUrl}/${path.replace(/^\//, '')}`);
    const web = new URL(`${this.webAbsoluteUrl}/`);
    if (url.origin !== web.origin || !url.pathname.toLowerCase().startsWith(`${web.pathname.toLowerCase()}_api/`)) {
      throw new Error('SharePoint request must target the configured web API.');
    }
    return url.toString();
  }

  private async parse<T>(response: SPHttpClientResponse): Promise<T> {
    const text = response.status === 204 ? '' : await response.text();
    return (text.trim() ? JSON.parse(text) : {}) as T;
  }

  private async digest(): Promise<IDigest> {
    let cache = SPRestClient.digests.get(this.http);
    if (!cache) {
      cache = new Map();
      SPRestClient.digests.set(this.http, cache);
    }
    const existing = cache.get(this.webAbsoluteUrl);
    if (existing) {
      try {
        const value = await existing;
        if (value.expires > Date.now()) return value;
        if (cache.get(this.webAbsoluteUrl) !== existing) return this.digest();
      } catch (error) {
        throw error instanceof DigestAcquisitionError ? error : new DigestAcquisitionError(error);
      }
    }
    const acquisition = (async (): Promise<IDigest> => {
      const started = Date.now();
      // A shared acquisition must outlive an individual control's disposal.
      const response = await new SPRestClient(this.http, this.webAbsoluteUrl)
        .send('POST', '/_api/contextinfo', undefined, { retrySafe: true });
      const data = normalizeOData<Record<string, unknown>>(await this.parse<unknown>(response));
      const info = (data.GetContextWebInformation || data) as { FormDigestValue: string; FormDigestTimeoutSeconds: number };
      if (!info.FormDigestValue || !Number.isFinite(info.FormDigestTimeoutSeconds) || info.FormDigestTimeoutSeconds <= 0) {
        throw new Error('SharePoint contextinfo returned an invalid digest.');
      }
      return {
        value: info.FormDigestValue,
        expires: started + Math.max(info.FormDigestTimeoutSeconds * 500, info.FormDigestTimeoutSeconds * 1000 - 15000)
      };
    })();
    cache.set(this.webAbsoluteUrl, acquisition);
    try {
      return await acquisition;
    } catch (error) {
      if (cache.get(this.webAbsoluteUrl) === acquisition) cache.delete(this.webAbsoluteUrl);
      throw new DigestAcquisitionError(error);
    }
  }

  private async send(method: string, path: string, body: unknown, options: IRequestOptions): Promise<SPHttpClientResponse> {
    const url = this.resolveUrl(path);
    const isContextInfo = new URL(url).pathname.toLowerCase().endsWith('/_api/contextinfo');
    const taxonomy = new URL(url).pathname.toLowerCase().includes('/_api/v2.1/');
    const binary = body instanceof Blob || body instanceof ArrayBuffer;
    const payload = body === undefined ? undefined
      : binary || typeof body === 'string' ? body : JSON.stringify(body);
    let conflicts = 0;
    const maxAttempts = options.maxAttempts ?? 7;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      this.assertActive();
      const headers: Record<string, string> = {
        Accept: 'application/json',
        'OData-Version': taxonomy ? '' : '3.0',
        'Content-Type': binary ? 'application/octet-stream' : 'application/json;odata=verbose;charset=utf-8',
        ...options.headers
      };
      if (method !== 'GET' && !isContextInfo) headers['X-RequestDigest'] = (await this.digest()).value;
      this.assertActive();
      let response: SPHttpClientResponse;
      try {
        response = await this.http.fetch(url, SPHttpClient.configurations.v1.overrideWith({ requestDigest: false }), {
          method,
          headers,
          body: payload as string | Blob | ArrayBuffer,
          credentials: 'same-origin',
          cache: 'no-cache'
        });
      } catch (error) {
        if (error instanceof TypeError && options.retrySafe && attempt < maxAttempts) {
          await wait(retryDelay(undefined, attempt));
          continue;
        }
        throw error;
      }
      this.assertActive();
      if (response.ok) return response;
      if (response.status === 403) SPRestClient.digests.get(this.http)?.delete(this.webAbsoluteUrl);
      const canRetryConflict = response.status === 409 && options.retryConflicts && conflicts++ < 3;
      const canRetry = response.status === 429 || options.retrySafe && [503, 504].includes(response.status);
      if (attempt < maxAttempts && (canRetry || canRetryConflict)) {
        await wait(canRetryConflict ? 100 : retryDelay(response.headers.get('Retry-After'), attempt));
        continue;
      }
      const errorBody = await response.text();
      throw new SPRestError(
        response.status, response.statusText, attempt,
        response.headers.get('SPRequestGuid') || response.headers.get('request-id'),
        response.headers.get('Retry-After'),
        `SharePoint request failed (${response.status} ${response.statusText}): ${errorBody}`
      );
    }
    throw new Error('SharePoint retry budget exhausted.');
  }
}
