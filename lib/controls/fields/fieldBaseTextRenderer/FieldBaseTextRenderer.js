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
import { css } from '@fluentui/react/lib/Utilities';
import styles from './FieldBaseTextRenderer.module.scss';
import * as telemetry from '../../../common/telemetry';
/**
 * Base renderer. Used to render text.
 */
var FieldBaseTextRenderer = /** @class */ (function (_super) {
    __extends(FieldBaseTextRenderer, _super);
    function FieldBaseTextRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldBaseTextRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldBaseTextRenderer.prototype.render = function () {
        var text = this.props.text || ' ';
        return (React.createElement("div", { className: css(this.props.className, styles.baseText), style: this.props.cssProps },
            this.props.noTextRender ? null : React.createElement("span", null, text),
            this.props.children));
    };
    return FieldBaseTextRenderer;
}(React.Component));
export { FieldBaseTextRenderer };
//# sourceMappingURL=FieldBaseTextRenderer.js.map