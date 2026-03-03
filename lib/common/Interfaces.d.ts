import { SPHttpClient } from '@microsoft/sp-http';
import { PageContext, SPField } from '@microsoft/sp-page-context';
import { ListViewAccessor } from "@microsoft/sp-listview-extensibility";
import { ISPField } from './SPEntities';
import { INavNodeInfo } from '@pnp/sp/navigation/types';
/**
 * Customizer context interface.
 * Can be used in different types of customizers
 */
export interface IContext {
    spHttpClient: SPHttpClient;
    pageContext: PageContext;
    listView?: ListViewAccessor | undefined;
    field?: SPField | undefined;
}
/**
 * Interface that represents dictionary of fields
 */
export interface IFields {
    [id: string]: ISPField;
}
/**
 * Parent of all props interfaces that needs context
 */
export interface IProps {
    context: IContext;
}
export interface IHubSiteData {
    headerEmphasis: string;
    hideNameInNavigation: boolean;
    isNavAudienceTargeted: boolean;
    isSameTenantInstance: boolean;
    logoFileHash: number;
    logoUrl: string;
    megaMenuEnabled: boolean;
    name: string;
    navigation: INavNodeInfo[];
    parentHubSiteId: string;
    relatedHubSiteIds: string[];
    requiresJoinApproval: boolean;
    siteDesignId: string;
    tenantInstanceId: string;
    themeKey: string;
    url: string;
    usesMetadataNavigation: boolean;
}
//# sourceMappingURL=Interfaces.d.ts.map