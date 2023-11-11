import * as React from 'react';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { ITermProps, ITermState } from './ITaxonomyPicker';

import styles from './TaxonomyPicker.module.scss';
import TermActionsControl from './termActions/TermActionsControl';
import { UpdateAction, UpdateType } from './termActions';
import { IStyle } from '@fluentui/react';


/**
 * Term component
 * Renders a selectable term
 */
export default class Term extends React.Component<ITermProps, ITermState> {

  constructor(props: ITermProps) {
    super(props);

    // Check if current term is selected
    const active = this.props.activeNodes.filter(item => item.key === this.props.term.Id);

    this.state = {
      selected: active.length > 0,
      termLabel: this.props.term.Name,
      hidden: false,
      disabled: false
    };

    this._handleChange = this._handleChange.bind(this);
  }

  /**
   * Handle the checkbox change trigger
   */
  private _handleChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean): void {
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
  public UNSAFE_componentWillReceiveProps(nextProps: ITermProps, nextContext: any): void { // eslint-disable-line @typescript-eslint/no-explicit-any
    // If multi-selection is turned off, only a single term can be selected
    //if (!this.props.multiSelection) {
      const active = nextProps.activeNodes.filter(item => item.key === this.props.term.Id);
      this.setState ({
        selected: active.length > 0,
        termLabel: this.state.termLabel
      });
    //}
  }

  /**
   * Get the right class name for the term
   */
  private getClassName(): string {
    if (this.props.term.IsDeprecated) {
      return styles.termDisabled;
    }

    if (!this.props.term.IsAvailableForTagging) {
      return styles.termNoTagging;
    }

    return styles.termEnabled;
  }

  private termActionCallback = (updateAction: UpdateAction | null): void => {
    if (!updateAction) {
      return;
    }

    if (updateAction.updateActionType === UpdateType.updateTermLabel) {
      this.setState({
        termLabel: updateAction.value as string
      });
    } else if (updateAction.updateActionType === UpdateType.hideTerm) {
      this.setState({
        hidden: updateAction.value as boolean
      });
    } else if (updateAction.updateActionType === UpdateType.disableTerm) {
      this.setState({
        disabled: updateAction.value as boolean
      });
    } else if (updateAction.updateActionType === UpdateType.selectTerm) {
      // Only select the term when not disabled or hidden
      if (!this.state.disabled && !this.state.hidden) {
        this._handleChange(null, updateAction.value as boolean);
      }
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
    const checkBoxStyle: IStyle = {
      display: "inline-flex"
    };

    if (this.state.hidden) {
      return null;
    }

    return (
      <div>
        <div className={`${styles.listItem} ${styles.term}`} style={styleProps}>
          <div>
            <Checkbox
              checked={this.state.selected}
              styles={{
                checkbox: checkBoxStyle
              }}
              disabled={this.props.term.IsDeprecated || !this.props.term.IsAvailableForTagging || this.props.disabled || this.state.disabled}
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
