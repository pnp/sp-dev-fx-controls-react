import * as strings from 'ControlStrings';
import * as React from 'react';
import * as telemetry from '../../common/telemetry';
import styles from './PeoplePickerComponent.module.scss';
import SPPeopleSearchService from "../../services/PeopleSearchService";
import { IPeoplePickerProps } from './IPeoplePicker';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Label } from '@fluentui/react/lib/Label';
import FieldErrorMessage from '../errorMessage/ErrorMessage';
import isEqual from 'lodash/isEqual';
import uniqBy from 'lodash/uniqBy';
import { IPersonaProps } from '@fluentui/react/lib/Persona';
import { IBasePickerSuggestionsProps, NormalPeoplePicker} from '@fluentui/react/lib/Pickers';

interface IPeoplePickerState {
  mostRecentlyUsedPersons?: IPersonaProps[];
  errorMessage?: string;
  internalErrorMessage?: string;
  resolveDelay?: number;

  selectedPersons?: IPersonaProps[];
  peoplePersonaMenu?: IPersonaProps[];
  delayResults?: boolean;
}

/**
 * PeoplePicker component
 */
export class PeoplePicker extends React.Component<IPeoplePickerProps, IPeoplePickerState> {
  private peopleSearchService: SPPeopleSearchService;
  private suggestionsLimit: number;
  private groupId: number | string | (string | number)[];
  private searchTextCount: number;

  constructor(props: IPeoplePickerProps) {
    super(props);

    this.peopleSearchService = new SPPeopleSearchService(props.context, props.useSubstrateSearch);
    this.suggestionsLimit = this.props.suggestionsLimit ? this.props.suggestionsLimit : 5;
    this.searchTextCount = this.props.searchTextLimit ? this.props.searchTextLimit : 2;

    telemetry.track('ReactPeoplePicker', {
      groupName: !!props.groupName,
      name: !!props.groupName,
      titleText: !!props.titleText
    });

    this.state = {
      selectedPersons: [],
      mostRecentlyUsedPersons: [],
      resolveDelay: this.props.resolveDelay || 200,
      errorMessage: props.errorMessage
    };
  }


  /**
   * componentWillMount lifecycle hook
   */
  public UNSAFE_componentWillMount(): void {
    this.getInitialPersons(this.props)
      .then(() => {
        // no-op;
      })
      .catch(() => {
        // no-op;
      });
  }


  /**
   * componentWillUpdate lifecycle hook
   */
  public UNSAFE_componentWillUpdate(nextProps: IPeoplePickerProps, nextState: IPeoplePickerState): void {
    if (!isEqual(this.props.defaultSelectedUsers, nextProps.defaultSelectedUsers) ||
      this.props.groupName !== nextProps.groupName ||
      this.props.webAbsoluteUrl !== nextProps.webAbsoluteUrl ||
      this.peopleSearchService.getSumOfPrincipalTypes(this.props.principalTypes) !== this.peopleSearchService.getSumOfPrincipalTypes(nextProps.principalTypes)) {
      this.getInitialPersons(nextProps)
        .then(() => {
          // no-op;
        })
        .catch(() => {
          // no-op;
        });
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IPeoplePickerProps): void {
    if (nextProps.errorMessage !== this.props.errorMessage) {
      this.setState({
        errorMessage: nextProps.errorMessage
      });
    }
  }

  /**
   * clears all users and groups
   */
  public clearSelectedPersons(): void {
    this.setState({
      selectedPersons: []
    });
  }

  /**
   * Get initial persons
   */
  private async getInitialPersons(props: IPeoplePickerProps): Promise<void> {
    const { groupName, groupId, webAbsoluteUrl, defaultSelectedUsers, ensureUser, allowUnvalidated, principalTypes } = props;
    // Check if a group property was provided, and get the group ID
    if (groupName) {
      this.groupId = await this.peopleSearchService.getGroupId(groupName, webAbsoluteUrl);
      if (!this.groupId) {
        this.setState({
          internalErrorMessage: strings.PeoplePickerGroupNotFound
        });
        return;
      }
    } else if (groupId) {
      this.groupId = groupId;
    } else {
      this.groupId = null;
    }

    // Check for default user values
    if (defaultSelectedUsers) {
      const selectedPersons: IPersonaProps[] = [];
      for (const userValue of props.defaultSelectedUsers) {
        let valueAndTitle: string[] = [];
        valueAndTitle.push(userValue);
        if (userValue && userValue.indexOf('/') > -1) {
          valueAndTitle = userValue.split('/');
        }

        const userResult = await this.peopleSearchService.searchPersonByEmailOrLogin(valueAndTitle[0], principalTypes, webAbsoluteUrl, this.groupId, ensureUser, allowUnvalidated);
        if (userResult) {
          selectedPersons.push(userResult);
        }
        else if (valueAndTitle.length === 2 && valueAndTitle[1]) { //user not found.. bind the title if exists
          const inactiveUser: IPersonaProps = { text: valueAndTitle[1] };
          selectedPersons.push(inactiveUser);
        }
      }

      this.setState({
        selectedPersons,
        internalErrorMessage: undefined
      });
    }
  }


  /**
   * A search field change occured
   */
  private onSearchFieldChanged = async (searchText: string, currentSelected: IPersonaProps[]): Promise<IPersonaProps[]> => {
    if (searchText.length > this.searchTextCount) {
      const results = await this.peopleSearchService.searchPeople(searchText, this.suggestionsLimit, this.props.principalTypes, this.props.webAbsoluteUrl, this.groupId, this.props.ensureUser, this.props.allowUnvalidated);
      // Remove duplicates
      const { selectedPersons, mostRecentlyUsedPersons } = this.state;
      let filteredPersons = this.removeDuplicates(results, selectedPersons);

      // If a resultFilter is provided apply the filter to the results
      if (this.props.resultFilter !== undefined && filteredPersons.length > 0) {
        filteredPersons = this.props.resultFilter(filteredPersons);
      }

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

    this.setState({
      selectedPersons: items
    });

    this.validate(items)
      .then(() => {
        // no-op;
      })
      .catch(() => {
        // no-op;
      });
  }

  /**
   * On blur UI event
   * @param ev
   */
  private onBlur = (ev): void => {
    if (this.props.validateOnFocusOut) {
      this.validate(this.state.selectedPersons)
        .then(() => {
          // no-op;
        })
        .catch(() => {
          // no-op;
        });
    }
  }


  /**
   * Returns the most recently used person
   *
   * @param currentPersonas
   */
  private returnMostRecentlyUsedPerson = (currentPersonas: IPersonaProps[]): IPersonaProps[] => {
    const { mostRecentlyUsedPersons } = this.state;
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

  private validate = async (items: IPersonaProps[]): Promise<void> => {

    if (this.props.errorMessage || !this.props.onGetErrorMessage) { // ignoring all onGetErrorMessage logic
      this.validated(items);
      return;
    }

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(items || []);

    if (!result) {
      this.validated(items);

      this.setState({
        errorMessage: undefined
      });
      return;
    }

    if (typeof result === 'string') {
      if (!result) {
        this.validated(items);

        this.setState({
          errorMessage: undefined
        });
      }
      else {
        this.setState({
          errorMessage: result
        });
      }
    }
    else {
      try {
        const resolvedResult = await result;

        if (!resolvedResult) {
          this.validated(items);

          this.setState({
            errorMessage: undefined
          });
        }
        else {
          this.setState({
            errorMessage: resolvedResult
          });
        }
      }
      catch {
        this.validated(items);
      }
    }
  }

  private validated = (value: IPersonaProps[]): void => {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
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
    return personas.some(item => item.text === persona.text && item.secondaryText === persona.secondaryText);
  }


  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IPeoplePickerProps> {

    const {
      peoplePickerCntrlclassName,
      peoplePickerWPclassName,
      required,
      titleText,
      suggestionsLimit,
      placeholder,
      personSelectionLimit,
      disabled,
      showtooltip,
      tooltipMessage,
      tooltipDirectional,
      errorMessageClassName
    } = this.props;

    const {
      selectedPersons,
      resolveDelay,
      errorMessage,
      internalErrorMessage
    } = this.state;

    const suggestionProps: IBasePickerSuggestionsProps = {
      suggestionsHeaderText: strings.peoplePickerSuggestionsHeaderText,
      noResultsFoundText: strings.genericNoResultsFoundText,
      loadingText: strings.peoplePickerLoadingText,
      resultsMaximumNumber: suggestionsLimit ? suggestionsLimit : 5,
      searchingText: strings.PeoplePickerSearchText
    };


    const peoplepicker = (
      <div id="people" className={`${styles.defaultClass} ${peoplePickerWPclassName ? peoplePickerWPclassName : ''}`}>
        {titleText && <Label required={required}>{titleText}</Label>}

        <NormalPeoplePicker pickerSuggestionsProps={suggestionProps}
          styles={this.props.styles ?? undefined}
          onResolveSuggestions={this.onSearchFieldChanged}
          onEmptyInputFocus={this.returnMostRecentlyUsedPerson}
          getTextFromItem={(peoplePersonaMenu: IPersonaProps) => peoplePersonaMenu.text}
          className={`ms-PeoplePicker ${peoplePickerCntrlclassName ? peoplePickerCntrlclassName : ''}`}
          key={'normal'}
          removeButtonAriaLabel={'Remove'}
          inputProps={{
            'aria-label': 'People Picker',
            placeholder: placeholder
          }}
          selectedItems={selectedPersons}
          itemLimit={personSelectionLimit || 1}
          disabled={disabled || !!internalErrorMessage}
          onChange={this.onChange}
          onBlur={this.onBlur}
          resolveDelay={resolveDelay} />
      </div>
    );

    return (
      <div>
        {
          showtooltip ? (
            <TooltipHost content={tooltipMessage || strings.peoplePickerComponentTooltipMessage}
              id='pntp'
              calloutProps={{ gapSpace: 0 }}
              directionalHint={tooltipDirectional || DirectionalHint.leftTopEdge}>
              {peoplepicker}
            </TooltipHost>
          ) : (
            <div>
              {peoplepicker}
            </div>
          )
        }
        <FieldErrorMessage errorMessage={errorMessage || internalErrorMessage} className={errorMessageClassName} />
      </div>
    );
  }
}
