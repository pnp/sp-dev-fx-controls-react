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
import styles from './IFramePanelContent.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import omit from 'lodash/omit';
/**
 * IFrame Panel content
 */
var IFramePanelContent = /** @class */ (function (_super) {
    __extends(IFramePanelContent, _super);
    function IFramePanelContent(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Resize the iframe element
         */
        _this.resizeIframe = function () {
            if (!_this.props.height) {
                if (_this._iframe) {
                    var mainDiv = _this.findParent(_this._iframe, "ms-Panel-main");
                    var commandsDiv = mainDiv.querySelector(".ms-Panel-commands");
                    var headerDiv = mainDiv.querySelector(".ms-Panel-header");
                    var footerDiv = mainDiv.querySelector(".ms-Panel-footer");
                    var height = _this.getTrueHeight(mainDiv);
                    height = height - _this.getTrueHeight(commandsDiv);
                    height = height - _this.getTrueHeight(headerDiv);
                    height = height - _this.getTrueHeight(footerDiv);
                    height = height - 25; // padding on content div
                    _this._iframe.height = height.toString() + 'px';
                }
            }
        };
        /**
         * On iframe load event
         */
        _this.iframeOnLoad = function () {
            try { // for cross origin requests we can have issues with accessing frameElement
                /* eslint-disable @typescript-eslint/no-explicit-any */
                _this._iframe.contentWindow.frameElement.cancelPopUp = _this.props.close;
                _this._iframe.contentWindow.frameElement.commitPopUp = _this.props.close;
                // SP.UI.Dialog has misspelling of commitPopUp
                _this._iframe.contentWindow.frameElement.commitPopup = _this.props.close;
                /* eslint-enable @typescript-eslint/no-explicit-any */
            }
            catch (err) {
                if (err.name !== 'SecurityError') {
                    throw err;
                }
            }
            _this.resizeIframe();
            if (_this.props.iframeOnLoad) {
                _this.props.iframeOnLoad(_this._iframe);
            }
            _this.setState({
                isContentVisible: true
            });
        };
        _this.state = {
            isContentVisible: false
        };
        window.onresize = _this.resizeIframe;
        return _this;
    }
    /**
     * Find the parent element
     *
     * @param elm
     * @param className
     */
    IFramePanelContent.prototype.findParent = function (elm, className) {
        while ((elm = elm.parentElement) && !elm.classList.contains(className))
            ;
        return elm;
    };
    /**
     * Get the element its height
     *
     * @param elm
     */
    IFramePanelContent.prototype.getTrueHeight = function (elm) {
        if (elm) {
            var style = window.getComputedStyle && window.getComputedStyle(elm) || elm.style;
            var marginTop = parseInt(style.marginTop.replace("px", ""));
            var marginBottom = parseInt(style.marginBottom.replace("px", ""));
            if (isNaN(marginTop)) {
                marginTop = 0;
            }
            if (isNaN(marginBottom)) {
                marginBottom = 0;
            }
            return elm.offsetHeight + marginTop + marginBottom;
        }
        else {
            return 0;
        }
    };
    /**
     * Default React render
     */
    IFramePanelContent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.iFrameDialog },
            React.createElement("iframe", __assign({ ref: function (iframe) { _this._iframe = iframe; }, frameBorder: 0, onLoad: this.iframeOnLoad, style: { width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' } }, omit(this.props, 'height'))),
            !this.state.isContentVisible && (React.createElement("div", { className: styles.spinnerContainer },
                React.createElement(Spinner, { size: SpinnerSize.large })))));
    };
    return IFramePanelContent;
}(React.Component));
export { IFramePanelContent };
//# sourceMappingURL=IFramePanelContent.js.map