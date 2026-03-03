import { Presence, User } from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IUserInfo } from '../models/IUserInfo';
interface IuseGraphUserAPI {
    getUserByName: (searchName: string) => Promise<User[] | undefined>;
    getUserById: (user: string) => Promise<IUserInfo | undefined>;
    getUserPresence: (userObjectId: string) => Promise<Presence | undefined>;
}
export declare const useGraphUserAPI: (context: BaseComponentContext) => IuseGraphUserAPI;
export {};
//# sourceMappingURL=useGraphUserAPI.d.ts.map