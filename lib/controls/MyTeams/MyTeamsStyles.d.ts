import { IButtonStyles } from "@fluentui/react/lib/Button";
import { IStackTokens } from "@fluentui/react/lib/Stack";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
export declare const getMyTeamsStyles: (themeVariant: IReadonlyTheme) => {
    titleStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Text").ITextSlots>;
    stackStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>;
    stackTokens: IStackTokens;
    styleClasses: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        webPartTitle: {
            marginBottom: number;
        };
        separator: string;
        styleIcon: string;
        teamsContainer: string;
        teamContainer: string;
    }>;
    commentTextStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Text").ITextSlots>;
    showHideButtonStyles: Partial<IButtonStyles>;
};
//# sourceMappingURL=MyTeamsStyles.d.ts.map