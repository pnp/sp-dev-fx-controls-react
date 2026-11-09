import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
    IPropertyPaneField,
    PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { ControlToggles, IControlTogglesProps } from './controls/ControlToggles';
import { ControlVisibility, ValidControls } from '../IControlsTestWebPartProps';

export interface IPropertyPaneControlTogglesProps {
    label: string;
     
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
    private root: Root | undefined;

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
        this.root?.unmount();
        this.root = undefined;
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
        if (!this.root) {
            this.root = createRoot(elem);
        }
        this.root.render(element);
    }

    private onChange(controlName: ValidControls, enabled: boolean): void {
        if (controlName === "all") {
            const newValue: ControlVisibility = {...this.properties.controlVisibility};
            for (const control of Object.keys(newValue) as ValidControls[]) {
                if (newValue[control as keyof ControlVisibility] !== undefined) {
                    newValue[control as keyof ControlVisibility] = enabled;
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