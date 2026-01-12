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
import * as ReactDOM from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import { BaseFormCustomizer } from '@microsoft/sp-listview-extensibility';
import TestForm from './components/TestForm';
var LOG_SOURCE = 'TestFormCustomizer';
var TestFormCustomizer = /** @class */ (function (_super) {
    __extends(TestFormCustomizer, _super);
    function TestFormCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onSave = function () {
            // You MUST call this.formSaved() after you save the form.
            _this.formSaved();
        };
        _this._onClose = function () {
            // You MUST call this.formClosed() after you close the form.
            _this.formClosed();
        };
        return _this;
    }
    TestFormCustomizer.prototype.onInit = function () {
        // Add your custom initialization to this method. The framework will wait
        // for the returned promise to resolve before rendering the form.
        Log.info(LOG_SOURCE, 'Activated TestFormCustomizer with properties:');
        Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
        return Promise.resolve();
    };
    TestFormCustomizer.prototype.render = function () {
        // Use this method to perform your custom rendering.
        var testForm = React.createElement(TestForm, {
            context: this.context,
            displayMode: this.displayMode,
            onSave: this._onSave,
            onClose: this._onClose
        });
        ReactDOM.render(testForm, this.domElement);
    };
    TestFormCustomizer.prototype.onDispose = function () {
        // This method should be used to free any resources that were allocated during rendering.
        ReactDOM.unmountComponentAtNode(this.domElement);
        _super.prototype.onDispose.call(this);
    };
    return TestFormCustomizer;
}(BaseFormCustomizer));
export default TestFormCustomizer;
//# sourceMappingURL=TestFormCustomizer.js.map