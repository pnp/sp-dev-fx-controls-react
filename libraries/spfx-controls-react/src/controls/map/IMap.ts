export interface ICoordinates {
  /**
   * Latitude of the map to display
  */
  latitude: number;
  /**
   * Longitude of the map to display
  */
  longitude: number;
  /**
   * Display Name of the location
   */
  displayName?: string; // 20200614 - JJ - displayname
  /**
   * Address of the location
   */
  address?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export enum MapType {
  standard = "mapnik",
  cycle = "cyclemap",
  normal = "hot",
  transport = "transportmap"
}


export interface LocationInfo {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  address?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
