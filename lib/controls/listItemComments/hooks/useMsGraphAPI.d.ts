import { IUsersResults } from "../models/IUsersResults";
interface returnObject {
    getUsers: (search: string) => Promise<IUsersResults>;
    getUsersNextPage: (nextLink: string) => Promise<IUsersResults>;
    getSuggestions: () => Promise<IUsersResults>;
}
export declare const useMsGraphAPI: () => returnObject;
export {};
//# sourceMappingURL=useMsGraphAPI.d.ts.map