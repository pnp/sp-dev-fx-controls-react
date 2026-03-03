import { BaseComponentContext } from '@microsoft/sp-component-base';
export interface ISite {
    /**
     * ID of the site
     */
    id?: string;
    /**
     * Title
     */
    title?: string;
    /**
    * Base URL
    */
    url?: string;
    /**
     * ID of the web
     */
    webId?: string;
    /**
     * ID of the hub site
     */
    hubSiteId?: string;
}
export interface ISiteWebInfo {
    title: string;
    webId: string;
    siteId: string;
}
export declare const getAllSites: (ctx: BaseComponentContext, includeWebs: boolean, currentSiteCollectionOnly: boolean, trimDuplicates: boolean, additionaQuery?: string | undefined) => Promise<ISite[]>;
export declare const getHubSites: (ctx: BaseComponentContext) => Promise<ISite[]>;
export declare const getSiteWebInfo: (ctx: BaseComponentContext, webUrl: string) => Promise<ISiteWebInfo>;
export declare const getAssociatedSites: (ctx: BaseComponentContext, trimDuplicates: boolean, hubSiteId?: string) => Promise<ISite[]>;
//# sourceMappingURL=SPSitesService.d.ts.map