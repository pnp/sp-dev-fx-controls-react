import { Guid } from '@microsoft/sp-core-library';
import { SPTaxonomyService } from '../../src/services/SPTaxonomyService';
import { listId, mockContext, response, webUrl } from './restTestHelpers';

describe('SPTaxonomyService REST compatibility', () => {
  test('returns undefined for an empty term ID without issuing a request', async () => {
    const { context, fetch } = mockContext();
    expect(await new SPTaxonomyService(context).getTermById(Guid.parse(listId), Guid.empty)).toBeUndefined();
    expect(fetch).not.toHaveBeenCalled();
  });

  test.each([webUrl, 'https://example.sharepoint.com'])('uses OData v4 JSON headers for term-store metadata at %s', async targetWeb => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValue(response({}));
    const service = new SPTaxonomyService(context, targetWeb);
    await Promise.all([service.getTermStoreInfo(), service.getTermSetInfo(Guid.parse(listId))]);
    expect(fetch.mock.calls.map(call => call[0])).toEqual([
      `${targetWeb}/_api/v2.1/termstore`,
      `${targetWeb}/_api/v2.1/termstore/sets/${listId}`
    ]);
    fetch.mock.calls.forEach(call => {
      expect(call[2]).toMatchObject({
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'OData-Version': '4.0',
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
    });
  });

  test('keeps legacy children paging and opaque tokens, including unbound callback use', async () => {
    const { context, fetch } = mockContext();
    const token = 'a+b/%=';
    fetch.mockResolvedValue(response({
      value: [{ id: 'term', childrenCount: 2, isDeprecated: false }],
      '@odata.nextLink': `${webUrl}/_api/v2.1/termstore/sets/${listId}/getLegacyChildren?$skiptoken=${encodeURIComponent(token)}`
    }));
    const callback = new SPTaxonomyService(context).getTerms;
    const result = await callback(Guid.parse(listId), undefined, token, true);
    expect(result.skiptoken).toBe(token);
    const url = new URL(fetch.mock.calls[0][0]);
    expect(url.pathname).toContain('/getLegacyChildren');
    expect(url.searchParams.get('$skiptoken')).toBe(token);
    expect(url.searchParams.get('$filter')).toBe('isDeprecated eq false');
    expect(url.searchParams.get('$top')).toBe('50');
  });

  test('escapes search labels and resolves all pages of direct children', async () => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({ value: [{ id: 'second' }, { id: 'nested' }] }))
      .mockResolvedValueOnce(response({ value: [{ id: 'first' }], '@odata.nextLink': `${webUrl}/_api/v2.1/next` }))
      .mockResolvedValueOnce(response({ value: [{ id: 'second' }] }));
    const result = await new SPTaxonomyService(context).searchTerm(Guid.parse(listId), "O'Brien", 'en-US', undefined, false);
    expect(result).toEqual([{ id: 'second' }]);
    expect(decodeURIComponent(fetch.mock.calls[0][0])).toContain("label='O''Brien'");
    expect(fetch.mock.calls[0][0]).not.toContain('parentTermId');
  });

  test('does not present failed taxonomy requests as empty data', async () => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValue(response({}, 403));
    await expect(new SPTaxonomyService(context).getTermStoreInfo()).rejects.toMatchObject({ status: 403 });
  });
});
