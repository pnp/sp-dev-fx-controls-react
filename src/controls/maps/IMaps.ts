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