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
import { assertValidHtmlId } from "../helpers/uuid";
import { Consumer as ItemConsumer } from "./ItemContext";
var AccordionItemPanel = function (_a) {
    var _b = _a.className, className = _b === void 0 ? 'accordion__panel' : _b, id = _a.id, rest = __rest(_a, ["className", "id"]);
    var renderChildren = function (_a) {
        var panelAttributes = _a.panelAttributes;
        if (id) {
            assertValidHtmlId(id);
        }
        return (React.createElement("div", __assign({ "data-accordion-component": "AccordionItemPanel", className: className }, rest, panelAttributes)));
    };
    return React.createElement(ItemConsumer, null, renderChildren);
};
export default AccordionItemPanel;
//# sourceMappingURL=AccordionItemPanel.js.map