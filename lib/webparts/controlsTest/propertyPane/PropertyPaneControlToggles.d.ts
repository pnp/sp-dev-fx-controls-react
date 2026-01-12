import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IPropertyPaneCustomFieldProps } from '@microsoft/sp-property-pane';
import { ControlVisibility } from '../IControlsTestWebPartProps';
export interface IPropertyPaneControlTogglesProps {
    label: string;
    onPropertyChange: (controlVisibility: ControlVisibility) => void;
    controlVisibility: ControlVisibility;
}
export interface IPropertyPaneControlTogglesInternalProps extends IPropertyPaneControlTogglesProps, IPropertyPaneCustomFieldProps {
}
export declare class PropertyPaneControlToggles implements IPropertyPaneField<IPropertyPaneControlTogglesProps> {
    type: PropertyPaneFieldType;
    targetProperty: string;
    properties: IPropertyPaneControlTogglesInternalProps;
    private elem;
    constructor(targetProperty: string, properties: IPropertyPaneControlTogglesProps);
    render(): void;
    private onDispose;
    private onRender;
    private onChange;
}
//# sourceMappingURL=PropertyPaneControlToggles.d.ts.map