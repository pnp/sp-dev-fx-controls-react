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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { focusFirstSiblingOf, focusLastSiblingOf, focusNextSiblingOf, focusPreviousSiblingOf } from "../helpers/focus";
import keycodes from "../helpers/keycodes";
import { assertValidHtmlId } from "../helpers/uuid";
import { Consumer as ItemConsumer } from "./ItemContext";
var AccordionItemButton = function (_a) {
    var toggleExpanded = _a.toggleExpanded, _b = _a.className, className = _b === void 0 ? 'accordion__button' : _b, rest = __rest(_a, ["toggleExpanded", "className"]);
    var handleKeyPress = function (evt) {
        var keyCode = evt.key;
        if (keyCode === keycodes.ENTER ||
            keyCode === keycodes.SPACE ||
            keyCode === keycodes.SPACE_DEPRECATED) {
            evt.preventDefault();
            toggleExpanded();
        }
        /* The following block is ignored from test coverage because at time
         * time of writing Jest/react-testing-library can not assert 'focus'
         * functionality.
         */
        // istanbul ignore next
        if (evt.target instanceof HTMLElement) {
            switch (keyCode) {
                case keycodes.HOME: {
                    evt.preventDefault();
                    focusFirstSiblingOf(evt.target);
                    break;
                }
                case keycodes.END: {
                    evt.preventDefault();
                    focusLastSiblingOf(evt.target);
                    break;
                }
                case keycodes.LEFT:
                case keycodes.UP: {
                    evt.preventDefault();
                    focusPreviousSiblingOf(evt.target);
                    break;
                }
                case keycodes.RIGHT:
                case keycodes.DOWN: {
                    evt.preventDefault();
                    focusNextSiblingOf(evt.target);
                    break;
                }
                default: {
                    //
                }
            }
        }
    };
    if (rest.id) {
        assertValidHtmlId(rest.id);
    }
    return (React.createElement("div", __assign({ className: className }, rest, { role: "button", tabIndex: 0, onClick: toggleExpanded, onKeyDown: handleKeyPress, "data-accordion-component": "AccordionItemButton" })));
};
var AccordionItemButtonWrapper = function (props) { return (React.createElement(ItemConsumer, null, function (itemContext) {
    var toggleExpanded = itemContext.toggleExpanded, buttonAttributes = itemContext.buttonAttributes;
    return (React.createElement(AccordionItemButton, __assign({ toggleExpanded: toggleExpanded }, props, buttonAttributes)));
})); };
export default AccordionItemButtonWrapper;
//# sourceMappingURL=AccordionItemButton.js.map