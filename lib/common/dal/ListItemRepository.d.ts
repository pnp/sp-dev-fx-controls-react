import { SPHttpClient } from '@microsoft/sp-http';
export declare class ListItemRepository {
    protected SiteUrl: string;
    protected SPClient: SPHttpClient;
    constructor(SiteUrl: string, SPClient: SPHttpClient);
    /**
     *
     * @param filterText text value of the filter part of oData query 'Id eq 1'
     * @param listId
     * @param internalColumnName
     * @param keyInternalColumnName
     * @param webUrl
     * @param top
     * @param orderBy text value of the filter part of oData query 'Title desc, Created'
     */
    getListItemsByFilterClause(filterText: string, listId: string, internalColumnName: string, keyInternalColumnName?: string, webUrl?: string, top?: number, orderBy?: string): Promise<any[]>;
    getListId(listName: string, webUrl?: string): Promise<string>;
}
//# sourceMappingURL=ListItemRepository.d.ts.map