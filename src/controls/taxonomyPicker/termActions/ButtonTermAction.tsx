import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ITermAction, TermActionsDisplayStyle, IConreteTermActionProps } from './ITermsActions';

export default class ButtonTermAction extends React.Component<IConreteTermActionProps> {
  public render(): React.ReactElement<IConreteTermActionProps> {
    const { term, termActions } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        {
          termActions &&
          termActions.map(termAction => {
            const { name, text, iconName } = this._prepareCommandBarButton(termAction);
            return (
              <div>
                <CommandBarButton split={true}
                  onClick={() => { this._onActionExecute(termAction); }}
                  iconProps={{ iconName: iconName }}
                  text={text}
                  name={name}
                  key={term.Id}
                  style={this._getTermActionActionButtonStyle()}
                />
              </div>
            )
          })
        }
      </div>
    );
  }


  private _prepareCommandBarButton = (termAction: ITermAction): { name: string, text: string, iconName: string } => {
    let name, text, iconName = "";

    if (this.props.displayStyle && (this.props.displayStyle === TermActionsDisplayStyle.text || this.props.displayStyle === TermActionsDisplayStyle.textAndIcon)) {
      name = termAction.displayText;
      text = termAction.displayText;
    }
    if (this.props.displayStyle && (this.props.displayStyle === TermActionsDisplayStyle.icon || this.props.displayStyle === TermActionsDisplayStyle.textAndIcon)) {
      iconName = termAction.iconName;
    }

    return { name, text, iconName };
  }

  private _getTermActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: "32px",
      height: "32px"
    }

    return result;
  }

  private _onActionExecute = async (termAction: ITermAction) => {
    const updateAction = await termAction.actionCallback(this.props.term);
    this.props.termActionCallback(updateAction);
  }
}
