import SPPeopleSearchService from '../../src/services/PeopleSearchService';
import { SPRestClient } from '../../src/services/SPRestClient';
import { IPeoplePickerContext } from '../../src/controls/peoplepicker/IPeoplePickerContext';
import { PrincipalType } from '../../src/controls/peoplepicker/PrincipalType';

const mockEnsureUsers = jest.fn();
const mockEnsureUser = jest.fn();

jest.mock('../../src/services/SPRestClient', () => ({
  SPRestClient: jest.fn().mockImplementation(() => ({ ensureUsers: mockEnsureUsers, ensureUser: mockEnsureUser }))
}));
jest.mock('@microsoft/sp-lodash-subset', () => ({
  findIndex: (values: unknown[], predicate: (value: unknown) => boolean) => values.findIndex(predicate)
}));

describe('PeopleSearchService REST integration', () => {
  const ensureUsers = mockEnsureUsers;
  const ensureUser = mockEnsureUser;
  const graphGet = jest.fn();
  const post = jest.fn();
  const currentWeb = 'https://tenant.sharepoint.com/sites/current';
  const targetWeb = 'https://tenant.sharepoint.com/sites/target';
  const member = { Id: 7, LoginName: 'i:0#.f|membership|alex@example.com', Title: 'Alex User', Email: 'alex@example.com' };
  let context: IPeoplePickerContext;
  let service: SPPeopleSearchService;

  beforeEach(() => {
    jest.clearAllMocks();
    ensureUsers.mockReset();
    ensureUser.mockReset();
    graphGet.mockReset();
    post.mockReset();
    context = {
      absoluteUrl: currentWeb,
      spHttpClient: { post },
      msGraphClientFactory: {
        getClient: jest.fn().mockResolvedValue({
          api: jest.fn().mockReturnValue({
            header: jest.fn().mockReturnValue({ get: graphGet })
          })
        })
      }
    } as unknown as IPeoplePickerContext;
    service = new SPPeopleSearchService(context, false);
  });

  afterEach(() => jest.restoreAllMocks());

  test('uses ensureUsers for Graph groups, retaining partial results and logging failures', async () => {
    const log = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    graphGet.mockResolvedValue({ value: [
      { userPrincipalName: 'alex@example.com' },
      { userPrincipalName: 'missing@example.com' },
      { displayName: 'Nested group' }
    ] });
    ensureUsers.mockResolvedValue([member]);

    const users = await service.searchPeople('Alex', 5, [PrincipalType.User], targetWeb, 'group-id', true);

    expect(SPRestClient).toHaveBeenCalledWith(context.spHttpClient, targetWeb);
    expect(ensureUsers).toHaveBeenCalledWith(['alex@example.com', 'missing@example.com']);
    expect(log).toHaveBeenCalled();
    expect(users).toEqual([{
      id: '7',
      loginName: member.LoginName,
      imageUrl: `${currentWeb}/_layouts/15/userphoto.aspx?accountname=alex%40example.com&size=M`,
      imageInitials: 'AU',
      text: 'Alex User',
      secondaryText: member.Email,
      tertiaryText: '',
      optionalText: ''
    }]);
  });

  test('preserves login-name IDs when ensureUser is false', async () => {
    graphGet.mockResolvedValue({ value: [{ userPrincipalName: 'alex@example.com' }] });
    ensureUsers.mockResolvedValue([member]);
    const users = await service.searchPeople('Alex', 5, [PrincipalType.User], null, 'group-id');
    expect(users[0].id).toBe(member.LoginName);
    expect(SPRestClient).toHaveBeenCalledWith(context.spHttpClient, currentWeb);
  });

  test('caches ensured IDs per web and filters users that cannot be ensured', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const people = [
      { Key: member.LoginName, EntityType: 'User', DisplayText: member.Title, Description: member.Email, EntityData: { Email: member.Email } },
      { Key: 'missing@example.com', EntityType: 'User', DisplayText: 'Missing User', Description: 'missing@example.com', EntityData: {} }
    ];
    post.mockImplementation(async () => ({
      ok: true,
      json: async () => ({ value: JSON.stringify(people) })
    }));
    ensureUser.mockImplementation(async login => {
      if (login === member.LoginName) return member;
      throw new Error('Missing user');
    });

    const first = await service.searchPeople('Alex', 5, [PrincipalType.User], currentWeb, null, true);
    const second = await service.searchPeople('Alex', 5, [PrincipalType.User], currentWeb, null, true);
    expect(first).toHaveLength(1);
    expect(second[0].id).toBe(7);
    expect(ensureUser.mock.calls.filter(([login]) => login === member.LoginName)).toHaveLength(1);

    await service.searchPeople('Alex', 5, [PrincipalType.User], targetWeb, null, true);
    expect(ensureUser.mock.calls.filter(([login]) => login === member.LoginName)).toHaveLength(2);
  });
});
