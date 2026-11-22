import { expect } from 'chai';
import SPPeopleSearchService from './PeopleSearchService';
import { IPeoplePickerUserItem, PrincipalType } from '../PeoplePicker';

const adeleVance: IPeoplePickerUserItem = {
  id: 'i:0#.f|membership|adelev@contoso.com',
  loginName: 'i:0#.f|membership|adelev@contoso.com',
  imageInitials: 'AV',
  imageUrl: '',
  text: 'Adele Vance',
  secondaryText: 'adelev@contoso.com',
  tertiaryText: '',
  optionalText: ''
};

const vanGroup: IPeoplePickerUserItem = {
  id: '12',
  loginName: 'Van',
  imageInitials: 'V',
  imageUrl: '',
  text: 'Van',
  secondaryText: 'SharePoint Group',
  tertiaryText: '',
  optionalText: ''
};

/**
 * Creates a service instance (without running the SPFx dependent constructor)
 * where the tenant search returns the specified results
 */
const createService = (results: IPeoplePickerUserItem[]): SPPeopleSearchService => {
  const service = Object.create(SPPeopleSearchService.prototype);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (service as any).searchTenant = () => Promise.resolve(results);
  return service;
};

const principalTypes = [PrincipalType.User, PrincipalType.SharePointGroup];

describe('SPPeopleSearchService.searchPersonByEmailOrLogin', () => {
  it('Should return the exact match instead of the first partial match', async () => {
    const service = createService([adeleVance, vanGroup]);
    const result = await service.searchPersonByEmailOrLogin('Van', principalTypes);
    expect(result).to.equal(vanGroup);
  });

  it('Should return the exact match when searching in multiple groups', async () => {
    const service = createService([adeleVance, vanGroup]);
    const result = await service.searchPersonByEmailOrLogin('Van', principalTypes, null, [1, 2]);
    expect(result).to.equal(vanGroup);
  });

  it('Should match on email case-insensitively', async () => {
    const service = createService([vanGroup, adeleVance]);
    const result = await service.searchPersonByEmailOrLogin('AdeleV@contoso.com', principalTypes, null, [1, 2]);
    expect(result).to.equal(adeleVance);
  });

  it('Should return null when there is no exact match', async () => {
    const service = createService([adeleVance]);
    expect(await service.searchPersonByEmailOrLogin('Van', principalTypes)).to.equal(null);
    expect(await service.searchPersonByEmailOrLogin('Van', principalTypes, null, [1, 2])).to.equal(null);
  });
});
