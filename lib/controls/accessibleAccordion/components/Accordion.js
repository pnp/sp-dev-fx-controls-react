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
import "../css/AccordionStylesOverride.css";
import * as React from "react";
import { Provider } from "./AccordionContext";
import { getFluentUIThemeOrDefault } from "../../../common/utilities/ThemeUtility";
import { useTheme } from "@fluentui/react-theme-provider/lib/useTheme";
import { useEffect, useRef } from "react";
var Accordion = function (_a) {
    var _b = _a.className, className = _b === void 0 ? 'accordion' : _b, allowMultipleExpanded = _a.allowMultipleExpanded, allowZeroExpanded = _a.allowZeroExpanded, onChange = _a.onChange, preExpanded = _a.preExpanded, theme = _a.theme, rest = __rest(_a, ["className", "allowMultipleExpanded", "allowZeroExpanded", "onChange", "preExpanded", "theme"]);
    var contextTheme = useTheme();
    var divElement = useRef(null);
    useEffect(function () {
        if (divElement.current) {
            var themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
            divElement.current.style.setProperty("--accordion-bodyDivider", themeToApply.semanticColors.bodyDivider);
            divElement.current.style.setProperty("--accordion-buttonBackground", themeToApply.semanticColors.buttonBackground);
            divElement.current.style.setProperty("--accordion-buttonText", themeToApply.semanticColors.buttonText);
            divElement.current.style.setProperty("--accordion-buttonBackgroundHovered", themeToApply.semanticColors.buttonBackgroundHovered);
            divElement.current.style.setProperty("--accordion-bodyBackground", themeToApply.semanticColors.bodyBackground);
            divElement.current.style.setProperty("--accordion-bodyText", themeToApply.semanticColors.bodyText);
        }
    });
    return (React.createElement(Provider, { preExpanded: preExpanded, allowMultipleExpanded: allowMultipleExpanded, allowZeroExpanded: allowZeroExpanded, onChange: onChange },
        React.createElement("div", __assign({ "data-accordion-component": "Accordion", className: className, ref: divElement }, rest))));
};
export default Accordion;
//# sourceMappingURL=Accordion.js.map