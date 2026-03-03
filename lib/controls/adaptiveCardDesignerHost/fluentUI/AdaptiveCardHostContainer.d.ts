import { Version } from "adaptivecards";
import { HostContainer } from "adaptivecards-designer/lib/containers";
import { HostConfig } from "adaptivecards/lib/host-config";
export declare enum AdaptiveCardHostContainerType {
    Default = "default",
    TeamsDefault = "TeamsDefault",
    TeamsDark = "TeamsDark",
    TeamsHighContrast = "TeamsHighContrast"
}
export declare class AdaptiveCardHostContainer extends HostContainer {
    private type;
    constructor(name: string, type: AdaptiveCardHostContainerType);
    renderTo(hostElement: HTMLElement): void;
    getCurrentStyleSheet(): string;
    getHostConfig(): HostConfig;
    get targetVersion(): Version;
}
//# sourceMappingURL=AdaptiveCardHostContainer.d.ts.map