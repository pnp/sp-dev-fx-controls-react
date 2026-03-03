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
import * as React from "react";
import DisplayName from "../helpers/DisplayName";
import { assertValidHtmlId } from "../helpers/uuid";
import { Consumer as ItemConsumer } from "./ItemContext";
var defaultProps = {
    className: 'accordion__heading',
    'aria-level': 3,
};
export var SPEC_ERROR = "AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n\u201CThe button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.\u201D\n\n";
var AccordionItemHeading = /** @class */ (function (_super) {
    __extends(AccordionItemHeading, _super);
    function AccordionItemHeading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setRef = function (ref) {
            _this.ref = ref;
        };
        return _this;
    }
    AccordionItemHeading.VALIDATE = function (ref) {
        if (ref === undefined) {
            throw new Error('ref is undefined');
        }
        if (!(ref.childElementCount === 1 &&
            ref.firstElementChild &&
            ref.firstElementChild.getAttribute('data-accordion-component') === 'AccordionItemButton')) {
            throw new Error(SPEC_ERROR);
        }
    };
    AccordionItemHeading.prototype.componentDidUpdate = function () {
        AccordionItemHeading.VALIDATE(this.ref);
    };
    AccordionItemHeading.prototype.componentDidMount = function () {
        AccordionItemHeading.VALIDATE(this.ref);
    };
    AccordionItemHeading.prototype.render = function () {
        return (React.createElement("div", __assign({ "data-accordion-component": "AccordionItemHeading" }, this.props, { ref: this.setRef })));
    };
    AccordionItemHeading.defaultProps = defaultProps;
    return AccordionItemHeading;
}(React.PureComponent));
export { AccordionItemHeading };
var AccordionItemHeadingWrapper = function (props) { return (React.createElement(ItemConsumer, null, function (itemContext) {
    var headingAttributes = itemContext.headingAttributes;
    if (props.id) {
        assertValidHtmlId(props.id);
    }
    return React.createElement(AccordionItemHeading, __assign({}, props, headingAttributes));
})); };
AccordionItemHeadingWrapper.displayName = DisplayName.AccordionItemHeading;
export default AccordionItemHeadingWrapper;
//# sourceMappingURL=AccordionItemHeading.js.map