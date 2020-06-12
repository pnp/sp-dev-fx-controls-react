import * as React from 'react';
import { ITermAction, ITermActionsControlProps, ITermActionsControlState, TermActionsDisplayMode, TermActionsDisplayStyle } from './ITermsActions';
import { DropdownTermAction } from './DropdownTermAction';
import ButtonTermAction from './ButtonTermAction';
import { find } from 'office-ui-fabric-react/lib/Utilities';

export default class TermActionsControl extends React.Component<ITermActionsControlProps, ITermActionsControlState> {

  constructor(props: ITermActionsControlProps) {
    super(props);

    const { termActions } = this.props;

    const displayMode = termActions.termActionsDisplayMode ? termActions.termActionsDisplayMode : TermActionsDisplayMode.buttons;
    const displayStyle = termActions.termActionsDisplayStyle ? termActions.termActionsDisplayStyle : TermActionsDisplayStyle.text;

    this.state = {
      availableActions: [],
      displayMode,
      displayStyle
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.getAvailableActions();
  }

  /**
   * Get the available term actions
   */
  private async getAvailableActions(): Promise<void> {
    const { term, termActions } = this.props;

    // Prepare list of the available actions
    const availableActions: ITermAction[] = [];

    if (termActions.actions) {
      for (const action of termActions.actions) {
        const available = await action.applyToTerm(term, this.props.termActionCallback, this.setActionVisibility);
        if (available) {
          availableActions.push(action);
        }
      }
    }

    this.setState({
      availableActions
    });
  }

  /**
   * Sets the visibility of a certain action
   * @param isHidden
   */
  private setActionVisibility(actionId: string, isHidden: boolean) {
    this.setState((prevState: ITermActionsControlState) => {
      const action = find(prevState.availableActions, a => a.id === actionId);
      action.hidden = isHidden;
      return {
        availableActions: prevState.availableActions
      };
    });
  }

  /**
   * Default React render method
   */
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
            <DropdownTermAction key={`DdAction-${term.Id}`} termActions={availableActions} term={term} displayStyle={displayStyle} termActionCallback={this.props.termActionCallback} spTermService={this.props.spTermService} />
            :
            <ButtonTermAction key={`BtnAction-${term.Id}`} termActions={availableActions} term={term} displayStyle={displayStyle} termActionCallback={this.props.termActionCallback} spTermService={this.props.spTermService} />
        }
      </div>
    );
  }
}
