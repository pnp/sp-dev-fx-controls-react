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
    this.getToken();
    this.focusRef = React.createRef();
    if (props.defaultValue) {
      this.state = {
        options: [],
        currentMode: Mode.view,
        searchText: null,
        isCalloutVisible: true,
        selectedItem: props.defaultValue,
      };
    }
    else {
      this.state = {
        options: [],
        currentMode: Mode.empty,
        searchText: null,
        isCalloutVisible: true,
        selectedItem: props.defaultValue,
      };
    }

  }

  public componentWillReceiveProps(nextProps: ILocationPickerProps) {
    if (!isEqual(nextProps.defaultValue, this.props.defaultValue)) {
      if (nextProps.defaultValue) {
        this.setState({ selectedItem: nextProps.defaultValue, currentMode: Mode.view });
      }
    }
  }

  /**
  * Renders the LocationPicker controls with Office UI Fabric
  */
  public render(): JSX.Element {
    const { label } = this.props;

    return (
      <div>
        {label ? <Text>{label}</Text> : null}
        {this.getMainContent()}
      </div>
    );
  }

  private onRenderOption = (item: ILocationBoxOption) => {
    const {
      text,
      locationItem
    } = item;
    if (locationItem.EntityType === "Custom") {
      return <Persona
        text={text}
        imageAlt={locationItem.EntityType}
        secondaryText={locationItem.DisplayName}
        size={PersonaSize.size40}
        onRenderInitials={this.customRenderInitials}
      />;
    }
    else
      return <Persona
        text={text}
        imageAlt={locationItem.EntityType}
        secondaryText={this.getLocationText(locationItem, "full")}
        size={PersonaSize.size40}
        onRenderInitials={this.customRenderInitials} />;
  }

  private getMainContent = (): React.ReactNode => {
    const { options, selectedItem, currentMode } = this.state;
    const { className, disabled, placeholder, errorMessage } = this.props;

    switch (currentMode) {
      case Mode.empty:
        return <ComboBox
          className={className}
          disabled={disabled}
          placeholder={placeholder}
          allowFreeform={true}
          autoComplete="on"
          options={options}
          onRenderOption={this.onRenderOption}
          calloutProps={{ className: styles.callout }}
          buttonIconProps={{ iconName: "MapPin" }}
          useComboBoxAsMenuWidth={true}
          openOnKeyboardFocus={true}
          scrollSelectedToTop={true}
          isButtonAriaHidden={true}
          onInput={(e) => this.getLocatios(e.target["value"])}
          onChange={this.onChange}
          errorMessage={errorMessage}
        />;
      case Mode.editView:
        if (selectedItem.EntityType === "Custom") {
          return <div
            ref={this.focusRef}
            data-selection-index={0}
            data-is-focusable={true}
            role="listitem"
            className={styles.pickerItemContainer}
            onBlur={this.onBlur}
            tabIndex={0}>
            <Persona
              data-is-focusable="false"
              imageAlt={selectedItem.EntityType}
              tabIndex={0}
              text={selectedItem.DisplayName}
              title="Location"
              className={styles.persona}
              size={PersonaSize.size40}
              onRenderInitials={this.customRenderInitials} />
            <IconButton
              data-is-focusable="false"
              tabIndex={0}
              iconProps={{ iconName: "Cancel" }}
              title="Clear"
              ariaLabel="Clear"
              disabled={disabled}
              className={styles.closeButton}
              onClick={this.onIconButtonClick} />
          </div>;
        }

        return <div
          ref={this.focusRef}
          data-selection-index={0}
          data-is-focusable={true}
          role="listitem"
          className={styles.pickerItemContainer}
          onBlur={this.onBlur}
          tabIndex={0}>
          <Persona
            data-is-focusable="false"
            imageAlt={selectedItem.EntityType}
            tabIndex={0}
            text={selectedItem.DisplayName}
            title="Location"
            className={styles.persona}
            secondaryText={this.getLocationText(selectedItem, "full")}
            size={PersonaSize.size40}
            onRenderInitials={this.customRenderInitials} />
          {!disabled ?
            <IconButton
              data-is-focusable="false"
              tabIndex={0}
              iconProps={{ iconName: "Cancel" }}
              title="Clear"
              ariaLabel="Clear"
              disabled={disabled} className={styles.closeButton}
              onClick={this.onIconButtonClick} /> : null}
        </div>;

      case Mode.view:
        if (selectedItem.EntityType === 'Custom') {
          return <div className={styles.locationAddressContainer}
            onClick={this.onClick}>
            <div className={styles.locationContainer} tabIndex={0}>
              <div className={styles.locationDisplayName}>{selectedItem.DisplayName}</div>
            </div>
          </div>;
        }

        return <div className={styles.locationAddressContainer} onClick={this.onClick}>
          <div className={styles.locationContainer} tabIndex={0}>
            <div className={styles.locationDisplayName}>{selectedItem.DisplayName}</div>
            <div className={styles.locationContent}>
              <div className={styles.locationAddress}>{this.getLocationText(selectedItem, "street")}</div>
              <div className={styles.locationAddress}>{this.getLocationText(selectedItem, "noStreet")}</div>
            </div>
          </div>
        </div>;
    }

    return null;
  }

  private getLocationText = (item: ILocationPickerItem, mode: "full" | "street" | "noStreet"): string => {
    if (!item.Address) {
      return '';
    }

    const address = item.Address;

    switch (mode) {
      case "street":
        return address.Street || "";
      case "noStreet":
        return `${address.City ? address.City + ", " : ''}${address.State ? address.State + ", " : ""}${address.CountryOrRegion || ""}`;
    }

    return `${address.Street ? address.Street + ", " : ''}${address.City ? address.City + ", " : ""}${address.State ? address.State + ", " : ''}${address.CountryOrRegion || ""}`;
  }

  private onIconButtonClick = () => {
    this.setState({ currentMode: Mode.empty, selectedItem: null });
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

  private onChange = (ev, option: ILocationBoxOption) => {
    this.setState({ selectedItem: option.locationItem, currentMode: Mode.editView },
      () => {
        if (this.focusRef.current != null)
          this.focusRef.current.focus();
      });

    if (this.props.onChange) {
      this.props.onChange(option.locationItem);
    }
  }

  private customRenderInitials(props) {
    if (props.imageAlt === "Custom")
      return <FontIcon aria-label="Poi" iconName="Poi" style={{ fontSize: "14pt" }} />;
    else
      return <FontIcon aria-label="EMI" iconName="EMI" style={{ fontSize: "14pt" }} />;
  }

  private async getToken() {
    const requestHeaders: Headers = new Headers();
    requestHeaders.append("Content-type", "application/json");
    requestHeaders.append("Cache-Control", "no-cache");
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
      requestHeaders.append("Content-type", "application/json");
      requestHeaders.append("Cache-Control", "no-cache");
      requestHeaders.append("Authorization", `Bearer ${this._token}`);
      const spOpts: ISPHttpClientOptions = {
        body: `{"QueryConstraint":{"Query":"${searchText}"},"LocationProvider":32,"BingMarket":"en-IN"}`,
        headers: requestHeaders
      };
      let client1: AadHttpClient = await this.props.context.aadHttpClientFactory.getClient("https://outlook.office365.com");
      let response1 = await client1.post("https://outlook.office365.com/SchedulingB2/api/v1.0/me/findmeetinglocations", AadHttpClient.configurations.v1, spOpts);
      let json = await response1.json();


      json.MeetingLocations.forEach((v, i) => {
        let loc: ILocationPickerItem = v["MeetingLocation"];
        optionsForCustomRender.push({ text: v.MeetingLocation["DisplayName"], key: i, locationItem: loc });
      });

      optionsForCustomRender.push({ text: strings.customDisplayName, key: 7, locationItem: { DisplayName: searchText, EntityType: "Custom" } });
      this.setState({ options: optionsForCustomRender });
    }
    catch (error) {
      console.log("Error get Items", error);
    }

  }
}
