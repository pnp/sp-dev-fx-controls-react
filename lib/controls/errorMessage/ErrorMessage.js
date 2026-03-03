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
import styles from './ErrorMessage.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
/**
 * Component that shows an error message when something went wront with the property control
 */
var FieldErrorMessage = /** @class */ (function (_super) {
    __extends(FieldErrorMessage, _super);
    function FieldErrorMessage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FieldErrorMessage.prototype.render = function () {
        var _a = this.props, errorMessage = _a.errorMessage, className = _a.className;
        if (errorMessage !== undefined && errorMessage !== null && errorMessage !== '') {
            return (React.createElement("div", { "aria-live": "assertive" },
                React.createElement("p", { className: "ms-TextField-errorMessage ".concat(styles.errorMessage, " ").concat(className || '') },
                    React.createElement(Icon, { iconName: 'Error', className: styles.errorIcon }),
                    React.createElement("span", { "data-automation-id": "error-message" }, errorMessage))));
        }
        else {
            return null;
        }
    };
    return FieldErrorMessage;
}(React.Component));
export default FieldErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map