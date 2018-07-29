import * as strings from 'ControlStrings';
import * as React from 'react';
import { IPeoplePickerProps, IPeoplePickerState } from './IPeoplePicker';
import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { ValidationState } from 'office-ui-fabric-react/lib/Pickers';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './PeoplePickerComponent.module.scss';
import * as telemetry from '../../common/telemetry';
import {
  assign
} from 'office-ui-fabric-react/lib/Utilities';
import { IUsers } from './IUsers';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { select } from '../../../node_modules/glamor';

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading'
};

/**
* PeoplePicker component
*/
export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {

  constructor(props: IPeoplePickerProps) {
    super(props);

    telemetry.track('ReactPeoplePicker', {
      groupName: !!props.groupName,
      name: !!props.groupName,
      titleText: !!props.titleText
    });

    this.state = {
      selectedPersons: [],
      mostRecentlyUsedPersons: [],
      currentSelectedPersons: [],
      allPersons: [{
        id: "",
        imageUrl: "",
        imageInitials: "",
        primaryText: "", //Name
        secondaryText: "", //Role
        tertiaryText: "", //status
        optionalText: "" //anything
      }],
      currentPicker: 0,
      peoplePartTitle: "",
      peoplePartTooltip : "",
      isLoading : false,
      showmessageerror: false
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    // Load the users
    this._thisLoadUsers();
  }

  /**
   * Generate the user photo link
   *
   * @param value
   */
  private generateUserPhotoLink(value : string) : string {
    return `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${value}&UA=0&size=HR96x96`;
  }

  /**
   * Retrieve the users
   */
  private async _thisLoadUsers(): Promise<void> {
    var stringVal = "";
    if (this.props.groupName) {
      stringVal = `/_api/web/sitegroups/GetByName('${this.props.groupName}')/users`;
    } else {
      stringVal = "/_api/web/siteusers";
    }

    // Create the rest API
    const restApi = `${this.props.context.pageContext.web.absoluteUrl}${stringVal}`;

    try {
      // Call the API endpoint
      const items: IUsers = await this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1).then(resp => resp.json());

      // Check if items were retrieved
      if (items && items.value && items.value.length > 0) {
        let userValuesArray: any = [{
          id: 0,
          imageUrl: "",
          imageInitials: "",
          primaryText: "", //Name
          secondaryText: "", //Email
          tertiaryText: "", //status
          optionalText: "" //anything
        }];

        // Loop over all the retrieved items
        for (let i = 0; i < items.value.length; i++) {
          if (i === 0) {
            userValuesArray = [{
              id: items.value[i].Id,
              imageUrl: this.generateUserPhotoLink(items.value[i].Email),
              imageInitials: "",
              primaryText: items.value[i].Title, //Name
              secondaryText: items.value[i].Email, //Email
              tertiaryText: "", //status
              optionalText: "" //anything
            }];
          } else {
            userValuesArray.push({
              id: items.value[i].Id,
              imageUrl: this.generateUserPhotoLink(items.value[i].Email),
              imageInitials: "",
              primaryText: items.value[i].Title, //Name
              secondaryText: items.value[i].Email, //Email
              tertiaryText: "", //status
              optionalText: "" //anything
            });
          }
        }

        //Set Default selected persons
        var defaultUsers : any = [];
        var defaultPeopleList: IPersonaWithMenu[] = [];
        if(this.props.defaultSelectedUsers != null)
        {
          defaultUsers = this.getDefaultUsers(userValuesArray, this.props.defaultSelectedUsers);
          defaultUsers.forEach((persona: IPersonaProps) => {
            let selectedPeople: IPersonaWithMenu = {};
            assign(selectedPeople, persona);
            defaultPeopleList.push(selectedPeople);
          });
        }

        let personaList: IPersonaWithMenu[] = [];
        for (const persona of userValuesArray) {
          let personaWithMenu: IPersonaWithMenu = {};
          assign(personaWithMenu, persona);
          personaList.push(personaWithMenu);
        }

        // Update the current state
        this.setState({
          allPersons : userValuesArray,
          selectedPersons : defaultPeopleList.length != 0 ? defaultPeopleList : [],
          peoplePersonaMenu : personaList,
          mostRecentlyUsedPersons : personaList.slice(0,5)   
        });

        this.setState({
          showmessageerror: this.props.isRequired && this.state.selectedPersons.length === 0
        });
      }
    } catch (e) {
      console.error("Error occured while fetching the users and setting selected users.", e);
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
      let filteredPersonas: IPersonaProps[] = this._filterPersons(filterText);
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
  this._doesTextStartWith(item.primaryText as string, filterText) 
  || this._doesTextContains(item.primaryText as string, filterText) 
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
  private _doesTextStartWith = (text: string, filterText: string): boolean => {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
  }

    /**
   * Checks if text contains
   *
   * @param text
   * @param filterText
   */
  private _doesTextContains(text: string, filterText: string): boolean {
    return text.toLowerCase().indexOf(filterText.toLowerCase()) > 0;
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
    return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
  }

  /**
   * Gets the default users based on the provided email address. 
   * Adds emails that are not found with a random generated User Id
   *
   * @param userValuesArray
   * @param selectedUsers
   */
  private getDefaultUsers(userValuesArray : any[], selectedUsers : string[]) : any {
    var defaultuserValuesArray: any[] = [];
    for(let i=0; i < selectedUsers.length; i++)
    {
      var obj = {valToCompare : selectedUsers[i] }
      var length = defaultuserValuesArray.length;
      defaultuserValuesArray = defaultuserValuesArray.length != 0  ? defaultuserValuesArray.concat(userValuesArray.filter(this.filterUsers, obj)) : userValuesArray.filter(this.filterUsers, obj);
      if(length === defaultuserValuesArray.length)
      {
        var defaultUnknownUser = [{
          id: 1000 + i, //just a random number
          imageUrl: "",
          imageInitials: "",
          primaryText: selectedUsers[i] , //Name
          secondaryText: selectedUsers[i], //Role
          tertiaryText: "", //status
          optionalText: "" //stgring
        }]
        defaultuserValuesArray = defaultuserValuesArray.length != 0  ? defaultuserValuesArray.concat(defaultUnknownUser) : defaultUnknownUser;
      }
    }
    return defaultuserValuesArray;
  }

  /**
   * Filters Users based on email
   */
  private filterUsers = function(value : any, index : number, ar : any[]){
    if(value.secondaryText.toLowerCase().indexOf(this.valToCompare.toLowerCase()) !== -1)
        return value;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPeoplePickerProps> {
    const peoplepicker = (
      <div id="people" className={`${styles.defaultClass} ${this.props.peoplePickerWPclassName ? this.props.peoplePickerWPclassName : ''}`}>
        <Label>{this.props.titleText || strings.peoplePickerComponentTitleText}</Label>

        <NormalPeoplePicker pickerSuggestionsProps={suggestionProps}
                            onResolveSuggestions={this._onPersonFilterChanged}
                            onEmptyInputFocus={ this._returnMostRecentlyUsedPerson}
                            getTextFromItem={(peoplePersonaMenu: IPersonaProps) => peoplePersonaMenu.primaryText}
                            className={`'ms-PeoplePicker' ${this.props.peoplePickerCntrlclassName ? this.props.peoplePickerCntrlclassName : ''}`}
                            key={'normal'}
                            onValidateInput={this._validateInputPeople}
                            removeButtonAriaLabel={'Remove'}
                            inputProps={{
                              'aria-label': 'People Picker'
                            }}
                            selectedItems={this.state.selectedPersons}
                            itemLimit={this.props.personSelectionLimit || 1}
                            disabled={this.props.disabled}
                            onChange={this._onPersonItemsChange} />
      </div>
    );

    return (
      <div>
      {
        this.props.showtooltip ? (
          <TooltipHost content={this.props.tooltipMessage || strings.peoplePickerComponentTooltipMessage}
                    id='pntp'
                    calloutProps={ { gapSpace: 0 } }
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
          <MessageBar messageBarType={MessageBarType.error}
                      isMultiline={false}
                      className={`${this.props.errorMessageclassName ? this.props.errorMessageclassName : ''}`}>
            {this.props.errorMessage ? this.props.errorMessage : strings.peoplePickerComponentErrorMessage}
          </MessageBar>
        )
      }
      </div>
    );
  }
}



