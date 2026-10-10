import { SPRestClient, normalizeOData, retryDelay, escapeODataString } from '../../src/services/SPRestClient';
import { digestResponse, mockContext, response, webUrl } from './restTestHelpers';

describe('SPRestClient', () => {
  afterEach(() => { jest.useRealTimers(); jest.restoreAllMocks(); });

  test('normalizes supported response envelopes without discarding raw pagination', async () => {
    expect(normalizeOData({ d: { results: [1] } })).toEqual([1]);
    expect(normalizeOData({ d: { Id: 1 } })).toEqual({ Id: 1 });
    const { http, fetch } = mockContext();
    const page = { value: [1], '@odata.nextLink': `${webUrl}/_api/next` };
    fetch.mockResolvedValue(response(page));
    const client = new SPRestClient(http, webUrl);
    expect(await client.getRaw('/_api/items')).toEqual(page);
    expect(await client.get('/_api/items')).toEqual([1]);
  });

  test('preserves Error subclass identity in the published ES5 output', () => {
    const emitted: typeof import('../../src/services/SPRestClient') = require('../../lib-commonjs/services/SPRestClient');
    const error = new emitted.SPRestError(429, 'Throttled', 1);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(emitted.SPRestError);
  });

  test('stops after seven throttled attempts with exact exponential delays', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    fetch.mockResolvedValue(response({}, 429));
    const result = expect(new SPRestClient(http, webUrl).get('/_api/web')).rejects.toMatchObject({ status: 429, attempts: 7 });
    await jest.runAllTimersAsync();
    await result;
    expect(fetch).toHaveBeenCalledTimes(7);
  });

  test('honors Retry-After and retries ordinary 503 responses for reads', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({}, 503, { 'Retry-After': '2' })).mockResolvedValue(response({ Id: 5 }));
    const result = new SPRestClient(http, webUrl).get('/_api/web');
    await jest.advanceTimersByTimeAsync(1999);
    expect(fetch).toHaveBeenCalledTimes(1);
    await jest.advanceTimersByTimeAsync(1);
    expect(await result).toEqual({ Id: 5 });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(retryDelay(new Date(Date.now() + 5000).toUTCString(), 1)).toBeGreaterThanOrEqual(4000);
    expect(retryDelay('not-a-date', 3)).toBe(400);
    expect(retryDelay('-1', 1)).toBe(100);
  });

  test('does not replay ambiguous writes or permission failures', async () => {
    const { http, fetch } = mockContext();
    fetch.mockResolvedValueOnce(digestResponse()).mockResolvedValue(response({}, 503));
    await expect(new SPRestClient(http, webUrl).post('/_api/web/lists', { Title: 'test' })).rejects.toMatchObject({ status: 503 });
    expect(fetch).toHaveBeenCalledTimes(2);
    fetch.mockClear().mockResolvedValue(response({}, 403));
    await expect(new SPRestClient(http, webUrl).get('/_api/web')).rejects.toMatchObject({ status: 403 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('coalesces and reuses digest acquisition and refreshes after expiry', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    fetch.mockImplementation(async (url: string) => url.endsWith('contextinfo') ? digestResponse() : response('', 204));
    const client = new SPRestClient(http, webUrl);
    await Promise.all([client.post('/_api/a'), client.post('/_api/b')]);
    expect(fetch.mock.calls.filter(call => call[0].endsWith('contextinfo'))).toHaveLength(1);
    await jest.advanceTimersByTimeAsync(1800000);
    await client.post('/_api/c');
    expect(fetch.mock.calls.filter(call => call[0].endsWith('contextinfo'))).toHaveLength(2);
    expect(fetch.mock.calls[1][2].headers['X-RequestDigest']).toBe('test-digest');
  });

  test('retries digest throttling without sending an unauthenticated write', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({}, 429)).mockResolvedValueOnce(digestResponse()).mockResolvedValue(response('', 204));
    const result = new SPRestClient(http, webUrl).post('/_api/write');
    await jest.runAllTimersAsync();
    await result;
    expect(fetch.mock.calls.map(call => new URL(call[0]).pathname)).toEqual([
      '/sites/test/_api/contextinfo', '/sites/test/_api/contextinfo', '/sites/test/_api/write'
    ]);
  });

  test('bounds conflict retries and never changes the ETag', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    fetch.mockResolvedValueOnce(digestResponse()).mockResolvedValue(response({}, 409));
    const result = expect(new SPRestClient(http, webUrl).post('/_api/item', {}, {
      retryConflicts: true, headers: { 'IF-MATCH': '"3"' }
    })).rejects.toMatchObject({ status: 409, attempts: 4 });
    await jest.runAllTimersAsync();
    await result;
    expect(fetch).toHaveBeenCalledTimes(5);
    expect(fetch.mock.calls.slice(1).every(call => call[2].headers['IF-MATCH'] === '"3"')).toBe(true);
  });

  test('stops retries when disposed', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    fetch.mockResolvedValue(response({}, 429));
    const client = new SPRestClient(http, webUrl);
    const result = expect(client.get('/_api/web')).rejects.toMatchObject({ name: 'AbortError' });
    await jest.advanceTimersByTimeAsync(0);
    client.dispose();
    await jest.runAllTimersAsync();
    await result;
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('rejects foreign continuation URLs and escapes literal OData strings', () => {
    const { http } = mockContext();
    const client = new SPRestClient(http, webUrl);
    expect(() => client.resolveUrl('https://foreign.example/_api/data')).toThrow();
    expect(() => client.resolveUrl(`${webUrl}/../other/_api/data`)).toThrow();
    expect(decodeURIComponent(escapeODataString("O'Brien #50%"))).toBe("O''Brien #50%");
  });

  test('only retries throttled batch entries, retaining successes', async () => {
    jest.useFakeTimers();
    const { http, fetch } = mockContext();
    const batch = (parts: { status: number; data: unknown }[]) => response(parts.map(part =>
      `--batchresponse_test\r\nContent-Type: application/http\r\n\r\nHTTP/1.1 ${part.status} Result\r\nContent-Type: application/json\r\n\r\n${JSON.stringify(part.data)}\r\n`
    ).join('') + '--batchresponse_test--');
    fetch.mockResolvedValueOnce(digestResponse())
      .mockResolvedValueOnce(batch([{ status: 200, data: { Id: 1 } }, { status: 429, data: {} }]))
      .mockResolvedValueOnce(batch([{ status: 200, data: { Id: 2 } }]));
    const result = new SPRestClient(http, webUrl).ensureUsers(['one@example.com', 'two@example.com']);
    await jest.runAllTimersAsync();
    expect(await result).toEqual([{ Id: 1 }, { Id: 2 }]);
    expect(fetch.mock.calls[2][2].body).not.toContain('one@example.com');
    expect(fetch.mock.calls[2][2].body).toContain('two@example.com');
  });

  test('retains partial batch successes after outer retry exhaustion', async () => {
    jest.useFakeTimers();
    const log = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { http, fetch } = mockContext();
    fetch.mockResolvedValueOnce(digestResponse()).mockResolvedValueOnce(response(
      '--batchresponse_test\r\nContent-Type: application/http\r\n\r\nHTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n{"Id":1}\r\n' +
      '--batchresponse_test\r\nContent-Type: application/http\r\n\r\nHTTP/1.1 429 Throttled\r\nContent-Type: application/json\r\n\r\n{}\r\n--batchresponse_test--'
    )).mockResolvedValue(response({}, 503));
    const emitted: typeof import('../../src/services/SPRestClient') = require('../../lib-commonjs/services/SPRestClient');
    const result = new emitted.SPRestClient(http, webUrl).ensureUsers(['one@example.com', 'two@example.com']);
    await jest.runAllTimersAsync();
    expect(await result).toEqual([{ Id: 1 }]);
    expect(fetch).toHaveBeenCalledTimes(8);
    expect(log).toHaveBeenCalled();
    expect(fetch.mock.calls.slice(2).every(call => !call[2].body.includes('one@example.com'))).toBe(true);
  });

  test('does not restart an exhausted digest budget from the batch retry loop', async () => {
    jest.useFakeTimers();
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { http, fetch } = mockContext();
    fetch.mockResolvedValue(response({}, 429, { 'Retry-After': '0' }));
    const emitted: typeof import('../../src/services/SPRestClient') = require('../../lib-commonjs/services/SPRestClient');
    const first = new emitted.SPRestClient(http, webUrl).ensureUsers(['one@example.com']);
    const second = new emitted.SPRestClient(http, webUrl).ensureUsers(['two@example.com']);
    await jest.runAllTimersAsync();
    expect(await first).toEqual([]);
    expect(await second).toEqual([]);
    expect(fetch).toHaveBeenCalledTimes(7);
    expect(fetch.mock.calls.every(call => call[0].endsWith('/_api/contextinfo'))).toBe(true);
  });
});
