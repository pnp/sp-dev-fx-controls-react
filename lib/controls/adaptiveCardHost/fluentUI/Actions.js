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
import { ExecuteAction, OpenUrlAction, ShowCardAction, SubmitAction, ToggleVisibilityAction } from "adaptivecards/lib/card-elements";
import { ActionIconPlacement } from "adaptivecards/lib/enums";
import { CompoundButton, DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { createTheme } from "@fluentui/react/lib/Styling";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { fluentUIDefaultTheme } from "../../../common/fluentUIThemes/FluentUIDefaultTheme";
import { hostCapabilitiesFluentUIThemeKey } from "./HostCapability";
var redPalette = {
    themePrimary: "#d40004",
    themeLighterAlt: "#fdf3f3",
    themeLighter: "#f8d0d1",
    themeLight: "#f2a9ab",
    themeTertiary: "#e55c5e",
    themeSecondary: "#d91a1d",
    themeDarkAlt: "#be0003",
    themeDark: "#a10003",
    themeDarker: "#770002",
    neutralLighterAlt: "#faf9f8",
    neutralLighter: "#f3f2f1",
    neutralLight: "#edebe9",
    neutralQuaternaryAlt: "#e1dfdd",
    neutralQuaternary: "#d0d0d0",
    neutralTertiaryAlt: "#c8c6c4",
    neutralTertiary: "#a19f9d",
    neutralSecondary: "#605e5c",
    neutralPrimaryAlt: "#3b3a39",
    neutralPrimary: "#323130",
    neutralDark: "#201f1e",
    black: "#000000",
    white: "#ffffff"
};
var ActionButton = function (props) {
    var control;
    var theme = (props.theme) ? props.theme : fluentUIDefaultTheme();
    if (props.iconUrl) {
        control =
            React.createElement(CompoundButton, { className: props.className, onClick: props.actionClickHandler, theme: theme },
                React.createElement("div", { style: {
                        display: "flex",
                        flexDirection: props.iconPlacement === ActionIconPlacement.LeftOfTitle ? "row" : "column",
                        justifyContent: "center",
                    } },
                    React.createElement("img", { src: props.iconUrl, style: {
                            alignSelf: "center",
                            width: props.iconSize,
                            height: props.iconSize,
                            flex: "0 0 auto",
                        } }),
                    React.createElement("span", { style: { alignSelf: "center" } }, props.text)));
    }
    else {
        if (props.style.toLocaleLowerCase().trim() === 'positive') {
            control = React.createElement(PrimaryButton, { className: props.className, text: props.text, theme: theme, onClick: props.actionClickHandler });
        }
        else if (props.style.toLocaleLowerCase().trim() === 'destructive') {
            var dangerButtonTheme = createTheme({ palette: redPalette });
            control = React.createElement(PrimaryButton, { className: props.className, text: props.text, theme: dangerButtonTheme, onClick: props.actionClickHandler });
        }
        else {
            control = React.createElement(DefaultButton, { className: props.className, text: props.text, theme: theme, onClick: props.actionClickHandler });
        }
    }
    return control;
};
var createActionDiv = function (title, iconUrl, baseCssClass, iconPlacement, iconSize, actionClickHandler, style, theme) {
    var div = document.createElement("div");
    div.className = "fluentUI";
    // eslint-disable-next-line @microsoft/spfx/pair-react-dom-render-unmount
    ReactDOM.render(React.createElement(ActionButton, { text: title, className: baseCssClass, iconUrl: iconUrl, iconPlacement: iconPlacement, iconSize: iconSize, actionClickHandler: actionClickHandler, style: style, theme: theme }), div);
    return div;
};
var FluentUIExecuteAction = /** @class */ (function (_super) {
    __extends(FluentUIExecuteAction, _super);
    function FluentUIExecuteAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClickHandler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.execute();
        };
        return _this;
    }
    FluentUIExecuteAction.prototype.updateCssClasses = function () {
        // no-op;
    };
    FluentUIExecuteAction.prototype.render = function (baseCssClass) {
        var theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
        var actionsConfig = this.parent.hostConfig.actions;
        this._renderedElement = createActionDiv(this.title, this.iconUrl, baseCssClass, actionsConfig.iconPlacement, actionsConfig.iconSize, this.actionClickHandler, this.style, theme);
    };
    return FluentUIExecuteAction;
}(ExecuteAction));
export { FluentUIExecuteAction };
var FluentUIOpenUrlAction = /** @class */ (function (_super) {
    __extends(FluentUIOpenUrlAction, _super);
    function FluentUIOpenUrlAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClickHandler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.execute();
        };
        return _this;
    }
    FluentUIOpenUrlAction.prototype.updateCssClasses = function () {
        // no-op;
    };
    FluentUIOpenUrlAction.prototype.render = function (baseCssClass) {
        var theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
        var actionsConfig = this.parent.hostConfig.actions;
        this._renderedElement = createActionDiv(this.title, this.iconUrl, baseCssClass, actionsConfig.iconPlacement, actionsConfig.iconSize, this.actionClickHandler, this.style, theme);
    };
    return FluentUIOpenUrlAction;
}(OpenUrlAction));
export { FluentUIOpenUrlAction };
var FluentUIShowCardAction = /** @class */ (function (_super) {
    __extends(FluentUIShowCardAction, _super);
    function FluentUIShowCardAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClickHandler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.execute();
        };
        return _this;
    }
    FluentUIShowCardAction.prototype.updateCssClasses = function () {
        if (this.renderedElement) {
            this.renderedElement.setAttribute("aria-expanded", (this.state === 1 /* ActionButtonState.Expanded */).toString());
        }
    };
    FluentUIShowCardAction.prototype.render = function (baseCssClass) {
        var theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
        var actionsConfig = this.parent.hostConfig.actions;
        this._renderedElement = createActionDiv(this.title, this.iconUrl, baseCssClass, actionsConfig.iconPlacement, actionsConfig.iconSize, this.actionClickHandler, this.style, theme);
    };
    return FluentUIShowCardAction;
}(ShowCardAction));
export { FluentUIShowCardAction };
var FluentUISubmitAction = /** @class */ (function (_super) {
    __extends(FluentUISubmitAction, _super);
    function FluentUISubmitAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClickHandler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.execute();
        };
        return _this;
    }
    FluentUISubmitAction.prototype.updateCssClasses = function () {
        // no-op;
    };
    FluentUISubmitAction.prototype.render = function (baseCssClass) {
        var theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
        var actionsConfig = this.parent.hostConfig.actions;
        this._renderedElement = createActionDiv(this.title, this.iconUrl, baseCssClass, actionsConfig.iconPlacement, actionsConfig.iconSize, this.actionClickHandler, this.style, theme);
    };
    return FluentUISubmitAction;
}(SubmitAction));
export { FluentUISubmitAction };
var FluentUIToggleVisibilityAction = /** @class */ (function (_super) {
    __extends(FluentUIToggleVisibilityAction, _super);
    function FluentUIToggleVisibilityAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.actionClickHandler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.execute();
        };
        return _this;
    }
    FluentUIToggleVisibilityAction.prototype.updateCssClasses = function () {
        if (this.renderedElement) {
            this.renderedElement.setAttribute("aria-expanded", (this.state === 1 /* ActionButtonState.Expanded */).toString());
        }
    };
    FluentUIToggleVisibilityAction.prototype.render = function (baseCssClass) {
        var theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
        var actionsConfig = this.parent.hostConfig.actions;
        this._renderedElement = createActionDiv(this.title, this.iconUrl, baseCssClass, actionsConfig.iconPlacement, actionsConfig.iconSize, this.actionClickHandler, this.style, theme);
    };
    return FluentUIToggleVisibilityAction;
}(ToggleVisibilityAction));
export { FluentUIToggleVisibilityAction };
export function registerFluentUIActions(registry) {
    initializeIcons();
    registry.register("Action.Submit", FluentUISubmitAction);
    registry.register("Action.OpenUrl", FluentUIOpenUrlAction);
    registry.register("Action.ShowCard", FluentUIShowCardAction);
    registry.register("Action.ToggleVisibility", FluentUIToggleVisibilityAction);
    registry.register("Action.Execute", FluentUIExecuteAction);
}
//# sourceMappingURL=Actions.js.map