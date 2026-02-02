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
import { Dialog, DialogType } from '@fluentui/react/lib/Dialog';
import { Link } from '@fluentui/react/lib/Link';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import * as telemetry from '../../../common/telemetry';
import styles from './FieldLookupRenderer.module.scss';
import { IFrameDialog } from '../../iFrameDialog/IFrameDialog';
import { SPHelper } from '../../../Utilities';
/**
 * Field Lookup Renderer.
 * Used for:
 *   - Lookup, LookupMulti
 */
var FieldLookupRenderer = /** @class */ (function (_super) {
    __extends(FieldLookupRenderer, _super);
    function FieldLookupRenderer(props, state) {
        var _this = _super.call(this, props, state) || this;
        telemetry.track('FieldLookupRenderer', {});
        _this.state = {
            hideDialog: true,
            dispFormUrl: props.dispFormUrl
        };
        return _this;
    }
    FieldLookupRenderer.prototype.render = function () {
        var _this = this;
        var lookupLinks = this.props.lookups.map(function (lookup) {
            return React.createElement(Link, { key: lookup.lookupId, onClick: _this._onClick.bind(_this, lookup), className: styles.lookup, style: _this.props.cssProps }, lookup.lookupValue);
        });
        return (React.createElement("div", { style: this.props.cssProps, className: css(this.props.className) },
            lookupLinks,
            !this.state.hideDialog && this.state.dispFormUrl && React.createElement(IFrameDialog, { url: this.state.lookupDispFormUrl, iframeOnLoad: this._onIframeLoaded.bind(this), hidden: this.state.hideDialog, onDismiss: this._onDialogDismiss.bind(this), modalProps: {
                    isBlocking: true,
                    containerClassName: styles.dialogContainer
                }, dialogContentProps: {
                    type: DialogType.close,
                    showCloseButton: true
                }, width: '570px', height: '250px' }),
            !this.state.hideDialog && !this.state.dispFormUrl && React.createElement(Dialog, { onDismiss: this._onDialogDismiss.bind(this), modalProps: {
                    isBlocking: true,
                    containerClassName: styles.dialogContainer
                }, dialogContentProps: {
                    type: DialogType.close,
                    showCloseButton: true
                } },
                React.createElement(Spinner, { size: SpinnerSize.large }))));
    };
    FieldLookupRenderer.prototype._onClick = function (lookup) {
        var _this = this;
        if (this.props.onClick) {
            var args = {
                lookup: lookup
            };
            this.props.onClick(args);
            return;
        }
        //
        // showing Display Form in the dialog
        //
        var dispFormUrl = this.state.dispFormUrl;
        if (dispFormUrl) {
            this.setState({
                lookupDispFormUrl: "".concat(dispFormUrl).concat((dispFormUrl.indexOf('?') === -1 ? '?' : '&'), "ID=").concat(lookup.lookupId, "&RootFolder=*&IsDlg=1"),
                hideDialog: false
            });
        }
        else if (this.props.fieldId) {
            this.setState({
                hideDialog: false
            });
            SPHelper.getLookupFieldListDispFormUrl(this.props.fieldId, this.props.context).then(function (dispFormUrlValue) {
                var listDispFormUrl = dispFormUrlValue.toString();
                _this.setState(function (prevState, props) {
                    if (prevState.hideDialog) {
                        return;
                    }
                    return {
                        dispFormUrl: listDispFormUrl,
                        lookupDispFormUrl: "".concat(listDispFormUrl, "&ID=").concat(lookup.lookupId, "&RootFolder=*&IsDlg=1")
                    };
                });
            })
                .catch(function () {
                // no-op;
            });
        }
    };
    FieldLookupRenderer.prototype._onIframeLoaded = function (iframe) {
        //
        // some additional configuration to beutify content of the iframe
        //
        var iframeWindow = iframe.contentWindow;
        var iframeDocument = iframeWindow.document;
        var s4Workspace = iframeDocument.getElementById('s4-workspace');
        s4Workspace.style.height = iframe.style.height;
        s4Workspace.scrollIntoView();
    };
    FieldLookupRenderer.prototype._onDialogDismiss = function () {
        this.setState({
            hideDialog: true
        });
    };
    return FieldLookupRenderer;
}(React.Component));
export { FieldLookupRenderer };
//# sourceMappingURL=FieldLookupRenderer.js.map