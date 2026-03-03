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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import styles from './IFrameDialogContent.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import omit from 'lodash/omit';
/**
 * IFrame Dialog content
 */
var IFrameDialogContent = /** @class */ (function (_super) {
    __extends(IFrameDialogContent, _super);
    function IFrameDialogContent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isContentVisible: false
        };
        return _this;
    }
    IFrameDialogContent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.iFrameDialog },
            React.createElement("iframe", __assign({ ref: function (iframe) { _this._iframe = iframe; }, frameBorder: 0, onLoad: this._iframeOnLoad.bind(this), style: { width: '100%', height: '100%', visibility: this.state.isContentVisible ? 'visible' : 'hidden' } }, omit(this.props, 'height'))),
            !this.state.isContentVisible &&
                React.createElement("div", { className: styles.spinnerContainer },
                    React.createElement(Spinner, { size: SpinnerSize.large }))));
    };
    IFrameDialogContent.prototype._iframeOnLoad = function () {
        try { // for cross origin requests we can have issues with accessing frameElement
            /* eslint-disable @typescript-eslint/no-explicit-any */
            this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
            this._iframe.contentWindow.frameElement.commitPopUp = this.props.close;
            // SP.UI.Dialog has misspelling of commitPopUp
            this._iframe.contentWindow.frameElement.commitPopup = this.props.close;
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }
        catch (err) {
            if (err.name !== 'SecurityError') {
                throw err;
            }
        }
        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }
        this.setState({
            isContentVisible: true
        });
    };
    return IFrameDialogContent;
}(React.Component));
export { IFrameDialogContent };
//# sourceMappingURL=IFrameDialogContent.js.map