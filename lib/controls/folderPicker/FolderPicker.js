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
import styles from './FolderPicker.module.scss';
import { IconButton, PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Link } from '@fluentui/react/lib/Link';
import { getId } from '@fluentui/react/lib/Utilities';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { FolderExplorer } from '../folderExplorer/FolderExplorer';
import * as telemetry from '../../common/telemetry';
var FolderPicker = /** @class */ (function (_super) {
    __extends(FolderPicker, _super);
    function FolderPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._folderLinkId = getId('folderLink');
        _this._showPanel = function () {
            _this.setState({ showPanel: true });
        };
        _this._hidePanel = function () {
            _this.setState({ showPanel: false });
        };
        _this._onRenderFooterContent = function () {
            return (React.createElement("div", { className: styles.actions },
                React.createElement(PrimaryButton, { iconProps: { iconName: 'Save' }, onClick: _this._onFolderSave }, "Save"),
                React.createElement(DefaultButton, { iconProps: { iconName: 'Cancel' }, onClick: _this._hidePanel }, "Cancel")));
        };
        _this._onFolderSelect = function (folder) {
            _this._selectedFolder = folder;
        };
        _this._onFolderSave = function () {
            _this.setState({
                selectedFolder: _this._selectedFolder,
                showPanel: false,
            });
            _this.props.onSelect(_this._selectedFolder);
        };
        _this._resetSelection = function () {
            _this._selectedFolder = null;
            _this.setState({
                selectedFolder: _this._selectedFolder,
            });
            _this.props.onSelect(_this._selectedFolder);
        };
        telemetry.track('ReactFolderPicker', {});
        _this.state = {
            showPanel: false,
            selectedFolder: _this.props.defaultFolder
        };
        return _this;
    }
    FolderPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        this.setState({
            selectedFolder: nextProps.defaultFolder,
        });
    };
    FolderPicker.prototype.render = function () {
        return (React.createElement("div", null,
            this.props.label &&
                React.createElement(Label, { className: this.props.required ? styles.required : '', htmlFor: this._folderLinkId }, this.props.label),
            React.createElement("div", { className: styles.folderPicker },
                React.createElement("div", { className: styles.selection },
                    !this.state.selectedFolder &&
                        React.createElement("span", { className: styles.selectFolderLabel }, "Select a folder"),
                    this.state.selectedFolder &&
                        React.createElement("div", { className: styles.selectFolder },
                            React.createElement(Link, { className: styles.selectedLink, target: '_blank', "data-interception": "off", id: this._folderLinkId, href: this.state.selectedFolder.ServerRelativeUrl },
                                React.createElement("span", { title: this.state.selectedFolder.Name }, this.state.selectedFolder.Name)),
                            React.createElement(IconButton, { iconProps: { iconName: 'Cancel' }, title: "Delete selection", ariaLabel: "Delete selection", onClick: this._resetSelection, disabled: this.props.disabled }))),
                React.createElement("div", { className: styles.selectButton },
                    React.createElement(IconButton, { iconProps: { iconName: 'FolderList' }, title: "Select folder", ariaLabel: "Select folder", disabled: this.props.disabled, onClick: this._showPanel }))),
            React.createElement(Panel, { isOpen: this.state.showPanel, type: PanelType.medium, onDismiss: this._hidePanel, headerText: "Select folder", closeButtonAriaLabel: "Close", onRenderFooterContent: this._onRenderFooterContent },
                React.createElement("div", null,
                    React.createElement(FolderExplorer, { context: this.props.context, rootFolder: this.props.rootFolder, defaultFolder: this.state.selectedFolder, onSelect: this._onFolderSelect, canCreateFolders: this.props.canCreateFolders, siteAbsoluteUrl: this.props.siteAbsoluteUrl })))));
    };
    return FolderPicker;
}(React.Component));
export { FolderPicker };
//# sourceMappingURL=FolderPicker.js.map