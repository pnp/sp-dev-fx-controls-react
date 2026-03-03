import { MSGraphClientFactory, SPHttpClient } from "@microsoft/sp-http";
/**
 * Context for the PeoplePicker control
 */
export interface IPeoplePickerContext {
    /**
     * Current `SPWeb` absolute URL.
     */
    absoluteUrl: string;
    /**
     * Instance of MSGraphClientFactory used for querying Microsoft Graph REST API.
     */
    msGraphClientFactory: MSGraphClientFactory;
    /**
     * Instance of SPHttpClient used for querying SharePoint REST API.
     */
    spHttpClient: SPHttpClient;
}
//# sourceMappingURL=IPeoplePickerContext.d.ts.map