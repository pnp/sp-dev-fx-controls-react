import { IFieldCollectionDataProps } from "../../../FieldCollectionData";

export interface ICollectionDataViewerProps extends IFieldCollectionDataProps {
  fOnSave: (items: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  fOnClose: () => void;
}
