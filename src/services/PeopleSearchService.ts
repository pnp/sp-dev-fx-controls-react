import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { MockUsers, PeoplePickerMockClient } from './PeoplePickerMockClient';
import { PrincipalType, IPeoplePickerUserItem } from "../PeoplePicker";
import { IUsers, IUserInfo } from "../controls/peoplepicker/IUsers";
import { cloneDeep, findIndex } from "@microsoft/sp-lodash-subset";

/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService {
  private cachedPersonas: { [property: string]: IUserInfo[] };
  private cachedLocalUsers: { [siteUrl: string]: IUserInfo[] };

  /**
   * Service constructor
   */
  constructor(private context: WebPartContext | ExtensionContext) {
    this.cachedPersonas = {};
    this.cachedLocalUsers = {};
    this.cachedLocalUsers[this.context.pageContext.web.absoluteUrl] = [];
  }

  /**
   * Generate the user photo link using SharePoint user photo endpoint.
   *
   * @param value
   */
  public generateUserPhotoLink(value: string): string {
    return `${this.context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?accountname=${encodeURIComponent(value)}&size=M`;
  }

  /**
   * Generate sum of principal types
   *
   * PrincipalType controls the type of entities that are returned in the results.
   * Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
   * These values can be combined (example: 13 is security + SP groups + users)
   *
   * @param principalTypes
   */
  public getSumOfPrincipalTypes(principalTypes: PrincipalType[]) {
    return !!principalTypes && principalTypes.length > 0 ? principalTypes.reduce((a, b) => a + b, 0) : 1;
  }

  /**
   * Retrieve the specified group
   *
   * @param groupName
   * @param siteUrl
   */
  public async getGroupId(groupName: string, siteUrl: string = null): Promise<number | null> {
    if (Environment.type === EnvironmentType.Local) {
      return 1;
    } else {
      const groups = await this.searchTenant(siteUrl, groupName, 1, [PrincipalType.SharePointGroup], false, 0);
      return (groups && groups.length > 0) ? parseInt(groups[0].id) : null;
    }
  }

  /**
   * Search person by its email or login name
   */
  public async searchPersonByEmailOrLogin(email: string, principalTypes: PrincipalType[], siteUrl: string = null, groupId: number = null, ensureUser: boolean = false): Promise<IPeoplePickerUserItem> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      const mockUsers = await this.searchPeopleFromMock(email);
      return (mockUsers && mockUsers.length > 0) ? mockUsers[0] : null;
    } else {
      const userResults = await this.searchTenant(siteUrl, email, 1, principalTypes, ensureUser, groupId);
      return (userResults && userResults.length > 0) ? userResults[0] : null;
    }
  }

  /**
   * Search All Users from the SharePoint People database
   */
  public async searchPeople(query: string, maximumSuggestions: number, principalTypes: PrincipalType[], siteUrl: string = null, groupId: number = null, ensureUser: boolean = false): Promise<IPeoplePickerUserItem[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchPeopleFromMock(query);
    } else {
      return await this.searchTenant(siteUrl, query, maximumSuggestions, principalTypes, ensureUser, groupId);
    }
  }

  /**
   * Local site search
   */
  private async localSearch(siteUrl: string, query: string, principalTypes: PrincipalType[], showHiddenInUI: boolean, groupName: string, exactMatch: boolean = false): Promise<IPeoplePickerUserItem[]> {
    try {
      let stringVal: string = "";
      let cachedPropertyName: string = null;

      // Check if service needs to search in the site or group
      if (groupName) {
        stringVal = `/_api/web/sitegroups/GetByName('${groupName}')/users`;
        cachedPropertyName = `${siteUrl}-${groupName}`;
      } else {
        stringVal = "/_api/web/siteusers";
        cachedPropertyName = siteUrl;
      }

      if (typeof this.cachedPersonas[cachedPropertyName] === "undefined") {
        // filter for principal Type
        let filterVal: string = "";
        if (principalTypes) {
          filterVal = `?$filter=(${principalTypes.map(principalType => `PrincipalType eq ${principalType}`).join(" or ")})`;
        }

        // filter for showHiddenInUI
        filterVal = filterVal ? `${filterVal} and (IsHiddenInUI eq ${showHiddenInUI})` : `?$filter=IsHiddenInUI eq ${showHiddenInUI}`;

        // Create the rest API
        const restApi = `${siteUrl}${stringVal}${filterVal}`;
        const data = await this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1, {
          headers: {
            'Accept': 'application/json;odata.metadata=none'
          }
        });

        if (data.ok) {
          const userDataResp: IUsers = await data.json();
          if (userDataResp && userDataResp.value && userDataResp.value.length > 0) {
            this.cachedPersonas[cachedPropertyName] = cloneDeep(userDataResp.value);
          }
        }
      }

      // Check if persons or groups were retrieved and return the ones for the query
      if (this.cachedPersonas[cachedPropertyName]) {
        let persons = this.cachedPersonas[cachedPropertyName];
        if (query) {
          // Check if exact match is required
          if (exactMatch) {
            persons = persons.filter(element => element.Email.toLowerCase() === query.toLowerCase() || element.LoginName.toLowerCase() === query.toLowerCase());
          } else {
            persons = persons.filter(element => element.Title.toLowerCase().indexOf(query.toLowerCase()) !== -1 || element.Email.toLowerCase().indexOf(query.toLowerCase()) !== -1 || element.LoginName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
          }
        }

        return persons.map(item => ({
          id: item.Id.toString(),
          imageUrl: item.PrincipalType === PrincipalType.User ? this.generateUserPhotoLink(item.Email) : null,
          imageInitials: this.getFullNameInitials(item.Title),
          text: item.Title, // name
          secondaryText: item.Email || item.LoginName, // email
          tertiaryText: "", // status
          optionalText: "" // anything
        } as IPeoplePickerUserItem));
      }

      // Nothing to return
      return [];
    } catch (e) {
      console.error("PeopleSearchService::localSearch: error occured while fetching the users.");
      return [];
    }
  }

  /**
   * Tenant search
   */
  private async searchTenant(siteUrl: string, query: string, maximumSuggestions: number, principalTypes: PrincipalType[], ensureUser: boolean, groupId: number): Promise<IPeoplePickerUserItem[]> {
    try {
      // If the running env is SharePoint, loads from the peoplepicker web service
      const userRequestUrl: string = `${siteUrl || this.context.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
      const searchBody = {
        queryParams: {
          AllowEmailAddresses: true,
          AllowMultipleEntities: false,
          AllUrlZones: false,
          MaximumEntitySuggestions: maximumSuggestions,
          PrincipalSource: 15,
          PrincipalType: this.getSumOfPrincipalTypes(principalTypes),
          QueryString: query
        }
      };

      // Search on the local site when "0"
      if (siteUrl) {
        searchBody.queryParams["SharePointGroupID"] = 0;
      }

      // Check if users need to be searched in a specific group
      if (groupId) {
        searchBody.queryParams["SharePointGroupID"] = groupId;
      }

      const httpPostOptions: ISPHttpClientOptions = {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(searchBody)
      };

      // Do the call against the People REST API endpoint
      const data = await this.context.spHttpClient.post(userRequestUrl, SPHttpClient.configurations.v1, httpPostOptions);
      if (data.ok) {
        const userDataResp = await data.json();
        if (userDataResp && userDataResp.value && userDataResp.value.length > 0) {
          let values: any = userDataResp.value;

          if (typeof userDataResp.value === "string") {
            values = JSON.parse(userDataResp.value);
          }

          // Filter out "UNVALIDATED_EMAIL_ADDRESS"
          values = values.filter(v => !(v.EntityData && v.EntityData.PrincipalType && v.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS"));

          // Check if local user IDs need to be retrieved
          if (ensureUser) {
            for (const value of values) {
              // Only ensure the user if it is not a SharePoint group
              if (!value.EntityData || (value.EntityData && typeof value.EntityData.SPGroupID === "undefined")) {
                const id = await this.ensureUser(value.Key);
                value.LoginName = value.Key;
                value.Key = id;
              }
            }
          }

          // Filter out NULL keys
          values = values.filter(v => v.Key !== null);
          const userResults = values.map(element => {
            switch (element.EntityType) {
              case 'User':
                let email: string = element.EntityData.Email !== null ? element.EntityData.Email : element.Description;
                return {
                  id: element.Key,
                  loginName: element.LoginName ? element.LoginName : element.Key,
                  imageUrl: this.generateUserPhotoLink(email),
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText, // name
                  secondaryText: email, // email
                  tertiaryText: "", // status
                  optionalText: "" // anything
                } as IPeoplePickerUserItem;
              case 'SecGroup':
                return {
                  id: element.Key,
                  loginName: element.LoginName ? element.LoginName : element.Key,
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText,
                  secondaryText: element.ProviderName
                } as IPeoplePickerUserItem;
              case 'FormsRole':
                return {
                  id: element.Key,
                  loginName: element.LoginName ? element.LoginName : element.Key,
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText,
                  secondaryText: element.ProviderName
                } as IPeoplePickerUserItem;
              default:
                return {
                  id: element.EntityData.SPGroupID,
                  loginName: element.EntityData.AccountName,
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText,
                  secondaryText: element.EntityData.AccountName
                } as IPeoplePickerUserItem;
            }
          });

          return userResults;
        }
      }

      // Nothing to return
      return [];
    } catch (e) {
      console.error("PeopleSearchService::searchTenant: error occured while fetching the users.");
      return [];
    }
  }

  /**
   * Retrieves the local user ID
   *
   * @param userId
   */
  private async ensureUser(userId: string): Promise<number> {
    const siteUrl = this.context.pageContext.web.absoluteUrl;
    if (this.cachedLocalUsers && this.cachedLocalUsers[siteUrl]) {
      const users = this.cachedLocalUsers[siteUrl];
      const userIdx = findIndex(users, u => u.LoginName === userId);
      if (userIdx !== -1) {
        return users[userIdx].Id;
      }
    }

    const restApi = `${siteUrl}/_api/web/ensureuser`;
    const data = await this.context.spHttpClient.post(restApi, SPHttpClient.configurations.v1, {
      body: JSON.stringify({ 'logonName': userId })
    });

    if (data.ok) {
      const user: IUserInfo = await data.json();
      if (user && user.Id) {
        this.cachedLocalUsers[siteUrl].push(user);
        return user.Id;
      }
    }

    return null;
  }

  /**
   * Generates Initials from a full name
   */
  private getFullNameInitials(fullName: string): string {
    if (fullName === null) {
      return fullName;
    }

    const words: string[] = fullName.split(' ');
    if (words.length === 0) {
      return '';
    } else if (words.length === 1) {
      return words[0].charAt(0);
    } else {
      return (words[0].charAt(0) + words[1].charAt(0));
    }
  }

  /**
   * Gets the user photo url
   */
  private getUserPhotoUrl(userEmail: string, siteUrl: string): string {
    return `${siteUrl}/_layouts/15/userphoto.aspx?size=S&accountname=${userEmail}`;
  }


  /**
   * Returns fake people results for the Mock mode
   */
  private searchPeopleFromMock(query: string): Promise<Array<IPeoplePickerUserItem>> {
    let mockClient: PeoplePickerMockClient = new PeoplePickerMockClient();
    let filterValue = { valToCompare: query };
    return new Promise<Array<IPeoplePickerUserItem>>((resolve) => resolve(MockUsers.filter(mockClient.filterPeople, filterValue)));
  }
}
