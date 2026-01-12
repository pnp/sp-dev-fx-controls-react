import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import '@pnp/sp/taxonomy';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';
export declare class SPTaxonomyService {
    private context;
    constructor(context: BaseComponentContext);
    getTerms(termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize?: number): Promise<{
        value: ITermInfo[];
        skiptoken: string;
    }>;
    getTermById(termSetId: Guid, termId: Guid): Promise<ITermInfo>;
    searchTerm(termSetId: Guid, label: string, languageTag: string, parentTermId?: Guid, allowSelectingChildren?: boolean, stringMatchOption?: string, pageSize?: number): Promise<ITermInfo[]>;
    getTermSetInfo(termSetId: Guid): Promise<ITermSetInfo | undefined>;
    getTermStoreInfo(): Promise<ITermStoreInfo | undefined>;
}
//# sourceMappingURL=SPTaxonomyService.d.ts.map