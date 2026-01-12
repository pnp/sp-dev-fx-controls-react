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
import styles from './DragDropFiles.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';
/**
 * DragDropFiles Class Control
 */
var DragDropFiles = /** @class */ (function (_super) {
    __extends(DragDropFiles, _super);
    function DragDropFiles(props) {
        var _this = _super.call(this, props) || this;
        _this.dragCounter = 0;
        _this.dropRef = React.createRef();
        /**
         * Stop listeners from onDragOver event.
         * @param e
         */
        _this.handleonDragOver = function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                e.dataTransfer.dropEffect = e.dataTransfer.dropEffect = _this.props.dropEffect;
            }
        };
        /**
         * Stop listeners from onDragEnter event, enable drag and drop view.
         * @param e
         */
        _this.handleonDragEnter = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.dragCounter++;
            if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
                e.dataTransfer.dropEffect = _this._dropEffect;
                _this.setState({ dragStatus: true });
            }
        };
        /**
         * Stop listeners from ondragenter event, disable drag and drop view.
         * @param e
         */
        _this.handleonDragLeave = function (e) {
            e.preventDefault();
            e.stopPropagation();
            _this.dragCounter--;
            if (_this.dragCounter === 0) {
                _this.setState({ dragStatus: false });
            }
        };
        /**
        * Stop listeners from onDrop event and load files to property onDrop.
        * @param e
        */
        _this.handleonDrop = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        e.preventDefault();
                        e.stopPropagation();
                        this.setState({ dragStatus: false });
                        if (!(e.dataTransfer && e.dataTransfer.items)) return [3 /*break*/, 2];
                        _b = (_a = this.props).onDrop;
                        return [4 /*yield*/, this.getFilesAsync(e)];
                    case 1:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 2;
                    case 2:
                        e.dataTransfer.clearData();
                        this.dragCounter = 0;
                        return [2 /*return*/];
                }
            });
        }); };
        /**
           * Add File to Array Files of type File[]
           * https://www.meziantou.net/upload-files-and-directories-using-an-input-drag-and-drop-or-copy-and-paste-with.htm
           * @param dataTransfer
           */
        _this.getFilesAsync = function (e) { return __awaiter(_this, void 0, void 0, function () {
            var Customfiles, items, Directory, entry, files, i, item, file, file, file, entryContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Customfiles = e.dataTransfer;
                        items = Customfiles.items;
                        Directory = [];
                        files = [];
                        for (i = 0; i < items.length; i++) {
                            item = items[i];
                            if (item.kind === "file") {
                                /**
                                 * This method retrieves Files from Folders
                                 * defensive code to only use method when exist in browser if not only return files.
                                 * https://developer.mozilla.org/en-US/docs/Web/API/DataTransferItem/webkitGetAsEntry
                                */
                                if (item.getAsEntry) { // eslint-disable-line @typescript-eslint/no-explicit-any
                                    entry = item.getAsEntry(); // eslint-disable-line @typescript-eslint/no-explicit-any
                                    if (entry.isDirectory) {
                                        Directory.push(entry);
                                    }
                                    else {
                                        file = item.getAsFile();
                                        if (file) {
                                            file.fullPath = ""; // eslint-disable-line @typescript-eslint/no-explicit-any
                                            files.push(file);
                                        }
                                    }
                                }
                                else if (item.webkitGetAsEntry) {
                                    entry = item.webkitGetAsEntry();
                                    if (entry.isDirectory) {
                                        Directory.push(entry);
                                    }
                                    else {
                                        file = item.getAsFile();
                                        if (file) {
                                            file.fullPath = ""; // eslint-disable-line @typescript-eslint/no-explicit-any
                                            files.push(file);
                                        }
                                    }
                                }
                                else if ("function" === typeof item.getAsFile) {
                                    file = item.getAsFile();
                                    if (file) {
                                        file.fullPath = ""; // eslint-disable-line @typescript-eslint/no-explicit-any
                                        files.push(file);
                                    }
                                }
                                continue;
                            }
                        }
                        if (!(Directory.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.readEntryContentAsync(Directory)];
                    case 1:
                        entryContent = _a.sent();
                        files.push.apply(files, entryContent);
                        _a.label = 2;
                    case 2: return [2 /*return*/, files];
                }
            });
        }); };
        // Returns a promise with all the files of the directory hierarchy
        /**
         *
         * @param entry
         */
        _this.readEntryContentAsync = function (Directory) {
            return new Promise(function (resolve, reject) {
                var reading = 0;
                var contents = [];
                Directory.forEach(function (entry) {
                    readEntry(entry, "");
                });
                function readEntry(entry, path) {
                    if (entry.isDirectory) {
                        readReaderContent(entry.createReader());
                    }
                    else {
                        reading++;
                        entry.file(function (file) {
                            reading--;
                            file.fullPath = path; // eslint-disable-line @typescript-eslint/no-explicit-any
                            contents.push(file);
                            if (reading === 0) {
                                resolve(contents);
                            }
                        });
                    }
                }
                function readReaderContent(reader) {
                    reading++;
                    reader.readEntries(function (entries) {
                        reading--;
                        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
                            var entry = entries_1[_i];
                            readEntry(entry, entry.fullPath);
                        }
                        if (reading === 0) {
                            resolve(contents);
                        }
                    });
                }
            });
        };
        // Initialize state
        _this.state = {
            dragStatus: false
        };
        return _this;
    }
    /**
   * Lifecycle hook when component is mounted
   */
    DragDropFiles.prototype.componentDidMount = function () {
        var _a = this.props, dropEffect = _a.dropEffect, enable = _a.enable;
        if (dropEffect === undefined || dropEffect === "") {
            this._dropEffect = "copy";
        }
        else {
            this._dropEffect = dropEffect;
        }
        if (enable === undefined) {
            this._enable = true;
        }
        else {
            this._enable = enable;
        }
        // Add EventListeners for drag zone area
        var divDropArea = this.dropRef.current;
        if (this._enable === true) {
            divDropArea.addEventListener('dragenter', this.handleonDragEnter);
            divDropArea.addEventListener('dragleave', this.handleonDragLeave);
            divDropArea.addEventListener('dragover', this.handleonDragOver);
            divDropArea.addEventListener('drop', this.handleonDrop);
        }
    };
    /**
     * Default React component render method
     */
    DragDropFiles.prototype.render = function () {
        var dragStatus = this.state.dragStatus;
        var _a = this.props, labelMessage = _a.labelMessage, iconName = _a.iconName;
        if (labelMessage === undefined || labelMessage === "") {
            this._LabelMessage = "";
        }
        else {
            this._LabelMessage = labelMessage;
        }
        if (iconName === undefined || iconName === "") {
            this._IconName = "";
        }
        else {
            this._IconName = iconName;
        }
        return (React.createElement("div", { className: (dragStatus && this._enable) ? styles.DragDropFilesArea : styles.DragDropFilesAreaLeave, ref: this.dropRef },
            (dragStatus && this._enable) &&
                React.createElement("div", { className: styles.DragDropFilesAreaBorder },
                    React.createElement("div", { className: styles.DragDropFilesAreaZone },
                        React.createElement(Icon, { iconName: this._IconName, className: "ms-IconExample" }),
                        React.createElement("div", null, this._LabelMessage))),
            this.props.children));
    };
    return DragDropFiles;
}(React.Component));
export { DragDropFiles };
//# sourceMappingURL=DragDropFiles.js.map