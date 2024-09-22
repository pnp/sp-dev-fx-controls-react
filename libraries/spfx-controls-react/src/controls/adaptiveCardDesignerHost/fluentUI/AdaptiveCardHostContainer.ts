import { Version, Versions } from "adaptivecards";
import { HostContainer } from "adaptivecards-designer/lib/containers";
import { HostConfig } from "adaptivecards/lib/host-config";
import { initializeAdaptiveCardHost } from "../../adaptiveCardHost/AdaptiveCardHost.HostConfig";
import { registerFluentUIActions } from "../../adaptiveCardHost/fluentUI/Actions";
import { registerFluentUIElements } from "../../adaptiveCardHost/fluentUI/Elements";
import { AdaptiveCardHostThemeType } from "../../adaptiveCardHost/models/AdaptiveCardHostThemeType";
import { fluentUIDefaultTheme } from "../../../common/fluentUIThemes/FluentUIDefaultTheme";

export enum AdaptiveCardHostContainerType {
  Default = "default",
  TeamsDefault = "TeamsDefault",
  TeamsDark = "TeamsDark",
  TeamsHighContrast = "TeamsHighContrast"
}

export class AdaptiveCardHostContainer extends HostContainer {
  private type: AdaptiveCardHostContainerType;

  public constructor(name: string, type: AdaptiveCardHostContainerType) {
    super(name);
    this.type = type;

    registerFluentUIElements(this.elementsRegistry);
    registerFluentUIActions(this.actionsRegistry);
  }

  public renderTo(hostElement: HTMLElement): void {
    const container = document.createElement("div");
    container.className = "adaptiveCardHostContainer";
    container.appendChild(this.cardHost);
    hostElement.appendChild(container);
  }

  public getCurrentStyleSheet(): string {
    return "";
  }

  public getHostConfig(): HostConfig {
    let hostThemeType: AdaptiveCardHostThemeType;

    switch (this.type) {
      case AdaptiveCardHostContainerType.Default:
        hostThemeType = AdaptiveCardHostThemeType.SharePoint;
        break;
      case AdaptiveCardHostContainerType.TeamsDefault:
        hostThemeType = AdaptiveCardHostThemeType.Teams;
        break;
      case AdaptiveCardHostContainerType.TeamsDark:
        hostThemeType = AdaptiveCardHostThemeType.TeamsDark;
        break;
      case AdaptiveCardHostContainerType.TeamsHighContrast:
        hostThemeType = AdaptiveCardHostThemeType.TeamsHighContrast;
        break;
    }

    const adaptiveCardHostConfigResult = initializeAdaptiveCardHost(hostThemeType, fluentUIDefaultTheme());
    return adaptiveCardHostConfigResult.hostConfig;
  }

  get targetVersion(): Version {
    return Versions.v1_5;
  }
}
