import { ServiceScope } from '@microsoft/sp-core-library';
import { FolderExplorerService } from '../../src/services/FolderExplorerService';
import { SPRestClient } from '../../src/services/SPRestClient';

const mockGet = jest.fn();
const mockPost = jest.fn();

jest.mock('@microsoft/sp-core-library', () => ({
  ServiceKey: { create: jest.fn() }
}));
jest.mock('@microsoft/sp-page-context', () => ({
  PageContext: { serviceKey: 'pageContext' }
}));
jest.mock('@microsoft/sp-http', () => ({
  SPHttpClient: { serviceKey: 'spHttpClient' }
}));
jest.mock('../../src/services/SPRestClient', () => ({
  SPRestClient: jest.fn().mockImplementation(() => ({ get: mockGet, post: mockPost }))
}));

describe('FolderExplorerService REST requests', () => {
  const get = mockGet;
  const post = mockPost;
  const spHttpClient = {};
  const currentWeb = 'https://tenant.sharepoint.com/sites/current';
  const targetWeb = 'https://tenant.sharepoint.com/sites/target';
  let finishScope: () => void;
  let consume: jest.Mock;
  let service: FolderExplorerService;

  beforeEach(() => {
    jest.clearAllMocks();
    get.mockReset();
    post.mockReset();
    consume = jest.fn(key => key === 'pageContext'
      ? { web: { absoluteUrl: currentWeb } }
      : spHttpClient);
    service = new FolderExplorerService({
      whenFinished: (callback: () => void) => { finishScope = callback; },
      consume
    } as unknown as ServiceScope);
  });

  afterEach(() => jest.restoreAllMocks());

  test('waits for service-scope readiness and uses the requested web', async () => {
    get.mockResolvedValue([{ Title: 'Documents', RootFolder: { ServerRelativeUrl: '/sites/target/Documents' } }]);
    const result = service.GetDocumentLibraries(targetWeb);
    await Promise.resolve();
    expect(consume).not.toHaveBeenCalled();
    expect(get).not.toHaveBeenCalled();

    finishScope();
    await expect(result).resolves.toEqual([{ Name: 'Documents', ServerRelativeUrl: '/sites/target/Documents' }]);
    expect(consume).toHaveBeenCalledWith('pageContext');
    expect(consume).toHaveBeenCalledWith('spHttpClient');
    expect(SPRestClient).toHaveBeenCalledWith(spHttpClient, targetWeb);
    expect(get.mock.calls[0][0]).toContain('$filter=BaseTemplate%20eq%20101%20and%20Hidden%20eq%20false');
  });

  test('escapes folder paths once, preserves sort order and excludes Forms', async () => {
    finishScope();
    get.mockResolvedValue([
      { Name: 'Forms', ServerRelativeUrl: '/Forms' },
      { Name: 'Reports', ServerRelativeUrl: '/Reports' }
    ]);
    await expect(service.GetFolders('', "/sites/current/Bob's #100%/資料", 'TimeCreated', false))
      .resolves.toEqual([{ Name: 'Reports', ServerRelativeUrl: '/Reports' }]);
    expect(SPRestClient).toHaveBeenCalledWith(spHttpClient, currentWeb);
    expect(get.mock.calls[0][0]).toContain("decodedUrl='%2Fsites%2Fcurrent%2FBob%27%27s%20%23100%25%2F%E8%B3%87%E6%96%99'");
    expect(get.mock.calls[0][0]).toContain('$orderby=TimeCreated%20desc');
  });

  test('returns file metadata and creates folders using resource paths', async () => {
    finishScope();
    const file = { Name: 'report.docx', ServerRelativeUrl: '/Docs/report.docx', UniqueId: 'file-id', Length: '42' };
    get.mockResolvedValue([file]);
    await expect(service.GetFiles(targetWeb, "/Docs/Bob's", 'Name', true)).resolves.toEqual([file]);
    expect(get.mock.calls[0][0]).toContain("decodedUrl='%2FDocs%2FBob%27%27s')/files");
    expect(get.mock.calls[0][0]).toContain('$select=Name,ServerRelativeUrl,UniqueId,Length&$orderby=Name%20asc');

    const folder = { Name: "Owner's #100%", ServerRelativeUrl: "/Docs/Bob's/Owner's #100%" };
    post.mockResolvedValue(folder);
    await expect(service.AddFolder(targetWeb, "/Docs/Bob's", folder.Name)).resolves.toEqual(folder);
    expect(post).toHaveBeenCalledWith("_api/web/getFolderByServerRelativePath(decodedUrl='%2FDocs%2FBob%27%27s')/folders/addUsingPath(decodedUrl='Owner%27%27s%20%23100%25')");
  });

  test('preserves empty-list and null-folder fallbacks on failures', async () => {
    finishScope();
    const log = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    get.mockRejectedValue(new Error('Access denied'));
    post.mockRejectedValue(new Error('Access denied'));
    await expect(service.GetFolders(targetWeb, '/Docs', 'Name', true)).resolves.toEqual([]);
    await expect(service.GetFiles(targetWeb, '/Docs', 'Name', true)).resolves.toEqual([]);
    await expect(service.GetDocumentLibraries(targetWeb)).resolves.toEqual([]);
    await expect(service.AddFolder(targetWeb, '/Docs', 'new')).resolves.toBeNull();
    expect(log).toHaveBeenCalledTimes(4);
  });
});
