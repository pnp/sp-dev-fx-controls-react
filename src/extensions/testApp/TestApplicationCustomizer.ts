import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';

import TestApp, { ITestAppProps as ITestAppProps } from './TestApp';

const LOG_SOURCE: string = 'TestApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITestApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class TestApplicationCustomizer
  extends BaseApplicationCustomizer<ITestApplicationCustomizerProperties> {

  private _topPlaceHolder: PlaceholderContent | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized TestApplicationCustomizer`);

    this.context.placeholderProvider.changedEvent.add(this, this._renderPlaceHolders);

    return Promise.resolve();
  }

  private async _renderPlaceHolders(): Promise<void> {
    if (!this._topPlaceHolder) {
      this._topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    const element: React.ReactElement<ITestAppProps> = React.createElement(TestApp, {
      context: this.context
    });

    ReactDom.render(element, this._topPlaceHolder.domElement);
  }

  private _onDispose(PlaceholderContent: PlaceholderContent): void {
    ReactDom.unmountComponentAtNode(PlaceholderContent.domElement);
  }
}
