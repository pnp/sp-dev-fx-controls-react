import { IDocumentCardStyles } from "@fluentui/react/lib/DocumentCard";
import { IStackStyles } from "@fluentui/react/lib/Stack";
import { IButtonStyles } from '@fluentui/react';
interface returnObjectStyles {
    itemContainerStyles: IStackStyles;
    buttonsContainerStyles: Partial<IStackStyles>;
    userListContainerStyles: Partial<IStackStyles>;
    renderUserContainerStyles: Partial<IStackStyles>;
    documentCardStyles: Partial<IDocumentCardStyles>;
    documentCardDeleteStyles: Partial<IDocumentCardStyles>;
    documentCardHighlightedStyles: Partial<IDocumentCardStyles>;
    documentCardUserStyles: Partial<IDocumentCardStyles>;
    configurationListClasses: any;
    contentStyles: any;
    iconButtonStyles: Partial<IButtonStyles>;
}
export declare const useListItemCommentsStyles: () => returnObjectStyles;
export {};
//# sourceMappingURL=useListItemCommentsStyles.d.ts.map