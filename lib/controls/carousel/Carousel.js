var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { IconButton } from "@fluentui/react/lib/Button";
import { initializeIcons } from '@uifabric/icons';
initializeIcons();
import * as React from "react";
import styles from "./Carousel.module.scss";
import { CarouselButtonsDisplay, CarouselButtonsLocation, CarouselIndicatorShape } from "./ICarouselProps";
import { css } from "@uifabric/utilities/lib";
import { ProcessingState } from "./ICarouselState";
import { Spinner } from "@fluentui/react/lib/Spinner";
import { isArray } from "@pnp/common";
import * as telemetry from '../../common/telemetry';
import CarouselImage from "./CarouselImage";
import { CarouselIndicatorsDisplay } from "./ICarouselProps";
import { mergeStyles } from "@fluentui/react/lib/Styling";
var Carousel = /** @class */ (function (_super) {
    __extends(Carousel, _super);
    function Carousel(props) {
        var _this = _super.call(this, props) || this;
        _this.renderSlide = function (element) {
            var _a;
            var isAnimated = _this.props.slide !== false && !_this.props.triggerPageEvent;
            var _b = _this.state, currentIndex = _b.currentIndex, previousIndex = _b.previousIndex, slideRight = _b.slideRight;
            if (!isAnimated || previousIndex === undefined) {
                return [React.createElement("div", { key: currentIndex, className: styles.slideWrapper }, element)];
            }
            var previousElement = _this.getElementToDisplay(previousIndex);
            var result = [];
            result.push(React.createElement("div", { key: currentIndex, className: css(styles.slideWrapper, (_a = {},
                    _a[styles.slideFromLeft] = slideRight,
                    _a[styles.slideFromRight] = !slideRight,
                    _a)) }, element));
            if (slideRight) {
                result.push(React.createElement("div", { key: previousIndex, className: css(styles.slideWrapper, styles.slideRight, styles.right) }, previousElement));
            }
            else {
                result.unshift(React.createElement("div", { key: previousIndex, className: css(styles.slideWrapper, styles.slideLeft, styles.left) }, previousElement));
            }
            return result;
        };
        _this.getIndicatorsElement = function () {
            var _a;
            var _b = _this.props, indicators = _b.indicators, _c = _b.indicatorShape, indicatorShape = _c === void 0 ? CarouselIndicatorShape.rectangle : _c, onRenderIndicator = _b.onRenderIndicator, triggerPageEvent = _b.triggerPageEvent, indicatorClassName = _b.indicatorClassName, indicatorStyle = _b.indicatorStyle;
            var _d = _this.state.currentIndex, currentIndex = _d === void 0 ? 0 : _d;
            if (indicators === false) {
                return null;
            }
            var elementsCount = triggerPageEvent ? _this.props.elementsCount : isArray(_this.props.element) ? _this.props.element.length : 1;
            var indicatorElements = [];
            var _loop_1 = function (i) {
                var _e;
                if (onRenderIndicator) {
                    indicatorElements.push(onRenderIndicator(i, _this.onIndicatorClick));
                }
                else {
                    indicatorElements.push(React.createElement("li", { className: css(indicatorClassName, (_e = {},
                            _e[styles.active] = i === currentIndex,
                            _e)), style: indicatorStyle, onClick: function (e) { return _this.onIndicatorClick(e, i); } }));
                }
            };
            for (var i = 0; i < elementsCount; i++) {
                _loop_1(i);
            }
            if (onRenderIndicator) {
                return React.createElement("div", { className: styles.indicators }, indicatorElements);
            }
            else {
                return React.createElement("ol", { className: css((_a = {},
                        _a[styles.indicators] = true,
                        _a[styles.circle] = indicatorShape === CarouselIndicatorShape.circle,
                        _a[styles.rectangle] = indicatorShape === CarouselIndicatorShape.rectangle,
                        _a[styles.square] = indicatorShape === CarouselIndicatorShape.square,
                        _a)) }, indicatorElements);
            }
        };
        _this.onIndicatorClick = function (e, index) {
            _this.startCycle();
            if (_this.props.onSelect) {
                _this.props.onSelect(index);
            }
            var currentIndex = _this.state.currentIndex;
            _this.setState({
                currentIndex: index,
                previousIndex: currentIndex,
                slideRight: index < currentIndex
            });
        };
        /**
         * Merges the styles of the components.
         */
        _this.getMergedStyles = function (componentStyles, userStyles) {
            var mergedStyles = userStyles ? css(componentStyles, userStyles) : css(componentStyles);
            return mergedStyles;
        };
        /**
         * Determines if the carousel button can be clicked.
         */
        _this.isCarouselButtonDisabled = function (nextButton) {
            // false by default
            var isInfinite = _this.props.isInfinite !== undefined ? _this.props.isInfinite : false;
            var currentIndex = _this.state.currentIndex;
            var result = false;
            // Use validation from parent control or calcualte it based on the current index
            if (nextButton) {
                result = _this.props.canMoveNext !== undefined ?
                    !_this.props.canMoveNext :
                    (currentIndex === _this.props.element.length - 1) && !isInfinite;
            }
            else {
                result = _this.props.canMovePrev !== undefined ?
                    !_this.props.canMovePrev :
                    (0 === currentIndex) && !isInfinite;
            }
            return result;
        };
        /**
         * Handles carousel button click.
         */
        _this.onCarouselButtonClicked = function (nextButtonClicked) {
            _this.startCycle();
            var currentIndex = _this.state.currentIndex;
            var nextIndex = _this.state.currentIndex;
            var processingState = ProcessingState.processing;
            // Trigger parent control to update provided element
            if (_this.props.triggerPageEvent) {
                var canMove = nextButtonClicked ? _this.props.canMoveNext !== false : _this.props.canMovePrev !== false;
                if (canMove) {
                    // Index validation needs to be done by the parent control specyfing canMove Next|Prev
                    nextIndex = nextButtonClicked ? (currentIndex + 1) : (currentIndex - 1);
                    // Trigger parent to provide new data
                    _this.props.triggerPageEvent(nextIndex);
                    processingState = ProcessingState.processing;
                }
            }
            else {
                nextIndex = _this.getNextIndex(nextButtonClicked);
                if (nextIndex !== currentIndex) {
                    if (nextButtonClicked && _this.props.onMoveNextClicked) {
                        _this.props.onMoveNextClicked(nextIndex);
                    }
                    else if (_this.props.onMovePrevClicked) {
                        _this.props.onMovePrevClicked(nextIndex);
                    }
                }
                processingState = ProcessingState.idle;
            }
            if (nextIndex !== currentIndex) {
                if (_this.props.onSelect) {
                    _this.props.onSelect(nextIndex);
                }
                _this.setState({
                    currentIndex: nextIndex,
                    previousIndex: currentIndex,
                    slideRight: !nextButtonClicked,
                    processingState: processingState
                });
            }
        };
        /**
         * Returns next index after carousel button is clicked.
         */
        _this.getNextIndex = function (nextButtonClicked) {
            var currentIndex = _this.state.currentIndex;
            var nextIndex = currentIndex;
            var isInfinite = _this.props.isInfinite !== undefined ? _this.props.isInfinite : false;
            var length = _this.props.element.length;
            // Next Button clicked
            if (nextButtonClicked) {
                // If there is next element
                if (currentIndex < length - 1) {
                    nextIndex = currentIndex + 1;
                }
                // In no more elements are available but it isInfiniteLoop -> reset index to the first element
                else if (isInfinite) {
                    nextIndex = 0;
                }
            }
            // Prev Button clicked
            else {
                if (currentIndex - 1 >= 0) {
                    // If there is previous element
                    nextIndex = currentIndex - 1;
                }
                else if (isInfinite) {
                    // If there is no previous element but isInfitineLoop -> reset index to the last element
                    nextIndex = length - 1;
                }
            }
            return nextIndex;
        };
        /**
         * Returns current element to be displayed.
         */
        _this.getElementToDisplay = function (currentIndex) {
            var element = _this.props.element;
            var result = null;
            var arrayLen;
            // If no element has been provided.
            if (!element) {
                result = null;
            }
            else if (isArray(element) && (arrayLen = element.length) > 0) {
                // Retrieve proper element from the array
                if (currentIndex >= 0 && arrayLen > currentIndex) {
                    var arrayEl = element[currentIndex];
                    result = 'props' in arrayEl ? arrayEl :
                        React.createElement(CarouselImage, __assign({}, arrayEl));
                }
            }
            else {
                result = element;
            }
            return result;
        };
        _this.startCycle = function () {
            var _a = _this.props, interval = _a.interval, triggerPageEvent = _a.triggerPageEvent;
            if (_this._intervalId) {
                if (triggerPageEvent) {
                    clearTimeout(_this._intervalId);
                }
                else {
                    clearInterval(_this._intervalId);
                }
            }
            if (interval !== null) {
                var intervalValue = interval || 5000;
                if (!triggerPageEvent) {
                    _this._intervalId = window.setInterval(_this.moveNext, intervalValue);
                }
                else {
                    _this._intervalId = window.setTimeout(_this.moveNext, intervalValue);
                }
            }
        };
        _this.moveNext = function () {
            if (!_this.isCarouselButtonDisabled(true)) {
                _this.onCarouselButtonClicked(true);
            }
            else {
                if (_this._intervalId) {
                    if (_this.props.triggerPageEvent) {
                        clearTimeout(_this._intervalId);
                    }
                    else {
                        clearInterval(_this._intervalId);
                    }
                }
            }
        };
        _this.pauseCycle = function () {
            if (_this._intervalId) {
                if (_this.props.triggerPageEvent) {
                    clearTimeout(_this._intervalId);
                }
                else {
                    clearInterval(_this._intervalId);
                }
            }
        };
        var currentIndex = props.startIndex ? props.startIndex : 0;
        telemetry.track('ReactCarousel', {});
        _this.state = {
            currentIndex: currentIndex,
            processingState: ProcessingState.idle
        };
        return _this;
    }
    /**
     * Handles component update lifecycle method.
     * @param prevProps
     */
    Carousel.prototype.componentDidUpdate = function (prevProps) {
        var currProps = this.props;
        var prevPropsElementKey = prevProps.triggerPageEvent && prevProps.element ? prevProps.element.key : null;
        var nextPropsElementKey = currProps.triggerPageEvent && currProps.element ? currProps.element.key : null;
        // Checking if component is in processing state and the key of the current element has been changed
        if (this.state.processingState === ProcessingState.processing && nextPropsElementKey !== null && prevPropsElementKey !== nextPropsElementKey) {
            this.setState({
                processingState: ProcessingState.idle
            });
            this.startCycle(); // restarting cycle when new slide is available
        }
    };
    Carousel.prototype.componentDidMount = function () {
        // starting auto cycling
        this.startCycle();
    };
    Carousel.prototype.render = function () {
        var _this = this;
        var _a = this.state, currentIndex = _a.currentIndex, processingState = _a.processingState;
        var _b = this.props, containerStyles = _b.containerStyles, contentContainerStyles = _b.contentContainerStyles, containerButtonsStyles = _b.containerButtonsStyles, prevButtonStyles = _b.prevButtonStyles, nextButtonStyles = _b.nextButtonStyles, loadingComponentContainerStyles = _b.loadingComponentContainerStyles, _c = _b.prevButtonIconName, prevButtonIconName = _c === void 0 ? 'ChevronLeft' : _c, _d = _b.nextButtonIconName, nextButtonIconName = _d === void 0 ? 'ChevronRight' : _d, _e = _b.prevButtonAriaLabel, prevButtonAriaLabel = _e === void 0 ? 'Previous item' : _e, _f = _b.nextButtonAriaLabel, nextButtonAriaLabel = _f === void 0 ? 'Next item' : _f, _g = _b.loadingComponent, loadingComponent = _g === void 0 ? React.createElement(Spinner, null) : _g, pauseOnHover = _b.pauseOnHover, interval = _b.interval, indicatorsDisplay = _b.indicatorsDisplay, rootStyles = _b.rootStyles, indicatorsContainerStyles = _b.indicatorsContainerStyles, contentHeight = _b.contentHeight;
        var processing = processingState === ProcessingState.processing;
        var prevButtonDisabled = processing || this.isCarouselButtonDisabled(false);
        var nextButtonDisabled = processing || this.isCarouselButtonDisabled(true);
        var element = this.getElementToDisplay(currentIndex);
        var contentContainerCustomClassName = undefined;
        if (contentContainerStyles) {
            contentContainerCustomClassName = contentContainerStyles;
        }
        else if (contentHeight) {
            contentContainerCustomClassName = mergeStyles({
                height: "".concat(contentHeight, "px")
            });
        }
        return (React.createElement("div", { className: this.getMergedStyles(styles.root, rootStyles) },
            React.createElement("div", { className: this.getMergedStyles(styles.container, containerStyles) },
                React.createElement("div", { className: this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles), onClick: function () { if (!prevButtonDisabled) {
                        _this.onCarouselButtonClicked(false);
                    } } },
                    React.createElement(IconButton, { ariaLabel: prevButtonAriaLabel, className: this.getMergedStyles(this.getButtonStyles(false), prevButtonStyles), iconProps: { iconName: prevButtonIconName }, disabled: prevButtonDisabled, onClick: function () { _this.onCarouselButtonClicked(false); } })),
                React.createElement("div", { className: this.getMergedStyles(styles.contentContainer, contentContainerCustomClassName), onMouseOver: pauseOnHover && interval !== null ? this.pauseCycle : undefined, onTouchStart: pauseOnHover && interval !== null ? this.pauseCycle : undefined, onMouseLeave: pauseOnHover && interval !== null ? this.startCycle : undefined, onTouchEnd: pauseOnHover && interval !== null ? this.startCycle : undefined },
                    processing &&
                        React.createElement("div", { className: this.getMergedStyles(styles.loadingComponent, loadingComponentContainerStyles) }, loadingComponent),
                    !processing && this.renderSlide(element),
                    indicatorsDisplay !== CarouselIndicatorsDisplay.block && this.getIndicatorsElement()),
                React.createElement("div", { className: this.getMergedStyles(this.getButtonContainerStyles(), containerButtonsStyles), onClick: function () { if (!nextButtonDisabled) {
                        _this.onCarouselButtonClicked(true);
                    } } },
                    React.createElement(IconButton, { ariaLabel: nextButtonAriaLabel, className: this.getMergedStyles(this.getButtonStyles(true), nextButtonStyles), iconProps: { iconName: nextButtonIconName }, disabled: nextButtonDisabled, onClick: function () { _this.onCarouselButtonClicked(true); } }))),
            indicatorsDisplay === CarouselIndicatorsDisplay.block &&
                React.createElement("div", { className: this.getMergedStyles(styles.indicatorsContainer, indicatorsContainerStyles) }, this.getIndicatorsElement())));
    };
    /**
     * Return merged styles for Button containers.
     */
    Carousel.prototype.getButtonContainerStyles = function () {
        var buttonsDisplayMode = this.props.buttonsDisplay ? this.props.buttonsDisplay : CarouselButtonsDisplay.block;
        var buttonDisplayModeCss = "";
        switch (buttonsDisplayMode) {
            case CarouselButtonsDisplay.block:
                buttonDisplayModeCss = styles.blockButtonsContainer;
                break;
            case CarouselButtonsDisplay.buttonsOnly:
                buttonDisplayModeCss = styles.buttonsOnlyContainer;
                break;
            case CarouselButtonsDisplay.hidden:
                buttonDisplayModeCss = styles.hiddenButtonsContainer;
                break;
            default:
                return "";
        }
        var buttonsLocation = this.props.buttonsLocation ? this.props.buttonsLocation : CarouselButtonsLocation.center;
        var buttonsLocationCss = "";
        switch (buttonsLocation) {
            case CarouselButtonsLocation.top:
                buttonsLocationCss = styles.blockButtonsContainer;
                break;
            case CarouselButtonsLocation.center:
                buttonsLocationCss = styles.centralButtonsContainer;
                break;
            case CarouselButtonsLocation.bottom:
                buttonsLocationCss = styles.bottomButtonsContainer;
                break;
            default:
                return "";
        }
        var result = css(buttonDisplayModeCss, buttonsLocationCss);
        return result;
    };
    /**
     * Return merged styles for Buttons.
     * @param nextButton
     */
    Carousel.prototype.getButtonStyles = function (nextButton) {
        var buttonsDisplayMode = this.props.buttonsDisplay ? this.props.buttonsDisplay : CarouselButtonsDisplay.block;
        var result = "";
        if (buttonsDisplayMode === CarouselButtonsDisplay.buttonsOnly) {
            result = nextButton ? styles.buttonsOnlyNextButton : styles.buttonsOnlyPrevButton;
        }
        return css(result);
    };
    return Carousel;
}(React.Component));
export { Carousel };
//# sourceMappingURL=Carousel.js.map