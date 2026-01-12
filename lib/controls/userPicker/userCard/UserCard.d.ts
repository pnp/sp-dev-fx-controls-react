import * as React from 'react';
import { IUserInfo } from '../models/IUserInfo';
export interface IuserCardProps {
    userId?: string;
    showOverCard?: boolean;
    onSelected?: (user: IUserInfo) => void;
    className?: string;
    secondaryTextPropertyName?: "jobTitle" | "department" | "mail" | "officeLocation" | "mobilePhone" | "businessPhones" | "userPrincipalName";
}
export declare const UserCard: React.FunctionComponent<IuserCardProps>;
//# sourceMappingURL=UserCard.d.ts.map