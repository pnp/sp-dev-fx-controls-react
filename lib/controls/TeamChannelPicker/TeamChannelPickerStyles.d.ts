import { IBasePickerStyles } from "@fluentui/react/lib/Pickers";
import { IButtonStyles } from "@fluentui/react/lib/Button";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
export declare const useTeamChannelPickerStyles: (themeVariant: IReadonlyTheme | undefined) => {
    renderIconButtonRemoveStyles: Partial<IButtonStyles>;
    pickerStyles: Partial<IBasePickerStyles>;
    renderItemStylesSingle: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    renderItemStylesMulti: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    pickerStylesMulti: Partial<IBasePickerStyles>;
    pickerStylesSingle: Partial<IBasePickerStyles>;
    componentClasses: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        separator: string;
        iconChannelItemStyles: {
            fontSize: number;
            color: string;
        };
        iconChannelInfoStyles: {
            fontSize: number;
            color: string;
        };
    }>;
};
//# sourceMappingURL=TeamChannelPickerStyles.d.ts.map