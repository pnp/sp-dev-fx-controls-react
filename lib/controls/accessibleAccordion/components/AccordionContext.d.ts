import * as React from "react";
import AccordionStore, { InjectedButtonAttributes, InjectedHeadingAttributes, InjectedPanelAttributes } from "../helpers/AccordionStore";
import { UUID } from "./ItemContext";
export interface ProviderProps {
    preExpanded?: UUID[];
    allowMultipleExpanded?: boolean;
    allowZeroExpanded?: boolean;
    children?: React.ReactNode;
    onChange?(args: UUID[]): void;
}
type ProviderState = AccordionStore;
export interface AccordionContext {
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
    toggleExpanded(uuid: UUID): void;
    isItemDisabled(uuid: UUID): boolean;
    isItemExpanded(uuid: UUID): boolean;
    getPanelAttributes(uuid: UUID, dangerouslySetExpanded?: boolean): InjectedPanelAttributes;
    getHeadingAttributes(uuid: UUID): InjectedHeadingAttributes;
    getButtonAttributes(uuid: UUID, dangerouslySetExpanded?: boolean): InjectedButtonAttributes;
}
export declare class Provider extends React.PureComponent<ProviderProps, ProviderState> {
    static defaultProps: ProviderProps;
    state: ProviderState;
    constructor(props: ProviderProps);
    private toggleExpanded;
    private isItemDisabled;
    private isItemExpanded;
    private getPanelAttributes;
    private getHeadingAttributes;
    private getButtonAttributes;
    render(): JSX.Element;
}
export declare class Consumer extends React.PureComponent<{
    children(container: AccordionContext): React.ReactNode;
}> {
    private renderChildren;
    render(): JSX.Element;
}
export {};
//# sourceMappingURL=AccordionContext.d.ts.map