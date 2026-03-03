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
import { Icon } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import styles from './NewFolder.module.scss';
import * as strings from 'ControlStrings';
import { FolderExplorerService } from '../../../services/FolderExplorerService';
var addIcon = { iconName: 'CheckMark' };
var NewFolder = /** @class */ (function (_super) {
    __extends(NewFolder, _super);
    function NewFolder(props) {
        var _this = _super.call(this, props) || this;
        _this._onFolderNameChange = function (newValue) {
            _this.setState({ folderName: newValue || '', errorMessage: '' });
        };
        _this._onShowInputChange = function (event) {
            _this.setState({ showInput: true });
        };
        /**
       * Add new subfolder to current folder
       */
        _this._addSubFolder = function () { return __awaiter(_this, void 0, void 0, function () {
            var newFolder, siteAbsoluteUrl, folder, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newFolder = null;
                        this.setState({ loading: true });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        siteAbsoluteUrl = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
                        return [4 /*yield*/, this._spService.AddFolder(siteAbsoluteUrl, this.props.selectedFolder.ServerRelativeUrl, this.state.folderName)];
                    case 2:
                        folder = _a.sent();
                        // update folder variable to be used on the callback
                        newFolder = { Name: folder.Name, ServerRelativeUrl: folder.ServerRelativeUrl };
                        // update return variable
                        this.setState({ loading: false, folderName: '' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error adding folder', error_1);
                        this.setState({
                            loading: false,
                            errorMessage: strings.SomethingWentWrong
                        });
                        return [3 /*break*/, 4];
                    case 4:
                        // callback
                        this.props.addSubFolder(newFolder).then(function () { }).catch(function () { });
                        return [2 /*return*/];
                }
            });
        }); };
        _this._spService = new FolderExplorerService(_this.props.context.serviceScope);
        _this.state = {
            folderName: '',
            showInput: false,
            loading: false,
        };
        return _this;
    }
    NewFolder.prototype.render = function () {
        var _this = this;
        var _a = this.state, folderName = _a.folderName, errorMessage = _a.errorMessage;
        var hasError = folderName && /["*:<>?/\\|]/gmi.test(folderName);
        return (React.createElement("div", { className: styles.libraryItem },
            this.state.loading &&
                React.createElement("span", { className: styles.spinner },
                    React.createElement(Spinner, { size: SpinnerSize.xSmall, styles: {
                            root: {
                                height: '32px'
                            }
                        } })),
            !this.state.loading &&
                React.createElement(Icon, { iconName: "FabricNewFolder", className: styles.folderIcon }),
            !this.state.showInput &&
                React.createElement("div", { className: styles.defaultText, onClick: this._onShowInputChange }, "New folder"),
            this.state.showInput &&
                React.createElement(TextField, { styles: {
                        errorMessage: {
                            paddingTop: 0
                        },
                        root: {
                            width: '100%'
                        }
                    }, placeholder: strings.NewFolderNamePlaceholder, value: folderName, onChange: function (e, value) { return _this._onFolderNameChange(value); }, errorMessage: hasError ? strings.NewFolderIncorrectSymbolsError : errorMessage }),
            this.state.folderName.length > 0 &&
                React.createElement(IconButton, { iconProps: addIcon, title: "Add", ariaLabel: "Add", className: styles.button, disabled: this.state.loading || hasError, onClick: this._addSubFolder })));
    };
    return NewFolder;
}(React.Component));
export { NewFolder };
//# sourceMappingURL=NewFolder.js.map