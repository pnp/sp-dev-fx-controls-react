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
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Button, Image, } from '@fluentui/react-components';
import { Delete16Regular, Image20Regular, } from '@fluentui/react-icons';
/* import { RenderSpinner } from "./RenderSpninner/RenderSpinner"; */
import { SelectFromSharePoint } from './selectFromSharePoint';
import { contextState } from './atoms/contextState';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { useImagePickerStyles } from './useImagePickerStyles';
var maxWidth = 200;
var maxHeight = 200;
var useStyles = function () {
    return {
        image: css({
            minWidth: maxWidth,
            maxWidth: maxWidth,
            height: maxHeight,
            objectPosition: "top center",
        }),
    };
};
/**
 * Renders the preview image component.
 *
 * @param props - The component props.
 * @param props.selectedImageFileUrl - The URL of the selected image file.
 * @returns The JSX element representing the preview image component.
 */
var RenderPreviewImage = function (props) {
    var selectedImageFileUrl = props.selectedImageFileUrl;
    var maxWidth = 200;
    var maxHeight = 200;
    var styles = useImagePickerStyles();
    var imageStyles = useStyles();
    if (!selectedImageFileUrl) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.renderImageContainer },
            React.createElement(Image, { src: selectedImageFileUrl, fit: "cover", className: imageStyles.image, alt: "Selected Image" }))));
};
/**
 * Renders an image picker component.
 *
 * @component
 * @example
 * ```tsx
 * <ImagePicker
 *   onFileSelected={handleFileSelected}
 *   onDeleteFile={handleDeleteFile}
 *   selectedFileUrl={selectedImageUrl}
 *   context={appContext}
 * />
 * ```
 */
export var ImagePicker = function (props) {
    var onFileSelected = props.onFileSelected, onDeleteFile = props.onDeleteFile, selectedFileUrl = props.selectedFileUrl, context = props.context;
    var _a = React.useState(false), isOpen = _a[0], setIsOpen = _a[1];
    var styles = useImagePickerStyles();
    var ref = React.useRef(null);
    var _b = useAtom(contextState), appContext = _b[0], setAppContext = _b[1];
    React.useEffect(function () {
        setAppContext(__assign(__assign({}, appContext), { context: context }));
    }, []);
    var _c = React.useState(selectedFileUrl), selectedImageFileUrl = _c[0], setSelectedImageFileUrl = _c[1];
    var onDismiss = function () {
        setIsOpen(false);
    };
    var isFileSelected = React.useMemo(function () {
        return !!selectedImageFileUrl;
    }, [selectedImageFileUrl]);
    var onDeleteFileCLick = React.useCallback(function () {
        setSelectedImageFileUrl(undefined);
        onDeleteFile();
    }, []);
    var styleButtonDelete = { display: !isFileSelected ? "none" : "inline-flex" };
    if (!context)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.root, ref: ref },
            React.createElement("div", { className: styles.buttonContainer },
                React.createElement(Button, { icon: React.createElement(Image20Regular, null), shape: "circular", onClick: function () { return setIsOpen(true); } }, strings.ImagePickderSelectLabel),
                React.createElement(Button, { icon: React.createElement(Delete16Regular, null), shape: "circular", style: styleButtonDelete, onClick: function () { return onDeleteFileCLick(); } }, strings.ImagePickerDeleteImageLabel)),
            React.createElement(SelectFromSharePoint, { isOpen: isOpen, onDismiss: onDismiss, onFileSelected: function (file) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        onFileSelected(file);
                        setSelectedImageFileUrl(file.previewDataUrl);
                        onDismiss();
                        return [2 /*return*/];
                    });
                }); } }),
            React.createElement(RenderPreviewImage, { selectedImageFileUrl: selectedImageFileUrl }))));
};
//# sourceMappingURL=ImagePicker.js.map