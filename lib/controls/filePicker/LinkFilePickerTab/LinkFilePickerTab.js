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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { css } from '@fluentui/react/lib/Utilities';
import * as strings from 'ControlStrings';
import styles from './LinkFilePickerTab.module.scss';
var LinkFilePickerTab = /** @class */ (function (_super) {
    __extends(LinkFilePickerTab, _super);
    function LinkFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Called as user types in a new value
         */
        _this._handleChange = function (fileUrl) {
            var filePickerResult = fileUrl ? {
                fileAbsoluteUrl: fileUrl,
                fileName: GeneralHelper.getFileNameFromUrl(fileUrl),
                fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(fileUrl),
                downloadFileContent: function () { return _this.props.fileSearchService.downloadBingContent(fileUrl, GeneralHelper.getFileNameFromUrl(fileUrl)); }
            } : null;
            _this.setState({
                filePickerResult: filePickerResult
            });
        };
        /**
         * Verifies the url that was typed in
         * @param value
         */
        _this._getErrorMessagePromise = function (value) { return __awaiter(_this, void 0, void 0, function () {
            var fileExists, strResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // DOn't give an error for blank or placeholder value, but don't make it a valid entry either
                        if (value === undefined || value === '') {
                            this.setState({ isValid: false });
                            return [2 /*return*/, ''];
                        }
                        // Make sure that user is typing a valid URL format
                        if (!this._isUrl(value)) {
                            this.setState({ isValid: false });
                            return [2 /*return*/, strings.InvalidUrlError];
                        }
                        // If we don't allow external links, verify that we're in the same domain
                        if (!this.props.allowExternalLinks && !this._isSameDomain(value)) {
                            this.setState({ isValid: false });
                            return [2 /*return*/, strings.NoExternalLinksValidationMessage];
                        }
                        if (!this.props.checkIfFileExists) {
                            this.setState({ isValid: true });
                            return [2 /*return*/, ''];
                        }
                        return [4 /*yield*/, this.props.fileSearchService.checkFileExists(value)];
                    case 1:
                        fileExists = _a.sent();
                        this.setState({ isValid: fileExists });
                        strResult = fileExists ? '' : strings.ProvidedValueIsInvalid;
                        return [2 /*return*/, strResult];
                }
            });
        }); };
        /**
         * Handles when user saves
         */
        _this._handleSave = function () {
            _this.props.onSave([_this.state.filePickerResult]);
        };
        /**
         * HAndles when user closes without saving
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Is this a URL ?
         * (insert guy holding a butterfly meme)
         */
        _this._isUrl = function (fileUrl) {
            try {
                var myURL = new URL(fileUrl.toLowerCase());
                return myURL.host !== undefined;
            }
            catch (_a) {
                return false;
            }
        };
        _this._isSameDomain = function (fileUrl) {
            if (fileUrl) {
                return true;
            }
            var siteUrl = _this.props.context.pageContext.web.absoluteUrl;
            var siteDomainParts = GeneralHelper.getDomain(siteUrl).split('.');
            var fileDomainParts = GeneralHelper.getDomain(fileUrl).split('.');
            return siteDomainParts[0] === fileDomainParts[0] || "".concat(siteDomainParts[0], "-my") === fileDomainParts[0];
        };
        _this.state = { isValid: false };
        return _this;
    }
    LinkFilePickerTab.prototype.render = function () {
        var _this = this;
        var fileUrl = this.state.filePickerResult ? this.state.filePickerResult.fileAbsoluteUrl : null;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.LinkHeader)),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) },
                React.createElement(TextField, { multiline: true, required: true, resizable: false, deferredValidationTime: 300, className: styles.linkTextField, label: strings.LinkFileInstructions, ariaLabel: strings.LinkFileInstructions, placeholder: "https://", onGetErrorMessage: function (value) { return _this._getErrorMessagePromise(value); }, autoAdjustHeight: false, underlined: false, borderless: false, validateOnFocusIn: false, validateOnFocusOut: false, validateOnLoad: true, value: fileUrl, onChange: function (e, newValue) { return _this._handleChange(newValue); } }),
                this.props.renderCustomLinkTabContent && this.props.renderCustomLinkTabContent(this.state.filePickerResult)),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: !this.state.isValid, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.OpenButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return LinkFilePickerTab;
}(React.Component));
export default LinkFilePickerTab;
//# sourceMappingURL=LinkFilePickerTab.js.map