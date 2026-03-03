import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISearchResult } from '../models/ISearchResult';
import { ISearchSiteAssetsResult } from '../models/ISearchSiteAssetsResult';
interface IuseGraphAPI {
    searchImages: (query: string, from: number) => Promise<ISearchResult>;
    getDriveItemDownloadUrl: (driveId: string, itemId: string) => Promise<any>;
    getSiteAssetsLibrary: (site: string) => Promise<ISearchSiteAssetsResult>;
}
export declare const useGraphAPI: (context: BaseComponentContext) => IuseGraphAPI;
export {};
//# sourceMappingURL=useGrapAPI.d.ts.map