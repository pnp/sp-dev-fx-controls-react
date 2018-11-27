import * as strings from 'ControlStrings';
import * as React from 'react';
import { IPeoplePickerProps, IPeoplePickerState, IPeoplePickerUserItem } from './IPeoplePicker';
import { MockUsers } from './PeoplePickerMockClient';
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './PeoplePickerComponent.module.scss';
import * as telemetry from '../../common/telemetry';
import { assign } from 'office-ui-fabric-react/lib/Utilities';
import { IUsers } from './IUsers';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { IBasePickerSuggestionsProps } from "office-ui-fabric-react/lib/components/pickers/BasePicker.types";
import { IPersonaWithMenu } from "office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.types";
import { IPersonaProps } from "office-ui-fabric-react/lib/components/Persona/Persona.types";
import { MessageBarType } from "office-ui-fabric-react/lib/components/MessageBar";
import { ValidationState } from 'office-ui-fabric-react/lib/components/pickers/BasePicker.types';
import { Icon } from "office-ui-fabric-react/lib/components/Icon";
import { isEqual } from "@microsoft/sp-lodash-subset";
import SPPeopleSearchService from './PeopleSearchService';

/**
* PeoplePicker component
*/
export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {

  private peopleSearchService : SPPeopleSearchService;
  private suggestionsLimit : number;
  constructor(props: IPeoplePickerProps) {
    super(props);

    this.peopleSearchService = new SPPeopleSearchService(props.context);
    this.suggestionsLimit = this.props.suggestionsLimit ? this.props.suggestionsLimit : 5;
    telemetry.track('ReactPeoplePicker', {
      groupName: !!props.groupName,
      name: !!props.groupName,
      titleText: !!props.titleText
    });

    this.state = {
      selectedPersons: [],
      mostRecentlyUsedPersons: [],
      currentSelectedPersons: [],
      allPersons: [],
      currentPicker: 0,
      peoplePartTitle: "",
      peoplePartTooltip: "",
      isLoading: false,
      showmessageerror: false,
      resolveDelay:  this.props.resolveDelay !== null && this.props.resolveDelay !== undefined ? this.props.resolveDelay : 1000
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    if (Environment.type === EnvironmentType.Local) {
      // local mode
      this._loadLocalWorkbenchUsers();
    } else {
      // online mode
      // Load the users
      this._thisLoadUsers();
    }
  }

  /**
   * componentDidUpdate lifecycle hook
   */
  public componentDidUpdate(prevProps : IPeoplePickerProps, prevState : IPeoplePickerState) : void {
    // If defaultSelectedUsers has changed then bind again
    if (!isEqual(this.props.defaultSelectedUsers, prevProps.defaultSelectedUsers)) {
      // Check if we have results to get from, if not provide a empty array to filter on
      let userValuesArray: Array < IPeoplePickerUserItem > = this.state.allPersons.length !== 0 ? this.state.allPersons : new Array < IPeoplePickerUserItem > ();

      // Set Default selected persons
      let defaultUsers: any = [];
      let defaultPeopleList: IPersonaProps[] = [];
      if (this.props.defaultSelectedUsers) {
        this.getDefaultUsers(userValuesArray, this.props.defaultSelectedUsers).then((defaultUsers) => {
          for (const persona of defaultUsers) {
            let selectedPeople: IPersonaProps = {};
            assign(selectedPeople, persona);
            defaultPeopleList.push(selectedPeople);
          }
          this.setState({
            selectedPersons: defaultPeopleList.length !== 0 ? defaultPeopleList : [],
            showmessageerror: this.props.isRequired && defaultPeopleList.length === 0
          });
        });
      }
    }
  }

  /**
   * Generate the user photo link
   *
   * @param value
   */
  private generateUserPhotoLink(value: string): string {
    return `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${value}&UA=0&size=HR96x96`;
  }

  /**
   * Retrieve the users for local demo and testing purposes
   */
  private async _loadLocalWorkbenchUsers(): Promise<void> {
    let _fakeUsers: Array<IPeoplePickerUserItem> = MockUsers;

    let personaList: IPersonaProps[] = [];
    for (const persona of _fakeUsers) {
      let personaWithMenu: IPersonaProps = {};
      assign(personaWithMenu, persona);
      personaList.push(personaWithMenu);
    }

    // update the current state
    this.setState({
      allPersons: _fakeUsers,
      peoplePersonaMenu: personaList,
      mostRecentlyUsedPersons: personaList.slice(0, 5),
      showmessageerror: this.props.isRequired && this.state.selectedPersons.length === 0
    });

  }

  /**
   * Retrieve the users
   */
  private async _thisLoadUsers(): Promise<void> {
    var stringVal: string = "";

    if (this.props.groupName) {
      stringVal = `/_api/web/sitegroups/GetByName('${this.props.groupName}')/users`;
    } else {
      stringVal = "/_api/web/siteusers";
    }

    // filter for principal Type
    var filterVal: string = "";
    if (this.props.principleTypes) {
      filterVal = `?$filter=${this.props.principleTypes.map(principalType => `(PrincipalType eq ${principalType})`).join(" or ")}`;
    }

    // filter for showHiddenInUI
    if (this.props.showHiddenInUI) {
      filterVal = filterVal ? `${filterVal} and (IsHiddenInUI eq ${this.props.showHiddenInUI})` : `?$filter=IsHiddenInUI eq ${this.props.showHiddenInUI}`;
    }

    const webAbsoluteUrl = this.props.webAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
    // Create the rest API
    const restApi = `${webAbsoluteUrl}${stringVal}${filterVal}`;

    try {
      // Call the API endpoint
      const data = await this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata.metadata=none'
        }
      });

      if (data.ok) {
        const items: IUsers = await data.json();

        // Check if items were retrieved
        if (items && items.value && items.value.length > 0) {

          let userValuesArray: Array < IPeoplePickerUserItem > = new Array < IPeoplePickerUserItem > ();

          // Loop over all the retrieved items
          for (let i = 0; i < items.value.length; i++) {
            const item = items.value[i];
            if (!item.IsHiddenInUI || (this.props.showHiddenInUI && item.IsHiddenInUI)) {
              // Check if the the type must be returned
              if (!this.props.principleTypes || this.props.principleTypes.indexOf(item.PrincipalType) !== -1) {
                userValuesArray.push({
                  id: item.Id.toString(),
                  imageUrl: this.generateUserPhotoLink(item.Email),
                  imageInitials: "",
                  text: item.Title, // name
                  secondaryText: item.Email, // email
                  tertiaryText: "", // status
                  optionalText: "" // anything
                });
              }
            }
          }

          let personaList: IPersonaProps[] = [];
          for (const persona of userValuesArray) {
            let personaWithMenu: IPersonaProps = {};
            assign(personaWithMenu, persona);
            personaList.push(personaWithMenu);
          }

          // Set Default selected persons
          let defaultUsers: any = [];
          let defaultPeopleList: IPersonaProps[] = [];
          if (this.props.defaultSelectedUsers) {
            this.getDefaultUsers(userValuesArray, this.props.defaultSelectedUsers).then((defaultUsers) => {
              for (const persona of defaultUsers) {
                let selectedPeople: IPersonaProps = {};
                assign(selectedPeople, persona);
                defaultPeopleList.push(selectedPeople);
              }
              // Update the current state
              this.setState({
                selectedPersons: defaultPeopleList.length !== 0 ? defaultPeopleList : [],
                showmessageerror: this.props.isRequired && defaultPeopleList.length === 0
              });
            });
          }

          // Update the current state
          this.setState({
            allPersons: userValuesArray,
            peoplePersonaMenu: personaList,
            mostRecentlyUsedPersons: personaList.slice(0, 5)
          });
        }
      }
    } catch (e) {
      console.error("Error occured while fetching the users and setting selected users.");
    }
  }

  /**
   * On persona item changed event
   */
  private _onPersonItemsChange = (items: any[]) => {
    const { selectedItems } = this.props;

    this.setState({
      selectedPersons: items,
      showmessageerror: items.length > 0 ? false : true
    });

    if (selectedItems) {
      selectedItems(items);
    }
  }

  /**
   * Validates the user input
   *
   * @param input
   */
  private _validateInputPeople = (input: string) => {
    if (input.indexOf('@') !== -1) {
      return ValidationState.valid;
    } else if (input.length > 1) {
      return ValidationState.warning;
    } else {
      return ValidationState.invalid;
    }
  }

  /**
   * Returns the most recently used person
   *
   * @param currentPersonas
   */
  private _returnMostRecentlyUsedPerson = (currentPersonas: IPersonaProps[]): IPersonaProps[] => {
    let { mostRecentlyUsedPersons } = this.state;
    return this._removeDuplicates(mostRecentlyUsedPersons, currentPersonas);
  }

  /**
   * On filter changed event
   *
   * @param filterText
   * @param currentPersonas
   * @param limitResults
   */
  private _onPersonFilterChanged = (filterText: string, currentPersonas: IPersonaProps[], limitResults?: number): IPersonaProps[] => {
    if (filterText) {
      let filteredPersonas: IPersonaProps[] =this._filterPersons(filterText);
      filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
      filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
      return filteredPersonas;
    } else {
      return [];
    }
  }

  /**
   * Filter persons based on Name and Email (starting with and contains)
   *
   * @param filterText
   */
  private _filterPersons(filterText: string): IPersonaProps[] {
    return this.state.peoplePersonaMenu.filter(item =>
      this._doesTextStartWith(item.text as string, filterText)
      || this._doesTextContains(item.text as string, filterText)
      || this._doesTextStartWith(item.secondaryText as string, filterText)
      || this._doesTextContains(item.secondaryText as string, filterText));
  }


  /**
   * Removes duplicates
   *
   * @param personas
   * @param possibleDupes
   */
  private _removeDuplicates = (personas: IPersonaProps[], possibleDupes: IPersonaProps[]): IPersonaProps[] => {
    return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
  }

  /**
   * Checks if text starts with
   *
   * @param text
   * @param filterText
   */
  private _doesTextStartWith(text: string, filterText: string): boolean {
    return text && text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

  /**
 * Checks if text contains
 *
 * @param text
 * @param filterText
 */
  private _doesTextContains(text: string, filterText: string): boolean {
    return text && text.toLowerCase().indexOf(filterText.toLowerCase()) > 0;
  }

  /**
   * Checks if list contains the person
   *
   * @param persona
   * @param personas
   */
  private _listContainsPersona = (persona: IPersonaProps, personas: IPersonaProps[]): boolean => {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
  }

  /**
   * Method called when an input change happens
   */
  private _onInputChange = (input: string): string => {
    console.log(input);
    if (!this.props.groupName) {
      try {
        let filterValue = {
          valToCompare: input
        };
        let currentAllUsers = this.state.allPersons;
        let results = currentAllUsers.filter(this.filterUsers, filterValue);
        if (results.length == 0) {
          this.searchUsersFromTenant(input).then((searchedPersons) => {
            if (searchedPersons.length !== 0) {
              let currentAllUsers = this.state.allPersons;
              for (let person of searchedPersons) {
                currentAllUsers = currentAllUsers.concat(person);
              }
              let personaList: IPersonaProps[] = [];
              for (const persona of currentAllUsers) {
                let personaWithMenu: IPersonaProps = {};
                assign(personaWithMenu, persona);
                personaList.push(personaWithMenu);
              }
              this.setState({
                allPersons: currentAllUsers,
                peoplePersonaMenu: personaList,
                mostRecentlyUsedPersons: personaList.slice(0, 5)
              });
            }
          }).catch(e => {
            console.log(e);
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
    return input;
  }

  /**
   * Search through all users in the tenant
   * @param searchText 
   */
  private async searchUsersFromTenant(searchText : string) : Promise<IPeoplePickerUserItem[]>
  {
    return new Promise < IPeoplePickerUserItem[] > ((resolve, reject) => {
      this.peopleSearchService.searchAllUsers(searchText, this.suggestionsLimit).then((searchedPersons : IPeoplePickerUserItem[]) => {
        let results: IPeoplePickerUserItem[] = [];
        let currentAllUsers = this.state.allPersons;
        for (let person of searchedPersons) {
          let filterValue = {
            valToCompare: searchText
          };
          let result = currentAllUsers.filter(this.filterUsers, filterValue);
          if (result.length == 0) {
            results = results.length !== 0 ? results.concat(person) : [person];
          }
        }
        resolve(results);
      }).catch((e) => {
        console.log(e);
      });
    });
  }

  /**
   * Gets the default users based on the provided email address.
   * Adds emails that are not found with a random generated User Id
   *
   * @param userValuesArray
   * @param selectedUsers
   */
  private async getDefaultUsers(userValuesArray: any[], selectedUsers: string[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
    let defaultuserValuesArray: any[] = [];
    for (let i = 0; i < selectedUsers.length; i++) {
      const obj = { valToCompare: selectedUsers[i] };
      const length = defaultuserValuesArray.length;
      let result = userValuesArray.filter(this.filterUsers, obj);
      if(result.length !== 0)
      {
        defaultuserValuesArray = defaultuserValuesArray.length !== 0 ? defaultuserValuesArray.concat(result) : [result];
      }
      else
      {
         await this.searchUsersFromTenant(selectedUsers[i]).then((searchedPersons) => {
            if(searchedPersons.length !== 0)
            {
              for(let searchedPerson of searchedPersons)
              {
                let defaultSearchedUser = {
                  id: searchedPerson.id, //just a random number
                  imageUrl: searchedPerson.imageUrl,
                  imageInitials: searchedPerson.imageInitials,
                  text: searchedPerson.text, //Name
                  secondaryText: searchedPerson.secondaryText, //Role
                  tertiaryText: searchedPerson.tertiaryText, //status
                  optionalText: searchedPerson.optionalText //stgring
                };
                defaultuserValuesArray = defaultuserValuesArray.length !== 0 ? defaultuserValuesArray.concat(defaultSearchedUser) : [defaultSearchedUser];
              }
            }
         }).catch((e) => {
           console.log(e);
         });
      }

      if (length === defaultuserValuesArray.length) {
        const defaultUnknownUser = [{
          id: 1000 + i, //just a random number
          imageUrl: "",
          imageInitials: "",
          text: selectedUsers[i], //Name
          secondaryText: selectedUsers[i], //Role
          tertiaryText: "", //status
          optionalText: "" //stgring
        }];
        defaultuserValuesArray = defaultuserValuesArray.length !== 0 ? defaultuserValuesArray.concat(defaultUnknownUser) : [defaultUnknownUser];
      }
    }
    resolve(defaultuserValuesArray);
    });
  }

  /**
   * Filters Users based on email
   */
  private filterUsers = function (value: any, index: number, ar: any[]) {
    if (value.secondaryText.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1 || value.text.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1) {
      return value;
    }
  };

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPeoplePickerProps> {
    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: strings.peoplePickerSuggestionsHeaderText,
      noResultsFoundText: strings.genericNoResultsFoundText,
      loadingText: strings.peoplePickerLoadingText,
      resultsMaximumNumber: this.props.suggestionsLimit ? this.props.suggestionsLimit : 5,
      searchingText : "Fetching users"
    };


    const peoplepicker = (
      <div id="people" className={`${styles.defaultClass} ${this.props.peoplePickerWPclassName ? this.props.peoplePickerWPclassName : ''}`}>
        {this.props.titleText && <Label>{this.props.titleText}</Label>}

        <NormalPeoplePicker pickerSuggestionsProps={suggestionProps}
          onResolveSuggestions={this._onPersonFilterChanged}
          onEmptyInputFocus={this._returnMostRecentlyUsedPerson}
          getTextFromItem={(peoplePersonaMenu: IPersonaProps) => peoplePersonaMenu.text}
          className={`'ms-PeoplePicker' ${this.props.peoplePickerCntrlclassName ? this.props.peoplePickerCntrlclassName : ''}`}
          key={'normal'}
          onValidateInput={this._validateInputPeople}
          removeButtonAriaLabel={'Remove'}
          inputProps={{
            'aria-label': 'People Picker'
          }}
          onInputChange = {this._onInputChange}
          selectedItems={this.state.selectedPersons}
          itemLimit={this.props.personSelectionLimit || 1}
          disabled={this.props.disabled}
          onChange={this._onPersonItemsChange}
          resolveDelay={this.state.resolveDelay} />
      </div>
    );

    return (
      <div>
        {
          this.props.showtooltip ? (
            <TooltipHost content={this.props.tooltipMessage || strings.peoplePickerComponentTooltipMessage}
              id='pntp'
              calloutProps={{ gapSpace: 0 }}
              directionalHint={this.props.tooltipDirectional || DirectionalHint.leftTopEdge}>
              {peoplepicker}
            </TooltipHost>
          ) : (
            <div>
              {peoplepicker}
            </div>
          )
        }

      {
        (this.props.isRequired && this.state.showmessageerror) && (
          <p className={`ms-TextField-errorMessage ${styles.errorMessage} ${this.props.errorMessageClassName ? this.props.errorMessageClassName : ''}`}>
            <Icon iconName='Error' className={styles.errorIcon} />
            <span data-automation-id="error-message">{this.props.errorMessage ? this.props.errorMessage : strings.peoplePickerComponentErrorMessage}</span>
          </p>
        )
      }
      </div>
    );
  }
}



