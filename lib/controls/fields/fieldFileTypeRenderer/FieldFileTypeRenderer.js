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
import { FileTypeIcon, IconType } from '../../fileTypeIcon';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldFileTypeRenderer.module.scss';
/**
 * File Type Renderer.
 * Used for:
 *   - File/Document Type
 */
var FieldFileTypeRenderer = /** @class */ (function (_super) {
    __extends(FieldFileTypeRenderer, _super);
    function FieldFileTypeRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldFileTypeRenderer', {});
        _this.state = {};
        return _this;
    }
    FieldFileTypeRenderer.prototype.render = function () {
        var optionalStyles = {};
        optionalStyles[styles.folder] = this.props.isFolder;
        return (React.createElement("div", { className: css(this.props.className, styles.container, styles.fabricIcon, optionalStyles), style: this.props.cssProps }, this.props.isFolder ? React.createElement(Icon, { iconName: 'FabricFolderFill' }) : React.createElement(FileTypeIcon, { type: IconType.font, path: this.props.path })));
    };
    return FieldFileTypeRenderer;
}(React.Component));
export { FieldFileTypeRenderer };
//# sourceMappingURL=FieldFileTypeRenderer.js.map