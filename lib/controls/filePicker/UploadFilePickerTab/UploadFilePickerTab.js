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
import { css } from '@fluentui/react/lib/Utilities';
import * as strings from 'ControlStrings';
import styles from './UploadFilePickerTab.module.scss';
var UploadFilePickerTab = /** @class */ (function (_super) {
    __extends(UploadFilePickerTab, _super);
    function UploadFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        _this._loadPreiview = function (file) {
            return new Promise(function (resolve) {
                if (!GeneralHelper.isImage(file.name)) {
                    resolve(undefined);
                    return;
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    resolve(reader.result);
                };
            });
        };
        /**
         * Gets called when a file is uploaded
         */
        _this._handleFileUpload = function (event) { return __awaiter(_this, void 0, void 0, function () {
            var files, file, filePickerResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!event.target.files || event.target.files.length < 1) {
                            return [2 /*return*/];
                        }
                        files = event.target.files;
                        file = files[0];
                        filePickerResult = {
                            fileAbsoluteUrl: null,
                            fileName: file.name,
                            fileSize: file.size,
                            fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(file.name),
                            downloadFileContent: function () { return Promise.resolve(file); }
                        };
                        if (!GeneralHelper.isImage(file.name)) return [3 /*break*/, 2];
                        // Convert to base64 image
                        _a = filePickerResult;
                        return [4 /*yield*/, this._loadPreiview(file)];
                    case 1:
                        // Convert to base64 image
                        _a.previewDataUrl = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.setState({
                            filePickerResult: filePickerResult,
                            filePreview: filePickerResult.previewDataUrl
                        });
                        this.props.onChange([filePickerResult]);
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Saves base64 encoded image back to property pane file picker
         */
        _this._handleSave = function () {
            _this.props.onSave([_this.state.filePickerResult]);
        };
        /**
         * Closes tab without saving
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        _this.state = {
            filePickerResult: undefined
        };
        return _this;
    }
    UploadFilePickerTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, filePickerResult = _a.filePickerResult, filePreview = _a.filePreview;
        var fileName = filePickerResult ? filePickerResult.fileName : null;
        var acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.UploadFileHeader)),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) },
                React.createElement("input", { className: styles.localTabInput, type: "file", id: "fileInput", accept: acceptedFilesExtensions, multiple: false, onChange: function (event) { return _this._handleFileUpload(event); } }),
                fileName && filePreview &&
                    /** Display image preview */
                    React.createElement("div", { className: styles.localTabSinglePreview },
                        React.createElement("img", { className: styles.localTabSinglePreviewImage, src: filePreview, alt: filePickerResult.fileName }),
                        React.createElement("span", null, fileName)),
                React.createElement("div", null,
                    React.createElement("label", { className: styles.localTabFilename }, (!filePreview && fileName ? fileName : ""))),
                React.createElement("label", { className: styles.localTabLabel, htmlFor: "fileInput" }, (fileName ? strings.ChangeFileLinkLabel : strings.ChooseFileLinkLabel)),
                this.props.renderCustomUploadTabContent && this.props.renderCustomUploadTabContent(this.state.filePickerResult)),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: !filePickerResult, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.AddFileButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return UploadFilePickerTab;
}(React.Component));
export default UploadFilePickerTab;
//# sourceMappingURL=UploadFilePickerTab.js.map