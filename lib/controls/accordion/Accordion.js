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
import styles from './Accordion.module.scss';
import { css } from "@uifabric/utilities/lib/css";
import { DefaultButton } from '@fluentui/react/lib/Button';
import * as telemetry from '../../common/telemetry';
/**
 * Icon styles. Feel free to change them
 */
var collapsedIcon = { iconName: 'ChevronRight', className: styles.accordionChevron };
var expandedIcon = { iconName: 'ChevronDown', className: styles.accordionChevron };
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion(props) {
        var _this = _super.call(this, props) || this;
        _this._drawerDiv = undefined;
        _this.state = {
            expanded: !props.defaultCollapsed
        };
        collapsedIcon.iconName = props.collapsedIcon || 'CheveronRight';
        expandedIcon.iconName = props.expandedIcon || 'CheveronDown';
        telemetry.track('ReactAccordion', {});
        return _this;
    }
    Accordion.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: css(styles.accordion, this.props.className) },
            React.createElement(DefaultButton, { toggled: true, checked: this.state.expanded, text: this.props.title, iconProps: this.state.expanded ? expandedIcon : collapsedIcon, onClick: function () {
                    _this.setState({
                        expanded: !_this.state.expanded
                    });
                }, "aria-expanded": this.state.expanded, "aria-controls": this._drawerDiv && this._drawerDiv.id }),
            this.state.expanded &&
                React.createElement("div", { className: styles.drawer, ref: function (el) { _this._drawerDiv = el; } }, this.props.children)));
    };
    return Accordion;
}(React.Component));
export { Accordion };
//# sourceMappingURL=Accordion.js.map