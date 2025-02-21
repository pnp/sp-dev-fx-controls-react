// tslint:disable:max-classes-per-file

import * as React from "react";

import {
  InjectedButtonAttributes,
  InjectedHeadingAttributes,
  InjectedPanelAttributes
} from "../helpers/AccordionStore";
import {
  AccordionContext,
  Consumer as AccordionContextConsumer
} from "./AccordionContext";

export type UUID = string;

type ProviderProps = {
    children?: React.ReactNode;
    uuid: UUID;
    accordionContext: AccordionContext;
    dangerouslySetExpanded?: boolean;
};

export type ProviderWrapperProps = Pick<
    ProviderProps,
    Exclude<keyof ProviderProps, 'accordionContext'>
>;

export type ItemContext = {
    uuid: UUID;
    expanded: boolean;
    disabled: boolean;
    panelAttributes: InjectedPanelAttributes;
    headingAttributes: InjectedHeadingAttributes;
    buttonAttributes: InjectedButtonAttributes;
    toggleExpanded(): void;
};

const Context = React.createContext(null as ItemContext | null);

const Provider = ({
    children,
    uuid,
    accordionContext,
    dangerouslySetExpanded,
}: ProviderProps): JSX.Element => {
    const toggleExpanded = (): void => {
        accordionContext.toggleExpanded(uuid);
    };

    const renderChildren = (
        ctx: AccordionContext,
    ): JSX.Element => {
        const expanded =
            dangerouslySetExpanded ? dangerouslySetExpanded : ctx.isItemExpanded(uuid);
        const disabled = ctx.isItemDisabled(uuid);
        const panelAttributes = ctx.getPanelAttributes(
            uuid,
            dangerouslySetExpanded,
        );
        const headingAttributes = ctx.getHeadingAttributes(uuid);
        const buttonAttributes = ctx.getButtonAttributes(
            uuid,
            dangerouslySetExpanded,
        );

        return (
            <Context.Provider
                value={{
                    uuid,
                    expanded,
                    disabled,
                    toggleExpanded: toggleExpanded,
                    panelAttributes,
                    headingAttributes,
                    buttonAttributes,
                }}
            >
                {children}
            </Context.Provider>
        );
    };

    return (
        <AccordionContextConsumer>{renderChildren}</AccordionContextConsumer>
    );
};

const ProviderWrapper: React.SFC<ProviderWrapperProps> = (
    props: ProviderWrapperProps,
): JSX.Element => (
    <AccordionContextConsumer>
        {(accordionContext: AccordionContext): JSX.Element => (
            <Provider {...props} accordionContext={accordionContext} />
        )}
    </AccordionContextConsumer>
);

export { ProviderWrapper as Provider };

type ConsumerProps = {
    children(container: ItemContext): React.ReactNode;
};

export const Consumer = ({ children }: ConsumerProps): JSX.Element => {
    const renderChildren = (container: ItemContext | null): React.ReactNode => {
        return container ? children(container) : null;
    };

    return <Context.Consumer>{renderChildren}</Context.Consumer>;
};
