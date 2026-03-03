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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Joao Mendes November 2018, SPFx reusable Control ListItemAttachments
import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Label } from "@fluentui/react/lib/Label";
import * as strings from 'ControlStrings';
import styles from './ListItemAttachments.module.scss';
import { UploadAttachment } from './UploadAttachment';
import { DocumentCard, DocumentCardActions, DocumentCardPreview } from '@fluentui/react/lib/DocumentCard';
import { ImageFit } from '@fluentui/react/lib/Image';
import SPservice from "../../services/SPService";
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import utilities from './utilities';
import { Placeholder } from "../placeholder";
import * as telemetry from '../../common/telemetry';
var ListItemAttachments = /** @class */ (function (_super) {
    __extends(ListItemAttachments, _super);
    function ListItemAttachments(props) {
        var _this = _super.call(this, props) || this;
        _this.previewImages = {};
        /**
         * Close the dialog
         */
        _this._closeDialog = function () {
            _this.setState({
                fireUpload: false,
                hideDialog: true,
                dialogMessage: '',
                file: null,
                deleteAttachment: false,
            });
            _this.loadAttachments().then(function () { }).catch(function () { });
        };
        /**
         * Attachment uploaded event handler
         */
        _this._onAttachmentUpload = function (file) { return __awaiter(_this, void 0, void 0, function () {
            var files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // load Attachments
                        if (!this.state.itemId) {
                            files = this.state.filesToUpload || [];
                            files.push(file);
                            this.setState({
                                filesToUpload: __spreadArray([], files, true)
                            });
                        }
                        return [4 /*yield*/, this.loadAttachments()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * On delete attachment event handler
         *
         * @param file
         */
        _this.onDeleteAttachment = function (file) {
            _this.setState({
                fireUpload: false,
                hideDialog: false,
                deleteAttachment: true,
                file: file,
                dialogMessage: strings.ListItemAttachmentsconfirmDelete.replace('{0}', file.FileName),
            });
        };
        /**
         * Delete the attachment once it was confirmed
         */
        _this.onConfirmedDeleteAttachment = function () { return __awaiter(_this, void 0, void 0, function () {
            var file, updatedItem, filesToUpload, fileToRemove, attachments, attachmentToRemove, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = this.state.file;
                        this.setState({
                            fireUpload: false,
                            disableButton: true,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        if (!this.state.itemId) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._spservice.deleteAttachment(file.FileName, this.props.listId, this.state.itemId, this.props.webUrl)];
                    case 2:
                        updatedItem = _a.sent();
                        // Notify parent component of the ETag change
                        if (updatedItem && this.props.onAttachmentChange) {
                            this.props.onAttachmentChange(updatedItem);
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        filesToUpload = this.state.filesToUpload;
                        fileToRemove = filesToUpload.find(function (f) { return f.name === file.FileName; });
                        if (fileToRemove) {
                            filesToUpload.splice(filesToUpload.indexOf(fileToRemove), 1);
                        }
                        attachments = this.state.attachments;
                        attachmentToRemove = attachments.find(function (attachment) { return attachment.FileName === file.FileName; });
                        if (attachmentToRemove) {
                            attachments.splice(attachments.indexOf(attachmentToRemove), 1);
                        }
                        this.setState({
                            filesToUpload: __spreadArray([], filesToUpload, true),
                            attachments: __spreadArray([], attachments, true)
                        });
                        _a.label = 4;
                    case 4:
                        this.setState({
                            fireUpload: false,
                            hideDialog: false,
                            deleteAttachment: false,
                            disableButton: false,
                            file: null,
                            dialogMessage: strings.ListItemAttachmentsfileDeletedMsg.replace('{0}', file.FileName),
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.setState({
                            fireUpload: false,
                            hideDialog: false,
                            file: null,
                            deleteAttachment: false,
                            dialogMessage: strings.ListItemAttachmentsfileDeleteError.replace('{0}', file.FileName).replace('{1}', error_1.message)
                        });
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        telemetry.track('ReactListItemAttachments', {});
        _this.state = {
            file: null,
            hideDialog: true,
            dialogMessage: '',
            attachments: [],
            deleteAttachment: false,
            disableButton: false,
            showPlaceHolder: false,
            fireUpload: false,
            filesToUpload: [],
            itemId: props.itemId
        };
        // Get SPService Factory
        _this._spservice = new SPservice(_this.props.context, _this.props.webUrl);
        _this._utilities = new utilities();
        return _this;
    }
    /**
     * componentDidMount lifecycle hook
     */
    ListItemAttachments.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadAttachments()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ListItemAttachments.prototype.loadAttachmentPreview = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._utilities.GetFileImageUrl(file).then(function (previewImageUrl) {
                        return {
                            name: file.FileName,
                            previewImageSrc: previewImageUrl,
                            iconSrc: '',
                            imageFit: ImageFit.center,
                            width: 187,
                            height: 130,
                        };
                    })];
            });
        });
    };
    ListItemAttachments.prototype.uploadAttachments = function (itemId) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedItem, _i, _a, file;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.state.filesToUpload) return [3 /*break*/, 5];
                        updatedItem = null;
                        _i = 0, _a = this.state.filesToUpload;
                        _b.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        file = _a[_i];
                        return [4 /*yield*/, this._spservice.addAttachment(this.props.listId, itemId, file.name, file, this.props.webUrl)];
                    case 2:
                        updatedItem = _b.sent();
                        _b.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        // Notify parent component of the ETag change (use the last updated item)
                        if (updatedItem && this.props.onAttachmentChange) {
                            this.props.onAttachmentChange(updatedItem);
                        }
                        _b.label = 5;
                    case 5: return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.setState({
                                filesToUpload: [],
                                itemId: itemId
                            }, function () { return _this.loadAttachments().then(resolve); });
                        })];
                }
            });
        });
    };
    ListItemAttachments.prototype.loadAttachmentsPreview = function (files) {
        var _this = this;
        var filePreviewImages = files.map(function (file) { return _this.loadAttachmentPreview(file); });
        return Promise.all(filePreviewImages).then(function (filePreviews) {
            filePreviews.forEach(function (preview) {
                _this.previewImages[preview.name] = preview;
            });
            _this.setState({
                fireUpload: false,
                hideDialog: true,
                dialogMessage: '',
                attachments: files,
                showPlaceHolder: files.length === 0 ? true : false
            });
        });
    };
    /**
     * Load Item Attachments
     */
    ListItemAttachments.prototype.loadAttachments = function () {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.state.itemId) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._spservice.getListItemAttachments(this.props.listId, this.state.itemId).then(function (files) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.loadAttachmentsPreview(files)];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }).catch(function (error) {
                                _this.setState({
                                    fireUpload: false,
                                    hideDialog: false,
                                    dialogMessage: strings.ListItemAttachmentserrorLoadAttachments.replace('{0}', error.message)
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(this.state.filesToUpload && this.state.filesToUpload.length > 0)) return [3 /*break*/, 4];
                        files = this.state.filesToUpload.map(function (file) { return ({
                            FileName: file.name,
                            ServerRelativeUrl: undefined
                        }); });
                        return [4 /*yield*/, this.loadAttachmentsPreview(files)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        this.setState({
                            fireUpload: false,
                            hideDialog: true,
                            dialogMessage: '',
                            showPlaceHolder: true
                        });
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Default React render method
     */
    ListItemAttachments.prototype.render = function () {
        var _this = this;
        var openAttachmentsInNewWindow = this.props.openAttachmentsInNewWindow;
        return (React.createElement("div", { className: styles.ListItemAttachments },
            React.createElement(UploadAttachment, { listId: this.props.listId, itemId: this.state.itemId, disabled: this.props.disabled, context: this.props.context, onAttachmentUpload: this._onAttachmentUpload, fireUpload: this.state.fireUpload, onUploadDialogClosed: function () { return _this.setState({ fireUpload: false }); }, onAttachmentChange: this.props.onAttachmentChange }),
            this.state.showPlaceHolder ?
                React.createElement(Placeholder, { iconName: 'Upload', iconText: this.props.label || strings.ListItemAttachmentslPlaceHolderIconText, description: this.props.description || strings.ListItemAttachmentslPlaceHolderDescription, buttonLabel: strings.ListItemAttachmentslPlaceHolderButtonLabel, hideButton: this.props.disabled, onConfigure: function () { return _this.setState({ fireUpload: true }); } })
                :
                    this.state.attachments.map(function (file) {
                        var fileName = file.FileName;
                        var previewImage = _this.previewImages[fileName];
                        var clickDisabled = !_this.state.itemId;
                        return (React.createElement("div", { key: fileName, className: styles.documentCardWrapper },
                            React.createElement(TooltipHost, { content: fileName, calloutProps: { gapSpace: 0, isBeakVisible: true }, closeDelay: 200, directionalHint: DirectionalHint.rightCenter },
                                React.createElement(DocumentCard, { onClickHref: !clickDisabled && !openAttachmentsInNewWindow && "".concat(file.ServerRelativeUrl, "?web=1"), onClick: !clickDisabled && openAttachmentsInNewWindow && (function () { return window.open("".concat(file.ServerRelativeUrl, "?web=1"), "_blank"); }), className: styles.documentCard },
                                    React.createElement(DocumentCardPreview, { previewImages: [previewImage] }),
                                    React.createElement(Label, { className: styles.fileLabel }, fileName),
                                    React.createElement(DocumentCardActions, { actions: [
                                            {
                                                iconProps: {
                                                    iconName: 'Delete',
                                                    title: strings.ListItemAttachmentsActionDeleteIconTitle,
                                                },
                                                title: strings.ListItemAttachmentsactionDeleteTitle,
                                                text: strings.ListItemAttachmentsactionDeleteTitle,
                                                disabled: _this.props.disabled,
                                                onClick: function (ev) {
                                                    ev.preventDefault();
                                                    ev.stopPropagation();
                                                    _this.onDeleteAttachment(file);
                                                }
                                            },
                                        ] })))));
                    }),
            !this.state.hideDialog &&
                React.createElement(Dialog, { hidden: this.state.hideDialog, type: DialogType.normal, onDismiss: this._closeDialog, dialogContentProps: {
                        type: DialogType.normal,
                        title: strings.ListItemAttachmentsdialogTitle,
                        subText: this.state.dialogMessage
                    }, modalProps: {
                        isBlocking: true,
                        containerClassName: 'ms-dialogMainOverride'
                    } },
                    React.createElement(DialogFooter, null,
                        React.createElement("div", { style: { marginBottom: 7 } }, this.state.disableButton ? React.createElement(Spinner, { size: SpinnerSize.medium }) : null),
                        this.state.deleteAttachment ? (React.createElement(PrimaryButton, { disabled: this.state.disableButton, onClick: this.onConfirmedDeleteAttachment }, strings.ListItemAttachmentsdialogOKbuttonLabelOnDelete)) : null,
                        this.state.deleteAttachment ? (React.createElement(DefaultButton, { disabled: this.state.disableButton, onClick: this._closeDialog }, strings.ListItemAttachmentsdialogCancelButtonLabel))
                            : React.createElement(PrimaryButton, { onClick: this._closeDialog }, strings.ListItemAttachmentsdialogOKbuttonLabel)))));
    };
    return ListItemAttachments;
}(React.Component));
export { ListItemAttachments };
//# sourceMappingURL=ListItemAttachments.js.map