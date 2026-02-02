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
import { Log } from '@microsoft/sp-core-library';
import * as React from 'react';
import styles from './OotbFields.module.scss';
import { FieldRendererHelper } from '../../../../common/utilities/FieldRendererHelper';
var LOG_SOURCE = 'OotbFields';
/**
 * Field Customizer control to test fields' controls
 */
var OotbFields = /** @class */ (function (_super) {
    __extends(OotbFields, _super);
    function OotbFields(props, state) {
        var _this = _super.call(this, props, state) || this;
        _this.state = {};
        return _this;
    }
    OotbFields.prototype.UNSAFE_componentWillMount = function () {
        var _this = this;
        FieldRendererHelper.getFieldRenderer(this.props.value, {
            className: this.props.className,
            cssProps: this.props.cssProps
        }, this.props.listItem, this.props.context).then(function (fieldRenderer) {
            _this.setState({
                fieldRenderer: fieldRenderer
            });
        });
    };
    OotbFields.prototype.componentDidMount = function () {
        Log.info(LOG_SOURCE, 'React Element: OotbFields mounted');
    };
    OotbFields.prototype.componentWillUnmount = function () {
        Log.info(LOG_SOURCE, 'React Element: OotbFields unmounted');
    };
    OotbFields.prototype.render = function () {
        return (React.createElement("div", { className: styles.cell }, this.state.fieldRenderer));
    };
    return OotbFields;
}(React.Component));
export default OotbFields;
//# sourceMappingURL=OotbFields.js.map