import { IControlsTestWebPartProps } from './IControlsTestWebPartProps';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Version } from '@microsoft/sp-core-library';
/**
 * Web part to test the React controls
 */
export default class ControlsTestWebPart extends BaseClientSideWebPart<IControlsTestWebPartProps> {
    private _themeProvider;
    private _themeVariant;
    private _containerWidth;
    protected onInit(): Promise<void>;
    /**
     * Update the current theme variant reference and re-render.
     *
     * @param args The new theme
     */
    private _handleThemeChangedEvent;
    private _applyTheme;
    render(): void;
    protected get dataVersion(): Version;
    protected onAfterResize(newWidth: number): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ControlsTestWebPart.d.ts.map