import * as strings from 'ControlStrings';
import * as React from 'react';
import styles from './Maps.module.scss';
import { IMapProps, ICoordinates, MapType, LocationInfo, IMapState } from '.';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from "office-ui-fabric-react/lib/components/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/components/Button";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";
import * as telemetry from '../../common/telemetry';
import { isEqual } from "@microsoft/sp-lodash-subset";


/**
 * Maps control
 */
export class Map extends React.Component<IMapProps, IMapState> {

  constructor(props: IMapProps) {
    super(props);

    telemetry.track('ReactMap', {});

    this.state = {
      coordinates: {
        latitude: null,
        longitude: null
      },
      address: "",
      showmessageerror: false,
      loading: false
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.setState({
      coordinates: this.props.coordinates
    });
  }

  /**
   * componentWillUpdate lifecycle hook
   */
  public componentWillUpdate(nextProps: IMapProps, nextState: IMapState): void {
    if (!isEqual(this.props.coordinates, nextProps.coordinates)) {
      this.setState({
        coordinates: this.props.coordinates
      });
    }
  }

  /**
  * Get the dif value based on zoom supplied (dif is for calculating the 4 corners of the map)
  */
  private _getDif(): number {
    let zoom: number = this.props.zoom >= 0 ? this.props.zoom : 10;
    return 0.0025 + (0.005 * (15 - zoom));
  }

  /**
  * Get width as percentage
  */
  private _getWidth(): string {
    let widthToReturn: string = this.props.width;
    if (widthToReturn) {
      let lastChar: string = widthToReturn.substr(widthToReturn.length - 1);
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
   * Get coordinates using the Bing API
   */
  private _getCoordinates = async (): Promise<void> => {
    this._startLoading();

    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${this.state.address}`);
      const mapData: LocationInfo[] = await response.json();
      if (mapData && mapData.length > 0) {
        const location = mapData[0];

        const coordinates = {
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon)
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
    let width: string = this._getWidth();
    let height: number = this._getHeight();
    let mapUrl: string = this._getMapUrl();

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
                         onChanged={this._onChangedAddress}
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
                <iframe width={width} height={height} scrolling="no" src={mapUrl}></iframe>
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
