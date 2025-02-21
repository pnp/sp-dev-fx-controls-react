// tslint:disable:max-classes-per-file

import * as React from "react";

import * as telemetry from '../../../common/telemetry';

import AccordionStore, {
  InjectedButtonAttributes,
  InjectedHeadingAttributes,
  InjectedPanelAttributes
} from "../helpers/AccordionStore";
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
    getPanelAttributes(
        uuid: UUID,
        dangerouslySetExpanded?: boolean,
    ): InjectedPanelAttributes;
    getHeadingAttributes(uuid: UUID): InjectedHeadingAttributes;
    getButtonAttributes(
        uuid: UUID,
        dangerouslySetExpanded?: boolean,
    ): InjectedButtonAttributes;
}

const Context = React.createContext(null as AccordionContext | null);

export class Provider extends React.PureComponent<
    ProviderProps,
    ProviderState
> {
  public  static defaultProps: ProviderProps = {
        allowMultipleExpanded: false,
        allowZeroExpanded: false,
    };

   public state: ProviderState = new AccordionStore({
        expanded: this.props.preExpanded,
        allowMultipleExpanded: this.props.allowMultipleExpanded,
        allowZeroExpanded: this.props.allowZeroExpanded,
    });

    constructor (props: ProviderProps) {
      super(props);

      telemetry.track('ReactAccessibleAccordion', {});
    }

    private toggleExpanded = (key: UUID): void => {
        this.setState(
            (state: Readonly<ProviderState>) => state.toggleExpanded(key),
            () => {
                if (this.props.onChange) {
                    this.props.onChange(this.state.expanded);
                }
            },
        );
    }

  private  isItemDisabled = (key: UUID): boolean => {
        return this.state.isItemDisabled(key);
    }

 private   isItemExpanded = (key: UUID): boolean => {
        return this.state.isItemExpanded(key);
    }

 private  getPanelAttributes = (
        key: UUID,
        dangerouslySetExpanded?: boolean,
    ): InjectedPanelAttributes => {
        return this.state.getPanelAttributes(key, dangerouslySetExpanded);
    }

    private getHeadingAttributes = (): InjectedHeadingAttributes => {
        // uuid: UUID
        return this.state.getHeadingAttributes();
    }

    private getButtonAttributes = (
        key: UUID,
        dangerouslySetExpanded?: boolean,
    ): InjectedButtonAttributes => {
        return this.state.getButtonAttributes(key, dangerouslySetExpanded);
    }

   public  render(): JSX.Element {
        const { allowZeroExpanded, allowMultipleExpanded } = this.state;

        return (
            <Context.Provider
                value={{
                    allowMultipleExpanded,
                    allowZeroExpanded,
                    toggleExpanded: this.toggleExpanded,
                    isItemDisabled: this.isItemDisabled,
                    isItemExpanded: this.isItemExpanded,
                    getPanelAttributes: this.getPanelAttributes,
                    getHeadingAttributes: this.getHeadingAttributes,
                    getButtonAttributes: this.getButtonAttributes,
                }}
            >
                {this.props.children || null}
            </Context.Provider>
        );
    }
}

export class Consumer extends React.PureComponent<{
    children(container: AccordionContext): React.ReactNode;
}> {
    private renderChildren = (container: AccordionContext | null): React.ReactNode => {
        return container ? this.props.children(container) : null;
    }

    public render(): JSX.Element {
        return <Context.Consumer>{this.renderChildren}</Context.Consumer>;
    }
}
