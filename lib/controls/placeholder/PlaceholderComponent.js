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
import { ThemeContext } from '@fluentui/react-theme-provider/lib/ThemeContext';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';
import { getClassNames } from './PlaceholderComponent.styles';
/**
 * Placeholder component
 */
var Placeholder = /** @class */ (function (_super) {
    __extends(Placeholder, _super);
    /**
     * Constructor
     */
    function Placeholder(props) {
        var _this = _super.call(this, props) || this;
        _this._crntElm = null;
        /**
         * Execute the onConfigure function
         */
        _this._handleBtnClick = function (event) {
            _this.props.onConfigure();
        };
        /**
         * Set the current zone width
         */
        _this._setZoneWidth = function () {
            _this.setState({
                width: _this._crntElm.clientWidth
            });
        };
        /**
         * Stores the current element
         */
        _this._linkElm = function (e) {
            _this._crntElm = e;
        };
        _this.state = {
            width: null
        };
        telemetry.track('ReactPlaceholder', {
            description: !!props.description,
            iconName: !!props.iconName,
            iconText: !!props.iconText,
            buttonLabel: !!props.buttonLabel,
            onConfigure: !!props.onConfigure,
            contentClassName: !!props.contentClassName
        });
        return _this;
    }
    /**
     * componentDidMount lifecycle hook
     */
    Placeholder.prototype.componentDidMount = function () {
        this._setZoneWidth();
    };
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    Placeholder.prototype.componentDidUpdate = function (prevProps, prevState) {
        this._setZoneWidth();
    };
    /**
     * shouldComponentUpdate lifecycle hook
     * @param nextProps
     * @param nextState
     */
    Placeholder.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        /*
        * compare the props object for changes in primative values
        * Return/re-render, bexeting the function, if the props change
        */
        for (var property in nextProps) {
            if (property !== '_onConfigure') {
                if (nextProps[property] !== this.props[property]) {
                    return true;
                }
            }
        }
        return this.state.width !== nextState.width || this.props.hideButton !== nextProps.hideButton;
    };
    /**
     * Default React component render method
     */
    Placeholder.prototype.render = function () {
        var _this = this;
        var _a = this.props, iconName = _a.iconName, iconText = _a.iconText, description = _a.description, children = _a.children, buttonLabel = _a.buttonLabel, hideButton = _a.hideButton, theme = _a.theme;
        return (React.createElement(ThemeContext.Consumer, null, function (contextTheme) {
            var themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
            var styles = getClassNames(themeToApply);
            var iconTextClassNames = "".concat(styles.placeholderText, " ").concat((_this.state.width && _this.state.width <= 380) ? styles.hide : "");
            var iconTextEl = typeof iconText === 'string' ? React.createElement("span", { className: iconTextClassNames }, _this.props.iconText) : iconText(iconTextClassNames);
            var descriptionEl = typeof description === 'string' ? React.createElement("span", { className: styles.placeholderDescriptionText }, _this.props.description) : description(styles.placeholderDescriptionText);
            return (React.createElement("div", { className: "".concat(styles.placeholder, " ").concat(_this.props.contentClassName ? _this.props.contentClassName : ''), ref: _this._linkElm },
                React.createElement("div", { className: styles.placeholderContainer },
                    React.createElement("div", { className: styles.placeholderHead },
                        React.createElement("div", { className: styles.placeholderHeadContainer },
                            iconName && React.createElement(Icon, { iconName: iconName, className: styles.placeholderIcon }),
                            iconTextEl)),
                    React.createElement("div", { className: styles.placeholderDescription }, descriptionEl),
                    children,
                    React.createElement("div", { className: styles.placeholderDescription }, (buttonLabel && !hideButton) &&
                        React.createElement(PrimaryButton, { text: buttonLabel, ariaLabel: buttonLabel, ariaDescription: typeof description === 'string' ? description : '', onClick: _this._handleBtnClick, theme: themeToApply })))));
        }));
    };
    return Placeholder;
}(React.Component));
export { Placeholder };
//# sourceMappingURL=PlaceholderComponent.js.map