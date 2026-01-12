import * as React from "react";
import { InjectedButtonAttributes, InjectedHeadingAttributes, InjectedPanelAttributes } from "../helpers/AccordionStore";
import { AccordionContext } from "./AccordionContext";
export type UUID = string;
type ProviderProps = {
    children?: React.ReactNode;
    uuid: UUID;
    accordionContext: AccordionContext;
    dangerouslySetExpanded?: boolean;
};
export type ProviderWrapperProps = Pick<ProviderProps, Exclude<keyof ProviderProps, 'accordionContext'>>;
export type ItemContext = {
    uuid: UUID;
    expanded: boolean;
    disabled: boolean;
    panelAttributes: InjectedPanelAttributes;
    headingAttributes: InjectedHeadingAttributes;
    buttonAttributes: InjectedButtonAttributes;
    toggleExpanded(): void;
};
declare const ProviderWrapper: React.SFC<ProviderWrapperProps>;
export { ProviderWrapper as Provider };
type ConsumerProps = {
    children(container: ItemContext): React.ReactNode;
};
export declare const Consumer: ({ children }: ConsumerProps) => JSX.Element;
//# sourceMappingURL=ItemContext.d.ts.map