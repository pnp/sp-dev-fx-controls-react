import { INavLink } from '@fluentui/react';
import { TermStore } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';
export declare const useTaxonomyUtils: (context: BaseComponentContext) => {
    createItems: (siteId: string, termSetId: string, terms: TermStore.Term[], level: number, refreshCache: boolean) => Promise<INavLink[]>;
    createChildren: (siteId: string, termSetId: string, term: TermStore.Term, level: number, refreshCache: boolean) => Promise<INavLink[]>;
};
//# sourceMappingURL=useTaxonomyUtils.d.ts.map