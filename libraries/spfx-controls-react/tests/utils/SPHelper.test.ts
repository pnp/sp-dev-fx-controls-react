import { IContext } from '../../src/common/Interfaces';
import { SPHelper } from '../../src/common/utilities/SPHelper';
import { SPRestClient } from '../../src/services/SPRestClient';

const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock('../../src/services/SPRestClient', () => ({
  SPRestClient: jest.fn().mockImplementation(() => ({ get: mockGet, post: mockPost }))
}));
jest.mock('../../src/common/utilities/GeneralHelper', () => ({
  GeneralHelper: {
    isDefined: (value: unknown) => value !== undefined && value !== null,
    parseXml: (value: string) => new DOMParser().parseFromString(value, 'text/xml')
  }
}));

describe('SPHelper REST requests', () => {
  const get = mockGet;
  const post = mockPost;
  const currentWeb = 'https://tenant.sharepoint.com/sites/current';
  let context: IContext;

  beforeEach(() => {
    jest.clearAllMocks();
    get.mockReset();
    post.mockReset();
    sessionStorage.clear();
    context = {
      spHttpClient: {},
      pageContext: {
        web: { absoluteUrl: currentWeb },
        list: { title: "Bob's #100%" },
        legacyPageContext: { viewId: 'view-id' }
      }
    } as unknown as IContext;
  });

  test('escapes list names and resolves schema attributes on cache miss and hit', async () => {
    get.mockResolvedValue({ SchemaXml: '<Field Type="URL" Format="Image" />' });
    await expect(SPHelper.getFieldProperty('field-id', 'Format', context, true)).resolves.toBe('Image');
    await expect(SPHelper.getFieldProperty('field-id', 'Format', context, true)).resolves.toBe('Image');
    expect(get).toHaveBeenCalledTimes(1);
    expect(get).toHaveBeenCalledWith("_api/web/lists/getByTitle('Bob%27%27s%20%23100%25')/fields/getById('field-id')?$select=SchemaXml");
    expect(SPRestClient).toHaveBeenCalledWith(context.spHttpClient, currentWeb);
  });

  test('caches selected properties and preserves empty-string failure fallback', async () => {
    get.mockResolvedValueOnce({ RichText: true }).mockRejectedValue(new Error('Access denied'));
    await expect(SPHelper.getFieldProperty('field-id', 'RichText', context, false)).resolves.toBe(true);
    await expect(SPHelper.getFieldProperty('field-id', 'RichText', context, false)).resolves.toBe(true);
    expect(get).toHaveBeenCalledTimes(1);
    await expect(SPHelper.getFieldSchemaXmlById('other-field', 'Documents', context)).resolves.toBe('');
    await expect(SPHelper.getFieldProperty('other-field', 'RichText', context, false)).resolves.toBe('');
  });

  test('resolves cross-web lookup URLs using the site API and caches the result', async () => {
    get.mockResolvedValue({ LookupWebId: 'lookup-web-id', LookupList: '{lookup-list-id}' });
    post.mockResolvedValue({ Url: 'https://tenant.sharepoint.com/sites/current/subweb' });
    const expected = 'https://tenant.sharepoint.com/sites/current/subweb/_layouts/15/listform.aspx?PageType=4&ListId={lookup-list-id}';
    await expect(SPHelper.getLookupFieldListDispFormUrl('field-id', context)).resolves.toBe(expected);
    await expect(SPHelper.getLookupFieldListDispFormUrl('field-id', context)).resolves.toBe(expected);
    expect(post).toHaveBeenCalledTimes(1);
    expect(post).toHaveBeenCalledWith("_api/site/openWebById('lookup-web-id')", undefined, { retrySafe: true });
  });

  test('rejects lookup failures instead of leaving a pending request', async () => {
    get.mockRejectedValue(new Error('Access denied'));
    await expect(SPHelper.getLookupFieldListDispFormUrl('field-id', context)).rejects.toThrow('Access denied');
  });

  test('uses each context web for user requests rather than shared global configuration', async () => {
    get.mockResolvedValue({ Id: 7 });
    await expect(SPHelper.getUserById(7, context)).resolves.toEqual({ Id: 7 });
    const otherContext = {
      ...context,
      pageContext: { web: { absoluteUrl: 'https://tenant.sharepoint.com/sites/other' } }
    } as IContext;
    await SPHelper.getUserById(8, otherContext);
    expect(SPRestClient).toHaveBeenNthCalledWith(1, context.spHttpClient, currentWeb);
    expect(SPRestClient).toHaveBeenNthCalledWith(2, context.spHttpClient, 'https://tenant.sharepoint.com/sites/other');
    expect(get).toHaveBeenNthCalledWith(2, '_api/web/getUserById(8)');
  });
});
