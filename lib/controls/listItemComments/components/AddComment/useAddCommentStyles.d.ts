import { IDocumentCardStyles } from "@fluentui/react/lib/DocumentCard";
import { IStyle } from "@fluentui/react/lib/Styling";
export declare const useAddCommentStyles: () => {
    documentCardUserStyles: Partial<IDocumentCardStyles>;
    deleteButtonContainerStyles: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    reactMentionStyles: {
        control: IStyle;
        "&multiLine": {
            control: IStyle;
            highlighter: IStyle;
            input: IStyle;
        };
        "&singleLine": {
            display: string;
            height: number;
            outlineColor: string;
            border: string;
            highlighter: {
                padding: number;
                border: string;
            };
            input: {
                padding: number;
                width: string;
                borderRadius: number;
                border: string;
            };
        };
        suggestions: {
            list: {
                backgroundColor: string;
                border: string;
                fontSize: number;
            };
            item: {
                padding: string;
                borderBottom: string;
                borderBottomColor: string;
                "&focused": {
                    backgroundColor: string;
                };
            };
        };
    };
    itemContainerStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>;
    searchMentionContainerStyles: Partial<import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>>;
    mentionsClasses: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        mention: IStyle;
    }>;
    componentClasses: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        container: IStyle;
    }>;
};
//# sourceMappingURL=useAddCommentStyles.d.ts.map