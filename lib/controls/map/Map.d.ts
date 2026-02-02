import * as React from 'react';
import { IMapProps } from './IMapProps';
import { IMapState } from './IMapState';
/**
 * Maps control
 */
export declare class Map extends React.Component<IMapProps, IMapState> {
    constructor(props: IMapProps);
    /**
     * componentWillUpdate lifecycle hook
     */
    UNSAFE_componentWillUpdate(nextProps: IMapProps, nextState: IMapState): void;
    /**
    * Get the dif value based on zoom supplied (dif is for calculating the 4 corners of the map)
    */
    private _getDif;
    /**
    * Get width as percentage
    */
    private _getWidth;
    /**
    * Get height of the maps
    */
    private _getHeight;
    /**
    * Get the type of the maps
    */
    private _getMapType;
    /**
    * Compute the url for the iframe
    */
    private _getMapUrl;
    /**
     * Gets map url for a static Bing map
     *
     * @private
     * @param {(string | number)} width
     * @param {(string | number)} height
     * @returns {string}
     * @memberof Map
     */
    private _getBingMapUrl;
    /**
     * Get coordinates using the OpenStreetMap nominatim API
     */
    private _getCoordinates;
    /**
    * Update address on submit (while searching is enabled)
    */
    private _onChangedAddress;
    /**
    * Stop loading by changing status to null
    */
    private _stopLoading;
    /**
    * Start loading by changing status to Spinner
    */
    private _startLoading;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IMapProps>;
}
//# sourceMappingURL=Map.d.ts.map