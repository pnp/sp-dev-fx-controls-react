export interface IUsersResults {
    users: IUserInfo[];
    hasMore?: boolean;
    nextLink?: string;
}
export interface IUserInfo {
    displayName: string;
    givenName?: string;
    mail: string;
    userPrincipalName?: string;
    id: string;
}
//# sourceMappingURL=IUsersResults.d.ts.map