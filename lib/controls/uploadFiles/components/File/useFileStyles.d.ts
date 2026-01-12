import { ICheckboxProps, ICheckboxStyles } from '@fluentui/react/lib/Checkbox';
import { IDocumentCardImageStyles, IDocumentCardStyles } from '@fluentui/react/lib/DocumentCard';
export declare const useFileStyles: () => {
    documentCardCompactStyles: IDocumentCardStyles;
    checkBoxStyles: import("@fluentui/react/lib/Utilities").IStyleFunction<ICheckboxProps, ICheckboxStyles>;
    documentCardStyles: IDocumentCardStyles;
    stackCheckboxStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Stack").IStackSlots>;
    fileNameStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Text").ITextSlots>;
    nameStyles: import("@fluentui/foundation-legacy").IComponentStyles<import("@fluentui/react/lib/Text").ITextSlots>;
    documentImageStyles: Partial<IDocumentCardImageStyles>;
    controlStyles: import("@fluentui/react/lib/Styling").IProcessedStyleSet<{
        ".ms-Checkbox-text": {
            color: string;
        };
    }>;
};
//# sourceMappingURL=useFileStyles.d.ts.map