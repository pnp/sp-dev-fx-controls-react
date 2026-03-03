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
import { Icon } from '@fluentui/react/lib/Icon';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldAttachmentsRenderer.module.scss';
/**
 * Attachments Renderer.
 * Used for:
 *   - Attachments
 */
var FieldAttachmentsRenderer = /** @class */ (function (_super) {
    __extends(FieldAttachmentsRenderer, _super);
    function FieldAttachmentsRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldAttachmentsRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldAttachmentsRenderer.prototype.render = function () {
        return (React.createElement("div", { className: css(this.props.className, styles.container, styles.fabricIcon), style: this.props.cssProps }, this.props.count && React.createElement(Icon, { iconName: 'Attach' })));
    };
    return FieldAttachmentsRenderer;
}(React.Component));
export { FieldAttachmentsRenderer };
//# sourceMappingURL=FieldAttachmentsRenderer.js.map