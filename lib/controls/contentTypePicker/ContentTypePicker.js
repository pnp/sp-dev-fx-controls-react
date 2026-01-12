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
import * as React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { Dropdown, } from '@fluentui/react/lib/Dropdown';
import { Spinner, SpinnerSize, } from '@fluentui/react/lib/Spinner';
import * as telemetry from '../../common/telemetry';
import { SPServiceFactory } from '../../services/SPServiceFactory';
var EMPTY_CONTENTTYPE_KEY = 'NO_CONTENTTYPE_SELECTED';
var ContentTypePicker = /** @class */ (function (_super) {
    __extends(ContentTypePicker, _super);
    function ContentTypePicker(props) {
        var _this = _super.call(this, props) || this;
        _this._selectedContentTypes = null;
        /**
         * Fires when an item has been selected from the dropdown.
         * @param event Event that has been fired.
         * @param option The new selection.
         * @param index Index of the selection.
         */
        _this.onChange = function (event, option, index) {
            var _a = _this.props, multiSelect = _a.multiSelect, onSelectionChanged = _a.onSelectionChanged;
            var contentTypes = _this.state.contentTypes;
            if (multiSelect) {
                var selectedContentTypes = _this._selectedContentTypes ? cloneDeep(_this._selectedContentTypes) : [];
                if (option.selected) {
                    selectedContentTypes.push(option.key.toString());
                }
                else {
                    selectedContentTypes = selectedContentTypes.filter(function (ct) { return ct !== option.key; });
                }
                _this._selectedContentTypes = selectedContentTypes;
            }
            else {
                _this._selectedContentTypes = option.key.toString();
            }
            if (onSelectionChanged) {
                if (multiSelect) {
                    onSelectionChanged(cloneDeep(contentTypes.filter(function (ct) { return _this._selectedContentTypes.some(function (sct) { return ct.StringId === sct; }); })));
                }
                else {
                    onSelectionChanged(cloneDeep(contentTypes.find(function (ct) { return ct.StringId === _this._selectedContentTypes; })));
                }
            }
        };
        telemetry.track('ReactContentTypePicker');
        _this.state = {
            contentTypes: [],
            loading: false,
        };
        return _this;
    }
    ContentTypePicker.prototype.componentDidMount = function () {
        this.loadContentTypes().then(function () { }).catch(function () { });
    };
    ContentTypePicker.prototype.loadContentTypes = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, context, listId, includeHidden, includeReadOnly, orderBy, filter, group, webAbsoluteUrl, filterItems, service, results;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, context = _a.context, listId = _a.listId, includeHidden = _a.includeHidden, includeReadOnly = _a.includeReadOnly, orderBy = _a.orderBy, filter = _a.filter, group = _a.group, webAbsoluteUrl = _a.webAbsoluteUrl, filterItems = _a.filterItems;
                        // Show the loading indicator and disable the dropdown
                        this.setState({ loading: true });
                        service = SPServiceFactory.createService(context, true, 5000, webAbsoluteUrl);
                        return [4 /*yield*/, service.getContentTypes({
                                listId: listId,
                                filter: filter,
                                includeHidden: includeHidden,
                                includeReadOnly: includeReadOnly,
                                orderBy: orderBy,
                                group: group,
                            })];
                    case 1:
                        results = _b.sent();
                        // Check if custom filter is specified
                        if (filterItems) {
                            results = filterItems(results);
                        }
                        // Hide the loading indicator and set the dropdown options
                        this.setState({
                            loading: false,
                            contentTypes: results,
                        });
                        this.setSelectedContentTypes();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the currently selected content type(s).
     */
    ContentTypePicker.prototype.setSelectedContentTypes = function () {
        this._selectedContentTypes = cloneDeep(this.props.selectedContentTypes);
        this.setState({
            selectedContentTypes: this._selectedContentTypes,
        });
    };
    ContentTypePicker.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.props, includeHidden = _a.includeHidden, includeReadOnly = _a.includeReadOnly, orderBy = _a.orderBy, webAbsoluteUrl = _a.webAbsoluteUrl, selectedContentTypes = _a.selectedContentTypes, listId = _a.listId;
        if (prevProps.includeHidden !== includeHidden ||
            prevProps.includeReadOnly !== includeReadOnly ||
            prevProps.orderBy !== orderBy ||
            prevProps.webAbsoluteUrl !== webAbsoluteUrl ||
            prevProps.listId !== listId) {
            this.loadContentTypes().then(function () { }).catch(function () { });
        }
        if (prevProps.selectedContentTypes !== selectedContentTypes) {
            this.setSelectedContentTypes();
        }
    };
    ContentTypePicker.prototype.render = function () {
        var _a = this.state, loading = _a.loading, contentTypes = _a.contentTypes, selectedContentTypes = _a.selectedContentTypes;
        var _b = this.props, className = _b.className, disabled = _b.disabled, multiSelect = _b.multiSelect, label = _b.label, placeholder = _b.placeholder, showBlankOption = _b.showBlankOption;
        var options = contentTypes.map(function (f) { return ({
            key: f.StringId,
            text: f.Name,
        }); });
        if (showBlankOption && !multiSelect) {
            // Provide empty option
            options.unshift({
                key: EMPTY_CONTENTTYPE_KEY,
                text: '',
            });
        }
        var dropdownProps = {
            className: className,
            options: options,
            disabled: loading || disabled,
            label: label,
            placeholder: placeholder,
            onChange: this.onChange,
            styles: this.props.styles
        };
        if (multiSelect) {
            dropdownProps.multiSelect = true;
            dropdownProps.selectedKeys = selectedContentTypes;
        }
        else {
            dropdownProps.selectedKey = selectedContentTypes;
        }
        return (React.createElement(React.Fragment, null,
            loading && React.createElement(Spinner, { size: SpinnerSize.xSmall }),
            React.createElement(Dropdown, __assign({}, dropdownProps))));
    };
    return ContentTypePicker;
}(React.Component));
export { ContentTypePicker };
//# sourceMappingURL=ContentTypePicker.js.map