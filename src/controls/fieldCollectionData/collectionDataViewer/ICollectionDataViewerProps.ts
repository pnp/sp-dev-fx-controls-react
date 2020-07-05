import { IFieldCollectionDataProps } from "..";

export interface ICollectionDataViewerProps extends IFieldCollectionDataProps {
  fOnSave: (items: any[]) => void;
  fOnClose: () => void;
}
