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
import styles from './StockImages.module.scss';
import { GeneralHelper } from '../../../Utilities';
var StockImages = /** @class */ (function (_super) {
    __extends(StockImages, _super);
    function StockImages() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._handleImageIframeEvent = function (event) {
            if (!event || !event.origin || event.origin.indexOf("https://hubblecontent.osi.office.net") !== 0) {
                return;
            }
            var eventData = JSON.parse(event.data);
            if (eventData.MessageId === "AddItem") {
                _this._handleSave(eventData);
            }
            else if (eventData.MessageId === "CancelDialog") {
                _this._handleClose();
            }
        };
        /**
         * Called when user saves
         */
        _this._handleSave = function (event) {
            var filePickerResult = null;
            var cdnFileInfo = event.Values && event.Values.length > 0 ? event.Values[0] : null;
            if (cdnFileInfo) {
                filePickerResult = {
                    downloadFileContent: function () { return _this.props.fileSearchService.downloadBingContent(cdnFileInfo.sourceUrl, GeneralHelper.getFileNameFromUrl(GeneralHelper.getFileNameFromUrl(cdnFileInfo.sourceUrl))); },
                    fileAbsoluteUrl: cdnFileInfo.sourceUrl,
                    fileName: GeneralHelper.getFileNameFromUrl(cdnFileInfo.sourceUrl),
                    fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(cdnFileInfo.sourceUrl)
                };
            }
            _this.props.onSave([filePickerResult]);
        };
        /**
         * Called when user closes tab
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        return _this;
    }
    StockImages.prototype.componentDidMount = function () {
        window.addEventListener("message", this._handleImageIframeEvent);
    };
    StockImages.prototype.componentWillUnmount = function () {
        window.removeEventListener("message", this._handleImageIframeEvent);
    };
    StockImages.prototype.render = function () {
        var language = this.props.language;
        var themesColor = "&themecolors=".concat(encodeURIComponent(this.getCurrentThemeConfiguration()));
        var contentPickerUrl = "https://hubblecontent.osi.office.net/contentsvc/m365contentpicker/index.html?p=3&app=1001&aud=prod&channel=devmain&setlang=".concat(language, "&msel=0&env=prod&premium=1").concat(themesColor);
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tab },
                React.createElement("div", { className: styles.stockImagesPickerContainer },
                    React.createElement("iframe", { className: styles.stockImagesPicker, role: "application", id: "stockImagesIFrame", src: contentPickerUrl })))));
    };
    StockImages.prototype.getCurrentThemeConfiguration = function () {
        if (!window["__themeState__"] || !window["__themeState__"].theme) {
            return "";
        }
        var primaryColor = window["__themeState__"].theme.themePrimary;
        var textColor = window["__themeState__"].theme.primaryText;
        var primaryBackground = window["__themeState__"].theme.bodyBackground;
        var neutralLighter = window["__themeState__"].theme.neutralLighter;
        var theme = "{\"primaryColor\":\"".concat(primaryColor, "\",\"textColor\":\"").concat(textColor, "\",\"backgroundColor\":\"").concat(primaryBackground, "\",\"neutralLighterColor\":\"").concat(neutralLighter, "\"}");
        return theme;
    };
    return StockImages;
}(React.Component));
export { StockImages };
//# sourceMappingURL=StockImages.js.map