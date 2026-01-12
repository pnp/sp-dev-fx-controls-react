import * as React from "react";
import { Selection } from "@fluentui/react";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { Guid } from "@microsoft/sp-core-library";
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from "@pnp/sp/taxonomy";
export interface ITaxonomyTreeProps {
    allowMultipleSelections?: boolean;
    pageSize: number;
    onLoadMoreData: (termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize?: number) => Promise<{
        value: ITermInfo[];
        skiptoken: string;
    }>;
    anchorTermInfo?: ITermInfo;
    termSetInfo: ITermSetInfo;
    termStoreInfo: ITermStoreInfo;
    languageTag: string;
    themeVariant?: IReadonlyTheme;
    onRenderActionButton?: (termStoreInfo: ITermStoreInfo, termSetInfo: ITermSetInfo, termInfo: ITermInfo, updateTaxonomyTreeViewCallback?: (newTermItems?: ITermInfo[], parentTerm?: ITermInfo[], //only for adding new terms
    updatedTermItems?: ITermInfo[], deletedTermItems?: ITermInfo[]) => void) => JSX.Element;
    terms: ITermInfo[];
    setTerms: React.Dispatch<React.SetStateAction<ITermInfo[]>>;
    selection?: Selection<any>;
    hideDeprecatedTerms?: boolean;
    showIcons?: boolean;
    allowSelectingChildren?: boolean;
}
export declare function TaxonomyTree(props: ITaxonomyTreeProps): React.ReactElement<ITaxonomyTreeProps>;
//# sourceMappingURL=TaxonomyTree.d.ts.map