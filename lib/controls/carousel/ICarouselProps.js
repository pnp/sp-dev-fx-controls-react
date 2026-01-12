/**
 * Provides options for carousel buttons location.
 */
export var CarouselButtonsLocation;
(function (CarouselButtonsLocation) {
    CarouselButtonsLocation[CarouselButtonsLocation["top"] = 1] = "top";
    CarouselButtonsLocation[CarouselButtonsLocation["center"] = 2] = "center";
    CarouselButtonsLocation[CarouselButtonsLocation["bottom"] = 3] = "bottom";
})(CarouselButtonsLocation || (CarouselButtonsLocation = {}));
/**
 * Provides options for carousel buttons display mode.
 */
export var CarouselButtonsDisplay;
(function (CarouselButtonsDisplay) {
    /**
     * Reserves space for buttons on both sides of the control.
     */
    CarouselButtonsDisplay[CarouselButtonsDisplay["block"] = 1] = "block";
    /**
     * Only icon buttons are displayed.
     */
    CarouselButtonsDisplay[CarouselButtonsDisplay["buttonsOnly"] = 2] = "buttonsOnly";
    /**
     * Buttons are not displayed. They appear onhover event.
     */
    CarouselButtonsDisplay[CarouselButtonsDisplay["hidden"] = 3] = "hidden";
})(CarouselButtonsDisplay || (CarouselButtonsDisplay = {}));
/**
 * Provides options for carousel indicators' shape
 */
export var CarouselIndicatorShape;
(function (CarouselIndicatorShape) {
    /**
     * Indicators displayed as cirlces
     */
    CarouselIndicatorShape[CarouselIndicatorShape["circle"] = 0] = "circle";
    /**
     * Indicators displayed as squares
     */
    CarouselIndicatorShape[CarouselIndicatorShape["square"] = 1] = "square";
    /**
     * Indicators displayed as rectangles
     */
    CarouselIndicatorShape[CarouselIndicatorShape["rectangle"] = 2] = "rectangle";
})(CarouselIndicatorShape || (CarouselIndicatorShape = {}));
/**
 * Provides options for carousel indicators display mode
 */
export var CarouselIndicatorsDisplay;
(function (CarouselIndicatorsDisplay) {
    /**
     * Indicators are displayed on top of the carousel content
     */
    CarouselIndicatorsDisplay[CarouselIndicatorsDisplay["overlap"] = 1] = "overlap";
    /**
     * Reserves space for indicators
     */
    CarouselIndicatorsDisplay[CarouselIndicatorsDisplay["block"] = 2] = "block";
})(CarouselIndicatorsDisplay || (CarouselIndicatorsDisplay = {}));
//# sourceMappingURL=ICarouselProps.js.map