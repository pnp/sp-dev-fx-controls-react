import * as React from 'react';
import * as ReactDom from 'react-dom';
import { ListPicker, IListPickerProps } from "./controls/ListPicker";
import {
  IPropertyPaneField,
  PropertyPaneFieldType
} from '@microsoft/sp-property-pane';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IPropertyPaneListPickerProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedKey: string | number;
  disabled?: boolean;
  wpContext: WebPartContext;  
}

export interface IPropertyPaneListPickerInternalProps extends IPropertyPaneListPickerProps, IPropertyPaneCustomFieldProps {
}

export class PropertyPaneListPicker implements IPropertyPaneField<IPropertyPaneListPickerProps> {
  public type: PropertyPaneFieldType = PropertyPaneFieldType.Custom;
  public targetProperty: string;
  public properties: IPropertyPaneListPickerInternalProps;
  private elem: HTMLElement;

  constructor(targetProperty: string, properties: IPropertyPaneListPickerProps) {
    this.targetProperty = targetProperty;
    this.properties = {
      key: properties.label,
      label: properties.label,
      wpContext: properties.wpContext,
      onPropertyChange: properties.onPropertyChange,
      selectedKey: properties.selectedKey,
      disabled: properties.disabled,
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

    const element: React.ReactElement<IListPickerProps> = React.createElement(ListPicker, {
      label: this.properties.label,
      wpContext: this.properties.wpContext,
      onChange: this.onChange.bind(this),
      selectedKey: this.properties.selectedKey,
      disabled: this.properties.disabled,
      // required to allow the component to be re-rendered by calling this.render() externally
      // stateKey: new Date().toString()
    });
    ReactDom.render(element, elem);
  }

  private onChange(option: IDropdownOption): void {
    this.properties.onPropertyChange(this.targetProperty, option.key);
  }
}