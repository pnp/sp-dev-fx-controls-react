import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { ITerm } from '../../../services/ISPTermStorePickerService';
import { ITermAction, TermActionsDisplayStyle, UpdateAction, IConreteTermActionProps } from './ITermsActions';
import { IContextualMenuItem, IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';

export class DropdownTermAction extends React.Component<IConreteTermActionProps> {
  public render(): React.ReactElement<IConreteTermActionProps> {
    const { term, termActions } = this.props;

    const termActionButtonStyle = this._getTermActionActionButtonStyle();
    const contextualMenuProps = this._prepareContextualMenuProps(term, termActions);

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        <DefaultButton style={termActionButtonStyle} menuProps={contextualMenuProps} />
      </div>
    );
  }

  /**
   * Prepates contextual menu items for dropdown.
   */
  private _prepareContextualMenuProps = (term: ITerm, termActions: ITermAction[]): IContextualMenuProps => {
    const items: IContextualMenuItem[] = [];
    const displayStyle = this.props.displayStyle;
    let useTargetWidth = true;

    termActions.forEach(termAction => {
      let termActionMenuItem: IContextualMenuItem = {
        key: term.Id.toString(),
        onClick: () => { this._onActionExecute(termAction); }
      };

      if (displayStyle && (displayStyle === TermActionsDisplayStyle.text || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
        termActionMenuItem.text = termAction.displayText;
        termActionMenuItem.name = termAction.displayText;
        useTargetWidth = false;
      }
      if (displayStyle && (displayStyle === TermActionsDisplayStyle.icon || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
        termActionMenuItem.iconProps = { iconName: termAction.iconName };
      }

      items.push(termActionMenuItem);
    });

    const contextualMenuProps: IContextualMenuProps = {
      items,
      useTargetWidth
    };
    return contextualMenuProps;
  }

  /**
   * Prepare term action button style.
   */
  private _getTermActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: "14px",
      display: "inline-flex",
      padding: "0px"
    };

    return result;
  }

  /**
   * Handler to execute selected action.
   */
  private _onActionExecute = async (termAction: ITermAction) => {
    const updateAction = await termAction.actionCallback(this.props.term);
    this.props.termActionCallback(updateAction);
  }
}
