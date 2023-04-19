import { SPHttpClient } from '@microsoft/sp-http';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import {IViewPickerProps, PropertyFieldViewPickerOrderBy } from '../controls/viewPicker/IViewPicker';
import { ISPViewPickerService } from './ISPViewPickerService';
import { ISPView, ISPViews } from "../../src/common/SPEntities";

/**
 * Service implementation to get list & list items from current SharePoint site
 */
export class SPViewPickerService implements ISPViewPickerService {
  private context: BaseComponentContext;
  private props: IViewPickerProps;

  /**
   * Service constructor
   */
  constructor(_props: IViewPickerProps, pageContext: BaseComponentContext) {
    this.props = _props;
    this.context = pageContext;
  }

  /**
   * Gets the collection of view for a selected list
   */
  public async getViews(): Promise<ISPViews> {
    if (this.props.listId === undefined || this.props.listId === "") {
      return this.getEmptyViews();
    }

    const webAbsoluteUrl = this.props.webAbsoluteUrl ? this.props.webAbsoluteUrl : this.context.pageContext.web.absoluteUrl;

    // If the running environment is SharePoint, request the lists REST service
    let queryUrl: string = `${webAbsoluteUrl}/_api/lists(guid'${this.props.listId}')/Views?$select=Title,Id`;

    // Check if the orderBy property is provided
    if (this.props.orderBy !== null) {
      queryUrl += '&$orderby=';
      switch (this.props.orderBy) {
        case PropertyFieldViewPickerOrderBy.Id:
          queryUrl += 'Id';
          break;
        case PropertyFieldViewPickerOrderBy.Title:
          queryUrl += 'Title';
          break;
      }

      // Adds an OData Filter to the list
      if (this.props.filter) {
        queryUrl += `&$filter=${encodeURIComponent(this.props.filter)}`;
      }

      const response = await this.context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);
      const views = (await response.json()) as ISPViews;

      // Check if onViewsRetrieved callback is defined
      if (this.props.onViewsRetrieved) {
        //Call onViewsRetrieved
        const lr = this.props.onViewsRetrieved(views.value);
        let output: ISPView[];

        //Conditional checking to see of PromiseLike object or array
        if (lr instanceof Array) {
          output = lr;
        } else {
          output = await lr;
        }

        views.value = output;
      }

      return views;
    }
  }

  /**
   * Returns an empty view for when a list isn't selected
   */
  private getEmptyViews(): Promise<ISPViews> {
    return new Promise<ISPViews>((resolve) => {
      const listData: ISPViews = {
        value: [
        ]
      };

      resolve(listData);
    });
  }
}
