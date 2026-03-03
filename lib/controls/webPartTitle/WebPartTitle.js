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
import * as React from 'react';
import * as strings from 'ControlStrings';
import { DisplayMode } from '@microsoft/sp-core-library';
import styles from './WebPartTitle.module.scss';
import * as telemetry from '../../common/telemetry';
/**
 * Web Part Title component
 */
var WebPartTitle = /** @class */ (function (_super) {
    __extends(WebPartTitle, _super);
    /**
     * Constructor
     */
    function WebPartTitle(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('ReactWebPartTitle', {
            title: !!props.title,
            updateProperty: !!props.updateProperty,
            className: !!props.className
        });
        _this._onChange = _this._onChange.bind(_this);
        return _this;
    }
    /**
     * Process the text area change
     */
    WebPartTitle.prototype._onChange = function (event) {
        this.props.updateProperty(event.target.value);
    };
    /**
     * Default React component render method
     */
    WebPartTitle.prototype.render = function () {
        var color = (!!this.props.themeVariant && this.props.themeVariant.semanticColors.bodyText) || null;
        if (this.props.title || this.props.moreLink || this.props.displayMode === DisplayMode.Edit) {
            return (React.createElement("div", { className: "".concat(styles.webPartHeader, " ").concat(this.props.className ? this.props.className : "") },
                React.createElement("div", { className: styles.webPartTitle, style: { color: color } },
                    this.props.displayMode === DisplayMode.Edit && (React.createElement("textarea", { placeholder: this.props.placeholder ? this.props.placeholder : strings.WebPartTitlePlaceholder, "aria-label": strings.WebPartTitleLabel, onChange: this._onChange, defaultValue: this.props.title })),
                    this.props.displayMode !== DisplayMode.Edit && this.props.title && React.createElement("span", { role: "heading", "aria-level": 2 }, this.props.title)),
                this.props.moreLink && (React.createElement("span", { className: styles.moreLink }, typeof this.props.moreLink === "function" ? this.props.moreLink() : this.props.moreLink))));
        }
        return null;
    };
    return WebPartTitle;
}(React.Component));
export { WebPartTitle };
//# sourceMappingURL=WebPartTitle.js.map