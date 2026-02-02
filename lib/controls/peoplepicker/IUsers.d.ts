export interface IUsers {
    '@odata.context': string;
    value: IUserInfo[];
}
export interface IUserInfo {
    '@odata.type': string;
    '@odata.id': string;
    '@odata.editLink': string;
    Id: number;
    IsHiddenInUI: boolean;
    LoginName: string;
    Title: string;
    PrincipalType: number;
    Email: string;
    IsEmailAuthenticationGuestUser: boolean;
    IsShareByEmailGuestUser: boolean;
    IsSiteAdmin: boolean;
    UserId?: UserId;
}
export interface UserId {
    NameId: string;
    NameIdIssuer: string;
}
//# sourceMappingURL=IUsers.d.ts.map