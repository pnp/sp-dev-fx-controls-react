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
import styles from '../FieldCollectionData.module.scss';
import { TextField } from '@fluentui/react/lib/TextField';
import { Icon } from '@fluentui/react/lib/Icon';
var CollectionIconField = /** @class */ (function (_super) {
    __extends(CollectionIconField, _super);
    function CollectionIconField() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CollectionIconField.prototype.render = function () {
        var _this = this;
        var _a = this.props, field = _a.field, item = _a.item;
        return (React.createElement("div", { className: "FieldCollectionData__panel__icon-field ".concat(styles.iconField) },
            React.createElement(TextField, { placeholder: field.placeholder || field.title, className: styles.collectionDataField, value: item[field.id] ? item[field.id] : "", required: field.required, onChange: function (e, value) { return _this.props.fOnValueChange(field.id, value); }, deferredValidationTime: field.deferredValidationTime || field.deferredValidationTime >= 0 ? field.deferredValidationTime : 200, onGetErrorMessage: function (value) { return _this.props.fValidation(_this.props.field, value); }, disabled: this.props.disableEdit }),
            React.createElement(Icon, { iconName: item[field.id] ? item[field.id] : "" })));
    };
    return CollectionIconField;
}(React.Component));
export { CollectionIconField };
//# sourceMappingURL=CollectionIconField.js.map