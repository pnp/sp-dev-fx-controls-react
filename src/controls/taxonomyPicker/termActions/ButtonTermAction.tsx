import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { ITermAction, TermActionsDisplayStyle, IConcreteTermActionProps } from './ITermsActions';

export default class ButtonTermAction extends React.Component<IConcreteTermActionProps> {
  public render(): React.ReactElement<IConcreteTermActionProps> {
    const { term, termActions } = this.props;

    return (
      <div style={{ display: 'flex', alignItems: 'stretch', height: '32px' }}>
        {
          termActions &&
          termActions.map(termAction => {
            const { name, text, iconName, btnTitle } = this._prepareCommandBarButton(termAction);
            return (
              <div>
                <CommandBarButton split={true}
                                  onClick={() => { this._onActionExecute(termAction); }}
                                  iconProps={{
                                    iconName: iconName || null,
                                    style: { display: iconName ? null : "none"}
                                  }}
                                  text={text}
                                  title={btnTitle}
                                  name={name}
                                  key={term.Id}
                                  style={this._getTermActionActionButtonStyle()}
                />
              </div>
            );
          })
        }
      </div>
    );
  }


  private _prepareCommandBarButton = (termAction: ITermAction): { name: string, text: string, iconName: string, btnTitle: string } => {
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

  private _getTermActionActionButtonStyle = (): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      width: this.props.displayStyle === TermActionsDisplayStyle.icon ? "32px" : null,
      height: "32px"
    };

    return result;
  }

  private _onActionExecute = async (termAction: ITermAction) => {
    const updateAction = await termAction.actionCallback(this.props.spTermService, this.props.term);
    this.props.termActionCallback(updateAction);
  }
}
