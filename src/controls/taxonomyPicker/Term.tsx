import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITermProps, ITermState } from './ITaxonomyPicker';

import styles from './TaxonomyPicker.module.scss';
import TermActionsControl from './termActions/TermActionsControl';
import { UpdateAction, UpdateType } from './termActions';


/**
 * Term component
 * Renders a selectable term
 */
export default class Term extends React.Component<ITermProps, ITermState> {

  constructor(props: ITermProps) {
    super(props);

    // Check if current term is selected
    let active = this.props.activeNodes.filter(item => item.key === this.props.term.Id);

    this.state = {
      selected: active.length > 0,
      termLabel: this.props.term.Name
    };

    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Handle the checkbox change trigger
   */
  private _handleChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    this.setState({
      selected: isChecked
    });
    this.props.changedCallback(this.props.term, isChecked);
  }

  /**
   * Lifecycle event hook when component retrieves new properties
   * @param nextProps
   * @param nextContext
   */
  public componentWillReceiveProps?(nextProps: ITermProps, nextContext: any): void {
    // If multi-selection is turned off, only a single term can be selected
    if (!this.props.multiSelection) {
      let active = nextProps.activeNodes.filter(item => item.key === this.props.term.Id);
      this.state = {
        selected: active.length > 0,
        termLabel: this.state.termLabel
      };
    }
  }

  /**
   * Get the right class name for the term
   */
  private getClassName() {
    if (this.props.term.IsDeprecated) {
      return styles.termDisabled;
    }

    if (!this.props.term.IsAvailableForTagging) {
      return styles.termNoTagging;
    }

    return styles.termEnabled;
  }

  private termActionCallback = (updateAction: UpdateAction): void => {
    if (updateAction == null) {
      return;
    }

    if (updateAction.updateActionType === UpdateType.updateTermLabel) {
      this.setState({
        termLabel: updateAction.value
      });
    } else {
      this.props.updateTaxonomyTree();
    }
  }

  /**
   * Default React render
   */
  public render(): JSX.Element {
    const styleProps: React.CSSProperties = {
      marginLeft: `${(this.props.term.PathDepth * 30)}px`
    };
    const checkBoxStyle: React.CSSProperties = {
      display: "inline-flex"
    };

    return (
      <div>
        <div className={`${styles.listItem} ${styles.term}`} style={styleProps}>
          <div>
            <Checkbox
              checked={this.state.selected}
              style={checkBoxStyle}
              disabled={this.props.term.IsDeprecated || !this.props.term.IsAvailableForTagging || this.props.disabled}
              className={this.getClassName()}
              label={this.state.termLabel}
              onChange={this._handleChange} />
          </div>
          {
            this.props.termActions &&
            <TermActionsControl term={this.props.term}
                                termActions={this.props.termActions}
                                termActionCallback={this.termActionCallback}
                                spTermService={this.props.spTermService} />
          }
        </div>
      </div>

    );
  }
}
