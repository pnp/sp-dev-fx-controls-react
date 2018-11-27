import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IPeoplePickerUserItem } from './IPeoplePicker';
import { PrincipalType } from './PrincipalType';
import { MockUsers, PeoplePickerMockClient } from './PeoplePickerMockClient';

/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService {
  private context: WebPartContext | ExtensionContext;

  /**
   * Service constructor
   */
  constructor(pageContext: WebPartContext | ExtensionContext) {
    this.context = pageContext;
  }

  /**
   * Generate the user photo link
   *
   * @param value
   */
  private generateUserPhotoLink(value: string): string {
    return `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${value}&UA=0&size=HR96x96`;
  }

  /**
   * Search All Users from the SharePoint People database
   */
  public searchAllUsers(query: string, maximumSuggestions : number): Promise<Array<IPeoplePickerUserItem>> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.searchPeopleFromMock(query);
    } else {
      // If the running env is SharePoint, loads from the peoplepicker web service
      const userRequestUrl: string = `${this.context.pageContext.web.absoluteUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
      const data = {
        'queryParams': {
          'AllowEmailAddresses': true,
          'AllowMultipleEntities': false,
          'AllUrlZones': false,
          'MaximumEntitySuggestions': maximumSuggestions,
          'PrincipalSource': PrincipalType.All,
          // PrincipalType controls the type of entities that are returned in the results.
          // Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
          // These values can be combined (example: 13 is security + SP groups + users)
          'PrincipalType': PrincipalType.User,
          'QueryString': query
        }
      };
      let httpPostOptions: ISPHttpClientOptions = {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      // Do the call against the People REST API endpoint
      return this.context.spHttpClient.post(userRequestUrl, SPHttpClient.configurations.v1, httpPostOptions).then((searchResponse: SPHttpClientResponse) => {
        return searchResponse.json().then((usersResponse: any) => {
          const res: IPeoplePickerUserItem[] = [];
          const values: any = JSON.parse(usersResponse.value);
          values.map(element => {
            switch (element.EntityType) {
              case "User":
                let email : string = element.EntityData.Email !== null && element.EntityData.Email !== undefined && element.EntityData.Email !== "" 
                                      ? element.EntityData.Email : element.Description;
                const peoplepickerUserItem: IPeoplePickerUserItem = { 
                  id: "",
                  imageUrl: this.generateUserPhotoLink(email),
                  imageInitials: this.getFullNameInitials(element.DisplayText),
                  text: element.DisplayText, // name
                  secondaryText: email, // email
                  tertiaryText: "", // status
                  optionalText: "" // anything
                };
                res.push(peoplepickerUserItem);
                break;
              default:
                break;
            }
          });
          return res;
        });
      });
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
    let mockClient : PeoplePickerMockClient = new PeoplePickerMockClient();
    let filterValue = { valToCompare : query  }
    return new Promise<Array<IPeoplePickerUserItem>>((resolve)=> {resolve(MockUsers.filter(mockClient.filterPeople, filterValue))});
  }
}
