import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerStyles } from '@fluentui/react/lib/Pickers';
import { IPeoplePickerContext, PrincipalType } from ".";
/**
 * Used to display a placeholder in case of no or temporary content. Button is optional.
 *
 */
export interface IPeoplePickerProps {
    /**
     * Context of the component
     */
    context: IPeoplePickerContext;
    /**
     * Text of the Control
     */
    titleText?: string;
    /**
     * Web Absolute Url of source site. When this is provided, a search request is done to the local site.
     */
    webAbsoluteUrl?: string;
    /**
     * Whether the control is enabled or not
     */
    disabled?: boolean;
    /**
     * Name of SharePoint Group
     */
    groupName?: string;
    /**
     * Id of SharePoint Group (Number) or Office365 Group (String)
     */
    groupId?: number | string | (string | number)[];
    /**
     * Maximum number of suggestions to show in the full suggestion list. (default: 5)
     */
    suggestionsLimit?: number;
    /**
     * Specifies the minimum character count needed to begin retrieving search results. (default : 2)
     */
    searchTextLimit?: number;
    /**
     * Specify the user / group types to retrieve
     */
    resolveDelay?: number;
    /**
     * Selection Limit of Control
     */
    personSelectionLimit?: number;
    /**
     * Show or Hide Tooltip
     */
    showtooltip?: boolean;
    /**
     * People Field is mandatory
     */
    required?: boolean;
    /**
     * Static error message displayed below the picker. Use onGetErrorMessage to dynamically change the error message displayed (if any) based on the current value. errorMessage and onGetErrorMessage are mutually exclusive (errorMessage takes precedence).
     */
    errorMessage?: string;
    /**
     * The method is used to get the validation error message and determine whether the picker value is valid or not.
     * Mutually exclusive with the static string errorMessage (it will take precedence over this).
     *
     *   When it returns string:
     *   - If valid, it returns empty string.
     *   - If invalid, it returns the error message string and the picker will
     *     show an error message below the picker.
     *
     *   When it returns Promise<string>:
     *   - The resolved value is display as error message.
     *   - The rejected, the value is thrown away.
     *
     */
    onGetErrorMessage?: (items: IPersonaProps[]) => string | Promise<string>;
    /**
     * Prop to validate contents on blur
     */
    validateOnFocusOut?: boolean;
    /**
     * Method to check value of People Picker text
     */
    onChange?: (items: IPersonaProps[]) => void;
    /**
     * Tooltip Message
     */
    tooltipMessage?: string;
    /**
     * Directional Hint of tool tip
     */
    tooltipDirectional?: DirectionalHint;
    /**
     * Class Name for the whole People picker control
     */
    peoplePickerWPclassName?: string;
    /**
     * Class Name for the People picker control
     */
    peoplePickerCntrlclassName?: string;
    /**
     * Class Name for the Error Section
     */
    errorMessageClassName?: string;
    /**
     * Default Selected User Emails
     */
    defaultSelectedUsers?: string[];
    /**
     * @deprecated
     * Show users which are hidden from the UI
     */
    showHiddenInUI?: boolean;
    /**
     * Specify the user / group types to retrieve
     */
    principalTypes?: PrincipalType[];
    /**
     * When ensure user property is true, it will return the local user ID on the current site when doing a tenant wide search
     */
    ensureUser?: boolean;
    /**
     * When true, allow email addresses that have not been validated to be entered, effectively allowing any user
     */
    allowUnvalidated?: boolean;
    /**
     * Placeholder to be displayed in an empty term picker
     */
    placeholder?: string;
    /**
     * styles to apply on control
     */
    styles?: Partial<IBasePickerStyles>;
    /**
     * Define a filter to be applied to the search results, such as a filter to only show users from a specific domain
     */
    resultFilter?: (result: IPersonaProps[]) => IPersonaProps[];
    /**
     * When `true`, performs a wider search using Microsoft 365 Substrate
     */
    useSubstrateSearch?: boolean;
}
export interface IPeoplePickerUserItem {
    /**
     * LoginName or Id of the principal in the site.
     */
    id: string;
    /**
     * LoginName of the principal.
     */
    loginName: string;
    imageUrl: string;
    imageInitials: string;
    text: string;
    secondaryText: string;
    tertiaryText: string;
    optionalText: string;
    userUnvalidated?: boolean;
}
//# sourceMappingURL=IPeoplePicker.d.ts.map