import { FieldValidator } from "..";

export interface ICollectionDataViewerState {
  crntItems: any[];
  inCreationItem?: any;
  validation?: FieldValidator;
  currentPage?: number;
  searchFilter?: string;
}
