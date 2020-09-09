import { ErrorMsg } from ".";

export interface ICollectionDataItemState {
  crntItem: any;
  errorMsgs?: ErrorMsg[];
  showCallout?: boolean;
}
