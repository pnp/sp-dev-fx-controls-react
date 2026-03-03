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
import { TextField, Toggle } from '@fluentui/react';
var ControlToggles = /** @class */ (function (_super) {
    __extends(ControlToggles, _super);
    function ControlToggles(props, state) {
        return _super.call(this, props) || this;
    }
    ControlToggles.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(TextField, { label: "Search", placeholder: "Search Controls", onChange: function (e, newValue) {
                    _this.setState({ filter: newValue });
                } }),
            this.getValidControls().map(function (control) {
                if (_this.state && _this.state.filter && _this.state.filter.length > 0 && control.toLowerCase().indexOf(_this.state.filter.toLowerCase()) === -1) {
                    return null;
                }
                return (React.createElement(Toggle, { key: control, label: _this.getProperCase(control), checked: _this.props.controlVisibility && _this.props.controlVisibility[control] || false, onChange: function (e, checked) {
                        _this.props.onChange(control, checked);
                    } }));
            })));
    };
    ControlToggles.prototype.getValidControls = function () {
        var validControls = [
            "all",
            "AccessibleAccordion", "AdaptiveCardDesignerHost", "AdaptiveCardHost",
            "AnimatedDialog", "Carousel", "ChartControl",
            "ComboBoxListItemPicker", "ContentTypePicker", "Dashboard", "DateTimePicker",
            "DragDropFiles", "DynamicForm", "EnhancedThemeProvider",
            "FieldCollectionData", "FieldPicker", "FilePicker",
            "FileTypeIcon", "FilterBar", "FolderExplorer", "FolderPicker",
            "GridLayout", "HoverReactionsBar", "IconPicker", "IFrameDialog",
            "IFramePanel", "ListItemPicker",
            "ImagePicker", "ListItemAttachments", "ListItemComments",
            "ListPicker", "ListView", "LivePersona",
            "LocationPicker", "Map", "ModernAudio", "MonacoEditor",
            "ModernTaxonomyPicker", "Pagination", "PeoplePicker",
            "Placeholder", "Progress", "ProgressStepsIndicator", "RichText",
            "ShareDialog", "SecurityTrimmedControl", "SiteBreadcrumb", "SitePicker",
            "TaxonomyPicker", "TaxonomyTree", "Teams", "TermSetNavigation",
            "TestControl", "Toolbar", "TreeView",
            "UploadFiles", "UserPicker", "VariantThemeProvider",
            "ViewPicker", "WebPartTitle", "Calendar"
        ];
        return validControls;
    };
    ControlToggles.prototype.getProperCase = function (name) {
        name = name.replace(/([A-Z])/g, ' $1');
        name = name.replace(/^([a-z])/, function (match, p1) { return p1.toUpperCase(); });
        return name;
    };
    return ControlToggles;
}(React.Component));
export { ControlToggles };
//# sourceMappingURL=ControlToggles.js.map