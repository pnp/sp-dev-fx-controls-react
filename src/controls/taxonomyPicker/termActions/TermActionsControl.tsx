import * as React from 'react';
import { ITermAction, ITermActionsControlProps, ITermActionsControlState, TermActionsDisplayMode, TermActionsDisplayStyle } from './ITermsActions';
import { DropdownTermAction } from './DropdownTermAction';
import ButtonTermAction from './ButtonTermAction';

export default class TermActionsControl extends React.Component<ITermActionsControlProps, ITermActionsControlState> {
  constructor(props: ITermActionsControlProps) {
    super(props);

    const { term, termActions } = this.props;

    const displayMode = termActions.termActionsDisplayMode ? termActions.termActionsDisplayMode : TermActionsDisplayMode.buttons;
    const displayStyle = termActions.termActionsDisplayStyle ? termActions.termActionsDisplayStyle : TermActionsDisplayStyle.icon;
    // Prepate list of the available actions
    const availableActions: ITermAction[] = termActions.actions.filter(termAction => { return termAction.applyToTerm(term); });

    this.state = {
      availableActions,
      displayMode,
      displayStyle
    };
  }

  public render(): React.ReactElement<ITermActionsControlProps> {
    const { term } = this.props;
    const { displayStyle, displayMode, availableActions } = this.state;

    if (!availableActions || availableActions.length <= 0 || !term) {
      return null;
    }

    return (
      <div>
        {
          displayMode == TermActionsDisplayMode.dropdown ?
            <DropdownTermAction termActions={availableActions} term={term} displayStyle={displayStyle} termActionCallback={this.props.termActionCallback} />
            :
            <ButtonTermAction termActions={availableActions} term={term} displayStyle={displayStyle} termActionCallback={this.props.termActionCallback}/>
        }
      </div>
    );
  }


}
