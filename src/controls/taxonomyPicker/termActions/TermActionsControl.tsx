import * as React from 'react';
import { ITermAction, ITermActionsControlProps, ITermActionsControlState, TermActionsDisplayMode, TermActionsDisplayStyle, ActionChange } from './ITermsActions';
import { DropdownTermAction } from './DropdownTermAction';
import ButtonTermAction from './ButtonTermAction';

export default class TermActionsControl extends React.Component<ITermActionsControlProps, ITermActionsControlState> {

  constructor(props: ITermActionsControlProps) {
    super(props);

    const { termActions } = this.props;

    const displayMode = termActions.termActionsDisplayMode ? termActions.termActionsDisplayMode : TermActionsDisplayMode.buttons;
    const displayStyle = termActions.termActionsDisplayStyle ? termActions.termActionsDisplayStyle : TermActionsDisplayStyle.text;

    this.state = {
      availableActions: [],
      displayMode,
      displayStyle,
      termActionChanges: {}
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public UNSAFE_componentWillMount(): void {
    this.getAvailableActions()
      .then(() => {
        // no-op;
      })
      .catch(() => {
        // no-op;
      });
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
        const available = await action.applyToTerm(term, this.props.termActionCallback, this.setActionStateForTerm);
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
  private setActionStateForTerm = (actionId: string, termId: string, type: "disabled" | "hidden", value: boolean): void => {
    this.setState((prevState: ITermActionsControlState) => {
      const termActionChanges = prevState.termActionChanges;
      if (!termActionChanges[termId]) {
        termActionChanges[termId] = [];
      }

      const actionChanges = termActionChanges[termId].filter((action: ActionChange) => action.actionId === actionId);
      if (actionChanges.length === 0) {
        termActionChanges[termId].push({
          actionId,
          [type]: value
        });
      } else {
        actionChanges[0][type] = value;
      }

      return {
        termActionChanges
      };
    });
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<ITermActionsControlProps> {
    const { term } = this.props;
    const { displayStyle, displayMode, availableActions, termActionChanges } = this.state;

    if (!availableActions || availableActions.length <= 0 || !term) {
      return null;
    }

    return (
      <div>
        {
          displayMode === TermActionsDisplayMode.dropdown ?
            <DropdownTermAction key={`DdAction-${term.Id}`} termActions={availableActions} term={term} displayStyle={displayStyle} termActionCallback={this.props.termActionCallback} spTermService={this.props.spTermService} termActionChanges={termActionChanges} />
            :
            <ButtonTermAction key={`BtnAction-${term.Id}`} termActions={availableActions} term={term} displayStyle={displayStyle} termActionCallback={this.props.termActionCallback} spTermService={this.props.spTermService} termActionChanges={termActionChanges} />
        }
      </div>
    );
  }
}
