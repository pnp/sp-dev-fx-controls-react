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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import '@pnp/sp/folders';
import { ChoiceFieldFormatType, sp } from '@pnp/sp/presets/all';
import '@pnp/sp/webs';
import * as strings from 'ControlStrings';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { DatePicker } from '@fluentui/react/lib/DatePicker';
import { Icon } from '@fluentui/react/lib/Icon';
import { Image } from '@fluentui/react/lib/Image';
import { Shimmer } from '@fluentui/react/lib/Shimmer';
import { Stack } from '@fluentui/react/lib/Stack';
import { TextField } from '@fluentui/react/lib/TextField';
import { Toggle } from '@fluentui/react/lib/Toggle';
import * as React from 'react';
import { DateTimePicker } from '../../dateTimePicker/DateTimePicker';
import { FilePicker } from '../../filePicker';
import { ListItemPicker } from '../../listItemPicker';
import { LocationPicker } from '../../locationPicker';
import { PeoplePicker, PrincipalType } from '../../peoplepicker';
import { RichText } from '../../richText';
import { TaxonomyPicker } from '../../taxonomyPicker';
import CurrencyMap from "../CurrencyMap";
import { ModernTaxonomyPicker } from '../../modernTaxonomyPicker';
import { classNamesFunction, styled, ChoiceGroup } from '@fluentui/react';
import { getFluentUIThemeOrDefault } from '../../../common/utilities/ThemeUtility';
import { getFieldStyles } from './DynamicField.styles';
var getClassNames = classNamesFunction();
var DynamicFieldBase = /** @class */ (function (_super) {
    __extends(DynamicFieldBase, _super);
    function DynamicFieldBase(props) {
        var _this = _super.call(this, props) || this;
        _this.getFieldComponent = function () {
            var _a = _this.props, options = _a.options, fieldTermSetId = _a.fieldTermSetId, fieldAnchorId = _a.fieldAnchorId, lookupListID = _a.lookupListID, lookupField = _a.lookupField, fieldType = _a.fieldType, defaultValue = _a.defaultValue, newValue = _a.newValue, value = _a.value, context = _a.context, disabled = _a.disabled, label = _a.label, placeholder = _a.placeholder, isRichText = _a.isRichText, 
            //bingAPIKey,
            dateFormat = _a.dateFormat, firstDayOfWeek = _a.firstDayOfWeek, columnInternalName = _a.columnInternalName, principalType = _a.principalType, description = _a.description, maximumValue = _a.maximumValue, minimumValue = _a.minimumValue, itemsQueryCountLimit = _a.itemsQueryCountLimit, customIcon = _a.customIcon, orderBy = _a.orderBy, choiceType = _a.choiceType, useModernTaxonomyPickerControl = _a.useModernTaxonomyPickerControl;
            var changedValue = _this.state.changedValue;
            var dropdownOptions = {
                options: options,
                disabled: disabled,
                placeholder: placeholder
            };
            var peoplePickerContext = {
                absoluteUrl: context.pageContext.web.absoluteUrl,
                msGraphClientFactory: context.msGraphClientFactory,
                spHttpClient: context.spHttpClient
            };
            // const defaultValue = fieldDefaultValue;
            var styles = _this._classNames;
            var labelEl = React.createElement("label", { className: styles.fieldLabel }, label);
            var errorText = _this.props.validationErrorMessage || _this.getRequiredErrorText();
            var errorTextEl = React.createElement("text", { className: styles.errormessage }, errorText);
            var descriptionEl = React.createElement("text", { className: styles.fieldDescription }, description);
            var hasImage = !!changedValue;
            var valueToDisplay = newValue !== undefined ? newValue : value;
            switch (fieldType) {
                case 'loading':
                    return React.createElement(Shimmer, { width: "75%", styles: {
                            root: {
                                margin: '25px'
                            }
                        } });
                case 'Text':
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "TextField" }),
                            labelEl),
                        React.createElement(TextField, { defaultValue: defaultValue, value: valueToDisplay, placeholder: placeholder, className: styles.fieldDisplay, onChange: function (e, newText) { _this.onChange(newText); }, disabled: disabled, onBlur: _this.onBlur, errorMessage: errorText }),
                        descriptionEl);
                case 'Note':
                    if (isRichText) {
                        var noteValue = valueToDisplay !== undefined ? valueToDisplay : defaultValue;
                        return React.createElement("div", { className: styles.richText },
                            React.createElement("div", { className: styles.titleContainer },
                                React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "AlignLeft" }),
                                labelEl),
                            React.createElement(RichText, { placeholder: placeholder, value: noteValue, className: styles.fieldDisplay, onChange: function (newText) { _this.onChange(newText); return newText; }, isEditMode: !disabled }),
                            descriptionEl,
                            errorTextEl);
                    }
                    else {
                        return React.createElement("div", null,
                            React.createElement("div", { className: styles.titleContainer },
                                React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "AlignLeft" }),
                                labelEl),
                            React.createElement(TextField, { defaultValue: defaultValue, value: valueToDisplay, placeholder: placeholder, className: styles.fieldDisplay, multiline: true, onChange: function (e, newText) { _this.onChange(newText); }, disabled: disabled, onBlur: _this.onBlur, errorMessage: errorText }),
                            descriptionEl);
                    }
                case 'Choice': {
                    var choiceControl = undefined;
                    // If the choiceType is dropdown
                    if (choiceType === ChoiceFieldFormatType.Dropdown) {
                        choiceControl = React.createElement(Dropdown, __assign({}, dropdownOptions, { defaultSelectedKey: valueToDisplay ? undefined : defaultValue, selectedKey: typeof valueToDisplay === "object" ? valueToDisplay === null || valueToDisplay === void 0 ? void 0 : valueToDisplay.key : valueToDisplay, onChange: function (e, option) { _this.onChange(option, true); }, onBlur: _this.onBlur, errorMessage: errorText }));
                    }
                    // If the choiceType is radio buttons
                    else {
                        // Parse options into radio buttons
                        var optionsGroup = options.map(function (option) {
                            return {
                                key: option.key.toString(),
                                text: option.text,
                                checked: option.key.toString() === valueToDisplay
                            };
                        });
                        // Create radio group
                        choiceControl = React.createElement(ChoiceGroup, { defaultSelectedKey: valueToDisplay ? undefined : defaultValue, selectedKey: typeof valueToDisplay === "object" ? valueToDisplay === null || valueToDisplay === void 0 ? void 0 : valueToDisplay.key : valueToDisplay, options: optionsGroup, onChange: function (e, option) { _this.onChange(option, true); }, disabled: disabled });
                    }
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: "".concat(styles.labelContainer, " ").concat(styles.titleContainer) },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "CheckMark" }),
                            labelEl),
                        choiceControl,
                        descriptionEl);
                }
                case 'MultiChoice':
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: "".concat(styles.labelContainer, " ").concat(styles.titleContainer) },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "MultiSelect" }),
                            labelEl),
                        React.createElement(Dropdown, __assign({}, dropdownOptions, { defaultSelectedKeys: valueToDisplay ? undefined : defaultValue, selectedKeys: valueToDisplay, onChange: _this.MultiChoice_selection, multiSelect: true, onBlur: _this.onBlur, errorMessage: errorText })),
                        descriptionEl);
                case 'Location':
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: "".concat(styles.labelContainer, " ").concat(styles.titleContainer) },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "POI" }),
                            labelEl),
                        React.createElement(LocationPicker, { context: context, disabled: disabled, placeholder: placeholder, onChange: function (newValue) { _this.onChange(newValue, true); }, defaultValue: valueToDisplay !== undefined ? valueToDisplay : defaultValue, errorMessage: errorText }),
                        descriptionEl);
                case 'Lookup':
                    //eslint-disable-next-line no-case-declarations
                    var lookupValue = valueToDisplay !== undefined ? valueToDisplay : defaultValue;
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Switch" }),
                            labelEl),
                        React.createElement(ListItemPicker, { disabled: disabled, listId: lookupListID, defaultSelectedItems: lookupValue, columnInternalName: lookupField, className: styles.fieldDisplay, enableDefaultSuggestions: true, keyColumnInternalName: 'Id', itemLimit: 1, onSelectedItem: function (newValue) { _this.onChange(newValue, true); }, context: context, itemsQueryCountLimit: itemsQueryCountLimit, orderBy: orderBy }),
                        descriptionEl,
                        errorTextEl);
                case 'LookupMulti':
                    //eslint-disable-next-line no-case-declarations
                    var lookupMultiValue = valueToDisplay !== undefined ? valueToDisplay : defaultValue;
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Switch" }),
                            labelEl),
                        React.createElement(ListItemPicker, { disabled: disabled, listId: lookupListID, defaultSelectedItems: lookupMultiValue, columnInternalName: lookupField, className: styles.fieldDisplay, enableDefaultSuggestions: true, keyColumnInternalName: 'Id', itemLimit: 100, onSelectedItem: function (newValue) { _this.onChange(newValue, true); }, context: context, itemsQueryCountLimit: itemsQueryCountLimit }),
                        descriptionEl,
                        errorTextEl);
                case 'Number': {
                    var customNumberErrorMessage = _this.getNumberErrorText();
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "NumberField" }),
                            labelEl),
                        React.createElement(TextField, { defaultValue: defaultValue, value: valueToDisplay, placeholder: placeholder, className: styles.fieldDisplay, type: "Number", onChange: function (e, newText) { _this.onChange(newText); }, disabled: disabled, onBlur: _this.onBlur, errorMessage: errorText || customNumberErrorMessage, min: minimumValue, max: maximumValue }),
                        descriptionEl);
                }
                case 'Currency': {
                    var customNumberErrorMessage = _this.getNumberErrorText();
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "AllCurrency" }),
                            labelEl),
                        React.createElement(TextField, { defaultValue: defaultValue, value: valueToDisplay, placeholder: placeholder, className: styles.fieldDisplay, type: "Currency", onChange: function (e, newText) { _this.onChange(newText); }, disabled: disabled, onBlur: _this.onBlur, errorMessage: errorText || customNumberErrorMessage, min: minimumValue, max: maximumValue }),
                        descriptionEl);
                }
                case 'DateTime':
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Calendar" }),
                            labelEl),
                        dateFormat === 'DateOnly' &&
                            React.createElement(DatePicker, { placeholder: placeholder, className: styles.pickersContainer, formatDate: function (date) { return date.toLocaleDateString(context.pageContext.cultureInfo.currentCultureName); }, value: valueToDisplay !== undefined ? valueToDisplay : defaultValue, onSelectDate: function (newDate) { _this.onChange(newDate, true); }, disabled: disabled, firstDayOfWeek: firstDayOfWeek, allowTextInput: true }),
                        dateFormat === 'DateTime' &&
                            React.createElement(DateTimePicker, { key: columnInternalName, placeholder: placeholder, formatDate: function (date) { return date.toLocaleDateString(context.pageContext.cultureInfo.currentCultureName); }, value: valueToDisplay !== undefined ? valueToDisplay : defaultValue, onChange: function (newDate) { _this.onChange(newDate, true); }, disabled: disabled, firstDayOfWeek: firstDayOfWeek, allowTextInput: true }),
                        descriptionEl,
                        errorTextEl);
                case 'Boolean':
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "CheckboxComposite" }),
                            labelEl),
                        React.createElement(Toggle, { className: styles.fieldDisplay, defaultChecked: defaultValue, checked: valueToDisplay, onText: strings.Yes, offText: strings.No, onChange: function (e, checkedvalue) { _this.onChange(checkedvalue, true); }, disabled: disabled }),
                        descriptionEl,
                        errorTextEl);
                case 'User': {
                    var userValue = Boolean(changedValue) ? changedValue.map(function (cv) { return cv.secondaryText; }) : (value ? value : defaultValue);
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Contact" }),
                            labelEl),
                        React.createElement(PeoplePicker, { placeholder: placeholder, defaultSelectedUsers: userValue, peoplePickerCntrlclassName: styles.fieldDisplay, context: peoplePickerContext, personSelectionLimit: 1, showtooltip: false, showHiddenInUI: false, principalTypes: principalType === 'PeopleOnly' ? [PrincipalType.User] : [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.DistributionList, PrincipalType.SecurityGroup], resolveDelay: 1000, onChange: function (items) { _this.onChange(items, true); }, disabled: disabled }),
                        descriptionEl,
                        errorTextEl);
                }
                case 'UserMulti':
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Contact" }),
                            labelEl),
                        React.createElement(PeoplePicker, { placeholder: placeholder, defaultSelectedUsers: valueToDisplay !== undefined ? valueToDisplay : defaultValue, peoplePickerCntrlclassName: styles.fieldDisplay, context: peoplePickerContext, personSelectionLimit: 30, showtooltip: false, showHiddenInUI: false, principalTypes: principalType === 'PeopleOnly' ? [PrincipalType.User] : [PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.DistributionList, PrincipalType.SecurityGroup], resolveDelay: 1000, onChange: function (items) { _this.onChange(items, true); }, disabled: disabled }),
                        descriptionEl,
                        errorTextEl);
                case 'URL':
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Link" }),
                            labelEl),
                        React.createElement(Stack, { tokens: { childrenGap: 4 } },
                            React.createElement(TextField, { defaultValue: defaultValue ? defaultValue.Url : '', value: valueToDisplay ? valueToDisplay.Url : undefined, placeholder: strings.DynamicFormEnterURLPlaceholder, className: styles.fieldDisplayNoPadding, onChange: function (e, newText) { _this.onURLChange(newText, true); }, disabled: disabled, onBlur: _this.onBlur }),
                            React.createElement(TextField, { defaultValue: defaultValue ? defaultValue.Description : '', value: valueToDisplay ? valueToDisplay.Description : undefined, placeholder: strings.DynamicFormEnterDescriptionPlaceholder, className: styles.fieldDisplayNoPadding, onChange: function (e, newText) { _this.onURLChange(newText, false); }, disabled: disabled })),
                        descriptionEl,
                        errorTextEl);
                case 'Thumbnail':
                    return React.createElement("div", null,
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "photo2" }),
                            labelEl),
                        React.createElement(Stack
                        //className={styles.filePicker}
                        , { 
                            //className={styles.filePicker}
                            horizontal: true, tokens: {
                                childrenGap: 20
                            }, horizontalAlign: 'space-between' },
                            hasImage && React.createElement(Image, { src: changedValue, height: 60 }),
                            React.createElement("div", { className: styles.thumbnailFieldButtons },
                                React.createElement(FilePicker, { buttonClassName: styles.fieldDisplay, 
                                    //bingAPIKey={bingAPIKey}
                                    accepts: [".gif", ".jpg", ".jpeg", ".bmp", ".dib", ".tif", ".tiff", ".ico", ".png", ".jxr", ".svg"], buttonLabel: hasImage ? undefined : 'Add an image', buttonIcon: hasImage ? 'Edit' : 'FileImage', onSave: _this.saveIntoSharePoint, onChange: _this.saveIntoSharePoint, context: context, disabled: disabled, hideLocalMultipleUploadTab: true, hideOneDriveTab: true, hideStockImages: true, hideWebSearchTab: true }),
                                hasImage &&
                                    React.createElement(ActionButton, { disabled: disabled, iconProps: {
                                            iconName: 'Delete'
                                        }, onClick: _this.onDeleteImage }))),
                        descriptionEl,
                        errorTextEl);
                case 'TaxonomyFieldTypeMulti':
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "BulletedTreeList" }),
                            labelEl),
                        useModernTaxonomyPickerControl ?
                            React.createElement("div", { className: styles.pickersContainer },
                                React.createElement(ModernTaxonomyPicker, { label: "", disabled: disabled, initialValues: valueToDisplay !== undefined ? valueToDisplay : defaultValue, placeHolder: placeholder, allowMultipleSelections: true, termSetId: fieldTermSetId, anchorTermId: fieldAnchorId, panelTitle: strings.DynamicFormTermPanelTitle, context: context, 
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onChange: function (newValue) { _this.onChange(newValue, true); } }))
                            :
                                React.createElement("div", { className: styles.pickersContainer },
                                    React.createElement(TaxonomyPicker, { label: "", disabled: disabled, initialValues: valueToDisplay !== undefined ? valueToDisplay : defaultValue, placeholder: placeholder, allowMultipleSelections: true, termsetNameOrID: fieldTermSetId, anchorId: fieldAnchorId, panelTitle: strings.DynamicFormTermPanelTitle, context: context, onChange: function (newValue) { _this.onChange(newValue, true); }, isTermSetSelectable: false })),
                        descriptionEl,
                        errorTextEl);
                case 'TaxonomyFieldType':
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "BulletedTreeList" }),
                            labelEl),
                        useModernTaxonomyPickerControl ?
                            React.createElement("div", { className: styles.pickersContainer },
                                React.createElement(ModernTaxonomyPicker, { label: "", disabled: disabled, initialValues: valueToDisplay !== undefined ? [valueToDisplay] : defaultValue, placeHolder: placeholder, allowMultipleSelections: false, termSetId: fieldTermSetId, anchorTermId: fieldAnchorId, panelTitle: strings.DynamicFormTermPanelTitle, context: context, 
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    onChange: function (newValue) { _this.onChange(newValue, true); } }))
                            :
                                React.createElement("div", { className: styles.pickersContainer },
                                    React.createElement(TaxonomyPicker, { label: "", disabled: disabled, initialValues: valueToDisplay !== undefined ? valueToDisplay : defaultValue, placeholder: placeholder, allowMultipleSelections: false, termsetNameOrID: fieldTermSetId, anchorId: fieldAnchorId, panelTitle: strings.DynamicFormTermPanelTitle, context: context, onChange: function (newValue) { _this.onChange(newValue, true); }, isTermSetSelectable: false })),
                        descriptionEl,
                        errorTextEl);
                case 'File':
                    return React.createElement("div", { className: styles.fieldContainer },
                        React.createElement("div", { className: styles.titleContainer },
                            React.createElement(Icon, { className: styles.fieldIcon, iconName: customIcon !== null && customIcon !== void 0 ? customIcon : "Page" }),
                            labelEl),
                        React.createElement(TextField, { defaultValue: defaultValue, value: valueToDisplay, placeholder: placeholder, className: styles.fieldDisplay, onChange: function (e, newText) { _this.onChange(newText); }, disabled: disabled, onBlur: _this.onBlur, errorMessage: errorText }),
                        descriptionEl);
            }
            return null;
        };
        _this.onDeleteImage = function () {
            var _a = _this.props, onChanged = _a.onChanged, columnInternalName = _a.columnInternalName;
            _this.setState({
                changedValue: ''
            });
            if (onChanged) {
                onChanged(columnInternalName, '', undefined);
            }
        };
        _this.onURLChange = function (value, isUrl) {
            var _a = _this.props, defaultValue = _a.defaultValue, onChanged = _a.onChanged, columnInternalName = _a.columnInternalName;
            var currValue = _this.state.changedValue || defaultValue || {
                Url: '',
                Description: ''
            };
            currValue = __assign({}, currValue);
            if (isUrl) {
                currValue.Url = value;
            }
            else {
                currValue.Description = value;
            }
            _this.setState({
                changedValue: currValue
            });
            if (onChanged) {
                onChanged(columnInternalName, currValue, false);
            }
        };
        _this.onChange = function (value, callValidation) {
            if (callValidation === void 0) { callValidation = false; }
            var _a = _this.props, onChanged = _a.onChanged, columnInternalName = _a.columnInternalName;
            if (onChanged) {
                onChanged(columnInternalName, value, callValidation);
            }
            _this.setState({
                changedValue: value
            });
        };
        _this.onBlur = function () {
            // If we have a changedValue, or the user has cleared out a field
            if (_this.state.changedValue || _this.state.changedValue === "") {
                // Notify DynamicForm and fire its onChange event
                _this.props.onChanged(_this.props.columnInternalName, _this.state.changedValue, true);
            }
        };
        _this.getRequiredErrorText = function () {
            var changedValue = _this.state.changedValue;
            var _a = _this.props, value = _a.value, newValue = _a.newValue, required = _a.required, listItemId = _a.listItemId;
            if (listItemId !== undefined && listItemId !== null) {
                if (newValue === undefined) {
                    return required && (changedValue === undefined || changedValue === '' || changedValue === null || _this.isEmptyArray(changedValue))
                        && (value === undefined || value === '' || value === null || _this.isEmptyArray(value) || _this.checkUserArrayIsEmpty(value)) ? strings.DynamicFormRequiredErrorMessage : null;
                }
                else {
                    return required && (changedValue === undefined || changedValue === '' || changedValue === null || _this.isEmptyArray(changedValue) || _this.checkUserArrayIsEmpty(value)) ? strings.DynamicFormRequiredErrorMessage : null;
                }
            }
            return null;
        };
        _this.getNumberErrorText = function () {
            var _a;
            var changedValue = _this.state.changedValue;
            var _b = _this.props, cultureName = _b.cultureName, fieldType = _b.fieldType, maximumValue = _b.maximumValue, minimumValue = _b.minimumValue, showAsPercentage = _b.showAsPercentage, value = _b.value, newValue = _b.newValue, required = _b.required, listItemId = _b.listItemId;
            if (required && newValue !== undefined && (changedValue === undefined || changedValue === '' || changedValue === null || _this.isEmptyArray(changedValue))) {
                return strings.DynamicFormRequiredErrorMessage;
            }
            if (listItemId !== undefined && listItemId !== null) {
                if (required && newValue === undefined && (value === undefined || value === '' || value === null || _this.isEmptyArray(value)) && (changedValue === undefined || changedValue === '' || changedValue === null || _this.isEmptyArray(changedValue))) {
                    return strings.DynamicFormRequiredErrorMessage;
                }
            }
            var minValue = minimumValue !== undefined && minimumValue !== -(Number.MAX_VALUE) ? minimumValue : undefined;
            var maxValue = maximumValue !== undefined && maximumValue !== Number.MAX_VALUE ? maximumValue : undefined;
            if (showAsPercentage === true) {
                // In case of percentage we need to convert the min and max values to a percentage value
                minValue = minValue !== undefined ? minValue * 100 : undefined;
                maxValue = maxValue !== undefined ? maxValue * 100 : undefined;
            }
            var minValueCur, maxValueCur;
            if (fieldType === "Currency" && cultureName) {
                var countryCode = (_a = cultureName.split('-')) === null || _a === void 0 ? void 0 : _a[1];
                if (minValue)
                    minValueCur = Intl.NumberFormat(cultureName, { style: 'currency', currency: CurrencyMap[countryCode] }).format(minValue);
                if (maxValue)
                    maxValueCur = Intl.NumberFormat(cultureName, { style: 'currency', currency: CurrencyMap[countryCode] }).format(maxValue);
            }
            if (changedValue !== undefined && changedValue !== null && changedValue.length > 0) {
                var numericValue = Number(changedValue);
                if (isNaN(numericValue))
                    return strings.ProvidedValueIsInvalid;
                if (minValue !== undefined && maxValue !== undefined && (numericValue < minValue || numericValue > maxValue)) {
                    return strings.DynamicFormNumberValueMustBeBetween.replace('{0}', minValueCur !== null && minValueCur !== void 0 ? minValueCur : minValue.toString()).replace('{1}', maxValueCur !== null && maxValueCur !== void 0 ? maxValueCur : maxValue.toString());
                }
                else {
                    if (minValue !== undefined && numericValue < minValue) {
                        return strings.DynamicFormNumberValueMustBeGreaterThan.replace('{0}', minValueCur !== null && minValueCur !== void 0 ? minValueCur : minValue.toString());
                    }
                    else if (maxValue !== undefined && numericValue > maxValue) {
                        return strings.DynamicFormNumberValueMustBeLowerThan.replace('{0}', maxValueCur !== null && maxValueCur !== void 0 ? maxValueCur : maxValue.toString());
                    }
                }
            }
            return null;
        };
        _this.checkUserArrayIsEmpty = function (value) {
            return Array.isArray(value) && value.every(function (item) { return item === ""; });
        };
        _this.MultiChoice_selection = function (event, item) {
            var changedValue = _this.state.changedValue;
            try {
                var selectedItemArr_1;
                var value = _this.props.value || _this.props.defaultValue;
                if (changedValue === null && value !== null) {
                    selectedItemArr_1 = [];
                    value.forEach(function (element) {
                        selectedItemArr_1.push(element);
                    });
                }
                else {
                    // selectedItemArr = this.props.value;
                    selectedItemArr_1 = !changedValue ? [] :
                        (Array.isArray(changedValue) ? __spreadArray([], changedValue, true) : [changedValue]);
                }
                if (item.selected) {
                    selectedItemArr_1.push(item.key);
                }
                else {
                    var i = selectedItemArr_1.indexOf(item.key);
                    if (i >= 0) {
                        selectedItemArr_1.splice(i, 1);
                    }
                }
                _this.setState({ changedValue: selectedItemArr_1 });
                _this.props.onChanged(_this.props.columnInternalName, selectedItemArr_1, true);
            }
            catch (error) {
                console.log("Error MultiChoice_selection", error);
            }
        };
        _this.saveIntoSharePoint = function (files) { return __awaiter(_this, void 0, void 0, function () {
            var _a, columnInternalName, onChanged, newValue, file;
            return __generator(this, function (_b) {
                _a = this.props, columnInternalName = _a.columnInternalName, onChanged = _a.onChanged;
                if (!files.length) {
                    return [2 /*return*/];
                }
                try {
                    file = files[0];
                    if (file.fileAbsoluteUrl === null) {
                        newValue = file.previewDataUrl;
                    }
                    else {
                        newValue = file.fileAbsoluteUrl;
                    }
                    this.setState({
                        changedValue: newValue
                    });
                    if (onChanged) {
                        onChanged(columnInternalName, newValue, true, file);
                    }
                }
                catch (error) {
                    console.log("Error save Into SharePoint", error);
                }
                return [2 /*return*/];
            });
        }); };
        sp.setup({
            spfxContext: { pageContext: _this.props.context.pageContext }
        });
        _this.state = {
            changedValue: props.defaultValue !== undefined || props.defaultValue !== '' || props.defaultValue !== null || !_this.isEmptyArray(props.defaultValue) ? props.defaultValue : null
        };
        return _this;
    }
    DynamicFieldBase.prototype.render = function () {
        try {
            var theme = getFluentUIThemeOrDefault();
            var styles = (this._classNames = getClassNames(this.props.styles, {
                theme: theme,
                required: this.props.required
            }));
            return (React.createElement("div", { className: styles.fieldEditor }, this.getFieldComponent()));
        }
        catch (error) {
            console.log("Error in DynamicField render", error);
            return null;
        }
    };
    DynamicFieldBase.prototype.isEmptyArray = function (value) {
        return Array.isArray(value) && value.length === 0;
    };
    return DynamicFieldBase;
}(React.Component));
export { DynamicFieldBase };
export var DynamicField = styled(DynamicFieldBase, getFieldStyles, undefined, {
    scope: 'DynamicField',
});
//# sourceMappingURL=DynamicField.js.map