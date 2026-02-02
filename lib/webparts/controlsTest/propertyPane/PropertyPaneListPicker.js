import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ListPicker } from "./controls/ListPicker";
import { PropertyPaneFieldType } from '@microsoft/sp-property-pane';
var PropertyPaneListPicker = /** @class */ (function () {
    function PropertyPaneListPicker(targetProperty, properties) {
        this.type = PropertyPaneFieldType.Custom;
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            wpContext: properties.wpContext,
            onPropertyChange: properties.onPropertyChange,
            selectedKey: properties.selectedKey,
            disabled: properties.disabled,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }
    PropertyPaneListPicker.prototype.render = function () {
        if (!this.elem) {
            return;
        }
        this.onRender(this.elem);
    };
    PropertyPaneListPicker.prototype.onDispose = function (element) {
        ReactDom.unmountComponentAtNode(element);
    };
    PropertyPaneListPicker.prototype.onRender = function (elem) {
        if (!this.elem) {
            this.elem = elem;
        }
        var element = React.createElement(ListPicker, {
            label: this.properties.label,
            wpContext: this.properties.wpContext,
            onChange: this.onChange.bind(this),
            selectedKey: this.properties.selectedKey,
            disabled: this.properties.disabled,
            // required to allow the component to be re-rendered by calling this.render() externally
            // stateKey: new Date().toString()
        });
        ReactDom.render(element, elem);
    };
    PropertyPaneListPicker.prototype.onChange = function (option) {
        this.properties.onPropertyChange(this.targetProperty, option.key);
    };
    return PropertyPaneListPicker;
}());
export { PropertyPaneListPicker };
//# sourceMappingURL=PropertyPaneListPicker.js.map