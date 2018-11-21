export interface IMapsProps {
  /**
   * Text of the Control
  */
  titleText: string;
  /**
   * Corodinates required of the Control
  */
  coordinates: ICoordinates;
  /**
   * Show search box - which means an API key is needed
  */
  searchRelated?: ISearchRelated;
  /**
   * Zoom level for the maps on display (range 1-15)
   * Users can change zoom after load with scroll
  */
  zoom?: number;
  /**
   * Width of the maps area in percentage
  */
  width?: string;
  /**
   * Height of the maps area
  */
  height?: number;
  /**
   * Type of the map (refer enum)
  */
  mapType?: MapType;
  /**
   * Error message to show
  */
  loadingMessage?: string;
  /**
   * Error message to show
  */
  errorMessage?: string;
  /**
   * Classname for the maps control
  */
  mapsClassName?: string;
  /**
   * Class Name for the Error Section
  */
  errorMessageClassName?: string;
}

/** 
 * Component's state
 */
export interface IMapsState {
  coordinates: ICoordinates;
  address: string;
  showmessageerror: boolean;
  status: JSX.Element;
  loading: boolean;
}

export interface ISearchRelated {
  /**
  * show search text box 
 */
  enableSearch?: boolean;
  /**
  * API key from Bing maps
 */
  bingAPIKey?: string;
}

export interface ICoordinates {
  /**
   * Latitude of the map to display 
  */
  latitude: number;
  /**
   * Longitude of the map to display 
  */
  longitude: number;
}

export enum MapType {
  standard = "mapnik",
  cycle = "cyclemap",
  normal = "hot",
  transport = "transportmap"
}