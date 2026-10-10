import { Guid } from '@microsoft/sp-core-library';
import { SPTaxonomyService } from '../../src/services/SPTaxonomyService';
import { listId, mockContext, response, webUrl } from './restTestHelpers';

describe('SPTaxonomyService REST compatibility', () => {
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
