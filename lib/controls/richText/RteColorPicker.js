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
import * as strings from 'ControlStrings';
import styles from './RteColorPicker.module.scss';
import SwatchColorPickerGroup from './SwatchColorPickerGroup';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { Icon } from '@fluentui/react/lib/Icon';
import { Callout } from '@fluentui/react/lib/Callout';
import { ThemeColorHelper } from '../../common/utilities/ThemeColorHelper';
var RteColorPicker = /** @class */ (function (_super) {
    __extends(RteColorPicker, _super);
    function RteColorPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.wrapperRef = undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
        /**
         * Handle switch to default
         */
        _this.handleSwitchToDefault = function () {
            _this.setState({ isCalloutVisible: !_this.state.isCalloutVisible });
            _this.props.switchToDefaultColor();
        };
        /**
         * Handle color change
         */
        _this.handleColorChanged = function (color) {
            _this.setState({ isCalloutVisible: !_this.state.isCalloutVisible });
            _this.props.onColorChanged(color);
        };
        /**
         * Get swatch color picker group
         */
        _this.getSwatchColorPickerGroup = function (pickerGroup) {
            var groupName = undefined;
            switch (pickerGroup) {
                case "themeColors":
                    groupName = strings.ThemeColorsGroupName;
                    break;
                case "highlightColors":
                    groupName = strings.HighlightColorsGroupName;
                    break;
                case "standardColors":
                    groupName = strings.StandardColorsGroupName;
                    break;
                case "customColors":
                    groupName = strings.CustomColorsGroupName;
                    break;
                default:
                    groupName = strings.HighlightColorsGroupName;
                    break;
            }
            var groupColors = [];
            switch (pickerGroup) {
                case "themeColors":
                    groupColors = [
                        {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorDarker),
                            id: "#1c561c",
                            label: strings.ThemeColorDarker
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorDark),
                            id: "#267426",
                            label: strings.ThemeColorDark
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorDarkAlt),
                            id: "#2d8a2d",
                            label: strings.ThemeColorDarkAlt
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorPrimary),
                            id: "#339933",
                            label: strings.ThemeColorPrimary
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorSecondary),
                            id: "#44a544",
                            label: strings.ThemeColorSecondary
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorTertiary),
                            id: "#a6a6a6",
                            label: strings.ThemeColorTertiary
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralSecondary),
                            id: "#666666",
                            label: strings.ThemeColorNeutralSecondary
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralPrimaryAlt),
                            id: "#3c3c3c",
                            label: strings.ThemeColorNeutralPrimaryAlt
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralPrimary),
                            id: "#333333",
                            label: strings.ThemeColorNeutralPrimary
                        }, {
                            color: ThemeColorHelper.GetThemeColor(styles.ThemeColorNeutralDark),
                            id: "#212121",
                            label: strings.ThemeColorNeutralDark
                        }
                    ];
                    break;
                case "highlightColors":
                    groupColors = [
                        {
                            color: "#FFFF00",
                            id: "#FFFF00",
                            label: strings.HighlightColorYellow
                        },
                        {
                            color: "#00FF00",
                            id: "#00FF00",
                            label: strings.HighlightColorGreen
                        },
                        {
                            color: "#00FFFF",
                            id: "#00FFFF",
                            label: strings.HighlightColorAqua
                        },
                        {
                            color: "#FF00FF",
                            id: "#FF00FF",
                            label: strings.HighlightColorMagenta
                        },
                        {
                            color: "#0000FF",
                            id: "#0000FF",
                            label: strings.HighlightColorBlue
                        },
                        {
                            color: "#FF0000",
                            id: "#FF0000",
                            label: strings.HighlightColorRed
                        },
                        {
                            color: "#000080",
                            id: "#000080",
                            label: strings.HighlightColorDarkblue
                        },
                        {
                            color: "#008080",
                            id: "#008080",
                            label: strings.HighlightColorTeal
                        },
                        {
                            color: "#008000",
                            id: "#008000",
                            label: strings.HighlightColorDarkgreen
                        },
                        {
                            color: "#800080",
                            id: "#800080",
                            label: strings.HighlightColorPurple
                        },
                        {
                            color: "#800000",
                            id: "#800000",
                            label: strings.HighlightColorMaroon
                        },
                        {
                            color: "#808000",
                            id: "#808000",
                            label: strings.HighlightColorGold
                        },
                        {
                            color: "#808080",
                            id: "#808080",
                            label: strings.HighlightColorDarkgrey
                        },
                        {
                            color: "#C0C0C0",
                            id: "#C0C0C0",
                            label: strings.HighlightColorGrey
                        },
                        {
                            color: "#000000",
                            id: "#000000",
                            label: strings.HighlightColorBlack
                        }
                    ];
                    break;
                case 'customColors':
                    groupColors = _this.props.customColors;
                    break;
                default:
                    groupColors = [
                        {
                            color: "#a80000",
                            id: "#a80000",
                            label: strings.StandardColorDarkred
                        },
                        {
                            color: "#e81123",
                            id: "#e81123",
                            label: strings.StandardColorRed
                        },
                        {
                            color: "#ffb900",
                            id: "#ffb900",
                            label: strings.StandardColorOrange
                        },
                        {
                            color: "#fff100",
                            id: "#fff100",
                            label: strings.StandardColorYellow
                        },
                        {
                            color: "#bad80a",
                            id: "#bad80a",
                            label: strings.StandardColorLightgreen
                        },
                        {
                            color: "#107c10",
                            id: "#107c10",
                            label: strings.StandardColorGreen
                        },
                        {
                            color: "#00bcf2",
                            id: "#00bcf2",
                            label: strings.StandardColorLightblue
                        },
                        {
                            color: "#0078d4",
                            id: "#0078d4",
                            label: strings.StandardColorBlue
                        },
                        {
                            color: "#002050",
                            id: "#002050",
                            label: strings.StandardColorDarkblue
                        },
                        {
                            color: "#5c2d91",
                            id: "#5c2d91",
                            label: strings.StandardColorPurple
                        }
                    ];
                    break;
            }
            return (React.createElement(SwatchColorPickerGroup, { key: pickerGroup, groupText: groupName, onColorChanged: _this.handleColorChanged, groupColors: groupColors, selectedColor: _this.props.selectedColor }));
        };
        _this.state = {
            isCalloutVisible: false
        };
        return _this;
    }
    /**
     * Default React render method
     */
    RteColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonLabel = _a.buttonLabel, defaultButtonLabel = _a.defaultButtonLabel, fillThemeColor = _a.fillThemeColor, id = _a.id, previewColor = _a.previewColor;
        return (React.createElement("div", null,
            React.createElement("div", { ref: function (ref) { _this.wrapperRef = ref; } },
                React.createElement(TooltipHost, { content: buttonLabel, id: id, calloutProps: { gapSpace: 0 } },
                    React.createElement(DefaultButton, { className: styles.colorPickerButton, "aria-describedby": id, onClick: function () { return _this.handleColorChanged(previewColor); } },
                        React.createElement("svg", { className: "".concat(styles.previewSvg, " ").concat((previewColor === "rgba(0, 0, 0, 0)" || previewColor === "#ffffff") ? styles.border : ""), fill: previewColor, viewBox: "0 0 20 20" },
                            React.createElement("rect", { className: styles.previewRectangle, width: "100%", height: "100%" })),
                        React.createElement("div", { className: styles.buttonLabel }, buttonLabel),
                        React.createElement(Icon, { iconName: "CaretDownSolid8", className: styles.previewIcon })))),
            React.createElement(Callout, { isBeakVisible: false, directionalHint: 4, className: styles.pickerCallout, setInitialFocus: true, gapSpace: 0, role: "alertdialog", hidden: !this.state.isCalloutVisible, target: this.wrapperRef, onDismiss: function () { return _this.setState({ isCalloutVisible: false }); } },
                React.createElement(TooltipHost, { content: defaultButtonLabel, id: "".concat(id, "DefaultButton"), calloutProps: { gapSpace: 0 } },
                    React.createElement(DefaultButton, { className: styles.colorPickerButton, "aria-describedby": "".concat(id, "DefaultButton"), onClick: this.handleSwitchToDefault },
                        React.createElement("svg", { className: "".concat(styles.previewSvg, " ").concat(styles.defaultSvg, " ").concat(fillThemeColor ? styles.fillThemeColor : styles.fillDefaultColor, " ").concat(fillThemeColor ? "" : styles.border), viewBox: "0 0 20 20" },
                            React.createElement("rect", { className: styles.previewRectangle, width: "100%", height: "100%" })),
                        React.createElement("div", { className: styles.buttonLabel }, defaultButtonLabel))),
                this.props.colorPickerGroups.map(function (cpg) {
                    return (_this.getSwatchColorPickerGroup(cpg));
                }))));
    };
    return RteColorPicker;
}(React.Component));
export default RteColorPicker;
//# sourceMappingURL=RteColorPicker.js.map