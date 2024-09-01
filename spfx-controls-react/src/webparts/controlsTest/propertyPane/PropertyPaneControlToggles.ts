import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { ControlToggles, IControlTogglesProps } from './controls/ControlToggles';
import { ControlVisibility } from '../IControlsTestWebPartProps';

export interface IPropertyPaneControlTogglesProps {
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onPropertyChange: (controlVisibility: ControlVisibility) => void;
    controlVisibility: ControlVisibility;
}

export interface IPropertyPaneControlTogglesInternalProps extends IPropertyPaneControlTogglesProps, IPropertyPaneCustomFieldProps {
}

export class PropertyPaneControlToggles implements IPropertyPaneField<IPropertyPaneControlTogglesProps> {
    public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
    public targetProperty: string;
    public properties: IPropertyPaneControlTogglesInternalProps;
    private elem: HTMLElement;

    constructor(targetProperty: string, properties: IPropertyPaneControlTogglesProps) {
        this.targetProperty = targetProperty;
        this.properties = {
            key: properties.label,
            label: properties.label,
            onPropertyChange: properties.onPropertyChange,
            controlVisibility: properties.controlVisibility,
            onRender: this.onRender.bind(this),
            onDispose: this.onDispose.bind(this)
        };
    }

    public render(): void {
        if (!this.elem) {
            return;
        }

        this.onRender(this.elem);
    }

    private onDispose(element: HTMLElement): void {
        ReactDom.unmountComponentAtNode(element);
    }

    private onRender(elem: HTMLElement): void {
        if (!this.elem) {
            this.elem = elem;
        }

        const element: React.ReactElement<IControlTogglesProps> = React.createElement(ControlToggles, {
            label: this.properties.label,
            onChange: this.onChange.bind(this),
            controlVisibility: this.properties.controlVisibility,
            // required to allow the component to be re-rendered by calling this.render() externally
            // stateKey: new Date().toString()
        });
        ReactDom.render(element, elem);
    }

    private onChange(controlName: string, enabled: boolean): void {
        if (controlName === "all") {
            const newValue = {...this.properties.controlVisibility};
            for (const control in newValue) {
                if (newValue[control] !== undefined) {
                    newValue[control] = enabled;
                }
            }
            this.properties.onPropertyChange(newValue);
        } else {
            this.properties.onPropertyChange({
                ...this.properties.controlVisibility,
                [controlName]: enabled
            });
        }
    }
}