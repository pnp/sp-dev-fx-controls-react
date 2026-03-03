import React from 'react';
import { IModernTermPickerProps, ITermItemProps } from './ModernTermPicker.types';
import { ITermInfo } from '@pnp/sp/taxonomy';
import { BasePicker, ISuggestionItemProps } from '@fluentui/react/lib/Pickers';
export declare class ModernTermPickerBase extends BasePicker<ITermInfo, IModernTermPickerProps> {
    static defaultProps: {
        onRenderItem: (props: ITermItemProps) => JSX.Element;
        onRenderSuggestionsItem: (props: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
    };
    constructor(props: IModernTermPickerProps);
}
export declare const ModernTermPicker: React.FunctionComponent<IModernTermPickerProps>;
//# sourceMappingURL=ModernTermPicker.d.ts.map