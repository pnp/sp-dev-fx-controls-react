import { IButtonStyles } from '@fluentui/react/lib/Button';
import { ICheckboxProps, ICheckboxStyles } from '@fluentui/react/lib/Checkbox';
import { ICommandBarStyles } from '@fluentui/react/lib/CommandBar';
import { IIconStyles } from '@fluentui/react/lib/Icon';
export declare const useFileCommandBarStyles: () => {
    buttonIconStyles: IIconStyles;
    checkBoxStyles: import("@fluentui/react/lib/Utilities").IStyleFunction<ICheckboxProps, ICheckboxStyles>;
    stackContainerStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>;
    controlStyles: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        fileIconHeaderIcon: {
            padding: number;
            fontSize: string;
        };
        fileIconCell: string;
        fileIconImg: string;
        separator: string;
        separatorVertrical: string;
    }>;
    commandBarStyles: ICommandBarStyles;
    commandbarButtonStyles: IButtonStyles;
};
//# sourceMappingURL=useFileCommandBarStyles.d.ts.map