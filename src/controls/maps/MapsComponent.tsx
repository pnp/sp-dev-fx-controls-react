import * as strings from 'ControlStrings';
import * as React from 'react';
import styles from './Maps.module.scss';
import { IMapsProps, ICoordinates, MapType } from './IMaps';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Icon } from "office-ui-fabric-react/lib/components/Icon";
import { GeneralHelper } from '../../common/utilities/GeneralHelper';
/**
  * Maps control
  */
export class Maps extends React.Component<IMapsProps, {}> {
  constructor(props: IMapsProps) {
    super(props);
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
    let coordinates: ICoordinates = this.props.coordinates;

    let mapUrl: string = "";

    if (GeneralHelper.isDefined(coordinates.latitude) && GeneralHelper.isDefined(coordinates.longitude)) {
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


  public render(): React.ReactElement<IMapsProps> {

    let width: string = this._getWidth();
    let height: number = this._getHeight();
    let mapUrl: string = this._getMapUrl();

    return (
      <div id="maps" className={`${this.props.mapsClassName ? this.props.mapsClassName : ''}`}>
        <Label>{this.props.titleText}</Label>
        {
          mapUrl.length > 0 ?
            <iframe width={width} height={height} scrolling="no" src={mapUrl}></iframe>
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
