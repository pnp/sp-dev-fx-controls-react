import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export const webUrl = 'https://example.sharepoint.com/sites/test';
export const listId = '11111111-1111-4111-8111-111111111111';

export function response(data: unknown = {}, status = 200, headers: Record<string, string> = {}): SPHttpClientResponse {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: String(status),
    headers: { get: (name: string) => Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase())?.[1] },
    text: async () => typeof data === 'string' ? data : JSON.stringify(data),
    json: async () => data
  } as SPHttpClientResponse;
}

export function mockContext() {
  const fetch = jest.fn();
  const http = new SPHttpClient(undefined);
  http.fetch = fetch;
  const context = {
    spHttpClient: http,
    pageContext: { web: { absoluteUrl: webUrl }, user: { email: 'tester@example.com' } }
  } as BaseComponentContext;
  return { context, http, fetch };
}

export const digestResponse = () => response({ FormDigestValue: 'test-digest', FormDigestTimeoutSeconds: 1800 });
