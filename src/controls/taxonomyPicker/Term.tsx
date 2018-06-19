import * as React from 'react';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { ITermProps, ITermState } from './ITaxonomyPicker';

import styles from './TaxonomyPicker.module.scss';


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
      selected: active.length > 0
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
        selected: active.length > 0
      };
    }
  }

  /**
   * Default React render
   */
  public render(): JSX.Element {
    const styleProps: React.CSSProperties = {
      marginLeft: `${(this.props.term.PathDepth * 30)}px`
    };

    return (
      <div className={`${styles.listItem} ${styles.term}`} style={styleProps}>
        <Checkbox
          checked={this.state.selected}
          disabled={this.props.term.IsDeprecated || this.props.disabled}
          className={this.props.term.IsDeprecated ? styles.termDisabled : styles.termEnabled}
          label={this.props.term.Name}
          onChange={this._handleChange} />
      </div>
    );
  }
}
