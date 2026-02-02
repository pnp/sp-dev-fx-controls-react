import * as React from "react";
interface IPopUpMenuProps {
    isOpen: boolean;
    searchValue: string;
    onDismiss: (open?: boolean) => void;
    containerRef: React.MutableRefObject<HTMLDivElement>;
    secondaryTextPropertyName?: "jobTitle" | "department" | "mail" | "officeLocation" | "mobilePhone" | "businessPhones" | "userPrincipalName";
}
export declare const PopUpMenu: (props: IPopUpMenuProps) => JSX.Element;
export {};
//# sourceMappingURL=PopUpMenu.d.ts.map