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
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Async } from '@fluentui/react/lib/Utilities';
import * as telemetry from '../../common/telemetry';
import { SPServiceFactory } from '../../services/SPServiceFactory';
import styles from './ViewPicker.module.scss';
// Empty view value
var EMPTY_VIEW_KEY = 'NO_VIEW_SELECTED';
var ViewPicker = /** @class */ (function (_super) {
    __extends(ViewPicker, _super);
    function ViewPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.selectedKey = null;
        /**
         * Fires when a view has been selected from the dropdown.
         * @param option The new selection.
         * @param index Index of the selection.
         */
        _this.onChange = function (event, option, index) {
            var _a = _this.props, multiSelect = _a.multiSelect, onSelectionChanged = _a.onSelectionChanged;
            var selectedViews = null;
            if (multiSelect) {
                selectedViews = _this.state.selectedView ? cloneDeep(_this.state.selectedView) : [];
                if (option.selected) {
                    selectedViews.push(option.key.toString());
                }
                else {
                    selectedViews = selectedViews.filter(function (view) { return view !== option.key; });
                }
            }
            else {
                selectedViews = option.key.toString();
            }
            _this.setState({
                selectedView: selectedViews
            });
            if (onSelectionChanged) {
                onSelectionChanged(cloneDeep(selectedViews));
            }
        };
        telemetry.track('ViewPicker');
        _this.state = {
            results: []
        };
        _this.async = new Async(_this);
        return _this;
    }
    ViewPicker.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Start retrieving the list views
                    return [4 /*yield*/, this.loadViews()];
                    case 1:
                        // Start retrieving the list views
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    ViewPicker.prototype.componentDidUpdate = function (prevProps, _prevState) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.props.listId !== prevProps.listId ||
                            this.props.webAbsoluteUrl !== prevProps.webAbsoluteUrl ||
                            this.props.orderBy !== prevProps.orderBy)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadViews()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (prevProps.selectedView !== this.props.selectedView) {
                            this.setSelectedViews();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Called when the component will unmount
    */
    ViewPicker.prototype.componentWillUnmount = function () {
        if (typeof this.async !== 'undefined') {
            this.async.dispose();
        }
    };
    ViewPicker.prototype.loadViews = function () {
        return __awaiter(this, void 0, void 0, function () {
            var viewsToExclude, options, service, results;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewsToExclude = this.props.viewsToExclude || [];
                        options = [];
                        service = SPServiceFactory.createService(this.props.context, true, 5000, this.props.webAbsoluteUrl);
                        return [4 /*yield*/, service.getViews(this.props.listId, this.props.orderBy, this.props.filter)];
                    case 1:
                        results = _a.sent();
                        // Start mapping the views that are selected
                        results.value.forEach(function (view) {
                            if (_this.props.selectedView === view.Id) {
                                _this.selectedKey = view.Id;
                            }
                            // Make sure that the current view is NOT in the 'viewsToExclude' array
                            if (viewsToExclude.indexOf(view.Title) === -1 && viewsToExclude.indexOf(view.Id) === -1) {
                                options.push({
                                    key: view.Id,
                                    text: view.Title
                                });
                            }
                        });
                        if (this.props.showBlankOption) {
                            // Provide empty option
                            options.unshift({
                                key: EMPTY_VIEW_KEY,
                                text: '',
                            });
                        }
                        else {
                            // Option to unselect the view
                            options.unshift({
                                key: EMPTY_VIEW_KEY,
                                text: EMPTY_VIEW_KEY
                            });
                        }
                        this.setSelectedViews();
                        // Update the current component state
                        this.setState({
                            results: options
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set the currently selected views(s);
     */
    ViewPicker.prototype.setSelectedViews = function () {
        var _selectedView = cloneDeep(this.props.selectedView);
        this.setState({
            selectedView: _selectedView
        });
    };
    /**
     * Renders the ViewPicker controls with Office UI Fabric
     */
    ViewPicker.prototype.render = function () {
        var _a = this.state, results = _a.results, selectedView = _a.selectedView;
        var _b = this.props, className = _b.className, disabled = _b.disabled, multiSelect = _b.multiSelect, label = _b.label, placeholder = _b.placeholder;
        var options = results.map(function (v) { return ({
            key: v.key,
            text: v.text
        }); });
        var dropdownProps = {
            className: className,
            options: options,
            disabled: disabled,
            label: label,
            placeholder: placeholder,
            onChange: this.onChange,
        };
        if (multiSelect) {
            dropdownProps.multiSelect = true;
            dropdownProps.selectedKeys = selectedView;
        }
        else {
            dropdownProps.selectedKey = selectedView;
        }
        // Renders content
        return (React.createElement("div", { className: styles.viewPicker },
            React.createElement(Dropdown, __assign({}, dropdownProps))));
    };
    return ViewPicker;
}(React.Component));
export { ViewPicker };
//# sourceMappingURL=ViewPicker.js.map