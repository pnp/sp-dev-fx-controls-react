import { HostConfig } from "adaptivecards/lib/host-config";
import { ITheme } from "office-ui-fabric-react/lib/Styling";

export interface IAdaptiveCardHostConfigResult {
    theme:ITheme;
    hostConfig: HostConfig;
}