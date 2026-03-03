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
import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import { Link } from '@fluentui/react/lib/Link';
import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldNameRenderer.module.scss';
/**
 * Field Title Renderer.
 * Used for:
 *   - Title
 */
var FieldNameRenderer = /** @class */ (function (_super) {
    __extends(FieldNameRenderer, _super);
    function FieldNameRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldNameRenderer', {});
        _this.state = {};
        _this._onDoubleClick = _this._onDoubleClick.bind(_this);
        return _this;
    }
    FieldNameRenderer.prototype.componentDidMount = function () {
        //
        // small hack for double click.
        // unfortunately, we can't use React onDoubleClick because React doesn't guaranty the sequence of handlers.
        // And stopPropagation could not make effect.
        //
        if (this.props.onDoubleClick && this.props.isLink) {
            var domNode = ReactDOM.findDOMNode(this); // eslint-disable-line react/no-find-dom-node
            this._button = domNode.querySelector('button');
            this._button.addEventListener('dblclick', this._onDoubleClick, false);
        }
    };
    FieldNameRenderer.prototype.componentWillUnmount = function () {
        if (this._button) {
            this._button.removeEventListener('dblclick', this._onDoubleClick);
        }
    };
    FieldNameRenderer.prototype.render = function () {
        var isLink = this.props.isLink;
        //
        // for now only signal for New documents is implemented
        //
        var signal = this.props.isNew ? React.createElement("span", { className: css(styles.signal, styles.newItem) },
            React.createElement(Icon, { iconName: 'Glimmer', className: css(styles.newIcon) })) : null;
        var value;
        if (isLink) {
            if (this.props.onClick) {
                value = React.createElement(Link, { onClick: this._onClick.bind(this), style: this.props.cssProps, className: styles.value }, this.props.text);
            }
            else {
                var url = void 0;
                var filePath = this.props.filePath;
                var parentPath = filePath.substring(0, filePath.lastIndexOf('/'));
                if (this.props.hasPreview !== false) {
                    url = "#id=".concat(encodeURIComponent(filePath), "&parent=").concat(encodeURIComponent(parentPath));
                }
                else {
                    url = filePath;
                }
                value = React.createElement(Link, { href: url, style: this.props.cssProps, className: styles.value }, this.props.text);
            }
        }
        else {
            value = React.createElement(FieldBaseTextRenderer, { cssProps: this.props.cssProps, text: this.props.text });
        }
        return React.createElement("span", { className: css(styles.signalField, this.props.className), style: this.props.cssProps },
            signal,
            React.createElement("span", { className: styles.signalFieldValue }, value));
    };
    FieldNameRenderer.prototype._onClick = function (e) {
        if (this.props.onClick) {
            e.stopPropagation();
            e.preventDefault();
            var args = this.props;
            this.props.onClick(args);
            return false;
        }
    };
    FieldNameRenderer.prototype._onDoubleClick = function (e) {
        if (this.props.onDoubleClick) {
            e.stopPropagation();
            e.preventDefault();
            var args = this.props;
            this.props.onDoubleClick(args);
            return false;
        }
    };
    return FieldNameRenderer;
}(React.Component));
export { FieldNameRenderer };
//# sourceMappingURL=FieldNameRenderer.js.map