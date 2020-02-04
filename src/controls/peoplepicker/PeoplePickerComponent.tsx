import * as strings from 'ControlStrings';
import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import styles from './PeoplePickerComponent.module.scss';
import SPPeopleSearchService from "../../services/PeopleSearchService";
import { IPeoplePickerProps, IPeoplePickerState } from './IPeoplePicker';
import { TooltipHost, DirectionalHint } from 'office-ui-fabric-react/lib/Tooltip';
import { NormalPeoplePicker } from 'office-ui-fabric-react/lib/components/pickers/PeoplePicker/PeoplePicker';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { IBasePickerSuggestionsProps } from "office-ui-fabric-react/lib/components/pickers/BasePicker.types";
import { IPersonaProps } from "office-ui-fabric-react/lib/components/Persona/Persona.types";
import { Icon } from "office-ui-fabric-react/lib/components/Icon";
import { isEqual, uniqBy } from "@microsoft/sp-lodash-subset";

/**
 * PeoplePicker component
 */
export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
  private peopleSearchService: SPPeopleSearchService;
  private suggestionsLimit: number;
  private groupId: number;

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
      showRequiredError: false,
      resolveDelay: this.props.resolveDelay || 200,
      errorMessage: null
    };
  }


  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.getInitialPersons(this.props);
  }


  /**
   * componentWillUpdate lifecycle hook
   */
  public componentWillUpdate(nextProps: IPeoplePickerProps, nextState: IPeoplePickerState): void {
    if (!isEqual(this.props.defaultSelectedUsers, nextProps.defaultSelectedUsers) ||
        this.props.groupName !== nextProps.groupName ||
        this.props.webAbsoluteUrl !== nextProps.webAbsoluteUrl ||
        this.peopleSearchService.getSumOfPrincipalTypes(this.props.principalTypes) !== this.peopleSearchService.getSumOfPrincipalTypes(nextProps.principalTypes)) {
      this.getInitialPersons(nextProps);
    }
  }


  /**
   * Get initial persons
   */
  private async getInitialPersons(props: IPeoplePickerProps) {
    const { groupName, webAbsoluteUrl, defaultSelectedUsers, ensureUser, principalTypes } = props;
    // Check if a group property was provided, and get the group ID
    if (groupName) {
      this.groupId = await this.peopleSearchService.getGroupId(groupName, webAbsoluteUrl);
      if (!this.groupId) {
        this.setState({
          errorMessage: strings.PeoplePickerGroupNotFound
        });
        return;
      }
    } else {
      this.groupId = null;
    }

    // Check for default user values
    if (defaultSelectedUsers) {
      let selectedPersons: IPersonaProps[] = [];
      for (const userValue of props.defaultSelectedUsers) {
        const userResult = await this.peopleSearchService.searchPersonByEmailOrLogin(userValue, principalTypes, webAbsoluteUrl, this.groupId, ensureUser);
        if (userResult) {
          selectedPersons.push(userResult);
        }
      }

      this.setState({
        selectedPersons
      });
    }
  }


  /**
   * A search field change occured
   */
  private onSearchFieldChanged = async (searchText: string, currentSelected: IPersonaProps[]): Promise<IPersonaProps[]> =>  {
    if (searchText.length > 2) {
      const results = await this.peopleSearchService.searchPeople(searchText, this.suggestionsLimit, this.props.principalTypes, this.props.webAbsoluteUrl, this.groupId, this.props.ensureUser);
      // Remove duplicates
      const { selectedPersons, mostRecentlyUsedPersons } = this.state;
      const filteredPersons = this.removeDuplicates(results, selectedPersons);
      // Add the users to the most recently used ones
      let recentlyUsed = [...filteredPersons, ...mostRecentlyUsedPersons];
      recentlyUsed = uniqBy(recentlyUsed, "text");
      this.setState({
        mostRecentlyUsedPersons: recentlyUsed.slice(0, this.suggestionsLimit)
      });
      return filteredPersons;
    } else {
      return [];
    }
  }

  /**
   * On item selection change event
   */
  private onChange = (items: IPersonaProps[]): void => {
    const { selectedItems: triggerUpdate } = this.props;

    this.setState({
      selectedPersons: items,
      showRequiredError: items.length > 0 ? false : true
    });

    if (triggerUpdate) {
      triggerUpdate(items);
    }
  }


  /**
   * Returns the most recently used person
   *
   * @param currentPersonas
   */
  private returnMostRecentlyUsedPerson = (currentPersonas: IPersonaProps[]): IPersonaProps[] => {
    let { mostRecentlyUsedPersons } = this.state;
    return this.removeDuplicates(mostRecentlyUsedPersons, currentPersonas);
  }


  /**
   * Removes duplicates
   *
   * @param personas
   * @param possibleDupes
   */
  private removeDuplicates = (personas: IPersonaProps[], possibleDupes: IPersonaProps[]): IPersonaProps[] => {
    return personas.filter(persona => !this.listContainsPersona(persona, possibleDupes));
  }


  /**
   * Checks if list contains the person
   *
   * @param persona
   * @param personas
   */
  private listContainsPersona = (persona: IPersonaProps, personas: IPersonaProps[]): boolean => {
    if (!personas || !personas.length || personas.length === 0) {
      return false;
    }
    return personas.filter(item => item.text === persona.text).length > 0;
  }


  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPeoplePickerProps> {
    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: strings.peoplePickerSuggestionsHeaderText,
      noResultsFoundText: strings.genericNoResultsFoundText,
      loadingText: strings.peoplePickerLoadingText,
      resultsMaximumNumber: this.props.suggestionsLimit ? this.props.suggestionsLimit : 5,
      searchingText: strings.PeoplePickerSearchText
    };


    const peoplepicker = (
      <div id="people" className={`${styles.defaultClass} ${this.props.peoplePickerWPclassName ? this.props.peoplePickerWPclassName : ''}`}>
        {this.props.titleText && <Label required={this.props.isRequired}>{this.props.titleText}</Label>}

        <NormalPeoplePicker pickerSuggestionsProps={suggestionProps}
                            onResolveSuggestions={this.onSearchFieldChanged}
                            onEmptyInputFocus={this.returnMostRecentlyUsedPerson}
                            getTextFromItem={(peoplePersonaMenu: IPersonaProps) => peoplePersonaMenu.text}
                            className={`ms-PeoplePicker ${this.props.peoplePickerCntrlclassName ? this.props.peoplePickerCntrlclassName : ''}`}
                            key={'normal'}
                            removeButtonAriaLabel={'Remove'}
                            inputProps={{
                              'aria-label': 'People Picker'
                            }}
                            selectedItems={this.state.selectedPersons}
                            itemLimit={this.props.personSelectionLimit || 1}
                            disabled={this.props.disabled || !!this.state.errorMessage}
                            onChange={this.onChange}
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
          ((this.props.isRequired && this.state.showRequiredError) || (this.state.errorMessage)) && (
            <p className={`ms-TextField-errorMessage ${styles.errorMessage} ${this.props.errorMessageClassName ? this.props.errorMessageClassName : ''}`}>
              <Icon iconName='Error' className={styles.errorIcon} />
              {
                this.state.errorMessage && <span data-automation-id="error-message">{this.state.errorMessage}</span>
              }

              {
                (this.props.isRequired && this.state.showRequiredError) && <span data-automation-id="error-message">{this.props.errorMessage ? this.props.errorMessage : strings.peoplePickerComponentErrorMessage}</span>
              }
            </p>
          )
        }
      </div>
    );
  }
}



