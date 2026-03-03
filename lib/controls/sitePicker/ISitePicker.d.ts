import { IDropdownStyles } from '@fluentui/react';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISite } from '../../services/SPSitesService';
export interface ISitePickerProps {
    /**
     * Site picker label
     */
    label?: string;
    /**
     * Specify if the control needs to be disabled
     */
    disabled?: boolean;
    /**
     * Web Part context
     */
    context: BaseComponentContext;
    /**
     * Intial data to load in the 'Selected sites' area (optional)
     */
    initialSites?: ISite[];
    /**
    * used to update the sites currently Selected in the contol
    */
    selectedSites?: ISite[];
    /**
     * Define if you want to allow multi site selection. True by default.
     */
    multiSelect?: boolean;
    /**
     * Defines what entities are available for selection: site collections, sites, hub sites, sites inside hub.
     */
    mode?: 'site' | 'web' | 'hub' | 'associatedsites';
    /**
     * Specifies if the options should be limited by the current site collections. Taken into consideration if selectionMode is set to 'web'
     */
    limitToCurrentSiteCollection?: boolean;
    /**
     * Specifies if search box is displayed for the component. Default: true
     */
    allowSearch?: boolean;
    /**
     * Specifices if the list is sorted by title or url. Default: title
     */
    orderBy?: 'title' | 'url';
    /**
     * Specifies if the list is sorted in descending order. Default: false
     */
    isDesc?: boolean;
    /**
     * Selection change handler
     */
    onChange: (selectedSites: ISite[]) => void;
    /**
     * Input placeholder text. Displayed until option is selected.
     */
    placeholder?: string;
    /**
     * Search input placeholder text. Displayed until search text is entered.
     */
    searchPlaceholder?: string;
    /**
     * The list will be filtered after users stop typing for `deferredSearchTime` milliseconds.
     * Default value is 200.
     */
    deferredSearchTime?: number;
    /**
     * If provided, additional class name to provide on the dropdown element.
     */
    className?: string;
    /**
     * Specifies if the duplicates should be trimmed. false by default.
     * Applicable if mode is set to site or web.
     */
    trimDuplicates?: boolean;
    /**
     * If provided will be added to the search query as AND part.
     * Applicable if mode is set to site or web.
     */
    additionalQuery?: string;
    /**
     * If provided will be used in the search for all sites in a hub.
     * Applicable if mode is set to associatedsites.
     * If mode is set to associatedsites and no hubsiteId is provided, the current site's hub ID will be used.
     */
    hubsiteId?: string;
    styles?: IDropdownStyles;
}
export { ISite };
//# sourceMappingURL=ISitePicker.d.ts.map