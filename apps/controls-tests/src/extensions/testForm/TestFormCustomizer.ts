import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseFormCustomizer
} from '@microsoft/sp-listview-extensibility';

import TestForm, { ITestFormProps } from './components/TestForm';

/**
 * If your form customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface ITestFormCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'TestFormCustomizer';

export default class TestFormCustomizer
  extends BaseFormCustomizer<ITestFormCustomizerProperties> {

  private _root: Root | undefined;

  public onInit(): Promise<void> {
    // Add your custom initialization to this method. The framework will wait
    // for the returned promise to resolve before rendering the form.
    Log.info(LOG_SOURCE, 'Activated TestFormCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    return Promise.resolve();
  }

  public render(): void {
    // Use this method to perform your custom rendering.

    const testForm: React.ReactElement<{}> =
      React.createElement(TestForm, {
        context: this.context,
        displayMode: this.displayMode,
        onSave: this._onSave,
        onClose: this._onClose
       } as ITestFormProps);

    if (!this._root) {
      this._root = createRoot(this.domElement);
    }
    this._root.render(testForm);
  }

  public onDispose(): void {
    // This method should be used to free any resources that were allocated during rendering.
    this._root?.unmount();
    this._root = undefined;
    super.onDispose();
  }

  private _onSave = (): void => {

    // You MUST call this.formSaved() after you save the form.
    this.formSaved();
  }

  private _onClose =  (): void => {
    // You MUST call this.formClosed() after you close the form.
    this.formClosed();
  }
}
