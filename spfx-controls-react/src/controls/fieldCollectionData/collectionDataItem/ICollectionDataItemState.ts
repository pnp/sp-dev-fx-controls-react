import { ErrorMsg } from "./ErrorMsg";

export interface ICollectionDataItemState {
  crntItem: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  errorMsgs?: ErrorMsg[];
  showCallout?: boolean;
}
