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
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { css } from '@fluentui/react/lib/Utilities';
import { DragDropFiles } from '../../dragDropFiles/DragDropFiles';
import * as strings from 'ControlStrings';
import styles from './MultipleUploadFilePickerTab.module.scss';
var MultipleUploadFilePickerTab = /** @class */ (function (_super) {
    __extends(MultipleUploadFilePickerTab, _super);
    function MultipleUploadFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        _this.displayFileNames = function (filesResult) {
            var result = [];
            for (var i = 0; i < filesResult.length; i++) {
                result.push(React.createElement("div", { key: i.toString(), className: styles.localTabFilename }, filesResult[i].fileName));
            }
            return result;
        };
        /**
         * Gets called when files are uploaded via drag and drop
         */
        _this._handleFileUpload = function (files) {
            if (files.length < 1) {
                return;
            }
            else {
                var filePickerResultsArray = [];
                var _loop_1 = function (i) {
                    var file = files[i];
                    var filePickerResult = {
                        fileAbsoluteUrl: null,
                        fileName: file.name,
                        fileSize: file.size,
                        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(file.name),
                        downloadFileContent: function () { return Promise.resolve(file); }
                    };
                    filePickerResultsArray.push(filePickerResult);
                };
                for (var i = 0; i < files.length; i++) {
                    _loop_1(i);
                }
                _this.setState({
                    filePickerResult: filePickerResultsArray
                });
                _this.props.onChange(filePickerResultsArray);
            }
        };
        /**
         * Gets called when files are uploaded via file explorer
         */
        _this._handleFileUploadExplorer = function (event) {
            if (!event || event.target.files.length < 1) {
                return;
            }
            else {
                var files = [];
                for (var i = 0; i < event.target.files.length; i++) {
                    var file = event.target.files.item(i);
                    files.push(file);
                }
                _this._handleFileUpload(files);
            }
        };
        /**
         * Saves base64 encoded image back to property pane file picker
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResult);
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
    MultipleUploadFilePickerTab.prototype.render = function () {
        var _this = this;
        var filePickerResult = this.state.filePickerResult;
        var acceptedFilesExtensions = this.props.accepts ? this.props.accepts.join(",") : null;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.UploadLinkLabel + " " + strings.OneDriveRootFolderName)),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) },
                React.createElement(DragDropFiles, { iconName: "BulkUpload", onDrop: this._handleFileUpload },
                    React.createElement("div", { className: styles.localTabDragDropFile },
                        React.createElement("input", { className: styles.localTabInput, type: "file", id: "fileInput", accept: acceptedFilesExtensions, multiple: true, onChange: function (event) { return _this._handleFileUploadExplorer(event); } }),
                        React.createElement("label", { className: styles.localTabLabel, htmlFor: "fileInput" }, strings.UploadLinkLabel + " " + strings.OneDriveRootFolderName))),
                React.createElement("div", null, (filePickerResult) ? this.displayFileNames(filePickerResult) : ""),
                this.props.renderCustomMultipleUploadTabContent && this.props.renderCustomMultipleUploadTabContent(this.state.filePickerResult)),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: !filePickerResult, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.ListItemAttachmentslPlaceHolderButtonLabel + " " + strings.OneDriveRootFolderName),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return MultipleUploadFilePickerTab;
}(React.Component));
export default MultipleUploadFilePickerTab;
//# sourceMappingURL=MultipleUploadFilePickerTab.js.map