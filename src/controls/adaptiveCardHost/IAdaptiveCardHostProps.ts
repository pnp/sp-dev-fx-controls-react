import { Action, CardElement, CardObjectRegistry, HostCapabilities } from 'adaptivecards';
import { IPartialTheme, ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IAdaptiveCardHostProps {
    /**
     * Set Adaptive Card payload.
     */
    card: object;
    /**
     * Set Data Source for template rendering.
     * 
     * Example:
     *
     * ```typescript
     * {
     *    $root: {
     *        firstName: "Fabio",
     *        lastName: "Franzini",
     *        childrens: [
     *            { fullName: "Mattia Franzini", age: 1 }
     *        ]
     *    }
     * }
     * ```
     */
    data?: { "$root": object };
    /**
     * Set CSS Style.
     */
    style?: React.CSSProperties;
    /**
     * Set CSS Class.
     */
    className?: string;
    /**
     * Set Fluent UI Theme. 
     * Used only if the "themeType" property is set to 'ThemeType.SharePoint'. 
     * If not set or set to null or not defined, the theme passed through context will be searched, or the default theme of the page will be loaded.
     */
    theme?: IPartialTheme | ITheme;
    /**
     * Select the Type of Theme you want to use.
     * If it is not set or set to null or undefined, the 'ThemeType.SharePoint' value will be used and the "theme" property or the theme passed through the context or default page will be loaded. 
     * In other cases, the chosen Microsoft Teams theme will be applied.
     */
    themeType?: AdaptiveCardHostThemeType;
    /**
     * Set custom HostConfig.
     */
    hostConfig?: object;
    /**
    * Invoked every time an Action is performed.
    * @param action IAdaptiveCardActionResult object instance from current Adaptive Card.
    */
    onInvokeAction: (action: IAdaptiveCardHostActionResult) => void;
    /**
     * Invoked every time an exception occurs in the rendering phase.
     * @param error Error object instance from current Adaptive Card.
     */
    onError: (error: Error) => void;
    /**
     * Invoked to manage Elements to the current Adaptive Card instance.
     * @param registry CardObjectRegistry<CardElement> object instance from current Adaptive Card.
     */
    onSetCustomElements?: (registry: CardObjectRegistry<CardElement>) => void;
    /**
     * Invoked to manage Actions to the current Adaptive Card instance.
     * @param registry CardObjectRegistry<Action> object instance from current Adaptive Card.
     */
    onSetCustomActions?: (registry: CardObjectRegistry<Action>) => void;
    /**
     * Invoked to manage the HostCapabilities object like add custom properties.
     * @param hostCapabilities HostCapabilities object instance from current Adaptive Card.
     */
    onUpdateHostCapabilities?: (hostCapabilities: HostCapabilities) => void;
    /**
     * Set to true if you want to use only one instance of this control per page, false for multiple controls. This affects how CSS variables are set.
     */
    isUniqueControlInPage?: boolean;
}

export enum AdaptiveCardHostThemeType {
    SharePoint = 0,
    Teams = 1,
    TeamsDark = 2,
    TeamsHighContrast = 3
}

export interface IAdaptiveCardHostActionResult {
    type: string;
    title?: string;
    url?: string;
    data?: object;
    verb?: string;
}