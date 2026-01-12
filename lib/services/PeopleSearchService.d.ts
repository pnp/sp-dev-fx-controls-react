import "@pnp/sp/site-users/web";
import "@pnp/sp/sputilities";
import "@pnp/sp/webs";
import { IPeoplePickerContext, IPeoplePickerUserItem, PrincipalType } from "../PeoplePicker";
/**
 * Service implementation to search people in SharePoint
 */
export default class SPPeopleSearchService {
    private context;
    private substrateSearchEnabled;
    private cachedLocalUsers;
    /**
     * Service constructor
     */
    constructor(context: IPeoplePickerContext, substrateSearchEnabled: boolean);
    /**
     * Generate the user photo link using SharePoint user photo endpoint.
     *
     * @param value
     */
    generateUserPhotoLink(value: string): string;
    /**
     * Generate sum of principal types
     *
     * PrincipalType controls the type of entities that are returned in the results.
     * Choices are All - 15, Distribution List - 2 , Security Groups - 4, SharePoint Groups - 8, User - 1.
     * These values can be combined (example: 13 is security + SP groups + users)
     *
     * @param principalTypes
     */
    getSumOfPrincipalTypes(principalTypes: PrincipalType[]): number;
    /**
     * Retrieve the specified group
     *
     * @param groupName
     * @param siteUrl
     */
    getGroupId(groupName: string, siteUrl?: string): Promise<number | undefined>;
    /**
     * Search person by its email or login name
     */
    searchPersonByEmailOrLogin(email: string, principalTypes: PrincipalType[], siteUrl?: string, groupId?: number | string | (string | number)[], ensureUser?: boolean, allowUnvalidated?: boolean): Promise<IPeoplePickerUserItem>;
    /**
     * Search All Users from the SharePoint People database
     */
    searchPeople(query: string, maximumSuggestions: number, principalTypes: PrincipalType[], siteUrl?: string, groupId?: number | string | (string | number)[], ensureUser?: boolean, allowUnvalidated?: boolean): Promise<IPeoplePickerUserItem[]>;
    /**
     * Tenant search
     */
    private searchTenant;
    /**
     * Retrieves the local user ID
     *
     * @param userId
     * @param siteUrl
     */
    private ensureUser;
    /**
     * Generates Initials from a full name
     */
    private getFullNameInitials;
}
//# sourceMappingURL=PeopleSearchService.d.ts.map