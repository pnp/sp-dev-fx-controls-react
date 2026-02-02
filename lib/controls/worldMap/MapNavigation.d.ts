import * as React from 'react';
import { MapRef } from 'react-map-gl/maplibre';
export interface MapNavigationProps {
    mapRef: React.RefObject<MapRef>;
    initialViewState?: {
        longitude: number;
        latitude: number;
        zoom: number;
    };
    vertical?: boolean;
}
export declare const MapNavigation: React.FC<MapNavigationProps>;
export default MapNavigation;
//# sourceMappingURL=MapNavigation.d.ts.map