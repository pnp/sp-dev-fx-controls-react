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
import { BaseFieldCustomizer } from '@microsoft/sp-listview-extensibility';
import OotbFields from './components/Customizer/OotbFields';
import { SPHelper } from '../../common/utilities/SPHelper';
import { GeneralHelper } from '../../common/utilities/GeneralHelper';
var LOG_SOURCE = 'OotbFieldsFieldCustomizer';
var OotbFieldsFieldCustomizer = /** @class */ (function (_super) {
    __extends(OotbFieldsFieldCustomizer, _super);
    function OotbFieldsFieldCustomizer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._shouldRenderUndefiend = false;
        return _this;
    }
    OotbFieldsFieldCustomizer.prototype.onInit = function () {
        // Add your custom initialization to this method.  The framework will wait
        // for the returned promise to resolve before firing any BaseFieldCustomizer events.
        Log.info(LOG_SOURCE, 'Activated OotbFieldsFieldCustomizer with properties:');
        if (this.context.field.fieldType === 'Computed' && this.context.field.internalName === 'DocIcon') {
            this._shouldRenderUndefiend = true;
        }
        return Promise.resolve();
    };
    OotbFieldsFieldCustomizer.prototype.onRenderCell = function (event) {
        var _this = this;
        if (!this._shouldRenderUndefiend && !GeneralHelper.isDefined(event.fieldValue)) {
            return;
        }
        var fieldName = SPHelper.getStoredFieldName(this.context.field.internalName);
        SPHelper.getFieldText(event.fieldValue, event.listItem, this.context).then(function (text) {
            var ootbFields = React.createElement(OotbFields, {
                text: text,
                value: event.fieldValue,
                listItem: event.listItem,
                fieldName: fieldName,
                context: _this.context,
                //cssProps: { backgroundColor: '#f00' },
                className: 'fake-class'
            });
            ReactDOM.render(ootbFields, event.domElement);
        });
    };
    OotbFieldsFieldCustomizer.prototype.onDisposeCell = function (event) {
        // This method should be used to free any resources that were allocated during rendering.
        // For example, if your onRenderCell() called ReactDOM.render(), then you should
        // call ReactDOM.unmountComponentAtNode() here.
        ReactDOM.unmountComponentAtNode(event.domElement);
        _super.prototype.onDisposeCell.call(this, event);
    };
    return OotbFieldsFieldCustomizer;
}(BaseFieldCustomizer));
export default OotbFieldsFieldCustomizer;
// test querystring ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&fieldCustomizers={"FieldName":{"id":"57ebd944-98ed-43f9-b722-e959d6dac6ad","properties":{}}}
//# sourceMappingURL=OotbFieldsFieldCustomizer.js.map