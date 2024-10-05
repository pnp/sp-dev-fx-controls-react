
import { Action, ActionButtonState, ExecuteAction, OpenUrlAction, ShowCardAction, SubmitAction, ToggleVisibilityAction } from "adaptivecards/lib/card-elements";
import { ActionIconPlacement } from "adaptivecards/lib/enums";
import { CardObjectRegistry } from "adaptivecards/lib/registry";
import { BaseButton, Button, CompoundButton, DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { createTheme, ITheme } from "@fluentui/react/lib/Styling";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { fluentUIDefaultTheme } from "../../../common/fluentUIThemes/FluentUIDefaultTheme";
import { hostCapabilitiesFluentUIThemeKey } from "./HostCapability";

const redPalette = {
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

interface IActionButtonProps {
  text: string;
  className?: string;
  iconUrl?: string;
  iconPlacement?: ActionIconPlacement;
  iconSize?: number;
  actionClickHandler: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>) => void;
  style: string;
  theme?: ITheme;
}

const ActionButton = (props: IActionButtonProps): JSX.Element => {
  let control: JSX.Element;
  const theme = (props.theme) ? props.theme : fluentUIDefaultTheme();

  if (props.iconUrl) {
    control =
      <CompoundButton
        className={props.className}
        onClick={props.actionClickHandler}
        theme={theme}>
        <div style={
          {
            display: "flex",
            flexDirection: props.iconPlacement === ActionIconPlacement.LeftOfTitle ? "row" : "column",
            justifyContent: "center",
          }
        }><img src={props.iconUrl}
          style={
            {
              alignSelf: "center",
              width: props.iconSize,
              height: props.iconSize,
              flex: "0 0 auto",
            }
          } />
          <span style={{ alignSelf: "center" }}>{props.text}</span>
        </div>
      </CompoundButton>;
  } else {
    if (props.style.toLocaleLowerCase().trim() === 'positive') {
      control = <PrimaryButton
        className={props.className}
        text={props.text}
        theme={theme}
        onClick={props.actionClickHandler} />;
    } else if (props.style.toLocaleLowerCase().trim() === 'destructive') {
      const dangerButtonTheme: ITheme = createTheme({ palette: redPalette });
      control = <PrimaryButton
        className={props.className}
        text={props.text}
        theme={dangerButtonTheme}
        onClick={props.actionClickHandler} />;
    } else {
      control = <DefaultButton
        className={props.className}
        text={props.text}
        theme={theme}
        onClick={props.actionClickHandler} />;
    }
  }

  return control;
};

const createActionDiv = (
  title: string,
  iconUrl: string,
  baseCssClass: string,
  iconPlacement: ActionIconPlacement,
  iconSize: number,
  actionClickHandler: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>) => void,
  style: string,
  theme?: ITheme): HTMLDivElement => {
  const div = document.createElement("div");
  div.className = "fluentUI";
  // eslint-disable-next-line @microsoft/spfx/pair-react-dom-render-unmount
  ReactDOM.render(
    <ActionButton
      text={title}
      className={baseCssClass}
      iconUrl={iconUrl}
      iconPlacement={iconPlacement}
      iconSize={iconSize}
      actionClickHandler={actionClickHandler}
      style={style}
      theme={theme}
    />, div);
  return div;
};

export class FluentUIExecuteAction extends ExecuteAction {
  protected updateCssClasses(): void {
    // no-op;
  }

  private actionClickHandler = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    this.execute();
  }

  public render(baseCssClass?: string): void {
    const theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    const actionsConfig = this.parent.hostConfig.actions;
    this._renderedElement = createActionDiv(
      this.title,
      this.iconUrl,
      baseCssClass,
      actionsConfig.iconPlacement,
      actionsConfig.iconSize,
      this.actionClickHandler,
      this.style,
      theme);
  }
}

export class FluentUIOpenUrlAction extends OpenUrlAction {
  protected updateCssClasses(): void {
    // no-op;
  }

  private actionClickHandler = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    this.execute();
  }

  public render(baseCssClass?: string): void {
    const theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    const actionsConfig = this.parent.hostConfig.actions;
    this._renderedElement = createActionDiv(
      this.title,
      this.iconUrl,
      baseCssClass,
      actionsConfig.iconPlacement,
      actionsConfig.iconSize,
      this.actionClickHandler,
      this.style,
      theme);
  }
}

export class FluentUIShowCardAction extends ShowCardAction {
  protected updateCssClasses(): void {
    if (this.renderedElement) {
      this.renderedElement.setAttribute(
        "aria-expanded",
        (this.state === ActionButtonState.Expanded).toString()
      );
    }
  }

  private actionClickHandler = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    this.execute();
  }

  public render(baseCssClass?: string): void {
    const theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    const actionsConfig = this.parent.hostConfig.actions;
    this._renderedElement = createActionDiv(
      this.title,
      this.iconUrl,
      baseCssClass,
      actionsConfig.iconPlacement,
      actionsConfig.iconSize,
      this.actionClickHandler,
      this.style,
      theme);
  }
}

export class FluentUISubmitAction extends SubmitAction {
  protected updateCssClasses(): void {
    // no-op;
  }

  private actionClickHandler = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    this.execute();
  }

  public render(baseCssClass?: string): void {
    const theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    const actionsConfig = this.parent.hostConfig.actions;
    this._renderedElement = createActionDiv(
      this.title,
      this.iconUrl,
      baseCssClass,
      actionsConfig.iconPlacement,
      actionsConfig.iconSize,
      this.actionClickHandler,
      this.style,
      theme);
  }
}

export class FluentUIToggleVisibilityAction extends ToggleVisibilityAction {
  protected updateCssClasses(): void {
    if (this.renderedElement) {
      this.renderedElement.setAttribute(
        "aria-expanded",
        (this.state === ActionButtonState.Expanded).toString()
      );
    }
  }

  private actionClickHandler = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement | BaseButton | Button | HTMLSpanElement>): void => {
    e.stopPropagation();
    e.preventDefault();
    this.execute();
  }

  public render(baseCssClass?: string): void {
    const theme = this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    const actionsConfig = this.parent.hostConfig.actions;
    this._renderedElement = createActionDiv(
      this.title,
      this.iconUrl,
      baseCssClass,
      actionsConfig.iconPlacement,
      actionsConfig.iconSize,
      this.actionClickHandler,
      this.style,
      theme);
  }
}

export function registerFluentUIActions(registry: CardObjectRegistry<Action>): void {
  initializeIcons();

  registry.register("Action.Submit", FluentUISubmitAction);
  registry.register("Action.OpenUrl", FluentUIOpenUrlAction);
  registry.register("Action.ShowCard", FluentUIShowCardAction);
  registry.register("Action.ToggleVisibility", FluentUIToggleVisibilityAction);
  registry.register("Action.Execute", FluentUIExecuteAction);
}
