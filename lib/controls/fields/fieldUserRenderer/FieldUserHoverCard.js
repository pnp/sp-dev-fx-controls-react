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
import { HoverCard } from '@fluentui/react/lib/HoverCard';
import styles from './FieldUserRenderer.module.scss';
/**
 * Component to render User name with related Hover Card
 */
var FieldUserHoverCard = /** @class */ (function (_super) {
    __extends(FieldUserHoverCard, _super);
    function FieldUserHoverCard(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            contentRendered: undefined
        };
        return _this;
    }
    FieldUserHoverCard.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.user, style: this.props.cssProps },
            React.createElement("span", { ref: function (c) { return !_this.state.contentRendered && _this.setState({ contentRendered: c }); }, "data-is-focusable": true }, this.props.displayName),
            this.state.contentRendered && this.props.expandingCardProps.onRenderCompactCard &&
                React.createElement(HoverCard, { expandingCardProps: this.props.expandingCardProps, target: this.state.contentRendered, cardDismissDelay: 0 })));
    };
    return FieldUserHoverCard;
}(React.Component));
export default FieldUserHoverCard;
//# sourceMappingURL=FieldUserHoverCard.js.map