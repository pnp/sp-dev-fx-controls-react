// tslint:disable:max-classes-per-file
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
import { Consumer as AccordionContextConsumer } from "./AccordionContext";
var Context = React.createContext(null);
var Provider = function (_a) {
    var children = _a.children, uuid = _a.uuid, accordionContext = _a.accordionContext, dangerouslySetExpanded = _a.dangerouslySetExpanded;
    var toggleExpanded = function () {
        accordionContext.toggleExpanded(uuid);
    };
    var renderChildren = function (ctx) {
        var expanded = dangerouslySetExpanded ? dangerouslySetExpanded : ctx.isItemExpanded(uuid);
        var disabled = ctx.isItemDisabled(uuid);
        var panelAttributes = ctx.getPanelAttributes(uuid, dangerouslySetExpanded);
        var headingAttributes = ctx.getHeadingAttributes(uuid);
        var buttonAttributes = ctx.getButtonAttributes(uuid, dangerouslySetExpanded);
        return (React.createElement(Context.Provider, { value: {
                uuid: uuid,
                expanded: expanded,
                disabled: disabled,
                toggleExpanded: toggleExpanded,
                panelAttributes: panelAttributes,
                headingAttributes: headingAttributes,
                buttonAttributes: buttonAttributes,
            } }, children));
    };
    return (React.createElement(AccordionContextConsumer, null, renderChildren));
};
var ProviderWrapper = function (props) { return (React.createElement(AccordionContextConsumer, null, function (accordionContext) { return (React.createElement(Provider, __assign({}, props, { accordionContext: accordionContext }))); })); };
export { ProviderWrapper as Provider };
export var Consumer = function (_a) {
    var children = _a.children;
    var renderChildren = function (container) {
        return container ? children(container) : null;
    };
    return React.createElement(Context.Consumer, null, renderChildren);
};
//# sourceMappingURL=ItemContext.js.map