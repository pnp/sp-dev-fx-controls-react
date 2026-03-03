import * as React from 'react';
import { Autofill, BasePicker, IBasePickerProps, IPickerItemProps } from '@fluentui/react/lib/Pickers';
import { IPickerTerm, IPickerTerms } from './ITermPicker';
import { ITaxonomyPickerProps } from './ITaxonomyPicker';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { LegacyRef } from 'react';
export declare class TermBasePicker extends BasePicker<IPickerTerm, IBasePickerProps<IPickerTerm>> {
}
export interface ITermPickerState {
    terms: IPickerTerms;
    elRef?: LegacyRef<TermBasePicker> & LegacyRef<any>;
}
export interface ITermPickerProps {
    termPickerHostProps: ITaxonomyPickerProps;
    context: BaseComponentContext;
    disabled: boolean;
    value: IPickerTerms;
    allowMultipleSelections: boolean;
    isTermSetSelectable?: boolean;
    disabledTermIds?: string[];
    disableChildrenOfDisabledParents?: boolean;
    placeholder?: string;
    /** Called when text is in the input field and the enter key is pressed.  */
    onNewTerm?: (newLabel: string) => void;
    onChanged: (items: IPickerTerm[]) => void;
    onInputChange: (input: string) => string;
    onBlur: (ev: React.FocusEvent<HTMLElement | Autofill>) => void;
}
export default class TermPicker extends React.Component<ITermPickerProps, ITermPickerState> {
    private allTerms;
    private termsService;
    /**
     * Constructor method
     */
    constructor(props: ITermPickerProps);
    /**
     * componentWillReceiveProps method
     */
    UNSAFE_componentWillReceiveProps(nextProps: ITermPickerProps): void;
    /**
     * Renders the item in the picker
     */
    protected onRenderItem(term: IPickerItemProps<IPickerTerm>): JSX.Element;
    /**
     * Renders the suggestions in the picker
     */
    protected onRenderSuggestionsItem(term: IPickerTerm): JSX.Element;
    /**
     * When Filter Changes a new search for suggestions
     */
    private onFilterChanged;
    /**
     * gets the text from an item
     */
    private onGetTextFromItem;
    /**
     * Render method
     */
    render(): JSX.Element;
}
//# sourceMappingURL=TermPicker.d.ts.map