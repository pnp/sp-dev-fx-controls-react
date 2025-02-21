import * as strings from 'ControlStrings';
import * as React from 'react';
import styles from './Maps.module.scss';
import { IMapProps } from './IMapProps';
import { IMapState } from './IMapState';
import { ICoordinates, MapType, LocationInfo } from './IMap';
import { Label } from '@fluentui/react/lib/Label';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Icon } from "@fluentui/react/lib/Icon";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import * as telemetry from '../../common/telemetry';
import { isEqual } from "@microsoft/sp-lodash-subset";


/**
 * Maps control
 */
export class Map extends React.Component<IMapProps, IMapState> {

  constructor(props: IMapProps) {
    super(props);
    const { coordinates } = this.props;

    telemetry.track('ReactMap', {});

    this.state = {
      coordinates: coordinates || {
        latitude: null,
        longitude: null
      },
      address: "",
      showmessageerror: false,
      loading: false
    };
  }

  /**
   * componentWillUpdate lifecycle hook
   */
  public UNSAFE_componentWillUpdate(nextProps: IMapProps, nextState: IMapState): void {
    if (!isEqual(this.props.coordinates, nextProps.coordinates)) {
      this.setState({
        coordinates: nextProps.coordinates
      });
    }
  }

  /**
  * Get the dif value based on zoom supplied (dif is for calculating the 4 corners of the map)
  */
  private _getDif(): number {
    const { zoom } = this.props;
    // 20200614 - JJ - support zoom levels beyond 15
    const newZoom: number = zoom >= 0 ? zoom % 16 : 10;
    const multiplier = Math.floor(newZoom / 16) + 1;
    return (0.0025 + (0.005 * (15 - (newZoom))))/multiplier;
  }

  /**
  * Get width as percentage
  */
  private _getWidth(): string {
    let widthToReturn: string = this.props.width;
    if (widthToReturn) {
      const lastChar: string = widthToReturn.substr(widthToReturn.length - 1);
      if (lastChar !== '%') {
        widthToReturn = `${widthToReturn}%`;
      }
    } else {
      widthToReturn = "100%";
    }
    return widthToReturn;
  }

  /**
  * Get height of the maps
  */
  private _getHeight(): number {
    return this.props.height ? this.props.height : 300;
  }

  /**
  * Get the type of the maps
  */
  private _getMapType(): MapType {
    return this.props.mapType ? this.props.mapType : MapType.standard;
  }

  /**
  * Compute the url for the iframe
  */
  private _getMapUrl(): string {
    const dif: number = this._getDif();
    const mapType: MapType = this._getMapType();
    const coordinates: ICoordinates = this.state.coordinates;

    let mapUrl: string = "";

    if (coordinates.latitude && coordinates.longitude) {
      const bbox1: number = coordinates.longitude - dif;
      const bbox2: number = coordinates.latitude - dif;
      const bbox3: number = coordinates.longitude + dif;
      const bbox4: number = coordinates.latitude + dif;

      const rootUrl: string = "https://www.openstreetmap.org/export/embed.html";
      const qs: string = `?bbox=${bbox1},${bbox2},${bbox3},${bbox4}&layer=${mapType}&marker=${coordinates.latitude},${coordinates.longitude}`;
      mapUrl = rootUrl + qs;
    }

    return mapUrl;
  }

  /**
   * Gets map url for a static Bing map
   *
   * @private
   * @param {(string | number)} width
   * @param {(string | number)} height
   * @returns {string}
   * @memberof Map
   */
  private _getBingMapUrl(width: string | number, height: string | number): string {
    const { mapSource, zoom } = this.props;
    const { coordinates: {latitude, longitude}} = this.state;
    const mapType = mapSource === "BingStatic" ? "s" : "d";// s for static or d for draggable
    return `https://www.bing.com/maps/embed?h=${height}&w=${width}&cp=${latitude}~${longitude}&lvl=${zoom}&typ=${mapType}&sty=r`;
  }

  /**
   * Get coordinates using the OpenStreetMap nominatim API
   */
  //20200614 - updated comment to reflect API used
  private _getCoordinates = async (): Promise<void> => {
    this._startLoading();

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&addressdetails=1&q=${this.state.address}`); // 20200614 - JJ - added addressdetails parameter
      const mapData: LocationInfo[] = await response.json();
      if (mapData && mapData.length > 0) {
        const location = mapData[0];

        const coordinates: ICoordinates = { // 20200614 - JJ - added typing
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
          displayName: location.display_name, // 20200614 - JJ - let's keep the display name
          address: location.address, // 20200614 - JJ - and the address
        };

        this.setState({
          coordinates,
          showmessageerror: false
        });

        // Check if the control needs to send an update
        if (this.props.onUpdateCoordinates) {
          this.props.onUpdateCoordinates(coordinates);
        }
      }
    } catch (error) {
      console.error(error);

      this.setState({
        showmessageerror: true
      });
    }

    this._stopLoading();
  }

  /**
  * Update address on submit (while searching is enabled)
  */
  private _onChangedAddress = (newValue: string): void => {
    this.setState({
      address: newValue,
    });
  }

  /**
  * Stop loading by changing status to null
  */
  private _stopLoading(): void {
    this.setState({
      loading: false
    });
  }

  /**
  * Start loading by changing status to Spinner
  */
  private _startLoading(): void {
    this.setState({
      loading: true
    });
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IMapProps> {
    const { mapSource } = this.props;
    const width: string = this._getWidth();
    const height: number = this._getHeight();
    const mapUrl: string = ["BingDraggable", "BingStatic"].indexOf(mapSource) !== -1 ? this._getBingMapUrl(width, height) : this._getMapUrl(); //20200614 - JJ - rudimentary bing map support (draggable/static) with pushpin (static only)

    return (
      <div id="mapsContainer" className={`${styles.mapContainer} ${this.props.mapsClassName ? this.props.mapsClassName : ''}`}>
        {
          this.props.titleText && (
            <Label>{this.props.titleText}</Label>
          )
        }

        {
          (this.props.enableSearch) && (
            <div id="mapsSearch" className={styles.searchContainer}>
              <TextField value={this.state.address}
                onChange={(e, value) => this._onChangedAddress(value)}
                onKeyPress={(event) => event.key === "Enter" ? this._getCoordinates() : null}
                iconProps={{ iconName: 'World' }}
                className={styles.searchTextBox} />

              <PrimaryButton text={strings.mapsSearchButtonText}
                title={strings.mapsSearchButtonText}
                className={styles.submitButton}
                iconProps={{ iconName: 'Search' }}
                onClick={this._getCoordinates} />
            </div>
          )
        }

        {
          this.state.loading ? (
            <Spinner size={SpinnerSize.large} label={this.props.loadingMessage ? this.props.loadingMessage : strings.mapsLoadingText} />
          ) : (
              (mapUrl.length > 0 && !this.state.showmessageerror) ? (
                <div id="mapsIframe">
                  <iframe width={width} height={height} scrolling="no" src={mapUrl} />
                  {mapSource === "BingStatic" && <Icon iconName="Location" style={{fontSize: "26px", position:"relative", top: (Math.floor(-height/2)), left: "50%", marginTop: "-14px"}} />}{/* 20200614 - JJ - rudimentary bing map support (draggable/static) with pushpin (static only)*/}
                </div>
              ) : (
                  <p className={`ms-TextField-errorMessage ${styles.errorMessage} ${this.props.errorMessageClassName ? this.props.errorMessageClassName : ''}`}>
                    <Icon iconName='Error' className={styles.errorIcon} />
                    <span data-automation-id="error-message">{this.props.errorMessage ? this.props.errorMessage : strings.mapsErrorMessage}</span>
                  </p>
                )
            )
        }
      </div>
    );
  }
}
