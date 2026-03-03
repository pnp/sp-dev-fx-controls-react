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
import * as React from 'react';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { getId } from '@fluentui/react/lib/Utilities';
import styles from './IconPicker.module.scss';
import * as strings from 'ControlStrings';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import debounce from 'lodash/debounce';
import * as telemetry from '../../common/telemetry';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { FluentIconsService } from '../../services/FluentIconsService';
var IconPicker = /** @class */ (function (_super) {
    __extends(IconPicker, _super);
    function IconPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.radioIdBase = getId("radio");
        _this.closePanel = function () {
            if (_this.props.onCancel) {
                _this.props.onCancel();
            }
            _this.setState({
                currentIcon: _this.props.currentIcon,
                isPanelOpen: false
            });
        };
        _this.iconPickerOnClick = function () {
            _this.setState({
                isPanelOpen: true,
                items: _this._fluentIconsService.getAll() //IconNames.Icons
            });
        };
        _this.iconOnClick = function (iconName) {
            if (_this.props.onChange) {
                _this.props.onChange(iconName);
            }
            _this.setState({
                currentIcon: iconName
            });
        };
        _this.onAbort = function () {
            _this.setState({
                items: _this._fluentIconsService.getAll() //IconNames.Icons
            });
        };
        _this.onChange = function (newValue) {
            var items;
            if (newValue && newValue.trim().length > 2) {
                items = _this._fluentIconsService.search(newValue, _this.props.useStartsWithSearch); /*IconNames.Icons.filter(item => {
                  return item.toLocaleLowerCase().indexOf(newValue.toLocaleLowerCase()) !== -1;
                });*/
            }
            else {
                items = _this._fluentIconsService.getAll(); //IconNames.Icons;
            }
            _this.setState({
                items: items
            });
        };
        _this.confirmSelection = function () {
            if (_this.props.onSave) {
                _this.props.onSave(_this.state.currentIcon);
            }
            _this.setState({
                isPanelOpen: false
            });
        };
        _this.renderPanelNav = function (props, defaultRender) {
            return React.createElement("div", { className: styles.navArea },
                React.createElement("h2", { className: styles.headTitle }, strings.SelectIcon),
                React.createElement(SearchBox, { className: styles.searchBox, onAbort: _this.onAbort, "data-automation-id": "icon-picker-search", onSearch: debounce(_this.onChange, 300), onChange: debounce(function (e, value) { return _this.onChange(value); }, 300) }),
                React.createElement("div", { className: styles.closeBtnContainer }, defaultRender(props)));
        };
        _this.renderPanelContent = function () {
            return React.createElement("div", null, _this.renderIcons());
        };
        _this.renderPanelFooter = function () {
            return React.createElement("div", { className: styles.footer, "data-automation-id": "icon-picker-footer" },
                React.createElement(PrimaryButton, { text: strings.SaveButtonLabel, onClick: _this.confirmSelection, disabled: !_this.state.currentIcon, className: styles.btnSave, "data-automation-id": "icon-picker-save" }),
                React.createElement("div", { className: "".concat(styles.selectionDisplay, " ").concat(!_this.state.currentIcon ? 'noSelection' : '') },
                    React.createElement("span", { className: styles.selectionLabel },
                        strings.SelectedLabel,
                        ":"),
                    React.createElement(Icon, { iconName: _this.state.currentIcon, className: styles.selectionIcon })),
                React.createElement(DefaultButton, { text: strings.CancelButtonLabel, onClick: _this.closePanel, className: styles.btnCancel, "data-automation-id": "icon-picker-close" }));
        };
        _this.renderIcons = function () {
            return (React.createElement("ul", { className: styles.iconList }, _this.state.items.map(_this.renderIcon)));
        };
        _this.renderIcon = function (item) {
            var radioId = "".concat(_this.radioIdBase, "-").concat(item);
            return React.createElement("li", { className: styles.iconItem },
                React.createElement("input", { type: "radio", name: _this.radioIdBase, id: radioId, className: styles.iconRadio, "data-automation-id": "icon-picker-".concat(item), checked: item === _this.state.currentIcon, onChange: function () { return _this.iconOnClick(item); } }),
                React.createElement("label", { className: styles.iconLabel, htmlFor: radioId, title: item },
                    React.createElement(Icon, { iconName: item, className: styles.iconGlyph }),
                    React.createElement("span", { className: styles.iconName }, item)));
        };
        initializeIcons();
        telemetry.track('IconPicker');
        _this._fluentIconsService = new FluentIconsService();
        _this.state = {
            items: _this._fluentIconsService.getAll(),
            isPanelOpen: false,
            currentIcon: _this.props.currentIcon || null
        };
        return _this;
    }
    IconPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonLabel = _a.buttonLabel, buttonClassName = _a.buttonClassName, disabled = _a.disabled, panelClassName = _a.panelClassName;
        var renderOption = this.props.renderOption;
        renderOption = renderOption === undefined ? 'panel' : renderOption;
        return React.createElement("div", null,
            React.createElement(PrimaryButton, { text: buttonLabel, onClick: this.iconPickerOnClick, className: buttonClassName, disabled: disabled, "data-automation-id": "icon-picker-open" }),
            renderOption === 'panel' ?
                React.createElement(Panel, { isOpen: this.state.isPanelOpen, onDismiss: this.closePanel, type: PanelType.medium, "data-automation-id": "icon-picker-panel", closeButtonAriaLabel: strings.CloseButton, className: panelClassName, onRenderNavigation: this.renderPanelNav, onRenderFooterContent: this.renderPanelFooter }, this.renderPanelContent())
                :
                    React.createElement(Dialog, { hidden: !this.state.isPanelOpen, onDismiss: this.closePanel, isBlocking: true, containerClassName: styles.dialog, dialogContentProps: {
                            type: DialogType.normal,
                            title: strings.SelectIcon,
                            showCloseButton: true,
                            className: panelClassName
                        } },
                        React.createElement(SearchBox, { className: styles.searchBox, onAbort: this.onAbort, "data-automation-id": "icon-picker-search", onSearch: debounce(this.onChange, 300), onChange: debounce(function (e, value) { return _this.onChange(value); }, 300) }),
                        React.createElement("div", { className: styles.dialogIconsContainer }, this.renderPanelContent()),
                        React.createElement(DialogFooter, null,
                            React.createElement("div", { className: styles.dialogFooter },
                                React.createElement(Icon, { iconName: this.state.currentIcon, className: styles.dialogSelectedIcons }),
                                React.createElement(PrimaryButton, { className: styles.save, text: strings.SaveButtonLabel, onClick: this.confirmSelection, disabled: !this.state.currentIcon, "data-automation-id": "icon-picker-save" }),
                                React.createElement(DefaultButton, { text: strings.CancelButtonLabel, onClick: this.closePanel, className: styles.btnCancel, "data-automation-id": "icon-picker-close" })))));
    };
    return IconPicker;
}(React.Component));
export { IconPicker };
//# sourceMappingURL=IconPicker.js.map