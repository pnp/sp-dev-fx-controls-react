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
import { Mode } from './ILocationPicker';
import styles from './LocationPicker.module.scss';
import { SPHttpClient, HttpClient } from '@microsoft/sp-http';
import { Text } from '@fluentui/react/lib/Text';
import { Persona, PersonaSize } from '@fluentui/react/lib/Persona';
import { ComboBox } from '@fluentui/react/lib/ComboBox';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import * as strings from 'ControlStrings';
import { isEqual } from '@microsoft/sp-lodash-subset';
var LocationPicker = /** @class */ (function (_super) {
    __extends(LocationPicker, _super);
    /**
    * Constructor method
    */
    function LocationPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._token = null;
        _this.focusRef = null; // eslint-disable-line @typescript-eslint/no-explicit-any
        _this.onRenderOption = function (item) {
            var text = item.text, locationItem = item.locationItem;
            if (locationItem.EntityType === "Custom") {
                return React.createElement(Persona, { text: text, imageAlt: locationItem.EntityType, secondaryText: locationItem.DisplayName, size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials });
            }
            else
                return React.createElement(Persona, { text: text, imageAlt: locationItem.EntityType, secondaryText: _this.getLocationText(locationItem, "full"), size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials });
        };
        _this.getMainContent = function () {
            var _a = _this.state, options = _a.options, selectedItem = _a.selectedItem, currentMode = _a.currentMode;
            var _b = _this.props, className = _b.className, disabled = _b.disabled, placeholder = _b.placeholder, errorMessage = _b.errorMessage;
            switch (currentMode) {
                case Mode.empty:
                    return React.createElement(ComboBox, { className: className, disabled: disabled, placeholder: placeholder, allowFreeform: true, autoComplete: "on", options: options, onRenderOption: _this.onRenderOption, calloutProps: { className: styles.callout }, buttonIconProps: { iconName: "MapPin" }, useComboBoxAsMenuWidth: true, openOnKeyboardFocus: true, scrollSelectedToTop: true, isButtonAriaHidden: true, onInput: function (e) { return _this.getLocatios(e.target["value"]); }, onChange: _this.onChange, errorMessage: errorMessage });
                case Mode.editView:
                    if (selectedItem.EntityType === "Custom") {
                        return React.createElement("div", { ref: _this.focusRef, "data-selection-index": 0, "data-is-focusable": true, role: "listitem", className: styles.pickerItemContainer, onBlur: _this.onBlur, tabIndex: 0 },
                            React.createElement(Persona, { "data-is-focusable": "false", imageAlt: selectedItem.EntityType, tabIndex: 0, text: selectedItem.DisplayName, title: "Location", className: styles.persona, size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials }),
                            React.createElement(IconButton, { "data-is-focusable": "false", tabIndex: 0, iconProps: { iconName: "Cancel" }, title: "Clear", ariaLabel: "Clear", disabled: disabled, className: styles.closeButton, onClick: _this.onIconButtonClick }));
                    }
                    return React.createElement("div", { ref: _this.focusRef, "data-selection-index": 0, "data-is-focusable": true, role: "listitem", className: styles.pickerItemContainer, onBlur: _this.onBlur, tabIndex: 0 },
                        React.createElement(Persona, { "data-is-focusable": "false", imageAlt: selectedItem.EntityType, tabIndex: 0, text: selectedItem.DisplayName, title: "Location", className: styles.persona, secondaryText: _this.getLocationText(selectedItem, "full"), size: PersonaSize.size40, onRenderInitials: _this.customRenderInitials }),
                        !disabled ?
                            React.createElement(IconButton, { "data-is-focusable": "false", tabIndex: 0, iconProps: { iconName: "Cancel" }, title: "Clear", ariaLabel: "Clear", disabled: disabled, className: styles.closeButton, onClick: _this.onIconButtonClick }) : null);
                case Mode.view:
                    if (selectedItem.EntityType === 'Custom') {
                        return React.createElement("div", { className: styles.locationAddressContainer, onClick: _this.onClick },
                            React.createElement("div", { className: styles.locationContainer, tabIndex: 0 },
                                React.createElement("div", { className: styles.locationDisplayName }, selectedItem.DisplayName)));
                    }
                    return React.createElement("div", { className: styles.locationAddressContainer, onClick: _this.onClick },
                        React.createElement("div", { className: styles.locationContainer, tabIndex: 0 },
                            React.createElement("div", { className: styles.locationDisplayName }, selectedItem.DisplayName),
                            React.createElement("div", { className: styles.locationContent },
                                React.createElement("div", { className: styles.locationAddress }, _this.getLocationText(selectedItem, "street")),
                                React.createElement("div", { className: styles.locationAddress }, _this.getLocationText(selectedItem, "noStreet")))));
            }
            return null;
        };
        _this.getLocationText = function (item, mode) {
            if (!item.Address) {
                return '';
            }
            var address = item.Address;
            switch (mode) {
                case "street":
                    return address.Street || "";
                case "noStreet":
                    return "".concat(address.City ? address.City + ", " : '').concat(address.State ? address.State + ", " : "").concat(address.CountryOrRegion || "");
            }
            return "".concat(address.Street ? address.Street + ", " : '').concat(address.City ? address.City + ", " : "").concat(address.State ? address.State + ", " : '').concat(address.CountryOrRegion || "");
        };
        _this.onIconButtonClick = function () {
            _this.setState({ currentMode: Mode.empty, selectedItem: null });
            if (_this.props.onChange) {
                _this.props.onChange(null);
            }
        };
        _this.onClick = function () {
            _this.setState({ currentMode: Mode.editView }, function () {
                if (_this.focusRef.current !== null)
                    _this.focusRef.current.focus();
            });
        };
        _this.onBlur = function (ev) {
            try {
                if (ev !== null && ev.relatedTarget["title"] !== "Location" && ev.relatedTarget["title"] !== "Clear") { // eslint-disable-line dot-notation
                    _this.setState({ currentMode: Mode.view });
                }
            }
            catch ( /* no-op; */_a) { /* no-op; */ }
        };
        _this.onChange = function (ev, option) {
            _this.setState({ selectedItem: option.locationItem, currentMode: Mode.editView }, function () {
                if (_this.focusRef.current !== null)
                    _this.focusRef.current.focus();
            });
            if (_this.props.onChange) {
                _this.props.onChange(option.locationItem);
            }
        };
        _this.getToken().then(function () { }).catch(function () { });
        _this.focusRef = React.createRef();
        if (props.defaultValue) {
            _this.state = {
                options: [],
                currentMode: Mode.view,
                searchText: null,
                isCalloutVisible: true,
                selectedItem: props.defaultValue,
            };
        }
        else {
            _this.state = {
                options: [],
                currentMode: Mode.empty,
                searchText: null,
                isCalloutVisible: true,
                selectedItem: props.defaultValue,
            };
        }
        return _this;
    }
    LocationPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (!isEqual(nextProps.defaultValue, this.props.defaultValue)) {
            if (nextProps.defaultValue) {
                this.setState({ selectedItem: nextProps.defaultValue, currentMode: Mode.view });
            }
        }
    };
    /**
    * Renders the LocationPicker controls with Office UI Fabric
    */
    LocationPicker.prototype.render = function () {
        var label = this.props.label;
        return (React.createElement("div", null,
            label ? React.createElement(Text, null, label) : null,
            this.getMainContent()));
    };
    LocationPicker.prototype.customRenderInitials = function (props) {
        if (props.imageAlt === "Custom")
            return React.createElement(FontIcon, { "aria-label": "Poi", iconName: "Poi", style: { fontSize: "14pt" } });
        else
            return React.createElement(FontIcon, { "aria-label": "EMI", iconName: "EMI", style: { fontSize: "14pt" } });
    };
    LocationPicker.prototype.getToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestHeaders, spOpts, response, PrimaryQueryResult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestHeaders = new Headers();
                        requestHeaders.append("Content-type", "application/json");
                        requestHeaders.append("Cache-Control", "no-cache");
                        spOpts = {
                            body: "{\"resource\":\"https://outlook.office365.com\"}",
                            headers: requestHeaders
                        };
                        return [4 /*yield*/, this.props.context.spHttpClient.post("".concat(this.props.context.pageContext.web.absoluteUrl, "/_api/SP.OAuth.Token/Acquire"), SPHttpClient.configurations.v1, spOpts)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        PrimaryQueryResult = _a.sent();
                        this._token = PrimaryQueryResult.access_token;
                        return [2 /*return*/];
                }
            });
        });
    };
    LocationPicker.prototype.getLocatios = function (searchText) {
        return __awaiter(this, void 0, void 0, function () {
            var optionsForCustomRender_1, requestHeaders, spOpts, response1, json, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        optionsForCustomRender_1 = [];
                        requestHeaders = new Headers();
                        requestHeaders.append("Content-type", "application/json");
                        requestHeaders.append("Cache-Control", "no-cache");
                        requestHeaders.append("Authorization", "Bearer ".concat(this._token));
                        spOpts = {
                            body: "{\"QueryConstraint\":{\"Query\":\"".concat(searchText, "\"},\"LocationProvider\":32,\"BingMarket\":\"en-IN\"}"),
                            headers: requestHeaders
                        };
                        return [4 /*yield*/, this.props.context.httpClient.post("https://outlook.office365.com/SchedulingB2/api/v1.0/me/findmeetinglocations", HttpClient.configurations.v1, spOpts)];
                    case 1:
                        response1 = _a.sent();
                        return [4 /*yield*/, response1.json()];
                    case 2:
                        json = _a.sent();
                        json.MeetingLocations.forEach(function (v, i) {
                            var loc = v["MeetingLocation"]; // eslint-disable-line dot-notation
                            optionsForCustomRender_1.push({ text: v.MeetingLocation["DisplayName"], key: i, locationItem: loc }); // eslint-disable-line dot-notation
                        });
                        optionsForCustomRender_1.push({ text: strings.customDisplayName, key: 7, locationItem: { DisplayName: searchText, EntityType: "Custom" } });
                        this.setState({ options: optionsForCustomRender_1 });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        console.log("Error get Items", error_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return LocationPicker;
}(React.Component));
export { LocationPicker };
//# sourceMappingURL=LocationPicker.js.map