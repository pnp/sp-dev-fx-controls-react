/**
 * Used to display a placeholder in case of no or temporary content. Button is optional.
 *
 */
export interface IPlaceholderProps {

  /**
   * Text description for the placeholder. Appears bellow the Icon and IconText.
   */
  description: string;
  /**
   * Icon name used for the className from the MDL2 set. Example: 'Add'.
   */
  iconName: string;
  /**
   * Heading displayed against the Icon.
   */
  iconText: string;
  /**
   * Text label to be displayed on button below the description.
   * Optional: As the button is optional.
   */
  buttonLabel?: string;
  /**
   * onConfigure handler for the button.
   * Optional: As the button is optional.
   */
  onConfigure?: () => void;
  /**
   * This className is applied to the root element of content. Use this to
   * apply custom styles to the placeholder.
   */
  contentClassName?: string;
}

export interface IPlaceholderState {
  width: number;
}
