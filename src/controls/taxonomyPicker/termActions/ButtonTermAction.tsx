import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ITermAction, TermActionsDisplayStyle, IConcreteTermActionProps } from './ITermsActions';

export default class ButtonTermAction extends React.Component<IConcreteTermActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepares the command bar button
   */
  private prepareCommandBarButton = (termAction: ITermAction): { name: string, text: string, iconName: string, btnTitle: string } => {
    let name: string = "";
    let text: string = "";
    let iconName: string = "";
    let btnTitle: string = "";

    if ((this.props.displayStyle && (this.props.displayStyle === TermActionsDisplayStyle.text || this.props.displayStyle === TermActionsDisplayStyle.textAndIcon))) {
      name = termAction.title;
      text = termAction.title;
    }
    if (this.props.displayStyle && (this.props.displayStyle === TermActionsDisplayStyle.icon || this.props.displayStyle === TermActionsDisplayStyle.textAndIcon)) {
      iconName = termAction.iconName;
    }

    btnTitle = termAction.title;

    return { name, text, iconName, btnTitle };
  }

  /**
   * Gets the action button styling
   */
  private getTermActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: this.props.displayStyle === TermActionsDisplayStyle.icon ? "32px" : null,
      height: "32px"
    };

    return result;
  }

  /**
   * Check if there are action to immediatly invoke
   */
  private checkForImmediateInvocations() {
    const { termActions } = this.props;
    for (const action of termActions) {
      if (action.invokeActionOnRender) {
        this.onActionExecute(action);
      }
    }
  }

  /**
   * On action execution
   */
  private onActionExecute = async (termAction: ITermAction) => {
    const updateAction = await termAction.actionCallback(this.props.spTermService, this.props.term);
    this.props.termActionCallback(updateAction);
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IConcreteTermActionProps> {
    const { term, termActions } = this.props;

    // Check if there are actions to show
    const actionsToShow = termActions.filter(a => !a.hidden);
    if (actionsToShow && actionsToShow.length === 0) {
      return null;
    }

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        {
          termActions &&
          termActions.map(termAction => {
            const { name, text, iconName, btnTitle } = this.prepareCommandBarButton(termAction);
            return (
              termAction.hidden ? (
                null
              ) : (
                <div>
                  <CommandBarButton split={true}
                                    onClick={() => { this.onActionExecute(termAction); }}
                                    iconProps={{
                                      iconName: iconName || null,
                                      style: { display: iconName ? null : "none"}
                                    }}
                                    text={text}
                                    title={btnTitle}
                                    name={name}
                                    key={term.Id}
                                    style={this.getTermActionActionButtonStyle()} />
                </div>
              )
            );
          })
        }
      </div>
    );
  }
}
