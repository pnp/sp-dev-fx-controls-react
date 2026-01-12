/**
 * DISCLAIMER
 *
 * As there is not yet an OData end-point for managed metadata, this service makes use of the ProcessQuery end-points.
 * The service will get updated once the APIs are in place for managing managed metadata.
 */
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ITaxonomyPickerProps } from '../controls/taxonomyPicker/ITaxonomyPicker';
import { IPickerTerm } from '../controls/taxonomyPicker/ITermPicker';
import { ITermStore, ITermSet } from './ISPTermStorePickerService';
/**
 * Service implementation to manage term stores in SharePoint
 */
export default class SPTermStorePickerService {
    private props;
    private context;
    private taxonomySession;
    private formDigest;
    private clientServiceUrl;
    private suggestionServiceUrl;
    /**
     * Service constructor
     */
    constructor(props: ITaxonomyPickerProps, context: BaseComponentContext);
    getTermLabels(termId: string): Promise<string[]>;
    /**
     * Gets the collection of term stores in the current SharePoint env
     */
    getTermStores(): Promise<ITermStore[]>;
    /**
     * Gets the current term set
     */
    getTermSet(): Promise<ITermSet>;
    /**
     * Retrieve all terms for the given term set
     * @param termset
     */
    getAllTerms(termset: string, hideDeprecatedTags?: boolean, hideTagsNotAvailableForTagging?: boolean, useSessionStorage?: boolean): Promise<ITermSet>;
    /**
     * Get the term set ID by its name
     * @param termstore
     * @param termset
     */
    private getTermSetId;
    /**
     * Retrieve all terms that starts with the searchText
     * @param searchText
     */
    searchTermsByName(searchText: string): Promise<IPickerTerm[]>;
    private getTermsById;
    private searchTermsBySearchText;
    searchTermsByTermId(searchText: string, termId: string): Promise<IPickerTerm[]>;
    /**
     * Retrieve all terms for the given term set and anchorId
     */
    getAllTermsByAnchorId(termsetNameOrID: string, anchorId: string, hideDeprecatedTags?: boolean, hideTagsNotAvailableForTagging?: boolean, useSessionStorage?: boolean): Promise<IPickerTerm[]>;
    /**
       * Searches terms for the given term set
       * @param searchText
       * @param termsetId
       */
    private searchTermsByTermSet;
    private isGuid;
    /**
     * Sorting terms based on their path and depth
     *
     * @param terms
     */
    private sortTerms;
    /**
     * Sort the terms by their path
     *
     * @param a term 2
     * @param b term 2
     */
    private sortTermByPath;
    /**
     * Clean the Guid from the Web Service response
     * @param guid
     */
    cleanGuid(guid: string): string;
    private convertTermToPickerTerm;
    private convertSuggestTermToPickerTerm;
}
//# sourceMappingURL=SPTermStorePickerService.d.ts.map