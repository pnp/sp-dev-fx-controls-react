import * as React from 'react';
import { Spinner, SpinnerType } from 'office-ui-fabric-react/lib/Spinner';
import { ITermParentProps, ITermParentState } from './ITaxonomyPicker';
import { ITerm, ITermSet } from '../../services/ISPTermStorePickerService';
import { EXPANDED_IMG, COLLAPSED_IMG, TERMSET_IMG, TERM_IMG } from './TaxonomyPicker';
import Term from './Term';

import styles from './TaxonomyPicker.module.scss';

/**
 * Term Parent component, represents termset or term if anchorId
 */
export default class TermParent extends React.Component<ITermParentProps, ITermParentState> {

  private _terms : ITerm[];
  private _anchorName : string;

  constructor(props: ITermParentProps) {
    super(props);
    this._terms = this.props.termset.Terms;
    this.state = {
      loaded: true,
      expanded: true
    };
    this._handleClick = this._handleClick.bind(this);
  }

  

  /**
   * Handle the click event: collapse or expand
   */
  private _handleClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  
 /**
   * componentWillMount
   */
  public componentWillMount()
  {
    // fix term depth if anchroid for rendering
    if (this.props.anchorId)
    {
      const anchorTerm = this._terms.filter(t => t.Id.toLowerCase() === this.props.anchorId.toLowerCase()).shift();
      if (anchorTerm)
      {
        const anchorDepth = anchorTerm.PathDepth;
        this._anchorName = anchorTerm.Name;
        var anchorTerms : ITerm[] = this._terms.filter(t => t.PathOfTerm.substring(0, anchorTerm.PathOfTerm.length) === anchorTerm.PathOfTerm && t.Id !== anchorTerm.Id);
        
        anchorTerms = anchorTerms.map(term => {
          term.PathDepth = term.PathDepth - anchorTerm.PathDepth;
          
          return term;
        });

        this._terms = anchorTerms;
      }
    }
  }


  public render(): JSX.Element {
    // Specify the inline styling to show or hide the termsets
    const styleProps: React.CSSProperties = {
      display: this.state.expanded ? 'block' : 'none'
    };

    let termElm: JSX.Element = <div />;
    // Check if the terms have been loaded
 
      if (this.state.loaded) {
        if (this._terms.length > 0) {
          termElm = (
            <div style={styleProps}>
              {
                this._terms.map(term => {
                  return <Term key={term.Id} term={term} termset={this.props.termset.Id} activeNodes={this.props.activeNodes} changedCallback={this.props.changedCallback} multiSelection={this.props.multiSelection} />;
                })
              }
            </div>
          );
        } else {
          termElm = <div className={`${styles.listItem} ${styles.term}`}>Term set does not contain any terms</div>;
        }
      } else {
        termElm = <Spinner type={SpinnerType.normal} />;
      }
    

    return (
      <div>
        <div className={`${styles.listItem} ${styles.termset}`} onClick={this._handleClick}>
          <img src={this.state.expanded ? EXPANDED_IMG : COLLAPSED_IMG} alt='Expand This Term Set' title='Expand This Term Set' />
          <img src={this.props.anchorId ? TERM_IMG : TERMSET_IMG} title='Menu for Term Set' alt='Menu for Term Set' /> {this.props.anchorId ? this._anchorName : this.props.termset.Name}
        </div>
        <div style={styleProps}>
          {termElm}
        </div>
      </div>
    );
  }
}
