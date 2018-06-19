import * as React from 'react';
import { PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import TermPicker from './TermPicker';
import { IPickerTerms, IPickerTerm } from './ITermPicker';
import { ITaxonomyPickerProps, ITaxonomyPickerState } from './ITaxonomyPicker';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import { ITermSet, IGroup, ITerm } from './../../services/ISPTermStorePickerService';
import styles from './TaxonomyPicker.module.scss';
import { sortBy, uniqBy, cloneDeep, isEqual } from '@microsoft/sp-lodash-subset';
import TermParent from './TermParent';
import FieldErrorMessage from './ErrorMessage';
import * as appInsights from '../../common/appInsights';


/**
 * Image URLs / Base64
 */
export const COLLAPSED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII='; // /_layouts/15/images/MDNCollapsed.png
export const EXPANDED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII='; // /_layouts/15/images/MDNExpanded.png
export const GROUP_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC9SURBVDhPY2CgNXh1qEkdiJ8D8X90TNBuJM0V6IpBhoHFgIxebKYTIwYzAMNpxGhGdsFwNoBgNEFjAWsYgOSKiorMgPgbEP/Hgj8AxXpB0Yg1gQAldYuLix8/efLkzn8s4O7du9eAan7iM+DV/v37z546der/jx8/sJkBdhVOA5qbm08ePnwYrOjQoUOkGwDU+AFowLmjR4/idwGukAYaYAkMgxfPnj27h816kDg4DPABoAI/IP6DIxZA4l0AOd9H3QXl5+cAAAAASUVORK5CYII='; // /_layouts/15/Images/EMMGroup.png
export const TERMSET_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPrZLRCcAgDERdpZMIjuQA7uWH4CqdxMY0EQtNjKWB0A/77sxF55SKMTalk8a61lqCFqsLiwKac84ZRUUBi7MoYHVmAfjfjzE6vJqZQfie0AcwBQVW8ATi7AR7zGGGNSE6Q2cyLSPIjRswjO7qKhcPDN2hK46w05wZMcEUIG+HrzzcrRsQBIJ5hS8C9fGAPmRwu/9RFxW6L8CM4Ry8AAAAAElFTkSuQmCC'; // /_layouts/15/Images/EMMTermSet.png
export const TERM_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACzSURBVDhPY2AYNKCoqIgTiOcD8X8S8F6wB4Aa1IH4akNDw+mPHz++/E8EuHTp0jmQRSDNCcXFxa/XrVt3gAh9KEpgBvx/9OjRLVI1g9TDDYBp3rlz5//Kysr/IJoYgGEASPPatWsbQDQxAMOAbdu2gZ0FookBcAOePHlyhxgN6GqQY+Hdhg0bDpJqCNgAaDrQAnJuNDY2nvr06dMbYgw6e/bsabgBUEN4yEiJ2wdNViLfIQC3sTh2vtJcswAAAABJRU5ErkJggg==';

/**
 * Renders the controls for PropertyFieldTermPicker component
 */
export class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {
  private termsService: SPTermStorePickerService;
  private previousValues: IPickerTerms = [];
  private cancel: boolean = true;

  /**
   * Constructor method
   */
  constructor(props: ITaxonomyPickerProps) {
    super(props);

    appInsights.track('ReactTaxonomyPicker');

    this.state = {
      activeNodes: this.props.initialValues || [],
      termSetAndTerms: null,
      loaded: false,
      openPanel: false,
      errorMessage: ''
    };

    this.onOpenPanel = this.onOpenPanel.bind(this);
    this.onClosePanel = this.onClosePanel.bind(this);
    this.onSave = this.onSave.bind(this);
    this.termsChanged = this.termsChanged.bind(this);
    this.termsFromPickerChanged = this.termsFromPickerChanged.bind(this);
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.setState({
      activeNodes: this.props.initialValues || []
    });
  }

  /**
   * componentWillUpdate lifecycle hook
   */
  public componentDidUpdate(prevProps: ITaxonomyPickerProps): void {
    // Check if the initial values objects are not equal, if that is the case, data can be refreshed
    if (!isEqual(this.props.initialValues, prevProps.initialValues)) {
      this.setState({
        activeNodes: this.props.initialValues || []
      });
    }
  }

  /**
   * Loads the list from SharePoint current web site
   */
  private loadTermStores(): void {
    this.termsService = new SPTermStorePickerService(this.props, this.props.context);
    this.termsService.getAllTerms(this.props.termsetNameOrID).then((response: ITermSet) => {
      // Check if a response was retrieved
      if (response !== null) {
        this.setState({
          termSetAndTerms: response,
          loaded: true
        });
      } else {
        this.setState({
          termSetAndTerms: null,
          loaded: true
        });
      }
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
    // Trigger the onChange event
    this.props.onChange(this.state.activeNodes);
  }

  /**
   * Clicks on a node
   * @param node
   */
  private termsChanged(term: ITerm, checked: boolean): void {

    let activeNodes = this.state.activeNodes;
    if (typeof term === 'undefined' || term === null) {
      return;
    }

    // Term item to add to the active nodes array
    const termItem = {
      name: term.Name,
      key: term.Id,
      path: term.PathOfTerm,
      termSet: term.TermSet.Id
    };

    // Check if the term is checked or unchecked
    if (checked) {
      // Check if it is allowed to select multiple terms
      if (this.props.allowMultipleSelections) {
        // Add the checked term
        activeNodes.push(termItem);
        // Filter out the duplicate terms
        activeNodes = uniqBy(activeNodes, 'key');
      } else {
        // Only store the current selected item
        activeNodes = [termItem];
      }
    } else {
      // Remove the term from the list of active nodes
      activeNodes = activeNodes.filter(item => item.key !== term.Id);
    }
    // Sort all active nodes
    activeNodes = sortBy(activeNodes, 'path');
    // Update the current state
    this.setState({
      activeNodes: activeNodes
    });
  }

  /**
 * Fires When Items Changed in TermPicker
 * @param node
 */
  private termsFromPickerChanged(terms: IPickerTerms) {
    this.props.onChange(terms);
    this.setState({
      activeNodes: terms
    });
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
  private termSetSelectedChange = (termSet: ITermSet, isChecked: boolean) => {
    const ts: ITermSet = {...termSet};
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
      IsRoot: null
    };

    // Trigger the normal change event
    this.termsChanged(term, isChecked);
  }

  /**
   * Renders the SPListpicker controls with Office UI  Fabric
   */
  public render(): JSX.Element {

    return (
      <div>
        {this.props.label && <Label>{this.props.label}</Label>}
        <table className={styles.termFieldTable}>
          <tbody>
            <tr>
              <td>
                <TermPicker
                  context={this.props.context}
                  termPickerHostProps={this.props}
                  disabled={this.props.disabled}
                  value={this.state.activeNodes}
                  isTermSetSelectable={this.props.isTermSetSelectable}
                  onChanged={this.termsFromPickerChanged}
                  allowMultipleSelections={this.props.allowMultipleSelections}
                  disabledTermIds={this.props.disabledTermIds}
                  disableChildrenOfDisabledParents={this.props.disableChildrenOfDisabledParents} />
              </td>
              <td className={styles.termFieldRow}>
                <IconButton disabled={this.props.disabled} iconProps={{ iconName: 'Tag' }} onClick={this.onOpenPanel} />
              </td>
            </tr>
          </tbody>
        </table>

        <FieldErrorMessage errorMessage={this.state.errorMessage} />

        <Panel
          isOpen={this.state.openPanel}
          hasCloseButton={true}
          onDismiss={this.onClosePanel}
          isLightDismiss={true}
          type={PanelType.medium}
          headerText={this.props.panelTitle}
          onRenderFooterContent={() => {
            return (
              <div className={styles.actions}>
                <PrimaryButton iconProps={{ iconName: 'Save' }} text="Save" value="Save" onClick={this.onSave} />

                <DefaultButton iconProps={{ iconName: 'Cancel' }} text="Cancel" value="Cancel" onClick={this.onClosePanel} />
              </div>
            );
          }}>

          {
            /* Show spinner in the panel while retrieving terms */
            this.state.loaded === false ? <Spinner type={SpinnerType.normal} /> : ''
          }
          {
            this.state.loaded === true && this.state.termSetAndTerms && (
              <div key={this.state.termSetAndTerms.Id} >
                <h3>{this.state.termSetAndTerms.Name}</h3>
                <TermParent anchorId={this.props.anchorId}
                            autoExpand={null}
                            termset={this.state.termSetAndTerms}
                            isTermSetSelectable={this.props.isTermSetSelectable}
                            termSetSelectedChange={this.termSetSelectedChange}
                            activeNodes={this.state.activeNodes}
                            disabledTermIds={this.props.disabledTermIds}
                            disableChildrenOfDisabledParents={this.props.disableChildrenOfDisabledParents}
                            changedCallback={this.termsChanged}
                            multiSelection={this.props.allowMultipleSelections} />
              </div>
            )
          }
        </Panel>
      </div >
    );
  }
}
