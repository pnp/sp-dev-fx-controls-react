import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ITerm } from '../../../services/ISPTermStorePickerService';
import { ITermAction, TermActionsDisplayStyle, IConcreteTermActionProps } from './ITermsActions';
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';

export class DropdownTermAction extends React.Component<IConcreteTermActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepates contextual menu items for dropdown.
   */
  private prepareContextualMenuProps = (term: ITerm, termActions: ITermAction[]): IContextualMenuProps => {
    let items: IContextualMenuItem[] = [];
    const displayStyle = this.props.displayStyle;
    let useTargetWidth = true;

    for (const termAction of termActions) {
      if (!termAction.hidden) {
        let termActionMenuItem: IContextualMenuItem = {
          key: term.Id.toString(),
          onClick: () => { this.onActionExecute(termAction); }
        };

        if (displayStyle && (displayStyle === TermActionsDisplayStyle.text || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
          termActionMenuItem.text = termAction.title;
          termActionMenuItem.name = termAction.title;
          useTargetWidth = false;
        }
        if (displayStyle && (displayStyle === TermActionsDisplayStyle.icon || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
          termActionMenuItem.iconProps = { iconName: termAction.iconName };
        }

        items.push(termActionMenuItem);
      }
    }

    const contextualMenuProps: IContextualMenuProps = {
      items,
      useTargetWidth
    };
    return contextualMenuProps;
  }

  /**
   * Prepare term action button style.
   */
  private getTermActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: "14px",
      display: "inline-flex",
      padding: "0px"
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
   * Handler to execute selected action.
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

    const termActionButtonStyle = this.getTermActionActionButtonStyle();
    const contextualMenuProps = this.prepareContextualMenuProps(term, termActions);

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        <DefaultButton style={termActionButtonStyle} menuProps={contextualMenuProps} />
      </div>
    );
  }
}
