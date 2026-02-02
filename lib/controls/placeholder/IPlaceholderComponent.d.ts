/// <reference types="react" />
import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';
/**
 * Used to display a placeholder in case of no or temporary content. Button is optional.
 *
 */
export interface IPlaceholderProps {
    /**
     * Text description or component for the placeholder. Appears bellow the Icon and IconText.
     */
    description: string | ((defaultClassNames: string) => React.ReactElement);
    /**
     * Icon name used for the className from the MDL2 set. Example: 'Add'.
     */
    iconName: string;
    /**
     * Heading displayed against the Icon.
     */
    iconText: string | ((defaultClassNames: string) => React.ReactElement);
    /**
     * Text label to be displayed on button below the description.
     * Optional: As the button is optional.
     */
    buttonLabel?: string;
    /**
     * This className is applied to the root element of content. Use this to
     * apply custom styles to the placeholder.
     */
    contentClassName?: string;
    /**
     * Specify if you want to hide the config button
     */
    hideButton?: boolean;
    /**
     * onConfigure handler for the button.
     * Optional: As the button is optional.
     */
    onConfigure?: () => void;
    /**
     * Set Fluent UI Theme.
     * If not set or set to null or not defined, the theme passed through context will be used, or the default theme of the page will be loaded.
     */
    theme?: IPartialTheme | ITheme;
}
export interface IPlaceholderState {
    width: number;
}
//# sourceMappingURL=IPlaceholderComponent.d.ts.map