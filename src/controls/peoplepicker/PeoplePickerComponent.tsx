import * as React from 'react';
import { IPeoplePickerProps, IPeoplePickerState } from './IPeoplePicker';
import { Persona, IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { IBasePickerSuggestionsProps } from 'office-ui-fabric-react/lib/Pickers';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker';
import { IPersonaWithMenu } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePickerItems/PeoplePickerItem.Props';
import { ValidationState } from 'office-ui-fabric-react/lib/Pickers';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { SPHttpClient } from '@microsoft/sp-http';
import styles from './PeoplePickerComponent.module.scss';
import * as appInsights from '../../common/appInsights';
import {
  assign
} from 'office-ui-fabric-react/lib/Utilities';
import { autobind } from 'office-ui-fabric-react';

const suggestionProps: IBasePickerSuggestionsProps = {
  suggestionsHeaderText: 'Suggested People',
  noResultsFoundText: 'No results found',
  loadingText: 'Loading'
};

/**
* PeoplePicker component
*/
export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {

  public static defaultProps: IPeoplePickerProps = {
  context : null,
  getAllUsers: true,
  titleText: "People Picker",
  personSelectionLimit: 1,
  showtooltip : false,
  isRequired : false,
  errorMessage : "People picker is mandatory",
  groupName: "",
  tooltipMessage: "This is a People Picker",
  tooltipDirectional: DirectionalHint.leftTopEdge  
  }; 
  
/**
* Constructor
*/
constructor(props: IPeoplePickerProps) {
  super(props);
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
    delayResults: false,
    currentPicker: 0,
    peoplePartTitle: "",
    peoplePartTooltip : "",
    isLoading : false,
    showmessageerror: false
  };

  if (typeof this.props.selectedItems !== 'undefined' && this.props.selectedItems !== null) {
     this.props.selectedItems(this.state.selectedPersons);
  };

  appInsights.track('ReactPeoplePicker', {
    groupName: !!props.groupName,
    name: !!props.groupName,
    getAllUsers: !!props.getAllUsers,
    titleText: !!props.titleText
  });

  this._onPersonItemsChange = this._onPersonItemsChange.bind(this);
  }

  public componentWillMount(): void {
    this._thisLoadUsers();
  }

  private generateUserPhotoLink(value : string) : string {
    return `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${value}&UA=0&size=HR96x96`
  } 

  private _thisLoadUsers() : void {
    var stringVal = "";
    if(this.props.getAllUsers)
    {
      stringVal = "/_api/web/siteusers";
    }
    else if(this.props.groupName != "")
    {
      stringVal = `/_api/web/sitegroups/GetByName('${this.props.groupName}')/users`;
    }

    const restApi = `${this.props.context.pageContext.web.absoluteUrl}${stringVal}`;
    this.props.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)
      .then(resp => { return resp.json(); })
      .then(items => {
        var userValuesArray : any = [{
          id: 0,
          imageUrl: "",
          imageInitials: "",
          primaryText: "", //Name
          secondaryText: "", //Email
          tertiaryText: "", //status
          optionalText: "" //anything
        }];
        
        for(let i = 0; i < items.value.length; i++)
        {
          if(i == 0)
          {
             userValuesArray = [{
                id: items.value[i].Id,
                imageUrl: this.generateUserPhotoLink(items.value[i].Email), 
                imageInitials: "",
                primaryText: items.value[i].Title, //Name
                secondaryText: items.value[i].Email, //Email
                tertiaryText: "", //status
                optionalText: "" //anything
             }]
          }
          else
          {
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
        
        let personaList: IPersonaWithMenu[] = [];
        userValuesArray.forEach((persona: IPersonaProps) => {
          let personaWithMenu: IPersonaWithMenu = {};
          assign(personaWithMenu, persona)
          personaList.push(personaWithMenu);
        });

        this.setState({
          allPersons : userValuesArray,
          peoplePersonaMenu : personaList,
          mostRecentlyUsedPersons : personaList.slice(0,5),
          showmessageerror: this.props.isRequired && this.state.selectedPersons.length === 0
        });
      });
  }

@autobind
private _onPersonItemsChange(items: any[]) {
    this.setState({
      selectedPersons: items,
      showmessageerror: items.length > 0 ? false : true
    });
  }

@autobind
private _validateInputPeople(input: string) {
  if (input.indexOf('@') !== -1) {
    return ValidationState.valid;
  } else if (input.length > 1) {
    return ValidationState.warning;
  } else {
    return ValidationState.invalid;
  }
}

@autobind
private _returnMostRecentlyUsedPerson(currentPersonas: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
  let { mostRecentlyUsedPersons } = this.state;
  mostRecentlyUsedPersons = this._removeDuplicates(mostRecentlyUsedPersons, currentPersonas);
  return this._filterPromise(mostRecentlyUsedPersons);
}

@autobind
private _onPersonFilterChanged(filterText: string, currentPersonas: IPersonaProps[], limitResults?: number) {
  if (filterText) {
    let filteredPersonas: IPersonaProps[] = this._filterPersons(filterText);

    filteredPersonas = this._removeDuplicates(filteredPersonas, currentPersonas);
    filteredPersonas = limitResults ? filteredPersonas.splice(0, limitResults) : filteredPersonas;
    return this._filterPromise(filteredPersonas);
  } else {
    return [];
  }
}

@autobind
private _filterPersons(filterText: string): IPersonaProps[] {
  return this.state.peoplePersonaMenu.filter(item => this._doesTextStartWith(item.primaryText as string, filterText));
}

@autobind
private _removeDuplicates(personas: IPersonaProps[], possibleDupes: IPersonaProps[]) {
  return personas.filter(persona => !this._listContainsPersona(persona, possibleDupes));
}

@autobind
private _doesTextStartWith(text: string, filterText: string): boolean {
  return text.toLowerCase().indexOf(filterText.toLowerCase()) === 0;
}

@autobind
private _listContainsPersona(persona: IPersonaProps, personas: IPersonaProps[]) {
  if (!personas || !personas.length || personas.length === 0) {
    return false;
  }
  return personas.filter(item => item.primaryText === persona.primaryText).length > 0;
}

@autobind
private _filterPromise(personasToReturn: IPersonaProps[]): IPersonaProps[] | Promise<IPersonaProps[]> {
  if (this.state.delayResults) {
    return this._convertResultsToPromise(personasToReturn);
  } else {
    return personasToReturn;
  }
}

@autobind
private _convertResultsToPromise(results: IPersonaProps[]): Promise<IPersonaProps[]> {
  return new Promise<IPersonaProps[]>((resolve, reject) => setTimeout(() => resolve(results), 2000));
}

 //#endregion User control function and bindings

/**
 * Default React component render method
 */
public render(): React.ReactElement<IPeoplePickerProps> {
  const peoplepicker = <div id="people">{this.props.titleText}
                      <NormalPeoplePicker
                          pickerSuggestionsProps= {suggestionProps}
                          onResolveSuggestions={ this._onPersonFilterChanged }
                          onEmptyInputFocus={ this._returnMostRecentlyUsedPerson }
                          getTextFromItem={(peoplePersonaMenu: IPersonaProps) => peoplePersonaMenu.primaryText} 
                          className={ 'ms-PeoplePicker' }
                          key={ 'normal' }
                          onValidateInput={ this._validateInputPeople }
                          removeButtonAriaLabel={ 'Remove' }
                          inputProps={ {
                            'aria-label': 'People Picker',
                            onBlur: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onBlur on People Picker called'),
                            onFocus: (ev: React.FocusEvent<HTMLInputElement>) => console.log('onFocus on People Picker called'),
                          } }
                          itemLimit={this.props.personSelectionLimit}
                          onChange = { this._onPersonItemsChange }
                        />
                      </div>;
  return (
    <div>
    {this.props.showtooltip ?
    <TooltipHost content={this.props.tooltipMessage} id='pntp' calloutProps={ { gapSpace: 0 } } directionalHint={this.props.tooltipDirectional}>
      {peoplepicker}
    </TooltipHost> :
     <div> 
      {peoplepicker}
     </div>
    }
    {(this.props.isRequired && this.state.showmessageerror) ?
    <MessageBar
    messageBarType={ MessageBarType.error }
    isMultiline={ false }
    >
    {this.props.errorMessage}
    </MessageBar> : null
    }
    </div>
  );
  }
}



