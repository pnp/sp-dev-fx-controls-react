import { BaseComponentContext, IReadonlyTheme } from '@microsoft/sp-component-base';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';
import { ISuggestionItemProps } from '@fluentui/react/lib/Pickers';
import { IModernTermPickerProps, ITermItemProps } from './modernTermPicker/ModernTermPicker.types';
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export interface IModernTaxonomyPickerProps {
    allowMultipleSelections?: boolean;
    isPathRendered?: boolean;
    termSetId: string;
    anchorTermId?: string;
    panelTitle: string;
    label: string;
    context: BaseComponentContext;
    initialValues?: Optional<ITermInfo, "childrenCount" | "createdDateTime" | "lastModifiedDateTime" | "descriptions" | "customSortOrder" | "properties" | "localProperties" | "isDeprecated" | "isAvailableForTagging" | "topicRequested">[];
    disabled?: boolean;
    required?: boolean;
    onChange?: (newValue?: ITermInfo[]) => void;
    onRenderItem?: (itemProps: ITermItemProps) => JSX.Element;
    onRenderSuggestionsItem?: (term: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
    placeHolder?: string;
    customPanelWidth?: number;
    themeVariant?: IReadonlyTheme;
    termPickerProps?: Optional<IModernTermPickerProps, 'onResolveSuggestions'>;
    isLightDismiss?: boolean;
    isBlocking?: boolean;
    onRenderActionButton?: (termStoreInfo: ITermStoreInfo, termSetInfo: ITermSetInfo, termInfo?: ITermInfo) => JSX.Element;
    allowSelectingChildren?: boolean;
}
export declare function ModernTaxonomyPicker(props: IModernTaxonomyPickerProps): JSX.Element;
//# sourceMappingURL=ModernTaxonomyPicker.d.ts.map