import { ITermStore, ITerm, ITermSet } from './ISPTermStorePickerService';
import { IPickerTerm } from '../controls/taxonomyPicker/ITermPicker';
/**
* Defines a http client to request mock data to use the web part with the local workbench
*/
export default class SPTermStoreMockHttpClient {
    /**
    * Mock SharePoint result sample
    */
    private static _mockTermStores;
    private static _mockTerms;
    private static _mockTermCollection;
    /**
     * Mock method which returns mock terms stores
     */
    static getTermStores(restUrl: string, options?: any): Promise<ITermStore[]>;
    /**
     * Mock method wich returns mock terms
     */
    static getAllTerms(): Promise<ITermSet>;
    /**
     * Mock method wich returns mock terms
     */
    static getAllTermsByAnchorId(): Promise<ITerm[]>;
    static searchTermsByName(searchText: string): Promise<IPickerTerm[]>;
}
//# sourceMappingURL=SPTermStorePickerMockService.d.ts.map