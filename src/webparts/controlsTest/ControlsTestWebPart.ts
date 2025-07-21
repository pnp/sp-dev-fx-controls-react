import * as React from 'react';
import * as ReactDom from 'react-dom';

import {
  ControlVisibility,
  IControlsTestWebPartProps,
} from './IControlsTestWebPartProps';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import {
  IReadonlyTheme,
  ThemeChangedEventArgs,
  ThemeProvider,
} from '@microsoft/sp-component-base';

import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import ControlsTest from './components/ControlsTest';
import { IControlsTestProps } from './components/IControlsTestProps';
import {
  PropertyPaneControlToggles,
} from './propertyPane/PropertyPaneControlToggles';
import { PropertyPaneListPicker } from './propertyPane/PropertyPaneListPicker';
import { Version } from '@microsoft/sp-core-library';

/**
 * Web part to test the React controls
 */
export default class ControlsTestWebPart extends BaseClientSideWebPart<IControlsTestWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  private _containerWidth: number = 0;
  protected async onInit(): Promise<void> {


    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const context = this.context.sdks.microsoftTeams!.context;
      this._applyTheme(context.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }
    return Promise.resolve();
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;

    this.render();
  }

  // Apply btheme id in Teams
  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
  }

  public render(): void {
    /*  const element: React.ReactElement<ITestControlProps> = React.createElement(

      TestControl,
       {
         context: this.context,
          themeVariant: this._themeVariant,

       }
     );
 */
  let listItemId: number = Number(this.properties.dynamicFormListItemId);
  if (listItemId < 1 || isNaN(listItemId)) {
    listItemId = undefined;
  }

  const element: React.ReactElement<IControlsTestProps> = React.createElement(
    ControlsTest,
      {

        themeVariant: this._themeVariant,
        context: this.context,
        controlVisibility: this.properties.controlVisibility,
        description: this.properties.description,
        title: this.properties.title ?? "Sample title",
        displayMode: this.displayMode,
        dynamicFormListId: this.properties.dynamicFormListId,
        dynamicFormListItemId: listItemId?.toString() ?? undefined,
        dynamicFormErrorDialogEnabled: this.properties.dynamicFormErrorDialogEnabled,
        dynamicFormCustomFormattingEnabled: this.properties.dynamicFormCustomFormattingEnabled,
        dynamicFormClientSideValidationEnabled: this.properties.dynamicFormClientSideValidationEnabled,
        dynamicFormFieldValidationEnabled: this.properties.dynamicFormFieldValidationEnabled,
        dynamicFormFileSelectionEnabled: this.properties.dynamicFormFileSelectionEnabled,
        dynamicFormToggleTaxonomyPicker: this.properties.dynamicFormToggleTaxonomyPicker,
        onOpenPropertyPane: () => {
          this.context.propertyPane.open();
        },
        updateProperty: (value: string) => {
          this.properties.title = value;
          if (this.context.propertyPane.isPropertyPaneOpen()) {
            this.context.propertyPane.refresh();
          }
        },
        paginationTotalPages: this.properties.paginationTotalPages
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onAfterResize(newWidth: number): void {
      this._containerWidth = newWidth;
      this.render();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'Change settings below'
          },
          groups: [
            {
              groupName: 'Control Settings',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Web Part Title'
                }),
                PropertyPaneTextField('paginationTotalPages', {
                  label: 'Total pages in pagination'
                }),
                new PropertyPaneListPicker('dynamicFormListId', {
                  label: 'List for Dynamic Form',
                  wpContext: this.context,
                  selectedKey: this.properties.dynamicFormListId,
                  disabled: false,
                  onPropertyChange: (propertyPath: string, newValue: string) => {
                    this.properties.dynamicFormListId = newValue;
                    this.render();
                    this.context.propertyPane.refresh();
                  }
                }),
                PropertyPaneTextField('dynamicFormListItemId', {
                  label: 'List Item ID for Dynamic Form',
                }),
                PropertyPaneToggle('dynamicFormErrorDialogEnabled', {
                  label: 'Dynamic Form Error Dialog'
                }),
                PropertyPaneToggle('dynamicFormCustomFormattingEnabled', {
                  label: 'Dynamic Form Custom Formatting'
                }),
                PropertyPaneToggle('dynamicFormClientSideValidationEnabled', {
                  label: 'Dynamic Form Client Side Show/Hide Validation'
                }),
                PropertyPaneToggle('dynamicFormFieldValidationEnabled', {
                  label: 'Dynamic Form Field Validation'
                }),
                PropertyPaneToggle('dynamicFormFileSelectionEnabled', {
                  label: 'Dynamic Form File Selection'
                }),
                PropertyPaneToggle('dynamicFormToggleTaxonomyPicker', {
                  label: 'Dynamic Form Use Modern Taxonomy Picker'
                }),
              ]
            },
            {
              groupName: 'Controls',
              groupFields: [
                new PropertyPaneControlToggles('controlVisibility', {
                  controlVisibility: this.properties.controlVisibility,
                  label: 'Toggle controls',
                  onPropertyChange: (newValue: ControlVisibility) => {
                    this.properties.controlVisibility = newValue;
                    this.render();
                    this.context.propertyPane.refresh();
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
