import { ICoordinates } from ".";

export interface IMapState {
  coordinates: ICoordinates;
  address: string;
  showmessageerror: boolean;
  loading: boolean;
}
