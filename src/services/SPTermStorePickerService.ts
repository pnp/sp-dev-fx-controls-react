/**
 * DISCLAIMER
 *
 * As there is not yet an OData end-point for managed metadata, this service makes use of the ProcessQuery end-points.
 * The service will get updated once the APIs are in place for managing managed metadata.
 */

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { IWebPartContext } from '@microsoft/sp-webpart-base';
import { ITaxonomyPickerProps } from '../controls/taxonomyPicker/ITaxonomyPicker';
import { IPickerTerms, IPickerTerm } from '../controls/taxonomyPicker/ITermPicker';
import { ITermStore, ITerms, ITerm, IGroup, ITermSet, ITermSets } from './ISPTermStorePickerService';
import SPTermStoreMockHttpClient from './SPTermStorePickerMockService';
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';


/**
 * Service implementation to manage term stores in SharePoint
 */
export default class SPTermStorePickerService {
  private taxonomySession: string;
  private formDigest: string;
  private clientServiceUrl: string;

  /**
   * Service constructor
   */
  constructor(private props: ITaxonomyPickerProps, private context: IWebPartContext | ApplicationCustomizerContext) {
    if (Environment.type !== EnvironmentType.Local) {
      {
        this.clientServiceUrl = this.context.pageContext.web.absoluteUrl + '/_vti_bin/client.svc/ProcessQuery';
      }
    }
  }

  /**
   * Gets the collection of term stores in the current SharePoint env
   */
  public getTermStores(): Promise<ITermStore[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getTermStoresFromMock();
    } else {
      // Retrieve the term store name, groups, and term sets
      const data = '<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009"><Actions><ObjectPath Id="2" ObjectPathId="1" /><ObjectIdentityQuery Id="3" ObjectPathId="1" /><ObjectPath Id="5" ObjectPathId="4" /><ObjectIdentityQuery Id="6" ObjectPathId="4" /><Query Id="7" ObjectPathId="4"><Query SelectAllProperties="false"><Properties><Property Name="Id" ScalarProperty="true" /><Property Name="Name" ScalarProperty="true" /><Property Name="Groups"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="IsSystemGroup" ScalarProperty="true" /><Property Name="TermSets"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="Name" ScalarProperty="true" /><Property Name="Id" ScalarProperty="true" /><Property Name="Description" ScalarProperty="true" /><Property Name="Names" ScalarProperty="true" /></Properties></ChildItemQuery></Property></Properties></ChildItemQuery></Property></Properties></Query></Query></Actions><ObjectPaths><StaticMethod Id="1" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="4" ParentId="1" Name="GetDefaultSiteCollectionTermStore" /></ObjectPaths></Request>';

      const reqHeaders = new Headers();
      reqHeaders.append("accept", "application/json");
      reqHeaders.append("content-type", "application/xml");

      const httpPostOptions: ISPHttpClientOptions = {
        headers: reqHeaders,
        body: data
      };

      return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
        return serviceResponse.json().then((serviceJSONResponse: any) => {
          // Construct results
          let termStoreResult: ITermStore[] = serviceJSONResponse.filter(r => r['_ObjectType_'] === 'SP.Taxonomy.TermStore');
          // Check if term store was retrieved
          if (termStoreResult.length > 0) {
            // Check if the termstore needs to be filtered or limited
            if (this.props.termsetNameOrID) {
              return termStoreResult.map(termstore => {
                let termGroups = termstore.Groups._Child_Items_;

                // Check if the groups have to be limited to a specific term set
                if (this.props.termsetNameOrID) {
                  const termsetNameOrId = this.props.termsetNameOrID;
                  termGroups = termGroups.map((group: IGroup) => {
                    group.TermSets._Child_Items_ = group.TermSets._Child_Items_.filter((termSet: ITermSet) => termSet.Name === termsetNameOrId || this.cleanGuid(termSet.Id).toLowerCase() === this.cleanGuid(termsetNameOrId).toLowerCase());
                    return group;
                  });
                }

                // Filter out all systen groups
                termGroups = termGroups.filter(group => !group.IsSystemGroup);

                // Filter out empty groups
                termGroups = termGroups.filter((group: IGroup) => group.TermSets._Child_Items_.length > 0);

                // Map the new groups
                termstore.Groups._Child_Items_ = termGroups;
                return termstore;
              });
            }

            // Return the term store results
            return termStoreResult;
          }
          return [];
        });
      });
    }
  }

  /**
   * Gets the current term set
   */
  public async getTermSet(): Promise<ITermSet> {
    if (Environment.type === EnvironmentType.Local) {
      const termSetInfo = await SPTermStoreMockHttpClient.getAllTerms();
      return termSetInfo;
    } else {
      const termStore = await this.getTermStores();
      return this.getTermSetId(termStore, this.props.termsetNameOrID);
    }
  }

  /**
   * Retrieve all terms for the given term set
   * @param termset
   */
  public async getAllTerms(termset: string): Promise<ITermSet> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return this.getAllMockTerms();
    } else {
      let termsetId: string = termset;
      // Check if the provided term set property is a GUID or string
      if (!this.isGuid(termset)) {
        // Fetch the term store information
        const termStore = await this.getTermStores();
        // Get the ID of the provided term set name
        const crntTermSet = this.getTermSetId(termStore, termset);
        if (crntTermSet) {
          termsetId = this.cleanGuid(crntTermSet.Id);
        } else {
          return null;
        }
      }

      // Request body to retrieve all terms for the given term set
      const data = `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="1" ObjectPathId="0" /><ObjectIdentityQuery Id="2" ObjectPathId="0" /><ObjectPath Id="4" ObjectPathId="3" /><ObjectIdentityQuery Id="5" ObjectPathId="3" /><ObjectPath Id="7" ObjectPathId="6" /><ObjectIdentityQuery Id="8" ObjectPathId="6" /><ObjectPath Id="10" ObjectPathId="9" /><Query Id="11" ObjectPathId="6"><Query SelectAllProperties="true"><Properties /></Query></Query><Query Id="12" ObjectPathId="9"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="IsRoot" SelectAll="true" /><Property Name="Labels" SelectAll="true" /><Property Name="TermsCount" SelectAll="true" /><Property Name="CustomSortOrder" SelectAll="true" /><Property Name="Id" SelectAll="true" /><Property Name="Name" SelectAll="true" /><Property Name="PathOfTerm" SelectAll="true" /><Property Name="Parent" SelectAll="true" /><Property Name="LocalCustomProperties" SelectAll="true" /><Property Name="IsDeprecated" ScalarProperty="true" /><Property Name="IsAvailableForTagging" ScalarProperty="true" /></Properties></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id="0" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="3" ParentId="0" Name="GetDefaultKeywordsTermStore" /><Method Id="6" ParentId="3" Name="GetTermSet"><Parameters><Parameter Type="Guid">${termsetId}</Parameter></Parameters></Method><Method Id="9" ParentId="6" Name="GetAllTerms" /></ObjectPaths></Request>`;


      const reqHeaders = new Headers();
      reqHeaders.append("accept", "application/json");
      reqHeaders.append("content-type", "application/xml");

      const httpPostOptions: ISPHttpClientOptions = {
        headers: reqHeaders,
        body: data
      };

      return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
        return serviceResponse.json().then((serviceJSONResponse: any) => {
          const termStoreResultTermSets: ITermSet[] = serviceJSONResponse.filter(r => r['_ObjectType_'] === 'SP.Taxonomy.TermSet');

          if (termStoreResultTermSets.length > 0) {
            var termStoreResultTermSet = termStoreResultTermSets[0];
            termStoreResultTermSet.Terms = [];
            // Retrieve the term collection results
            const termStoreResultTerms: ITerms[] = serviceJSONResponse.filter(r => r['_ObjectType_'] === 'SP.Taxonomy.TermCollection');
            if (termStoreResultTerms.length > 0) {
              // Retrieve all terms
              let terms = termStoreResultTerms[0]._Child_Items_;
              // Clean the term ID and specify the path depth
              terms = terms.map(term => {
                term.CustomSortOrderIndex = (termStoreResultTermSet.CustomSortOrder) ? termStoreResultTermSet.CustomSortOrder.split(":").indexOf(this.cleanGuid(term.Id)) : -1;
                term.Id = this.cleanGuid(term.Id);
                term['PathDepth'] = term.PathOfTerm.split(';').length;
                term.TermSet = { Id: this.cleanGuid(termStoreResultTermSet.Id), Name: termStoreResultTermSet.Name };
                if (term["Parent"]) {
                  term.ParentId = this.cleanGuid(term["Parent"].Id);
                }
                return term;
              });
              // Check if the term set was not empty
              if (terms.length > 0) {
                // Sort the terms by PathOfTerm
                terms = terms.sort(this._sortTerms);
                termStoreResultTermSet.Terms = terms;
              }
            }
            return termStoreResultTermSet;
          }
          return null;
        });
      });
    }
  }


  /**
   * Get the term set ID by its name
   * @param termstore
   * @param termset
   */
  private getTermSetId(termstore: ITermStore[], termsetName: string): ITermSet {
    if (termstore && termstore.length > 0 && termsetName) {
      // Get the first term store
      const ts = termstore[0];
      // Check if the term store contains groups
      if (ts.Groups && ts.Groups._Child_Items_) {
        for (const group of ts.Groups._Child_Items_) {
          // Check if the group contains term sets
          if (group.TermSets && group.TermSets._Child_Items_) {
            for (const termSet of group.TermSets._Child_Items_) {
              // Check if the term set is found
              if (termSet.Name === termsetName) {
                return termSet;
              }
            }
          }
        }
      }
    }

    return null;
  }


  /**
   * Retrieve all terms that starts with the searchText
   * @param searchText
   */
  public searchTermsByName(searchText: string): Promise<IPickerTerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return SPTermStoreMockHttpClient.searchTermsByName(searchText);
    } else {
      return this.searchTermsByTermSet(searchText, this.props.termsetNameOrID);
    }
  }

  /**
     * Searches terms for the given term set
     * @param searchText
     * @param termsetId
     */
  private searchTermsByTermSet(searchText: string, termSet: string): Promise<IPickerTerm[]> {
    if (Environment.type === EnvironmentType.Local) {
      // If the running environment is local, load the data from the mock
      return SPTermStoreMockHttpClient.searchTermsByName(searchText);
    } else {
      return new Promise<IPickerTerm[]>(resolve => {
        this.getTermStores().then(termStore => {
          let TermSetId = termSet;
          if (!this.isGuid(termSet)) {
            // Get the ID of the provided term set name
            const crntTermSet = this.getTermSetId(termStore, termSet);
            if (crntTermSet) {
              TermSetId = this.cleanGuid(crntTermSet.Id);
            } else {
              resolve(null);
              return;
            }
          }

          let data = `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="Javascript Library"><Actions><ObjectPath Id="456" ObjectPathId="455" /><ObjectIdentityQuery Id="457" ObjectPathId="455" /><ObjectPath Id="459" ObjectPathId="458" /><ObjectIdentityQuery Id="460" ObjectPathId="458" /><ObjectPath Id="462" ObjectPathId="461" /><ObjectIdentityQuery Id="463" ObjectPathId="461" /><ObjectPath Id="465" ObjectPathId="464" /><SetProperty Id="466" ObjectPathId="464" Name="TermLabel"><Parameter Type="String">${searchText}</Parameter></SetProperty><SetProperty Id="467" ObjectPathId="464" Name="DefaultLabelOnly"><Parameter Type="Boolean">true</Parameter></SetProperty><SetProperty Id="468" ObjectPathId="464" Name="StringMatchOption"><Parameter Type="Number">0</Parameter></SetProperty><SetProperty Id="469" ObjectPathId="464" Name="ResultCollectionSize"><Parameter Type="Number">10</Parameter></SetProperty><SetProperty Id="470" ObjectPathId="464" Name="TrimUnavailable"><Parameter Type="Boolean">true</Parameter></SetProperty><ObjectPath Id="472" ObjectPathId="471" /><Query Id="473" ObjectPathId="471"><Query SelectAllProperties="false"><Properties /></Query><ChildItemQuery SelectAllProperties="false"><Properties><Property Name="IsRoot" SelectAll="true" /><Property Name="Id" SelectAll="true" /><Property Name="Name" SelectAll="true" /><Property Name="PathOfTerm" SelectAll="true" /><Property Name="TermSet" SelectAll="true" /></Properties></ChildItemQuery></Query></Actions><ObjectPaths><StaticMethod Id="455" Name="GetTaxonomySession" TypeId="{981cbc68-9edc-4f8d-872f-71146fcbb84f}" /><Method Id="458" ParentId="455" Name="GetDefaultKeywordsTermStore" /><Method Id="461" ParentId="458" Name="GetTermSet"><Parameters><Parameter Type="Guid">${TermSetId}</Parameter></Parameters></Method><Constructor Id="464" TypeId="{61a1d689-2744-4ea3-a88b-c95bee9803aa}" /><Method Id="471" ParentId="461" Name="GetTerms"><Parameters><Parameter ObjectPathId="464" /></Parameters></Method></ObjectPaths></Request>`;

          const reqHeaders = new Headers();
          reqHeaders.append("accept", "application/json");
          reqHeaders.append("content-type", "application/xml");

          const httpPostOptions: ISPHttpClientOptions = {
            headers: reqHeaders,
            body: data
          };


          return this.context.spHttpClient.post(this.clientServiceUrl, SPHttpClient.configurations.v1, httpPostOptions).then((serviceResponse: SPHttpClientResponse) => {
            return serviceResponse.json().then((serviceJSONResponse: any) => {
              // Retrieve the term collection results
              const termStoreResult: ITerms[] = serviceJSONResponse.filter(r => r['_ObjectType_'] === 'SP.Taxonomy.TermCollection');
              if (termStoreResult.length > 0) {
                // Retrieve all terms

                let terms = termStoreResult[0]._Child_Items_;

                let returnTerms: IPickerTerm[] = [];
                terms.forEach(term => {
                  if (term.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                    returnTerms.push({
                      key: this.cleanGuid(term.Id),
                      name: term.Name,
                      path: term.PathOfTerm,
                      termSet: this.cleanGuid(term.TermSet.Id),
                      termSetName: term.TermSet.Name
                    });
                  }
                });
                resolve(returnTerms);
              }
              return null;
            });
          });
        });
      });
    }
  }

  private isGuid(strGuid: string): boolean {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(strGuid);
  }

  /**
   * Sort the terms by their path
   * @param a term 2
   * @param b term 2
   */
  private _sortTerms(a: ITerm, b: ITerm) {
    if(a.CustomSortOrderIndex === -1){
      if (a.PathOfTerm < b.PathOfTerm) {
        return -1;
      }
      if (a.PathOfTerm > b.PathOfTerm) {
        return 1;
      }
      return 0;
    }else{
      if (a.CustomSortOrderIndex < b.CustomSortOrderIndex) {
        return -1;
      }
      if (a.CustomSortOrderIndex > b.CustomSortOrderIndex) {
        return 1;
      }
      return 0;
    }

  }

  /**
   * Clean the Guid from the Web Service response
   * @param guid
   */
  public cleanGuid(guid: string): string {
    if (guid !== undefined) {
      return guid.replace('/Guid(', '').replace('/', '').replace(')', '');
    } else {
      return '';
    }
  }

  /**
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getTermStoresFromMock(): Promise<ITermStore[]> {
    return SPTermStoreMockHttpClient.getTermStores(this.context.pageContext.web.absoluteUrl).then((data) => {
      return data;
    }) as Promise<ITermStore[]>;
  }

  /**
   * Returns 3 fake SharePoint lists for the Mock mode
   */
  private getAllMockTerms(): Promise<ITermSet> {
    return SPTermStoreMockHttpClient.getAllTerms().then((data) => {
      return data;
    }) as Promise<ITermSet>;
  }
}
