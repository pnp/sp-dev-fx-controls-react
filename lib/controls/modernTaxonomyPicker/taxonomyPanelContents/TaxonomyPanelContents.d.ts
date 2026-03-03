import * as React from 'react';
import { IPickerItemProps, ISuggestionItemProps } from '@fluentui/react';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';
import { Guid } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IModernTermPickerProps } from '../modernTermPicker/ModernTermPicker.types';
import { Optional } from '../ModernTaxonomyPicker';
export interface ITaxonomyPanelContentsProps {
    allowMultipleSelections?: boolean;
    pageSize: number;
    selectedPanelOptions: ITermInfo[];
    setSelectedPanelOptions: React.Dispatch<React.SetStateAction<ITermInfo[]>>;
    onResolveSuggestions: (filter: string, selectedItems?: ITermInfo[]) => ITermInfo[] | PromiseLike<ITermInfo[]>;
    onLoadMoreData: (termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize?: number) => Promise<{
        value: ITermInfo[];
        skiptoken: string;
    }>;
    anchorTermInfo: ITermInfo;
    termSetInfo: ITermSetInfo;
    termStoreInfo: ITermStoreInfo;
    placeHolder: string;
    onRenderSuggestionsItem?: (props: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
    onRenderItem?: (props: IPickerItemProps<ITermInfo>) => JSX.Element;
    getTextFromItem: (item: ITermInfo, currentValue?: string) => string;
    languageTag: string;
    themeVariant?: IReadonlyTheme;
    termPickerProps?: Optional<IModernTermPickerProps, 'onResolveSuggestions'>;
    onRenderActionButton?: (termStoreInfo: ITermStoreInfo, termSetInfo: ITermSetInfo, termInfo: ITermInfo, updateTaxonomyTreeViewCallback?: (newTermItems?: ITermInfo[], updatedTermItems?: ITermInfo[], deletedTermItems?: ITermInfo[]) => void) => JSX.Element;
    allowSelectingChildren?: boolean;
}
export declare function TaxonomyPanelContents(props: ITaxonomyPanelContentsProps): React.ReactElement<ITaxonomyPanelContentsProps>;
//# sourceMappingURL=TaxonomyPanelContents.d.ts.map