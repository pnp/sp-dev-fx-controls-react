import { ICoordinates, MapType } from ".";
export interface IMapProps {
    mapSource?: "OpenStreetMap" | "BingStatic" | "BingDraggable";
    /**
     * Text of the Control
    */
    titleText?: string;
    /**
     * Coordinates required for rendering the control
     */
    coordinates: ICoordinates;
    /**
     * Show search box - which means an API key is needed
    */
    enableSearch?: boolean;
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
    /**
     * Get an update when the coordinates are updated
     */
    onUpdateCoordinates?: (coordinates: ICoordinates) => void;
}
//# sourceMappingURL=IMapProps.d.ts.map