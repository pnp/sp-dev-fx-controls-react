import { HostConfig } from "adaptivecards/lib/host-config";
import { ITheme } from "@fluentui/react/lib/Styling";

export interface IAdaptiveCardHostConfigResult {
    theme:ITheme;
    hostConfig: HostConfig;
}
