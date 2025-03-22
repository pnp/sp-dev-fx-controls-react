import { ISPHttpClientOptions, SPHttpClient } from '@microsoft/sp-http';
import { findIndex } from "@microsoft/sp-lodash-subset";
import { sp } from '@pnp/sp';
import "@pnp/sp/site-users/web";
import "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import { IUserInfo } from "../controls/peoplepicker/IUsers";
import { IPeoplePickerContext, IPeoplePickerUserItem, PrincipalType } from "../PeoplePicker";

/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService {
  private cachedLocalUsers: { [siteUrl: string]: IUserInfo[] };

  /**
   * Service constructor
   */
  constructor(private context: IPeoplePickerContext, private substrateSearchEnabled: boolean) {
    this.cachedLocalUsers = {};
    this.cachedLocalUsers[context.absoluteUrl] = [];
    // Setup PnPjs
    sp.setup({ pageContext: {
      web: {
        absoluteUrl: context.absoluteUrl
      }
    }});
  }

  /**
   * Generate the user photo link using SharePoint user photo endpoint.
   *
   * @param value
   */
  public generateUserPhotoLink(value: string): string {
    return `${this.context.absoluteUrl}/_layouts/15/userphoto.aspx?accountname=${encodeURIComponent(value)}&size=M`;
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
  public getSumOfPrincipalTypes(principalTypes: PrincipalType[]): number {
    return !!principalTypes && principalTypes.length > 0 ? principalTypes.reduce((a, b) => a + b, 0) : 1;
  }

  /**
   * Retrieve the specified group
   *
   * @param groupName
   * @param siteUrl
   */
  public async getGroupId(groupName: string, siteUrl: string = null): Promise<number | undefined> {
    const groups = await this.searchTenant(siteUrl, groupName, 1, [PrincipalType.SharePointGroup], false, false, 0);
    return (groups && groups.length > 0) ? parseInt(groups[0].id) : undefined;
  }

  /**
   * Search person by its email or login name
   */
  public async searchPersonByEmailOrLogin(email: string, principalTypes: PrincipalType[], siteUrl: string = null, groupId: number | string | (string | number)[] = null, ensureUser: boolean = false, allowUnvalidated: boolean = false): Promise<IPeoplePickerUserItem> {
    // If groupId is array, load data from all groups
    if (Array.isArray(groupId)) {
      let userResults: IPeoplePickerUserItem[] = [];
      for (const id of groupId) {
        const tmpResults = await this.searchTenant(siteUrl, email, 1, principalTypes, ensureUser, allowUnvalidated, id);
        userResults = userResults.concat(tmpResults);
      }

      // Remove duplicate results in case user is present in multiple groups
      const logins = userResults.map(u => u.loginName);
      const filteredUserResults = userResults.filter(({ loginName }, index) => !logins.includes(loginName, index + 1));
      return (filteredUserResults && filteredUserResults.length > 0) ? filteredUserResults[0] : null;
    } else {
      const userResults = await this.searchTenant(siteUrl, email, 1, principalTypes, ensureUser, allowUnvalidated, groupId);
      return (userResults && userResults.length > 0) ? userResults[0] : null;
    }
  }

  /**
   * Search All Users from the SharePoint People database
   */
  public async searchPeople(query: string, maximumSuggestions: number, principalTypes: PrincipalType[], siteUrl: string = null, groupId: number | string | (string | number)[] = null, ensureUser: boolean = false, allowUnvalidated: boolean = false): Promise<IPeoplePickerUserItem[]> {
    // If groupId is array, load data from all groups
    if (Array.isArray(groupId)) {
      let userResults: IPeoplePickerUserItem[] = [];
      for (const id of groupId) {
        const tmpResults = await this.searchTenant(siteUrl, query, maximumSuggestions, principalTypes, ensureUser, allowUnvalidated, id);
        userResults = userResults.concat(tmpResults);
      }

      // Remove duplicate results in case user is present in multiple groups
      const logins = userResults.map(u => u.loginName);
      const filteredUserResults = userResults.filter(({ loginName }, index) => !logins.includes(loginName, index + 1));
      return filteredUserResults;
    } else {
      return await this.searchTenant(siteUrl, query, maximumSuggestions, principalTypes, ensureUser, allowUnvalidated, groupId);
    }
  }

  /**
   * Tenant search
   */
  private async searchTenant(siteUrl: string, query: string, maximumSuggestions: number, principalTypes: PrincipalType[], ensureUser: boolean, allowUnvalidated: boolean, groupId: number | string): Promise<IPeoplePickerUserItem[]> {
    try {
      // If the running env is SharePoint, loads from the peoplepicker web service
      const userRequestUrl: string = `${siteUrl || this.context.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const searchBody: any = {
        queryParams: {
          AllowEmailAddresses: true,
          AllowMultipleEntities: false,
          AllUrlZones: false,
          MaximumEntitySuggestions: maximumSuggestions,
          PrincipalSource: 15,
          PrincipalType: this.getSumOfPrincipalTypes(principalTypes),
          QueryString: query,
          UseSubstrateSearch: this.substrateSearchEnabled ?? false
        }
      };

      // Search on the local site when "0"
      if (siteUrl) {
        searchBody.queryParams.SharePointGroupID = 0;
      }

      // Check if users need to be searched in a specific SharePoint Group
      if (groupId && typeof (groupId) === 'number') {
        searchBody.queryParams.SharePointGroupID = groupId;
      }

      // Check if users need to be searched in a specific Microsoft 365 Group, Security Group (incl. nested groups) or Distribution List
      else if (groupId && typeof (groupId) === 'string') {
        const graphUserRequestUrl = `/groups/${groupId}/transitiveMembers?$count=true&$search="userPrincipalName:${query}" OR "displayName:${query}" OR "mail:${query}"`;
        const graphClient = await this.context.msGraphClientFactory.getClient("3");
        const graphUserResponse = await graphClient.api(graphUserRequestUrl).header('ConsistencyLevel', 'eventual').get();

        if (graphUserResponse.value && graphUserResponse.value.length > 0) {

          // Get user loginName from user email
          const _users = [];
          const batch = Web(this.context.absoluteUrl).createBatch();
          for (const value of graphUserResponse.value) {
            sp.web.inBatch(batch).ensureUser(value.userPrincipalName).then(u => _users.push(u.data)).catch(() => {
              // no-op
            });
          }

          await batch.execute();

          const userResult: IPeoplePickerUserItem[] = [];
          for (const user of _users) {
            userResult.push({
              id: ensureUser ? user.Id : user.LoginName,
              loginName: user.LoginName,
              imageUrl: this.generateUserPhotoLink(user.Email),
              imageInitials: this.getFullNameInitials(user.Title),
              text: user.Title, // name
              secondaryText: user.Email, // email
              tertiaryText: '', // status
              optionalText: '' // anything
            });
          }

          return userResult;
        }

        //Nothing to return
        return [];
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
          let values: any = userDataResp.value; // eslint-disable-line @typescript-eslint/no-explicit-any

          if (typeof userDataResp.value === "string") {
            values = JSON.parse(userDataResp.value);
          }

          // Filter out "UNVALIDATED_EMAIL_ADDRESS"
          if (!allowUnvalidated) {
            values = values.filter(v => !(v.EntityData && v.EntityData.PrincipalType && v.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS"));
          }


          // Check if local user IDs need to be retrieved
          if (ensureUser) {
            for (const value of values) {
              // Only ensure the user if it is not a SharePoint group
              if (!value.EntityData || (value.EntityData && typeof value.EntityData.SPGroupID === "undefined" && value.EntityData.PrincipalType !== "UNVALIDATED_EMAIL_ADDRESS")) {
                const id = await this.ensureUser(value.Key, siteUrl || this.context.absoluteUrl);
                value.LoginName = value.Key;
                value.Key = id;
              }
            }
          }

          // Filter out NULL keys
          values = values.filter(v => v.Key !== null);
          const userResults = values.map(element => {
            const accountName: string = element.Description || "";
            const email: string = element.EntityData?.Email || element.Description;
            const secondaryText = element.EntityData?.Email || element.ProviderName;
            switch (element.EntityType) {
              case 'User':
                return {
                  id: element.Key,
                  loginName: element.LoginName ? element.LoginName : element.Key,
                  imageUrl: this.generateUserPhotoLink(accountName),
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
                  secondaryText,
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
                  secondaryText: element.EntityData.AccountName,
                  userUnvalidated: element.EntityData.PrincipalType === "UNVALIDATED_EMAIL_ADDRESS"
                } as IPeoplePickerUserItem;
            }
          });

          return userResults;
        }
      }

      // Nothing to return
      return [];
    } catch {
      console.error("PeopleSearchService::searchTenant: error occured while fetching the users.");
      return [];
    }
  }

  /**
   * Retrieves the local user ID
   *
   * @param userId
   * @param siteUrl
   */
  private async ensureUser(userId: string, siteUrl: string): Promise<number> {
    // const siteUrl = this.context.pageContext.web.absoluteUrl;
    if (this.cachedLocalUsers && this.cachedLocalUsers[siteUrl]) {
      const users = this.cachedLocalUsers[siteUrl];
      const userIdx = findIndex(users, u => u.LoginName === userId);
      if (userIdx !== -1) {
        return users[userIdx].Id;
      }
    } //initialize the array if it doesnt exist with the siteUrl
    else if(!this.cachedLocalUsers[siteUrl]) {
      this.cachedLocalUsers[siteUrl] = [];
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
}
