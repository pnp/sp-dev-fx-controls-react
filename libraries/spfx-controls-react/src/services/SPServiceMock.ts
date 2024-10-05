import { ISPService, ILibsOptions, IFieldsOptions, IContentTypesOptions, IRenderListDataAsStreamClientFormResult } from "./ISPService";
import { ISPContentType, ISPField, ISPLists, ISPViews } from "../common/SPEntities";
import {orderBy } from '../controls/viewPicker/IViewPicker';

export default class SPServiceMock implements ISPService {
  private _includeDelay?: boolean;
  private _delayTimeout?: number;

  constructor(includeDelay?: boolean, delayTimeout?: number) {
    this._includeDelay = includeDelay;
    this._delayTimeout = delayTimeout || 500;
  }
  public getListFormRenderInfo(listId: string): Promise<IRenderListDataAsStreamClientFormResult> {
    throw new Error("Method not implemented.");
  }
  public getAdditionalListFormFieldInfo(listId: string, webUrl?: string): Promise<ISPField[]> {
    throw new Error("Method not implemented.");
  }
  public getFields(options?: IFieldsOptions): Promise<ISPField[]> {
    throw new Error("Method not implemented.");
  }
  public getContentTypes(options?: IContentTypesOptions): Promise<ISPContentType[]> {
    throw new Error("Method not implemented.");
  }
  public getListItems(filterText: string, listId: string, internalColumnName: string, field: ISPField, keyInternalColumnName?: string, webUrl?: string): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    throw new Error("Method not implemented.");
  }
  public getField = async (listId: string, internalColumnName: string, webUrl?: string): Promise<ISPField | undefined> => {
    return;
  }
  public getViews(listId?: string, orderBy?: orderBy, filter?: string) : Promise<ISPViews> {
    return;
  }

  /**
  * The mock lists to present to the local workbench
  */
  private static _lists: ISPLists = {
    value: [
      { Id: '8dc80f2e-0e01-43ee-b59e-fbbca2d1f35e', Title: 'Mock List One', BaseTemplate: '109' },
      { Id: '772a30d4-2d62-42da-aa48-c2a37971d693', Title: 'Mock List Two', BaseTemplate: '109' },
      { Id: '16c0d1c6-b467-4823-a37b-c308cf730366', Title: 'Mock List Three', BaseTemplate: '109' }
    ]
  };
  public getLibs(options?: ILibsOptions): Promise<ISPLists> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<ISPLists>(async resolve => {
      if (this._includeDelay === true) {
        await this.sleep(this._delayTimeout); // Simulate network load
      }
      resolve(SPServiceMock._lists);
    });
  }
  /**
  * Locks the thread for the specified amount of time
  * @param ms Milliseconds to wait
  */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
