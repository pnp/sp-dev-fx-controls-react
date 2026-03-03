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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { ControlToggles } from './controls/ControlToggles';
var PropertyPaneControlToggles = /** @class */ (function () {
    function PropertyPaneControlToggles(targetProperty, properties) {
        this.type = PropertyPaneFieldType.Custom;
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            controlVisibility: properties.controlVisibility,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }
    PropertyPaneControlToggles.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyPaneControlToggles.prototype.onDispose = function (element) {
        ReactDom.unmountComponentAtNode(element);
    };
    PropertyPaneControlToggles.prototype.onRender = function (elem) {
        if (!this.elem) {
            this.elem = elem;
        }
        var element = React.createElement(ControlToggles, {
            label: this.properties.label,
            onChange: this.onChange.bind(this),
            controlVisibility: this.properties.controlVisibility,
            // required to allow the component to be re-rendered by calling this.render() externally
            // stateKey: new Date().toString()
        });
        ReactDom.render(element, elem);
    };
    PropertyPaneControlToggles.prototype.onChange = function (controlName, enabled) {
        var _a;
        if (controlName === "all") {
            var newValue = __assign({}, this.properties.controlVisibility);
            for (var control in newValue) {
                if (newValue[control] !== undefined) {
                    newValue[control] = enabled;
                }
            }
            this.properties.onPropertyChange(newValue);
        }
        else {
            this.properties.onPropertyChange(__assign(__assign({}, this.properties.controlVisibility), (_a = {}, _a[controlName] = enabled, _a)));
        }
    };
    return PropertyPaneControlToggles;
}());
export { PropertyPaneControlToggles };
//# sourceMappingURL=PropertyPaneControlToggles.js.map