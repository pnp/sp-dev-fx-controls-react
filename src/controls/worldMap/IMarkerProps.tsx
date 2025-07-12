import { IData } from './IData';
import { IMarker } from './IMarker';

export interface IMarkerProps extends IMarker {
  data: IData;
  onClick?: (data: IData) => void;
}
