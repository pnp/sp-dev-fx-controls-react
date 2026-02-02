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
import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import * as telemetry from '../../../common/telemetry';
/**
 * Field Date Renderer.
 * Used for:
 *   - Date Time
 */
var FieldDateRenderer = /** @class */ (function (_super) {
    __extends(FieldDateRenderer, _super);
    function FieldDateRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldDateRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldDateRenderer.prototype.render = function () {
        return (React.createElement(FieldBaseTextRenderer, { cssProps: this.props.cssProps, className: css(this.props.className), noTextRender: true }, this.props.text));
    };
    return FieldDateRenderer;
}(React.Component));
export { FieldDateRenderer };
//# sourceMappingURL=FieldDateRenderer.js.map