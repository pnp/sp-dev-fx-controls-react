import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName,
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
export default class TestApplicationCustomizer extends BaseApplicationCustomizer<ITestApplicationCustomizerProperties> {
  private _topPlaceHolder: PlaceholderContent | undefined;
  private _root: Root | undefined;

  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized TestApplicationCustomizer`);

    this.context.placeholderProvider.changedEvent.add(
      this,
      this._renderPlaceHolders
    );

    return Promise.resolve();
  }

  private async _renderPlaceHolders(): Promise<void> {
    if (!this._topPlaceHolder) {
      this._topPlaceHolder = this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose }
      );
    }

    const element: React.ReactElement<ITestAppProps> = React.createElement(
      TestApp,
      {
        context: this.context,
      }
    );

    if (this._topPlaceHolder) {
      if (!this._root) {
        this._root = createRoot(this._topPlaceHolder.domElement);
      }
      this._root.render(element);
    }
  }

  private _onDispose = (): void => {
    this._root?.unmount();
    this._root = undefined;
  };
}
