import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
} from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import {
  ThemeProvider,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

import * as strings from 'ControlsTestWebPartStrings';
import ControlsTest from './components/ControlsTest';
import { IControlsTestProps } from './components/IControlsTestProps';
import { IControlsTestWebPartProps } from './IControlsTestWebPartProps';

/**
 * Web part to test the React controls
 */
export default class ControlsTestWebPart extends BaseClientSideWebPart<IControlsTestWebPartProps> {

  private _themeProvider: ThemeProvider;

  public onInit(): Promise<void> {

    // Consume the new ThemeProvider service
  this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

  const variant = this._themeProvider.tryGetTheme();

  console.log(variant);

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IControlsTestProps> = React.createElement(
      ControlsTest,
      {
        context: this.context,
        description: this.properties.description,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        totalPages: this.properties.totalPages,
        themeProvider: this._themeProvider,
        observer: this
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('totalPages', {
                  label: 'Total pages in pagination'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
