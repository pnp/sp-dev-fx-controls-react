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
import * as React from 'react';
import { Panel } from '@fluentui/react/lib/Panel';
import omit from 'lodash/omit';
import { IFramePanelContent } from './IFramePanelContent';
import * as telemetry from '../../common/telemetry';
var IFramePanel = /** @class */ (function (_super) {
    __extends(IFramePanel, _super);
    function IFramePanel(props) {
        var _this = _super.call(this, props) || this;
        telemetry.track('ReactIFramePanel', {});
        _this.state = {};
        return _this;
    }
    /**
     * Default React render
     */
    IFramePanel.prototype.render = function () {
        var _a = this.props, height = _a.height, allowFullScreen = _a.allowFullScreen, iframeOnLoad = _a.iframeOnLoad, allowTransparency = _a.allowTransparency, name = _a.name, sandbox = _a.sandbox, scrolling = _a.scrolling, seamless = _a.seamless;
        return (React.createElement(Panel, __assign({}, omit(this.props, 'className')),
            React.createElement(IFramePanelContent, { src: this.props.url, iframeOnLoad: iframeOnLoad, close: this.props.onDismiss, height: height, allowFullScreen: allowFullScreen, allowTransparency: allowTransparency, name: name, sandbox: sandbox, scrolling: scrolling, seamless: seamless })));
    };
    return IFramePanel;
}(React.Component));
export { IFramePanel };
//# sourceMappingURL=IFramePanel.js.map