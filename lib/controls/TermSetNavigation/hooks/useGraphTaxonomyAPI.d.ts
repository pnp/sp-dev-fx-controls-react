import { TermStore } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';
interface IGraphTaxonomyAPI {
    getTermSetChildren: (siteId: string, termSetId: string, refreshCache: boolean) => Promise<TermStore.Term[]>;
    getTermChildren: (siteId: string, termSetId: string, termId: string, refreshCache: boolean) => Promise<TermStore.Term[]>;
    getTermSets: (siteId: string, query?: string, refreshCache?: boolean) => Promise<TermStore.Set[]>;
    getTermSet: (siteId: string, termSetId: string, refreshCache?: boolean) => Promise<TermStore.Set>;
}
export declare const useGraphTaxonomyAPI: (context: BaseComponentContext) => IGraphTaxonomyAPI;
export {};
//# sourceMappingURL=useGraphTaxonomyAPI.d.ts.map