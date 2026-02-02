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
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import strings from "ControlStrings";
import { useAtomValue } from "jotai";
import { useDropzone } from "react-dropzone";
import { Body1, Caption1, tokens, } from "@fluentui/react-components";
import { Icon } from "@iconify/react";
import { contextState } from "../atoms/contextState";
import { EUploadLocations } from "../constants/EUploadLocations";
import { useDeleteFile } from "../hooks/useDeleteFile";
import { SelectUploadLocation } from "./SelectUploadLocation";
import { UpLoadFile } from "./UploadFile";
import { useUploadFilesStyles } from "./useUploadFilesStyles";
var validateFileTypes = function (file) {
    var acceptedFiles = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"];
    return acceptedFiles.includes(file.type)
        ? null
        : {
            code: "file-invalid-type",
            message: "file type ".concat(file.type, " is not supported"),
        };
};
export var UploadFiles = function (props) {
    var _a = React.useState([]), files = _a[0], setFiles = _a[1];
    var onSelectedFile = props.onSelectedFile;
    var _b = React.useState([]), renderFiles = _b[0], setRenderFiles = _b[1];
    var _c = React.useState(""), selectedFileId = _c[0], setSelectedFileId = _c[1];
    var _d = React.useState(EUploadLocations.CurrentSite), selectedUploadLocation = _d[0], setSelectedUploadLocation = _d[1];
    var appContext = useAtomValue(contextState);
    var deleteFile = useDeleteFile(appContext.context)[0];
    var styles = useUploadFilesStyles();
    React.useEffect(function () {
        onSelectedFile(null);
    }, []);
    var onDrop = React.useCallback(function (acceptedFiles) {
        var newFiles = acceptedFiles.map(function (file) {
            return Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
        });
        setFiles(function (prevFiles) { return __spreadArray(__spreadArray([], prevFiles, true), newFiles, true); });
    }, []);
    var onFileSelected = React.useCallback(function (file) {
        setSelectedFileId(file.id);
        onSelectedFile(file);
    }, [onSelectedFile]);
    var onDelete = React.useCallback(function (fileName, driveId, libraryId, itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    if (!(itemId && driveId && libraryId)) return [3 /*break*/, 2];
                    return [4 /*yield*/, deleteFile(driveId, libraryId, itemId, selectedUploadLocation)];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    setFiles(function (prevFiles) { return prevFiles.filter(function (f) { return f.name !== fileName; }); });
                    onSelectedFile(null);
                    return [2 /*return*/, true];
                case 3:
                    _a = _b.sent();
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [onSelectedFile]);
    React.useEffect(function () {
        var filesControl = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var file = files_1[_i];
            filesControl.push(React.createElement(UpLoadFile, { key: file.name, file: file, onFileSelected: onFileSelected, selectedFileId: selectedFileId, uploadLocation: selectedUploadLocation, onDelete: function (filename, driveId, libraryId, itemId) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, onDelete(filename, driveId, libraryId, itemId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); } }));
        }
        setRenderFiles(filesControl);
        return function () {
            files.forEach(function (file) { return URL.revokeObjectURL(file.preview); });
        };
    }, [files, onFileSelected]);
    var _e = useDropzone({
        accept: {
            "image/*": [".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"],
        },
        onDrop: onDrop,
        maxFiles: 10,
        validator: validateFileTypes,
    }), getRootProps = _e.getRootProps, getInputProps = _e.getInputProps, isFocused = _e.isFocused, isDragAccept = _e.isDragAccept, isDragReject = _e.isDragReject, isDragActive = _e.isDragActive, fileRejections = _e.fileRejections;
    var focusedStyle = React.useMemo(function () {
        return { borderColor: tokens.colorNeutralBackground3Pressed };
    }, []);
    var acceptStyle = React.useMemo(function () {
        return { borderColor: tokens.colorNeutralBackground3Pressed };
    }, []);
    var rejectStyle = React.useMemo(function () {
        return {
            borderColor: tokens.colorStatusDangerBackground1,
        };
    }, []);
    var style = React.useMemo(function () { return (__assign(__assign(__assign({}, (isFocused ? focusedStyle : {})), (isDragAccept ? acceptStyle : {})), (isDragReject ? rejectStyle : {}))); }, [isFocused, isDragAccept, isDragReject]);
    var hasFilesRejection = React.useMemo(function () {
        return fileRejections.length > 0;
    }, [fileRejections]);
    var fileRejectionItems = React.useMemo(function () {
        return fileRejections.map(function (_a) {
            var file = _a.file, errors = _a.errors;
            return (React.createElement(Caption1, { key: file.name, style: { color: tokens.colorStatusDangerForeground1 } },
                file.name,
                " - ",
                errors.map(function (e) { return e.message; }).join(", ")));
        });
    }, [fileRejections]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.containerGlobalMarginTop },
            React.createElement(SelectUploadLocation, { onSelectedLocation: function (location) { return setSelectedUploadLocation(location); } }),
            React.createElement("div", __assign({}, getRootProps({ className: styles.baseStyle, style: style })),
                React.createElement("input", __assign({}, getInputProps())),
                React.createElement("div", { className: styles.dragContainer },
                    React.createElement(Icon, { icon: "mage:image-upload", className: styles.dragDropIconStyles }),
                    isDragAccept && React.createElement(Caption1, null, strings.ImagePickerDragFilesAccpted),
                    isDragReject && React.createElement(Caption1, null, strings.ImagePickerDragFilesRejected),
                    !isDragActive && React.createElement(Caption1, null, strings.ImagePickerDragFilesActive),
                    React.createElement(Body1, null, strings.ImagePickerDragDropText))),
            React.createElement("div", { className: styles.containerGlobalMarginTop }, hasFilesRejection && fileRejectionItems),
            React.createElement("div", { className: styles.imagesContainer }, renderFiles))));
};
//# sourceMappingURL=UploadFiles.js.map