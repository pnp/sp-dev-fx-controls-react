import * as React from "react";
import { IEvent } from "../../../Calendar";
import { Theme } from "@fluentui/react-components";
import { BaseComponentContext } from "@microsoft/sp-component-base";
import { EAppHostName } from "../../../controls/userPicker/constants/EAppHostname";
export interface ICalendarProps {
    hasTeamsContext: boolean;
    themeString: string;
    theme?: Partial<Theme> | undefined;
    context: BaseComponentContext;
    title: string;
    appHostName: EAppHostName;
}
export declare const mockEvents: IEvent[];
export declare const TestCalendarControl: React.FunctionComponent<ICalendarProps>;
export default TestCalendarControl;
//# sourceMappingURL=TestCalendarControl.d.ts.map