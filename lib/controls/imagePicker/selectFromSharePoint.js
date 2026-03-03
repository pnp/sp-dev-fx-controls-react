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
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable require-atomic-updates */
import * as React from 'react';
import strings from 'ControlStrings';
import { useAtomValue } from 'jotai';
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, FluentProvider, Image, mergeClasses, Spinner, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, tokens, } from '@fluentui/react-components';
import { contextState } from './atoms/contextState';
import { IMG_SUPPORTED_EXTENSIONS } from './constants/constants';
import { useGraphAPI } from './hooks/useGrapAPI';
import { useSpAPI } from './hooks/useSpAPI';
import { useUtils } from './hooks/useUtils';
import { RenderHeader } from './renderHeader/RenderHeader';
import { SelectStockImage } from './SelectStokImage';
import { UploadImageFiles } from './Upload';
import { useImagePickerStyles } from './useImagePickerStyles';
import { has } from 'lodash';
import { useTheme } from '@fluentui/react-theme-provider';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
var defaultImage = require('./constants/defaultImage.png');
var TENANT_NAME = window.location.hostname;
var SOURCE_SHAREPOINT = "AND -path:https://*my.sharepoint.com";
var SOURCE_ONEDRIVE = "AND path:https://*my.sharepoint.com";
var SOURCE_STOCK = "stockImages";
var SOURCE_UPLOAD = "upload";
var acceptableExtensions = IMG_SUPPORTED_EXTENSIONS.split(',');
var queryExtensions = acceptableExtensions
    .map(function (ext) { return "fileType:".concat(ext); })
    .join(' OR ');
var PAGE_ITEMS = 50;
export var SelectFromSharePoint = function (props) {
    var isOpen = props.isOpen, onDismiss = props.onDismiss, onFileSelected = props.onFileSelected;
    var _a = React.useState(false), isAdding = _a[0], setIsAdding = _a[1];
    var _b = React.useState([]), searchResults = _b[0], setSearchResults = _b[1];
    var appContext = useAtomValue(contextState);
    var context = appContext.context;
    var searchImages = useGraphAPI(context).searchImages;
    var downLoadSpOrOneDriveContent = useSpAPI(context).downLoadSpOrOneDriveContent;
    var _c = React.useState(null), selectedImage = _c[0], setSelectedImage = _c[1];
    var refSelectedImage = React.useRef(null);
    var isScrolling = React.useRef(false);
    var styles = useImagePickerStyles();
    var _d = React.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = React.useState(SOURCE_SHAREPOINT), source = _e[0], setSource = _e[1];
    var _f = useUtils(), getFileNameFromUrl = _f.getFileNameFromUrl, getFileNameWithoutExtension = _f.getFileNameWithoutExtension, getScrollPosition = _f.getScrollPosition;
    var refStart = React.useRef(0);
    var refHasMore = React.useRef(false);
    var _g = React.useState(), theme = _g[0], setTheme = _g[1];
    var currentSPTheme = useTheme();
    var _h = React.useState(false), isInitialized = _h[0], setIsInitialized = _h[1];
    var hasSelectedImage = React.useMemo(function () { return selectedImage !== null; }, [selectedImage]);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var teamsContext, teamsTheme;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!has(context, 'sdks.microsoftTeams.teamsJs.app.getContext')) return [3 /*break*/, 2];
                        return [4 /*yield*/, ((_a = context.sdks.microsoftTeams) === null || _a === void 0 ? void 0 : _a.teamsJs.app.getContext())];
                    case 1:
                        teamsContext = _b.sent();
                        teamsTheme = teamsContext.app.theme || 'default';
                        switch (teamsTheme) {
                            case 'dark':
                                setTheme(teamsDarkTheme);
                                break;
                            case 'contrast':
                                setTheme(teamsHighContrastTheme);
                                break;
                            case 'default':
                                setTheme(teamsLightTheme);
                                break;
                            default:
                                setTheme(teamsLightTheme);
                                break;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        setTheme(createV9Theme(currentSPTheme));
                        _b.label = 3;
                    case 3:
                        setIsInitialized(true);
                        return [2 /*return*/];
                }
            });
        }); })().catch(function (error) {
            console.error('Error initializing theme:', error);
            setTheme(createV9Theme(currentSPTheme));
            setIsInitialized(true);
        });
    }, [context, currentSPTheme]);
    var getMoreResultsSearch = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var results, fields_1, hasMoreResults, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (source === SOURCE_STOCK || source === SOURCE_UPLOAD)
                        return [2 /*return*/];
                    if (!refHasMore.current)
                        return [2 /*return*/];
                    refStart.current += PAGE_ITEMS;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, searchImages("(".concat(queryExtensions, ") ").concat(source), refStart.current)];
                case 2:
                    results = _a.sent();
                    fields_1 = results.fields, hasMoreResults = results.hasMoreResults;
                    refHasMore.current = hasMoreResults;
                    setSearchResults(function (prev) { return __spreadArray(__spreadArray([], prev, true), fields_1, true); });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('[getMoreResultsSearch] error:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [searchImages, source]);
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var results, fields, hasMoreResults, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context || source === SOURCE_STOCK || source === SOURCE_UPLOAD)
                            return [2 /*return*/];
                        setIsLoading(true);
                        setSelectedImage(null);
                        refStart.current = 0;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, searchImages("(".concat(queryExtensions, ") ").concat(source), refStart.current)];
                    case 2:
                        results = _a.sent();
                        fields = results.fields, hasMoreResults = results.hasMoreResults;
                        refHasMore.current = hasMoreResults;
                        setSearchResults(fields);
                        return [3 /*break*/, 5];
                    case 3:
                        error_2 = _a.sent();
                        console.error('[useEffect] error:', error_2);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    }, [source, context, searchImages]);
    var onSelectFile = React.useCallback(function () {
        if (!refSelectedImage.current)
            return;
        var _a = refSelectedImage.current, defaultEncodingURL = _a.defaultEncodingURL, driveId = _a.driveId, id = _a.id, filename = _a.filename, fileType = _a.fileType;
        var image = driveId
            ? "".concat(window.location.origin, "/_api/v2.1/sites/").concat(TENANT_NAME, "/drives/").concat(driveId, "/items/").concat(id, "/thumbnails/0/c400x999/content?prefer=noredirect,closestavailablesize,extendCacheMaxAge")
            : fileType === 'svg'
                ? defaultEncodingURL
                : defaultImage;
        var fileResult = {
            downloadFileContent: function () {
                return downLoadSpOrOneDriveContent(driveId, id, filename);
            },
            fileAbsoluteUrl: defaultEncodingURL,
            fileName: getFileNameFromUrl(defaultEncodingURL),
            fileNameWithoutExtension: getFileNameWithoutExtension(defaultEncodingURL),
            previewDataUrl: image,
        };
        onFileSelected(fileResult);
        onDismiss(true);
    }, [
        downLoadSpOrOneDriveContent,
        onDismiss,
        onFileSelected,
        getFileNameFromUrl,
        getFileNameWithoutExtension,
    ]);
    var renderDialogActions = React.useMemo(function () { return (React.createElement(React.Fragment, null,
        React.createElement(Button, { disabled: !hasSelectedImage, appearance: "primary", onClick: onSelectFile }, strings.ImagePickderSelectLabel),
        React.createElement(Button, { onClick: function () { return onDismiss(false); }, disabled: isAdding }, strings.ImagePickerCancelLabel))); }, [hasSelectedImage, onSelectFile, onDismiss, isAdding]);
    var onSourceSelected = React.useCallback(function (source) {
        switch (source) {
            case 'sharePoint':
                setSource(SOURCE_SHAREPOINT);
                break;
            case 'onDrive':
                setSource(SOURCE_ONEDRIVE);
                break;
            case 'stockImage':
                setSource(SOURCE_STOCK);
                break;
            case 'upload':
                setSource(SOURCE_UPLOAD);
                break;
        }
    }, []);
    var onScroll = React.useCallback(function (ev) { return __awaiter(void 0, void 0, void 0, function () {
        var scrollPosition;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    scrollPosition = getScrollPosition(ev.target);
                    if (!(scrollPosition > 98 && !isScrolling.current)) return [3 /*break*/, 2];
                    isScrolling.current = true;
                    return [4 /*yield*/, getMoreResultsSearch()];
                case 1:
                    _a.sent();
                    isScrolling.current = false;
                    _a.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    }); }, [getMoreResultsSearch, getScrollPosition]);
    var imageFallback = React.useCallback(function (e) {
        e.currentTarget.src = defaultImage;
    }, []);
    var renderSharepointOrOnDriveImages = React.useCallback(function () { return (React.createElement("div", { className: styles.grid, onScroll: onScroll }, searchResults &&
        searchResults.map(function (item) {
            var src = item.fileType === 'svg' || !item.driveId
                ? item.defaultEncodingURL
                : "".concat(window.location.origin, "/_api/v2.1/sites/").concat(item.siteID, "/drives/").concat(item.driveId, "/items/").concat(item.id, "/thumbnails/0/c400x999/content?prefer=noredirect,closestavailablesize,extendCacheMaxAge}");
            return (React.createElement(Image, { key: item.id, src: src, alt: item.title, style: { height: '100px' }, fit: "cover", className: mergeClasses(styles.image, selectedImage === item && styles.selectedImage), onClick: function () {
                    refSelectedImage.current = item;
                    setSelectedImage(item);
                }, onError: imageFallback }));
        }))); }, [searchResults, selectedImage, styles, onScroll]);
    var renderSelectedImage = React.useCallback(function () {
        switch (source) {
            case SOURCE_SHAREPOINT:
            case SOURCE_ONEDRIVE:
                return renderSharepointOrOnDriveImages();
            case SOURCE_STOCK:
                return (React.createElement(SelectStockImage, { onFileSelected: function (file) {
                        onFileSelected(file);
                        onDismiss(true);
                    }, onCancel: function () { return onDismiss(false); }, context: context }));
            case SOURCE_UPLOAD:
                return (React.createElement(UploadImageFiles, { context: context, onSelectedFile: function (file) {
                        refSelectedImage.current = file;
                        setSelectedImage(file);
                    } }));
        }
    }, [
        source,
        renderSharepointOrOnDriveImages,
        context,
        onDismiss,
        onFileSelected,
    ]);
    if (!isOpen)
        return null;
    return (React.createElement(Dialog, { open: isOpen, modalType: "modal" },
        React.createElement(FluentProvider, { theme: theme },
            React.createElement(DialogSurface, { style: { backgroundColor: tokens.colorNeutralBackground2 } },
                React.createElement(RenderHeader, { title: strings.ImagePickderSelectLabel, description: strings.ImagePickerPanelHeaderText, icon: 'guidance:tools', onDismiss: onDismiss }),
                React.createElement(DialogBody, { style: { gap: 0 } },
                    React.createElement(DialogContent, { style: { marginBottom: 15, minHeight: 500 } },
                        React.createElement("div", { className: styles.toolbarContainer },
                            React.createElement(Button, { appearance: source === SOURCE_SHAREPOINT ? 'primary' : 'secondary', shape: "circular", onClick: function () { return onSourceSelected('sharePoint'); } }, strings.ImagePickerSharePointTabLabel),
                            React.createElement(Button, { appearance: source === SOURCE_ONEDRIVE ? 'primary' : 'secondary', shape: "circular", onClick: function () { return onSourceSelected('onDrive'); } }, strings.ImagePickerOneDriveTabLabel),
                            React.createElement(Button, { appearance: source === SOURCE_STOCK ? 'primary' : 'secondary', shape: "circular", onClick: function () { return onSourceSelected('stockImage'); } }, strings.ImagePickerStockImagesTabLabel),
                            React.createElement(Button, { appearance: source === SOURCE_UPLOAD ? 'primary' : 'secondary', shape: "circular", onClick: function () { return onSourceSelected('upload'); } }, strings.ImagePickerUploadTabLabel)),
                        isLoading ? (React.createElement(Spinner, { style: { paddingTop: 60 } })) : (renderSelectedImage())),
                    source !== SOURCE_STOCK && (React.createElement(DialogActions, { fluid: true, position: "end", style: { marginTop: 10 } }, renderDialogActions)))))));
};
//# sourceMappingURL=selectFromSharePoint.js.map