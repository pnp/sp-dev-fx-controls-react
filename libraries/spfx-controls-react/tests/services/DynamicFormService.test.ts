import { DynamicFormSaveError, DynamicFormService } from '../../src/services/DynamicFormService';
import { digestResponse, listId, mockContext, response, webUrl } from './restTestHelpers';

describe('DynamicFormService', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => jest.restoreAllMocks());

  test('adds entity metadata and returns real saved data plus an SDK-free reference', async () => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({ ListItemEntityTypeFullName: 'SP.Data.TestListItem' }))
      .mockResolvedValueOnce(digestResponse())
      .mockResolvedValueOnce(response({ Id: 4 }))
      .mockResolvedValueOnce(response({ Id: 4, Title: 'Saved', 'odata.etag': '"2"' }));
    const result = await new DynamicFormService(context).addItem(listId, { Title: 'Saved', Tags: { results: ['A'] } });
    expect(JSON.parse(fetch.mock.calls[2][2].body)).toEqual({
      __metadata: { type: 'SP.Data.TestListItem' }, Title: 'Saved', Tags: { results: ['A'] }
    });
    expect(result.reference).toEqual({ webAbsoluteUrl: webUrl, listId, listItemId: 4, etag: '"2"' });
    expect(result.data.Title).toBe('Saved');
    expect(result.reference).not.toHaveProperty('get');
  });

  test('preserves update ETags and reuses entity-name metadata across service instances', async () => {
    const { context, fetch } = mockContext();
    fetch.mockImplementation(async (url: string, _config: unknown, options: { method: string }) => {
      if (url.includes('ListItemEntityTypeFullName')) return response({ ListItemEntityTypeFullName: 'SP.Data.TestListItem' });
      if (url.endsWith('contextinfo')) return digestResponse();
      return options.method === 'GET' ? response({ Id: 4, 'odata.etag': '"3"' }) : response('', 204);
    });
    await new DynamicFormService(context).updateItem(listId, 4, { Title: 'One' }, '"2"');
    await new DynamicFormService(context).updateItem(listId, 4, { Title: 'Two' }, '"3"');
    expect(fetch.mock.calls.filter(call => call[0].includes('ListItemEntityTypeFullName'))).toHaveLength(1);
    expect(fetch.mock.calls.filter(call => call[2].headers['X-HTTP-Method'] === 'MERGE').map(call => call[2].headers['IF-MATCH'])).toEqual(['"2"', '"3"']);
  });

  test('reports a committed write separately from failed saved-data retrieval', async () => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({ ListItemEntityTypeFullName: 'SP.Data.TestListItem' }))
      .mockResolvedValueOnce(digestResponse())
      .mockResolvedValueOnce(response({ Id: 4 }))
      .mockResolvedValueOnce(response({}, 403));
    await expect(new DynamicFormService(context).addItem(listId, { Title: 'Saved' }))
      .rejects.toMatchObject({ saveCommitted: true, itemReference: { listItemId: 4 } });
    expect(fetch.mock.calls.filter(call => call[2].method === 'POST' && !call[0].endsWith('contextinfo'))).toHaveLength(1);
  });

  test('uses one upload ID and validated byte offsets before setting document metadata', async () => {
    const { context, fetch } = mockContext();
    const folder = '/sites/test/Shared Documents';
    fetch.mockImplementation(async (url: string, _config: unknown, options: { method: string }) => {
      if (url.includes('RootFolder')) return response({ ServerRelativeUrl: folder });
      if (url.endsWith('contextinfo')) return digestResponse();
      if (url.includes('AddUsingPath')) return response({ ServerRelativeUrl: `${folder}/test.txt` });
      if (url.includes('StartUpload')) return response({ StartUpload: '3' });
      if (url.includes('FinishUpload')) return response({});
      if (url.includes('ListItemAllFields')) return response({ Id: 4 });
      if (url.includes('ListItemEntityTypeFullName')) return response({ ListItemEntityTypeFullName: 'SP.Data.DocumentsItem' });
      return options.method === 'GET' ? response({ Id: 4 }) : response('', 204);
    });
    const result = await new DynamicFormService(context).addFile(listId, 'test.txt', new Blob(['abc']), { ContentTypeId: '0x0101' });
    expect(result.reference.listItemId).toBe(4);
    const uploadCalls = fetch.mock.calls.filter(call => /StartUpload|FinishUpload/.test(call[0]));
    expect(uploadCalls).toHaveLength(2);
    expect(uploadCalls[1][0]).toContain('fileOffset=3');
    expect(uploadCalls[0][0].match(/uploadId=guid'([^']+)'/)?.[1]).toBe(uploadCalls[1][0].match(/uploadId=guid'([^']+)'/)?.[1]);
    expect(fetch.mock.calls.find(call => call[0].includes('AddUsingPath'))[0]).toContain('overwrite=true');
  });

  test.each([
    ['/sites/test/Shared%20Documents/Case%20Sensitive', '/sites/test/Shared Documents/Case Sensitive'],
    ['Case%20Sensitive', '/sites/test/Shared Documents/Case Sensitive'],
    ["100% complete #1/O'Brien", "/sites/test/Shared Documents/100% complete #1/O'Brien"]
  ])('preserves encoded and decoded folder path compatibility: %s', async (input, expected) => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({ ServerRelativeUrl: '/sites/test/Shared Documents' }))
      .mockResolvedValueOnce(digestResponse()).mockResolvedValue(response({}, 403));
    await expect(new DynamicFormService(context).addFolder(listId, 'New', {}, input)).rejects.toMatchObject({ status: 403 });
    expect(decodeURIComponent(fetch.mock.calls[2][0])).toContain(expected.replace(/'/g, "''"));
  });

  test('reports the persisted folder path when item identification fails', async () => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({ ServerRelativeUrl: '/sites/test/Documents' }))
      .mockResolvedValueOnce(digestResponse())
      .mockResolvedValueOnce(response('', 204))
      .mockResolvedValue(response({}, 403));
    const pending = new DynamicFormService(context).addFolder(listId, 'New', {});
    await expect(pending).rejects.toBeInstanceOf(DynamicFormSaveError);
    await expect(pending).rejects.toMatchObject({
      saveCommitted: true, partialCommit: true, failedPhase: 'identify',
      itemReference: { serverRelativeUrl: '/sites/test/Documents/New' }
    });
  });

  test.each(['0x0120', '0x0120D520'])('saves a folder/document set after an empty creation response: %s', async contentTypeId => {
    const { context, fetch } = mockContext();
    const parent = '/sites/test/Documents/Existing';
    const name = "O'Brien 50% #1";
    fetch.mockImplementation(async (url: string, _config: unknown, options: { method: string }) => {
      if (url.includes('RootFolder')) return response({ ServerRelativeUrl: '/sites/test/Documents' });
      if (url.endsWith('contextinfo')) return digestResponse();
      if (url.endsWith('AddSubFolderUsingPath')) return response('', 204);
      if (url.includes('ListItemAllFields')) return response({ Id: 9 });
      if (url.includes('ListItemEntityTypeFullName')) return response({ ListItemEntityTypeFullName: 'SP.Data.DocumentsItem' });
      return options.method === 'GET'
        ? response({ Id: 9, Title: name, ContentTypeId: contentTypeId, 'odata.etag': '"2"' })
        : response('', 204);
    });
    const result = await new DynamicFormService(context).addFolder(listId, name, { Title: name, ContentTypeId: contentTypeId }, 'Existing');
    expect(result.reference.listItemId).toBe(9);
    expect(result.data.ContentTypeId).toBe(contentTypeId);
    const itemRead = fetch.mock.calls.find(call => call[0].includes('ListItemAllFields'));
    expect(decodeURIComponent(itemRead[0])).toContain(`${parent}/${name}`.replace(/'/g, "''"));
    const update = fetch.mock.calls.find(call => call[2].headers['X-HTTP-Method'] === 'MERGE');
    expect(JSON.parse(update[2].body).ContentTypeId).toBe(contentTypeId);
    expect(fetch.mock.calls.filter(call => call[0].endsWith('AddSubFolderUsingPath'))).toHaveLength(1);
  });

  test('reports a finalized file when its item identification fails', async () => {
    const { context, fetch } = mockContext();
    fetch.mockImplementation(async (url: string) => {
      if (url.includes('RootFolder')) return response({ ServerRelativeUrl: '/sites/test/Documents' });
      if (url.endsWith('contextinfo')) return digestResponse();
      if (url.includes('AddUsingPath')) return response({ ServerRelativeUrl: '/sites/test/Documents/a.txt' });
      if (url.includes('StartUpload')) return response(3);
      if (url.includes('FinishUpload')) return response({});
      return response({}, 403);
    });
    await expect(new DynamicFormService(context).addFile(listId, 'a.txt', new Blob(['abc']), {}))
      .rejects.toMatchObject({
        saveCommitted: true, partialCommit: true, failedPhase: 'identify',
        itemReference: { serverRelativeUrl: '/sites/test/Documents/a.txt' }
      });
  });

  test('does not update the parent when an unnamed folder cannot be identified', async () => {
    const { context, fetch } = mockContext();
    fetch.mockResolvedValueOnce(response({ ServerRelativeUrl: '/sites/test/Documents' }))
      .mockResolvedValueOnce(digestResponse())
      .mockResolvedValueOnce(response('', 204));
    await expect(new DynamicFormService(context).addFolder(listId, '', {})).rejects.toMatchObject({
      partialCommit: true, failedPhase: 'identify', itemReference: { serverRelativeUrl: undefined }
    });
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});
