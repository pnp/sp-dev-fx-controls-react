import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IPropertyPaneListPickerProps {
    label: string;
    onPropertyChange: (propertyPath: string, newValue: any) => void;
    selectedKey: string | number;
    disabled?: boolean;
    wpContext: WebPartContext;
}
export interface IPropertyPaneListPickerInternalProps extends IPropertyPaneListPickerProps, IPropertyPaneCustomFieldProps {
}
export declare class PropertyPaneListPicker implements IPropertyPaneField<IPropertyPaneListPickerProps> {
    type: PropertyPaneFieldType;
    targetProperty: string;
    properties: IPropertyPaneListPickerInternalProps;
    private elem;
    constructor(targetProperty: string, properties: IPropertyPaneListPickerProps);
    render(): void;
    private onDispose;
    private onRender;
    private onChange;
}
//# sourceMappingURL=PropertyPaneListPicker.d.ts.map