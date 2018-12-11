import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { MockUsers, PeoplePickerMockClient } from './PeoplePickerMockClient';
import { PrincipalType, IPeoplePickerUserItem } from "../PeoplePicker";
import { IUsers, IUserInfo } from "../controls/peoplepicker/IUsers";
import { cloneDeep } from "@microsoft/sp-lodash-subset";

/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService {
  private context: WebPartContext | ExtensionContext;
  private cachedPersonas: { [property: string]: IUserInfo[] };

  /**
   * Service constructor
   */
  constructor(pageContext: WebPartContext | ExtensionContext) {
    this.context = pageContext;
    this.cachedPersonas = {};
  }

  /**
   * Generate the user photo link
   *
   * @param value
   */
  public generateUserPhotoLink(value: string): string {
    return `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${value}&UA=0&size=HR96x96`;
  }

  /**
   * Search person by its email or login name
   */
  public async searchPersonByEmailOrLogin(email: string, principalTypes: PrincipalType[], siteUrl: string = null, showHiddenInUI: boolean = false, groupName: string = null): Promise<IPeoplePickerUserItem> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      const mockUsers = await this.searchPeopleFromMock(email);
      return (mockUsers && mockUsers.length > 0) ? mockUsers[0] : null;
    } else {
      // Check the action to perform
      if (siteUrl) {
        /* Local site search will be performed */
        const userResults = await this.localSearch(siteUrl, email, principalTypes, showHiddenInUI, groupName, true);
        return (userResults && userResults.length > 0) ? userResults[0] : null;
      } else {
        /* Global tenant search will be performed */
        const userResults = await this.searchTenant(email, 1, principalTypes);
        return (userResults && userResults.length > 0) ? userResults[0] : null;
      }
    }
  }

  /**
   * Search All Users from the SharePoint People database
   */
  public async searchPeople(query: string, maximumSuggestions: number, principalTypes: PrincipalType[], siteUrl: string = null, showHiddenInUI: boolean = false, groupName: string = null): Promise<IPeoplePickerUserItem[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchPeopleFromMock(query);
    } else {
      // Check the action to perform
      if (siteUrl) {
        /* Local site search will be performed */
        return await this.localSearch(siteUrl, query, principalTypes, showHiddenInUI, groupName);
      } else {
        /* Global tenant search will be performed */
        return await this.searchTenant(query, maximumSuggestions, principalTypes);
      }
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
  private async searchTenant(query: string, maximumSuggestions: number, principalTypes: PrincipalType[]): Promise<IPeoplePickerUserItem[]> {
    try {
      // If the running env is SharePoint, loads from the peoplepicker web service
      const userRequestUrl: string = `${this.context.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
      const searchBody = {
        'queryParams': {
          'AllowEmailAddresses': true,
          'AllowMultipleEntities': false,
          'AllUrlZones': false,
          'MaximumEntitySuggestions': maximumSuggestions,
          'PrincipalSource': 15,
          // PrincipalType controls the type of entities that are returned in the results.
          // Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
          // These values can be combined (example: 13 is security + SP groups + users)
          'PrincipalType': !!principalTypes && principalTypes.length > 0 ? principalTypes.reduce((a, b) => a + b, 0) : 1,
          'QueryString': query
        }
      };

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

          const userResults = values.map(element => {
            switch (element.EntityType) {
              case "User":
                let email : string = element.EntityData.Email !== null ? element.EntityData.Email : element.Description;
                return {
                  id: element.Key,
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
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText,
                  secondaryText: element.ProviderName
                } as IPeoplePickerUserItem;
              case 'FormsRole':
                return {
                  id: element.Key,
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText,
                  secondaryText: element.ProviderName
                } as IPeoplePickerUserItem;
              default:
                return {
                  id: element.EntityData.SPGroupID,
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
    let filterValue = { valToCompare: query  };
    return new Promise<Array<IPeoplePickerUserItem>>((resolve) => resolve(MockUsers.filter(mockClient.filterPeople, filterValue)));
  }
}
