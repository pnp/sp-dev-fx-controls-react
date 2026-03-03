import * as React from 'react';
export interface IUserProps {
    userId: string;
    onRemove?: (userId: string) => void;
    secondaryTextPropertyName?: "jobTitle" | "department" | "mail" | "officeLocation" | "mobilePhone" | "businessPhones" | "userPrincipalName";
}
export declare const User: React.FunctionComponent<IUserProps>;
//# sourceMappingURL=User.d.ts.map