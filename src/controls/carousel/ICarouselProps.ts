import { ICssInput } from "@uifabric/utilities/lib";

/**
 * Provides options for carousel buttons location.
 */
export enum CarouselButtonsLocation {
  top = 1,
  center,
  bottom
}
/**
 * Provides options for carousel buttons display mode.
 */
export enum CarouselButtonsDisplay {
  /**
   * Reserves space for buttons on both sides of the control.
   */
  block = 1,
  /**
   * Only icon buttons are displayed.
   */
  buttonsOnly,
  /**
   * Buttons are not displayed. They appear onhover event.
   */
  hidden
}

export interface ICarouselProps {
  /**
   * Specifies the initial index of the element to be displayed.
   */
  startIndex?: number;
  /**
   * Indicates if infinite scrolling is enabled.
   */
  isInfinite?: boolean;
  /**
   * Property indicates if the next item button can be clicked. If not provided, status of the button is calculated based on the current index.
   * It is mandatory when triggerPageEvent is used.
   */
  canMoveNext?: boolean;
  /**
   * Property indicates if the previous item button can be clicked. If not provided, status of the button is calculated based on the current index.
   * It is mandatory when triggerPageEvent is used.
   */
  canMovePrev?: boolean;

  /**
   * Specifies the location of the buttons inside the container.
   */
  buttonsLocation: CarouselButtonsLocation;
  /**
   * Specifies the buttons container display mode.
   */
  buttonsDisplay: CarouselButtonsDisplay;

  /**
   * Allows to specify own styles for carousel container.
   */
  containerStyles?: ICssInput;
  /**
   * Allows to specify own styles for loading component.
   */
  loadingComponentContainerStyles?: ICssInput;
  /**
   * Allows to specify own styles for elements container.
   */
  contentContainerStyles?: ICssInput;
  /**
   * Allows to specify own styles for buttons container.
   */
  containerButtonsStyles?: ICssInput;
  /**
   * Allows to specify own styles for previous item button.
   */
  prevButtonStyles?: ICssInput;
  /**
   * Allows to specify own styles for next item button.
   */
  nextButtonStyles?: ICssInput;

  /**
   * Name of the icon to be used for PreviousItem button. Default 'ChevronLeft'.
   */
  prevButtonIconName?: string;
  /**
   * Name of the icon to be used for NextItem button. Default 'ChevronRight'.
   */
  nextButtonIconName?: string;
  /**
   * Triggers parent control to provide new element to be displayed. After the method is executed, carousel control switches to processing mode and loadingComponent is displayed.
   */
  triggerPageEvent? : (index: number) => void;
  /**
   * Fixed array of elemenets to be displayed in carousel - if triggerPageEvent is not used.
   * In case triggerPageEvent is in use, JSX.Element has to be provided. Elements are distinguished based on the 'key' property.
   */
  element: JSX.Element | JSX.Element[];
  /**
   * Allows to inject custom component when the carousel is in processing state. If not provided, Spinner is displayed.
   */
  loadingComponent?: JSX.Element;

  /**
   * Callback function called after the next item button is clicked. Not used when triggerPageEvent is specified.
   */
  onMoveNextClicked?: (currentIndex: number) => void;
  /**
   * Callback function called after the previous item button is clicked. Not used when triggerPageEvent is specified.
   */
  onMovePrevClicked?: (currentIndex: number) => void;

}
