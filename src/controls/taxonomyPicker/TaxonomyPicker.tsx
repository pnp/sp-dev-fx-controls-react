import * as React from 'react';
import { PrimaryButton, DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Autofill } from '@fluentui/react/lib/components/Autofill/Autofill';
import { Label } from '@fluentui/react/lib/Label';
import TermPicker from './TermPicker';
import { IPickerTerms, IPickerTerm } from './ITermPicker';
import { ITaxonomyPickerProps, ITaxonomyPickerState } from './ITaxonomyPicker';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import { ITermSet, ITerm } from './../../services/ISPTermStorePickerService';
import * as strings from 'ControlStrings';
import styles from './TaxonomyPicker.module.scss';
import { sortBy, cloneDeep, isEqual } from '@microsoft/sp-lodash-subset';
import uniqBy from 'lodash/uniqBy';
import TermParent from './TermParent';
import FieldErrorMessage from '../errorMessage/ErrorMessage';
import { initializeIcons } from '@uifabric/icons';
import * as telemetry from '../../common/telemetry';
import { EmptyGuid } from '../../common/Constants';

/**
 * Image URLs / Base64
 */
export const COLLAPSED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII='; // /_layouts/15/images/MDNCollapsed.png
export const EXPANDED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII='; // /_layouts/15/images/MDNExpanded.png
export const GROUP_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC9SURBVDhPY2CgNXh1qEkdiJ8D8X90TNBuJM0V6IpBhoHFgIxebKYTIwYzAMNpxGhGdsFwNoBgNEFjAWsYgOSKiorMgPgbEP/Hgj8AxXpB0Yg1gQAldYuLix8/efLkzn8s4O7du9eAan7iM+DV/v37z546der/jx8/sJkBdhVOA5qbm08ePnwYrOjQoUOkGwDU+AFowLmjR4/idwGukAYaYAkMgxfPnj27h816kDg4DPABoAI/IP6DIxZA4l0AOd9H3QXl5+cAAAAASUVORK5CYII='; // /_layouts/15/Images/EMMGroup.png
export const TERMSET_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPrZLRCcAgDERdpZMIjuQA7uWH4CqdxMY0EQtNjKWB0A/77sxF55SKMTalk8a61lqCFqsLiwKac84ZRUUBi7MoYHVmAfjfjzE6vJqZQfie0AcwBQVW8ATi7AR7zGGGNSE6Q2cyLSPIjRswjO7qKhcPDN2hK46w05wZMcEUIG+HrzzcrRsQBIJ5hS8C9fGAPmRwu/9RFxW6L8CM4Ry8AAAAAElFTkSuQmCC'; // /_layouts/15/Images/EMMTermSet.png
export const TERM_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACzSURBVDhPY2AYNKCoqIgTiOcD8X8S8F6wB4Aa1IH4akNDw+mPHz++/E8EuHTp0jmQRSDNCcXFxa/XrVt3gAh9KEpgBvx/9OjRLVI1g9TDDYBp3rlz5//Kysr/IJoYgGEASPPatWsbQDQxAMOAbdu2gZ0FookBcAOePHlyhxgN6GqQY+Hdhg0bDpJqCNgAaDrQAnJuNDY2nvr06dMbYgw6e/bsabgBUEN4yEiJ2wdNViLfIQC3sTh2vtJcswAAAABJRU5ErkJggg==';

initializeIcons();

/**
 * Renders the controls for PropertyFieldTermPicker component
 */
export class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {
  private termsService: SPTermStorePickerService;
  private previousValues: IPickerTerms = [];
  private invalidTerm: string = null;
  private cancel: boolean = true;

  /**
   * Constructor method
   */
  constructor(props: ITaxonomyPickerProps) {
    super(props);

    telemetry.track('ReactTaxonomyPicker');

    this.state = {
      activeNodes: this.props.initialValues || [],
      termSetAndTerms: null,
      loaded: false,
      openPanel: false,
      errorMessage: props.errorMessage
    };

    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClosePanel = this.onClosePanel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.termsChanged = this.termsChanged.bind(this);
    this.termsFromPickerChanged = this.termsFromPickerChanged.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onBlur = this.onBlur.bind(this);

    this.termsService = new SPTermStorePickerService(this.props, this.props.context);
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this.validateTerms()
      .then(() => {
        // no-op;
      })
      .catch(() => {
        // no-op;
      });
  }

  /**
   * componentWillMount lifecycle hook
   */
  public UNSAFE_componentWillMount(): void {
    this.setState({
      activeNodes: this.props.initialValues || []
    });
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ITaxonomyPickerProps): void {
    let newState: ITaxonomyPickerState | undefined;
    // Check if the initial values objects are not equal, if that is the case, data can be refreshed
    if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
      newState = {
        activeNodes: nextProps.initialValues || []
      };
    }

    if (nextProps.errorMessage !== this.props.errorMessage) {
      if (!newState) {
        newState = {};
      }

      newState.errorMessage = nextProps.errorMessage;
    }

    if (newState) {
      this.setState(newState);
    }
  }

  /**
  * it checks, if all entries still exist in term store. if allowMultipleSelections is true. it have to validate all values
  */
  private async validateTerms(): Promise<void> {
    const {
      hideDeprecatedTags,
      hideTagsNotAvailableForTagging,
      initialValues,
      validateOnLoad,
      termsetNameOrID,
      useSessionStorage
    } = this.props;

    const isValidateOnLoad = validateOnLoad && initialValues && initialValues.length >= 1;
    if (isValidateOnLoad) {

      const notFoundTerms: string[] = [];
      const notFoundTermIds: string[] = [];

      const termSet = await this.termsService.getAllTerms(termsetNameOrID, hideDeprecatedTags, hideTagsNotAvailableForTagging, useSessionStorage);
      const allTerms = termSet.Terms;

      for (let i = 0, len = initialValues.length; i < len; i++) {
        const pickerTerm = initialValues[i];

        if (!allTerms.filter(t => t.Id === pickerTerm.key).length) {
          notFoundTerms.push(pickerTerm.name);
          notFoundTermIds.push(pickerTerm.key);
        }
      }

      if (notFoundTerms.length) {
        this.setState({
          internalErrorMessage: strings.TaxonomyPickerTermsNotFound.replace('{0}', notFoundTerms.join(', ')),
          invalidNodeIds: notFoundTermIds
        });
      }
    }
  }

  /**
   * Loads the list from SharePoint current web site
   */
  private loadTermStores(): void {
    if (this.props.termActions && this.props.termActions.initialize) {
      this.props.termActions.initialize(this.termsService)
        .then(() => {
          // no-op;
        })
        .catch(() => {
          // no-op;
        });
    }

    this.termsService.getAllTerms(this.props.termsetNameOrID, this.props.hideDeprecatedTags, this.props.hideTagsNotAvailableForTagging, this.props.useSessionStorage)
      .then((response: ITermSet) => {
        // Check if a response was retrieved
        const termSetAndTerms = response ? response : null;
        this.setState({
          termSetAndTerms,
          loaded: true
        });
      })
      .catch(() => {
        // no-op;
      });
  }

  /**
   * Force update of the taxonomy tree - required by term action in case the term has been added, deleted or moved.
   */
  private async updateTaxonomyTree(): Promise<void> {
    const termSetAndTerms = await this.termsService.getAllTerms(this.props.termsetNameOrID, this.props.hideDeprecatedTags, this.props.hideTagsNotAvailableForTagging, this.props.useSessionStorage);

    this.setState({
      termSetAndTerms
    });
  }

  /**
   * Open the right Panel
   */
  private onOpenPanel(): void {
    if (this.props.disabled === true) {
      return;
    }

    // Store the current code value
    this.previousValues = cloneDeep(this.state.activeNodes);
    this.cancel = true;

    this.loadTermStores();

    this.setState({
      openPanel: true,
      loaded: false
    });
  }

  /**
   * Close the panel
   */
  private onClosePanel(): void {

    this.setState(() => {
      const newState: ITaxonomyPickerState = {
        openPanel: false,
        loaded: false
      };

      // Check if the property has to be reset
      if (this.cancel) {
        newState.activeNodes = this.previousValues;
      }

      return newState;
    });
  }

  /**
   * On save click action
   */
  private onSave(): void {
    this.cancel = false;
    this.onClosePanel();

    this.validate(this.state.activeNodes)
      .then(() => {
        // no-op;
      })
      .catch(() => {
        // no-op;
      });
  }

  /**
   * Clicks on a node
   * @param node
   */
  private termsChanged(term: ITerm, checked: boolean): void {

    let activeNodes = this.state.activeNodes.slice();
    if (typeof term === 'undefined' || term === null) {
      return;
    }

    const {
      allowMultipleSelections,
      selectChildrenIfParentSelected
    } = this.props;

    const {
      termSetAndTerms
    } = this.state;

    // Term item to add to the active nodes array
    const termItem = {
      name: term.Name,
      key: term.Id,
      path: term.PathOfTerm,
      termSet: term.TermSet.Id
    };

    //
    // checking if we need to process child terms
    //
    let children: ITerm[] = [];
    if (allowMultipleSelections && selectChildrenIfParentSelected) {
      if (term.Id === term.TermSet.Id) { // term set selected
        children = termSetAndTerms.Terms || [];
      }
      else {
        children = termSetAndTerms.Terms ? termSetAndTerms.Terms.filter(t => {
          return t.PathOfTerm.indexOf(`${term.PathOfTerm};`) !== -1;
        }) : [];
      }
    }

    // Check if the term is checked or unchecked
    if (checked) {
      // Check if it is allowed to select multiple terms
      if (allowMultipleSelections) {
        // Add the checked term
        activeNodes.push(termItem);

      } else {
        // Only store the current selected item
        activeNodes = [termItem];
      }

      if (children.length) {
        activeNodes.push(...children.map(c => {
          return {
            name: c.Name,
            key: c.Id,
            path: c.PathOfTerm,
            termSet: c.TermSet.Id
          };
        }));
      }

      // Filter out the duplicate terms
      activeNodes = uniqBy(activeNodes, 'key');

    } else {
      // Remove the term from the list of active nodes
      activeNodes = activeNodes.filter(item => item.key !== term.Id);

      if (children.length) {
        const childIds = children.map(c => c.Id);
        activeNodes = activeNodes.filter(item => childIds.indexOf(item.key) === -1);
      }
    }
    // Sort all active nodes
    activeNodes = sortBy(activeNodes, 'path');

    if (this.props.onPanelSelectionChange) {
      this.props.onPanelSelectionChange(this.state.activeNodes.slice(), activeNodes);
    }

    // Update the current state
    this.setState({
      activeNodes: activeNodes
    });

  }

  /**
 * Fires When Items Changed in TermPicker
 * @param node
 */
  private termsFromPickerChanged(terms: IPickerTerms): void {
    this.setState({
      activeNodes: terms
    });

    this.validate(terms)
      .then(() => {
        // no-op;
      })
      .catch(() => {
        // no-op;
      });
  }

  /**
   * Shows an error message for any invalid input inside taxonomy picker control
   */
  private validateInputText(): void {
    // Show error message, if any unresolved value exists inside taxonomy picker control
    if (!!this.invalidTerm) {
      // An unresolved value exists
      this.setState({
        errorMessage: strings.TaxonomyPickerInvalidTerms.replace('{0}', this.invalidTerm)
      });
    }
    else {
      // There are no unresolved values
      this.setState({
        errorMessage: null
      });
    }
  }

  /**
   * Triggers when input of taxonomy picker control changes
   */
  private onInputChange(input: string): string {
    if (!input) {
      const { validateInput } = this.props;
      if (!!validateInput) {
        // Perform validation of input text, only if taxonomy picker is configured with validateInput={true} property.
        this.invalidTerm = null;
        this.validateInputText();
      }
    }
    return input;
  }

  private async validateOnGetErrorMessage(targetValue: string): Promise<boolean> {
    const errorMessage = await this.props.onGetErrorMessage(
      [
        {
          key: EmptyGuid,
          name: targetValue,
          path: targetValue,
          termSet: this.termsService.cleanGuid(this.props.termsetNameOrID)
        }
      ]
    );

    if (!!errorMessage) {
      this.setState({
        errorMessage: errorMessage
      });
    }
    else {
      this.setState({
        errorMessage: null
      });
    }
    return !errorMessage;
  }

  private onNewTerm = (newLabel: string): void => {
    this.props.onNewTerm(
      {
        key: EmptyGuid,
        name: newLabel,
        path: newLabel,
        termSet: this.termsService.cleanGuid(this.props.termsetNameOrID)
      }
    );
  }

  /**
   * Triggers when taxonomy picker control loses focus
   */
  private async onBlur(event: React.FocusEvent<HTMLElement | Autofill>): Promise<void> {
    const { validateInput } = this.props;
    if (!!validateInput) {
      // Perform validation of input text, only if taxonomy picker is configured with validateInput={true} property.
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const targetValue = !!target ? target.value : null;

      if (!!this.props.onGetErrorMessage && !!targetValue) {
        await this.validateOnGetErrorMessage(targetValue);
      } else {
        if (!!targetValue) {
          this.invalidTerm = targetValue;
        }
        else {
          this.invalidTerm = null;
        }
        this.validateInputText();
      }
    }
  }

  /**
   * Gets the given node position in the active nodes collection
   * @param node
   */
  private getSelectedNodePosition(node: IPickerTerm): number {
    for (let i = 0; i < this.state.activeNodes.length; i++) {
      if (node.key === this.state.activeNodes[i].key) {
        return i;
      }
    }
    return -1;
  }

  /**
   * TermSet selection handler
   * @param termSet
   * @param isChecked
   */
  private termSetSelectedChange = (termSet: ITermSet, isChecked: boolean): void => {
    const ts: ITermSet = { ...termSet };
    // Clean /Guid.../ from the ID
    ts.Id = this.termsService.cleanGuid(ts.Id);
    // Create a term for the termset
    const term: ITerm = {
      Name: ts.Name,
      Id: ts.Id,
      TermSet: ts,
      PathOfTerm: "",
      _ObjectType_: ts._ObjectType_,
      _ObjectIdentity_: ts._ObjectIdentity_,
      Description: ts.Description,
      IsDeprecated: null,
      IsAvailableForTagging: null,
      IsRoot: null
    };

    // Trigger the normal change event
    this.termsChanged(term, isChecked);
  }

  private validate = async (value: IPickerTerms): Promise<void> => {
    //
    // checking if there are any invalid nodes left after initial validation
    //
    if (this.state.invalidNodeIds) {
      const changedInvalidNodeIds = this.state.invalidNodeIds.filter(id => {
        return !!value.filter(term => term.key === id).length;
      });

      const internalErrorMessage = changedInvalidNodeIds.length ? this.state.internalErrorMessage : '';

      this.setState({
        invalidNodeIds: changedInvalidNodeIds,
        internalErrorMessage: internalErrorMessage
      });
    }

    if (this.props.errorMessage || !this.props.onGetErrorMessage) { // ignoring all onGetErrorMessage logic
      this.validated(value);
      return;
    }

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(value || []);

    if (!result) {
      this.validated(value);
      return;
    }

    if (typeof result === 'string') {
      if (!result) {
        this.validated(value);

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
          this.validated(value);

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
      catch (err) {
        this.validated(value);
      }
    }
  }

  private validated = (value: IPickerTerms): void => {
    this.props.onChange(value);
  }

  /**
   * Renders the SPListpicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {
    const {
      label,
      context,
      disabled,
      isTermSetSelectable,
      allowMultipleSelections,
      disabledTermIds,
      disableChildrenOfDisabledParents,
      placeholder,
      panelTitle,
      anchorId,
      termActions,
      required
    } = this.props;

    const {
      activeNodes,
      errorMessage,
      internalErrorMessage,
      openPanel,
      loaded,
      termSetAndTerms
    } = this.state;

    return (
      <div>
        {label && <Label required={required}>{label}</Label>}
        <div className={styles.termField}>
          <div className={styles.termFieldInput}>
            <TermPicker
              context={context}
              termPickerHostProps={this.props}
              disabled={disabled}
              value={activeNodes}
              isTermSetSelectable={isTermSetSelectable}
              onChanged={this.termsFromPickerChanged}
              onInputChange={this.onInputChange}
              onBlur={this.onBlur}
              onNewTerm={this.props.onNewTerm ? this.onNewTerm : undefined}
              allowMultipleSelections={allowMultipleSelections}
              disabledTermIds={disabledTermIds}
              disableChildrenOfDisabledParents={disableChildrenOfDisabledParents}
              placeholder={placeholder} />
          </div>
          <div className={styles.termFieldButton}>
            <IconButton disabled={disabled} iconProps={{ iconName: 'Tag' }} onClick={this.onOpenPanel} />
          </div>
        </div>

        <FieldErrorMessage errorMessage={errorMessage || internalErrorMessage} />

        <Panel
          isOpen={openPanel}
          hasCloseButton={true}
          onDismiss={this.onClosePanel}
          isLightDismiss={true}
          type={PanelType.medium}
          headerText={panelTitle}
          onRenderFooterContent={() => {
            return (
              <div className={styles.actions}>
                <PrimaryButton iconProps={{ iconName: 'Save' }} text={strings.SaveButtonLabel} value="Save" onClick={this.onSave} />
                <DefaultButton iconProps={{ iconName: 'Cancel' }} text={strings.CancelButtonLabel} value="Cancel" onClick={this.onClosePanel} />
              </div>
            );
          }}>

          {
            /* Show spinner in the panel while retrieving terms */
            loaded === false ? <Spinner size={SpinnerSize.medium} /> : ''
          }
          {
            loaded === true && termSetAndTerms && (
              <div key={termSetAndTerms.Id} >
                <h3>{termSetAndTerms.Name}</h3>
                <TermParent anchorId={anchorId}
                  autoExpand={null}
                  termset={termSetAndTerms}
                  isTermSetSelectable={isTermSetSelectable}
                  termSetSelectedChange={this.termSetSelectedChange}
                  activeNodes={activeNodes}
                  disabledTermIds={disabledTermIds}
                  disableChildrenOfDisabledParents={disableChildrenOfDisabledParents}
                  changedCallback={this.termsChanged}
                  multiSelection={allowMultipleSelections}
                  spTermService={this.termsService}

                  updateTaxonomyTree={this.updateTaxonomyTree}
                  termActions={termActions}
                />
              </div>
            )
          }
        </Panel>
      </div >
    );
  }
}
