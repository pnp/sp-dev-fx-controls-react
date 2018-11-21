import * as strings from 'ControlStrings';
import * as React from 'react';
import styles from './Maps.module.scss';
import { IMapsProps, IMapsState, ICoordinates, MapType } from './IMaps';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from "office-ui-fabric-react/lib/components/Icon";
import { PrimaryButton } from "office-ui-fabric-react/lib/components/Button";
import { TextField } from "office-ui-fabric-react/lib/components/TextField";

import { GeneralHelper } from '../../common/utilities/GeneralHelper';
/**
  * Maps control
  */
export class Maps extends React.Component<IMapsProps, IMapsState> {
  constructor(props: IMapsProps) {
    super(props);
    this.state = {
      coordinates: this.props.coordinates,
      address: "",
      showmessageerror: false,
      loading: false,
      status: null
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
    }
    else {
      widthToReturn = "100%";
    }
    return widthToReturn;
  }

  /**
  * Get height of the maps
  */
  private _getHeight(): number {
    return GeneralHelper.isDefined(this.props.height) ? this.props.height : 300;
  }

  /**
  * Get the type of the maps
  */
  private _getMapType(): MapType {
    return GeneralHelper.isDefined(this.props.mapType) ? this.props.mapType : MapType.standard;
  }

  /**
  * Compute the url for the iframe
  */
  private _getMapUrl(): string {
    let dif: number = this._getDif();
    let mapType: MapType = this._getMapType();
    let coordinates: ICoordinates = this.state.coordinates;

    let mapUrl: string = "";

    if (coordinates.latitude && coordinates.longitude) {
      let bbox1: number = coordinates.longitude - dif;
      let bbox2: number = coordinates.latitude - dif;
      let bbox3: number = coordinates.longitude + dif;
      let bbox4: number = coordinates.latitude + dif;

      let rootUrl: string = "https://www.openstreetmap.org/export/embed.html";
      let qs: string = `?bbox=${bbox1},${bbox2},${bbox3},${bbox4}&layer=${mapType}&marker=${coordinates.latitude},${coordinates.longitude}`;
      mapUrl = rootUrl + qs;
    }

    return mapUrl;
  }

  /**
  * Get coordinates using the Bing API
  */
  private async _getCoordinates(): Promise<void> {
    this._startLoading();
    try {
      let response = await fetch(`https://dev.virtualearth.net/REST/v1/Locations?q=${this.state.address}&o=json&key=${this.props.searchRelated.bingAPIKey}`);
      let mapData = await response.json();
      let coordinatesFromAPI: number[] = mapData.resourceSets[0].resources[0].point.coordinates;
      let coordinates: ICoordinates = { latitude: coordinatesFromAPI[0], longitude: coordinatesFromAPI[1] };
      this.setState({ ...this.state, coordinates, showmessageerror: false });
    } catch (error) {
      console.log(error);
      this.setState({ ...this.state, showmessageerror: true });
    }
    this._stopLoading();
  }

  /**
  * Update address on submit (while searching is enabled)
  */
  private _onChangedAddress(newValue: string): void {
    this.setState({
      address: newValue,
    });
  }

  /**
  * Stop loading by changing status to null
  */
  private _stopLoading(): void {
    this.setState({ ...this.state, status: null, loading: false });
  }

  /**
  * Start loading by changing status to Spinner
  */
  private _startLoading(): void {
    let loadingText: string = GeneralHelper.isDefined(this.props.loadingMessage) ? this.props.loadingMessage : strings.mapsLoadingText;
    let status: JSX.Element = <Spinner size={SpinnerSize.large} label={loadingText} />;
    let loading: boolean = true;
    this.setState({ ...this.state, status, loading });
  }


  public render(): React.ReactElement<IMapsProps> {

    let width: string = this._getWidth();
    let height: number = this._getHeight();
    let mapUrl: string = this._getMapUrl();

    return (
      <div id="mapsContainer" className={`${this.props.mapsClassName ? this.props.mapsClassName : ''}`}>
        <Label>{this.state.address.length > 0 ? `${strings.mapsTitlePrefix} ${this.state.address}` : this.props.titleText}</Label>
        {this.state.status}
        {GeneralHelper.isDefined(this.props.searchRelated) && this.props.searchRelated.enableSearch &&
          <div id="mapsSearch" className={styles.searchContainer}>
            <TextField
              value={this.state.address}
              onChanged={this._onChangedAddress.bind(this)}
              iconProps={{ iconName: 'World' }}
              className={styles.searchTextBox}
            />
            <PrimaryButton text={strings.mapsSearchButtonText} title={strings.mapsSearchButtonText} className={styles.submitButton} iconProps={{ iconName: 'Search' }} onClick={() => {
              this._getCoordinates();
            }} />
            <br />
          </div>
        }
        {
          mapUrl.length > 0 && !this.state.showmessageerror ?
            <div id="mapsIframe">
              <iframe width={width} height={height} scrolling="no" src={mapUrl}></iframe>
            </div>
            :
            <p className={`ms-TextField-errorMessage ${styles.errorMessage} ${this.props.errorMessageClassName ? this.props.errorMessageClassName : ''}`}>
              <Icon iconName='Error' className={styles.errorIcon} />
              <span data-automation-id="error-message">{this.props.errorMessage ? this.props.errorMessage : strings.mapsErrorMessage}</span>
            </p>
        }
      </div>

    );
  }
}
