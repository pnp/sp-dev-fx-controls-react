import * as React from 'react';
import { ILocationPickerProps, ILocationPickerState, Mode, ILocationBoxOption, ILocationPickerItem } from './ILocationPicker';
import styles from './LocationPicker.module.scss';
import { SPHttpClient, ISPHttpClientOptions, SPHttpClientResponse, AadHttpClient } from '@microsoft/sp-http';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { ComboBox } from 'office-ui-fabric-react/lib/ComboBox';
import { FontIcon } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import * as strings from 'ControlStrings';
import { isEqual } from '@microsoft/sp-lodash-subset';


export class LocationPicker extends React.Component<ILocationPickerProps, ILocationPickerState> {
  private _token: string | string[] = null;
  private focusRef: any = null;
  /**
  * Constructor method
  */
  constructor(props: ILocationPickerProps) {
    super(props);
    this.getTocken();
    this.focusRef = React.createRef();
    console.log(props.defaultValue);
    if (props.defaultValue != null && props.defaultValue.toString() != '') {
      this.state = {
        options: [],
        currentMode: Mode.view,
        searchText: null,
        isCalloutVisible: true,
        seletedItem: props.defaultValue,
      };
    }
    else {
      this.state = {
        options: [],
        currentMode: Mode.empty,
        searchText: null,
        isCalloutVisible: true,
        seletedItem: props.defaultValue,
      };
    }

  }

  public componentWillReceiveProps(nextProps: ILocationPickerProps) {
    if (!isEqual(nextProps.defaultValue, this.props.defaultValue)) {
      if (this.props.defaultValue != null && this.props.defaultValue.toString() != '') {
        this.setState({ seletedItem: nextProps.defaultValue, currentMode: Mode.view });
      }
    }
  }

  /**
  * Renders the LocationPicker controls with Office UI Fabric
  */
  public render(): JSX.Element {
    const { options, seletedItem, currentMode } = this.state;
    const { className, disabled, label, placeholder, errorMessage } = this.props;
    const onRenderOption = (item: ILocationBoxOption) => {
      if (item.locationItem["EntityType"] === "Custom")
        return <Persona text={item.text} imageAlt={item.locationItem["EntityType"]} secondaryText={item.locationItem["DisplayName"]} size={PersonaSize.size40} onRenderInitials={this.customRenderInitials} />;
      else
        return <Persona text={item.text} imageAlt={item.locationItem["EntityType"]} secondaryText={(item.locationItem["Address"]["Street"] !== undefined ? item.locationItem["Address"]["Street"] + "," : '') + item.locationItem["Address"]["City"] + "," + item.locationItem["Address"]["State"] + "," + item.locationItem["Address"]["CountryOrRegion"]} size={PersonaSize.size40} onRenderInitials={this.customRenderInitials} />;
    };

    return (
      <div>
        {label ? <Text>{label}</Text> : null}
        {currentMode === Mode.empty ?
          <ComboBox
            className={className}
            disabled={disabled}
            placeholder={placeholder}
            allowFreeform={true}
            autoComplete="on"
            options={options}
            onRenderOption={onRenderOption}
            calloutProps={{ className: styles.callout }}
            buttonIconProps={{ iconName: 'MapPin' }}
            useComboBoxAsMenuWidth={true}
            openOnKeyboardFocus={true}
            scrollSelectedToTop={true}
            isButtonAriaHidden={true}
            onInput={(e) => this.getLocatios(e.target["value"])}
            onChange={this.onChange}
            errorMessage={errorMessage}
          /> :
          (currentMode === Mode.editView && seletedItem["EntityType"] === "Custom") ?
            <div ref={this.focusRef} data-selection-index={0} data-is-focusable={true} role="listitem" className={styles.pickerItemcontainer} onBlur={this.onBlur} tabIndex={0}>
              <Persona
                data-is-focusable="false"
                imageAlt={seletedItem["EntityType"]}
                tabIndex={0}
                text={seletedItem["DisplayName"]}
                title="Location"
                className={styles.persona}
                size={PersonaSize.size40}
                onRenderInitials={this.customRenderInitials} />
              <IconButton
                data-is-focusable="false"
                tabIndex={0}
                iconProps={{ iconName: 'Cancel' }}
                title="Clear"
                ariaLabel="Clear"
                disabled={disabled}
                className={styles.closeButton}
                onClick={this.onIconButtonClick} />
            </div> : currentMode === Mode.editView ?
              <div ref={this.focusRef} data-selection-index={0} data-is-focusable={true} role="listitem"
                className={styles.pickerItemcontainer}
                onBlur={this.onBlur}
                tabIndex={0}>
                <Persona
                  data-is-focusable="false"
                  imageAlt={seletedItem["EntityType"]}
                  tabIndex={0}
                  text={seletedItem["DisplayName"]}
                  title="Location"
                  className={styles.persona}
                  secondaryText={seletedItem["Address"]["Street"] + "," + seletedItem["Address"]["City"] + "," + seletedItem["Address"]["State"] + "," + seletedItem["Address"]["CountryOrRegion"]}
                  size={PersonaSize.size40}
                  onRenderInitials={this.customRenderInitials} />
                {!disabled ?
                  <IconButton
                    data-is-focusable="false"
                    tabIndex={0}
                    iconProps={{ iconName: 'Cancel' }}
                    title="Clear"
                    ariaLabel="Clear"
                    disabled={disabled} className={styles.closeButton}
                    onClick={this.onIconButtonClick} /> : null}
              </div> :
              (currentMode === Mode.view && seletedItem["EntityType"] === "Custom") ?
                <div className={styles.locationAddressContainer}
                  onClick={this.onClick}>
                  <div className={styles.locationContainer} tabIndex={0}>
                    <div className={styles.locationDisplayName}>{seletedItem["DisplayName"]}</div>
                  </div>
                </div> : currentMode === Mode.view ? <div className={styles.locationAddressContainer} onClick={this.onClick}>
                  <div className={styles.locationContainer} tabIndex={0}>
                    <div className={styles.locationDisplayName}>{seletedItem["DisplayName"]}</div>
                    <div className={styles.locationContent}>
                      <div className={styles.locationAddress}>{seletedItem["Address"]["Street"]}</div>
                      <div className={styles.locationAddress}>{seletedItem["Address"]["City"] + "," + seletedItem["Address"]["State"] + "," + seletedItem["Address"]["CountryOrRegion"]}</div>
                    </div>
                  </div>
                </div> : null
        }
      </div>
    );
  }

  private onIconButtonClick = () => {
    this.setState({ currentMode: Mode.empty, seletedItem: null });
  }

  private onClick = () => {
    this.setState({ currentMode: Mode.editView },
      () => {
        if (this.focusRef.current != null)
          this.focusRef.current.focus();
      });
  }

  private onBlur = (ev) => {
    try {
      if (ev !== null && ev.relatedTarget["title"] !== "Location" && ev.relatedTarget["title"] !== "Clear") {
        this.setState({ currentMode: Mode.view });
      }
    } catch { }
  }

  private onChange = (ev, option) => {
    this.setState({ seletedItem: option["locationItem"], currentMode: Mode.editView },
      () => {
        if (this.focusRef.current != null)
          this.focusRef.current.focus();
      });
    this.props.onSelectionChanged(option["locationItem"]);
  }

  private customRenderInitials(props) {
    if (props.imageAlt === "Custom")
      return <FontIcon aria-label="Poi" iconName="Poi" style={{ fontSize: '14pt' }} />;
    else
      return <FontIcon aria-label="EMI" iconName="EMI" style={{ fontSize: '14pt' }} />;
  }

  private async getTocken() {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');
    requestHeaders.append('Cache-Control', 'no-cache');
    const spOpts: ISPHttpClientOptions = {
      body: `{"resource":"https://outlook.office365.com"}`,
      headers: requestHeaders
    };

    let response: SPHttpClientResponse = await this.props.context.spHttpClient.post(`${this.props.context.pageContext.web.serverRelativeUrl}/_api/SP.OAuth.Token/Acquire`, SPHttpClient.configurations.v1, spOpts);
    let PrimaryQueryResult: any = await response.json();
    this._token = PrimaryQueryResult.access_token;
  }

  private async getLocatios(searchText) {
    try {
      let optionsForCustomRender: ILocationBoxOption[] = [];
      const requestHeaders: Headers = new Headers();
      requestHeaders.append('Content-type', 'application/json');
      requestHeaders.append('Cache-Control', 'no-cache');
      requestHeaders.append('Authorization', 'Bearer ' + this._token);
      const spOpts: ISPHttpClientOptions = {
        body: `{"QueryConstraint":{"Query":"${searchText}"},"LocationProvider":32,"BingMarket":"en-IN"}`,
        headers: requestHeaders
      };
      let client1: AadHttpClient = await this.props.context.aadHttpClientFactory.getClient("https://outlook.office365.com");
      let response1 = await client1.post(`https://outlook.office365.com/SchedulingB2/api/v1.0/me/findmeetinglocations`, AadHttpClient.configurations.v1, spOpts);
      let json = await response1.json();


      json.MeetingLocations.forEach((v, i) => {
        let loc: ILocationPickerItem = v["MeetingLocation"];
        optionsForCustomRender.push({ text: v.MeetingLocation["DisplayName"], key: i, locationItem: loc });
      });

      optionsForCustomRender.push({ text: strings.customDisplayName, key: 7, locationItem: { DisplayName: searchText, EntityType: 'Custom' } });
      this.setState({ options: optionsForCustomRender });
    }
    catch (error) {
      console.log(`Error get Items`, error);
    }

  }
}
