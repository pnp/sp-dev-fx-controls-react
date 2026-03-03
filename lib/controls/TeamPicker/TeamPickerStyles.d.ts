import { IButtonStyles } from "@fluentui/react/lib/Button";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IBasePickerStyles } from "@fluentui/react/lib/Pickers";
export declare const useTeamPickerStyles: (themeVariant: IReadonlyTheme | undefined) => {
    componentClasses: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        eventCircleColor: string;
        separator: string;
        filePickerButtonStyles: string;
        iconStyles: {
            paddingLeft: number;
            fontWeight: number;
            color: string;
        };
    }>;
    pickerStylesMulti: Partial<IBasePickerStyles>;
    pickerStylesSingle: Partial<IBasePickerStyles>;
    renderItemStylesSingle: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    renderItemStylesMulti: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    renderIconButtonRemoveStyles: Partial<IButtonStyles>;
};
//# sourceMappingURL=TeamPickerStyles.d.ts.map