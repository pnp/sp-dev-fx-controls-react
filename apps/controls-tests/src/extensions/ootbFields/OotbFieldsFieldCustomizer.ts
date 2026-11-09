import * as React from 'react';
import { createRoot, type Root } from 'react-dom/client';

import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import OotbFields from './components/Customizer/OotbFields';
import { SPHelper, GeneralHelper } from '@pnp/spfx-controls-react';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IOotbFieldsFieldCustomizerProperties {
}

const LOG_SOURCE: string = 'OotbFieldsFieldCustomizer';

export default class OotbFieldsFieldCustomizer
  extends BaseFieldCustomizer<IOotbFieldsFieldCustomizerProperties> {

    private _shouldRenderUndefiend: boolean = false;
    private _roots: Map<HTMLElement, Root> = new Map<HTMLElement, Root>();

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated OotbFieldsFieldCustomizer with properties:');

    if (this.context.field.fieldType === 'Computed' && this.context.field.internalName === 'DocIcon') {
      this._shouldRenderUndefiend = true;
    }
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    if (!this._shouldRenderUndefiend && !GeneralHelper.isDefined(event.fieldValue)) {
      return;
    }
    const fieldName: string = SPHelper.getStoredFieldName(this.context.field.internalName);
    SPHelper.getFieldText(event.fieldValue, event.listItem, this.context).then(text => {
      const ootbFields: React.ReactElement<{}> =
        React.createElement(OotbFields, {
          text: text,
          value: event.fieldValue,
          listItem: event.listItem,
          fieldName: fieldName,
          context: this.context,
          //cssProps: { backgroundColor: '#f00' },
          className: 'fake-class'
        })

      let root = this._roots.get(event.domElement);
      if (!root) {
        root = createRoot(event.domElement);
        this._roots.set(event.domElement, root);
      }
      root.render(ootbFields);
    }).catch(() => { });
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    const root = this._roots.get(event.domElement);
    if (root) {
      root.unmount();
      this._roots.delete(event.domElement);
    }
    super.onDisposeCell(event);
  }
}

// test querystring ?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&fieldCustomizers={"FieldName":{"id":"57ebd944-98ed-43f9-b722-e959d6dac6ad","properties":{}}}
