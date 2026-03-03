import * as React from 'react';
import { ICssInput } from "@uifabric/utilities/lib";
import { ICarouselImageProps } from "./CarouselImage";
/**
 * Provides options for carousel buttons location.
 */
export declare enum CarouselButtonsLocation {
    top = 1,
    center = 2,
    bottom = 3
}
/**
 * Provides options for carousel buttons display mode.
 */
export declare enum CarouselButtonsDisplay {
    /**
     * Reserves space for buttons on both sides of the control.
     */
    block = 1,
    /**
     * Only icon buttons are displayed.
     */
    buttonsOnly = 2,
    /**
     * Buttons are not displayed. They appear onhover event.
     */
    hidden = 3
}
/**
 * Provides options for carousel indicators' shape
 */
export declare enum CarouselIndicatorShape {
    /**
     * Indicators displayed as cirlces
     */
    circle = 0,
    /**
     * Indicators displayed as squares
     */
    square = 1,
    /**
     * Indicators displayed as rectangles
     */
    rectangle = 2
}
/**
 * Provides options for carousel indicators display mode
 */
export declare enum CarouselIndicatorsDisplay {
    /**
     * Indicators are displayed on top of the carousel content
     */
    overlap = 1,
    /**
     * Reserves space for indicators
     */
    block = 2
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
     *
     * Default: CarouselButtonsLocation.center
     */
    buttonsLocation?: CarouselButtonsLocation;
    /**
     * Specifies the buttons container display mode.
     *
     * Default: CarouselButtonsDisplay.block
     */
    buttonsDisplay?: CarouselButtonsDisplay;
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
     * Aria label of the PreviousItem button. Default 'Previous item'.
     */
    prevButtonAriaLabel?: string;
    /**
     * Aria label of the NextItem button. Default 'Next item'.
     */
    nextButtonAriaLabel?: string;
    /**
     * Triggers parent control to provide new element to be displayed. After the method is executed, carousel control switches to processing mode and loadingComponent is displayed.
     */
    triggerPageEvent?: (index: number) => void;
    /**
     * Fixed array of elemenets to be displayed in carousel - if triggerPageEvent is not used.
     * In case triggerPageEvent is in use, JSX.Element has to be provided. Elements are distinguished based on the 'key' property.
     * It's also possible to provide an array of ICarouselImageProps to use default implementation for the elements
     */
    element: JSX.Element | JSX.Element[] | ICarouselImageProps[];
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
    /**
     * In case triggerPageEvent is in use, provides total number of slides in the carousel.
     */
    elementsCount?: number;
    /**
     * Callback function called when element has been selected in the carousel
     */
    onSelect?: (selectedIndex: number) => void;
    /**
     * Enables animation on the Carousel as it transitions between slides.
     * This property is ignored if triggerPageEvent is in use.
     */
    slide?: boolean;
    /**
     * The amount of time to delay between automatically cycling an item. If null, carousel will not automatically cycle.
     */
    interval?: number | undefined;
    /**
     * Specifies if slides cycling should pause when hovering over the content (touchStart on touch devices)
     */
    pauseOnHover?: boolean;
    /**
     * Specifies if set of slide position indicators is shown
     */
    indicators?: boolean;
    /**
     * Specifies indicators' shape. If onRenderIndicator is provided - this property is ignored
     */
    indicatorShape?: CarouselIndicatorShape;
    /**
     * Specifies additional class applied to slide position indicators
     */
    indicatorClassName?: string;
    /**
     * Specifies additional styles applied to slide position indicators
     */
    indicatorStyle?: React.CSSProperties;
    /**
     * Function to render indicator element
     */
    onRenderIndicator?: (index: number, onClick: (e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>, selectedIndex: number) => void) => JSX.Element;
    /**
     * Specifies display mode of the indicators
     */
    indicatorsDisplay?: CarouselIndicatorsDisplay;
    /**
     * Allows to specify own styles for root element.
     */
    rootStyles?: ICssInput;
    /**
     * Allows to specify own styles for indicators container when indicatorsDisplay is set to "block".
     */
    indicatorsContainerStyles?: ICssInput;
    /**
     * Allows to specify the height of the content. Can be used instead of providing styles for the content container.
     */
    contentHeight?: number;
}
//# sourceMappingURL=ICarouselProps.d.ts.map