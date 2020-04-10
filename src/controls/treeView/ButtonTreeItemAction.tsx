import * as React from 'react';
import { CommandBarButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { ITreeItemAction, IConcreteTreeItemActionProps } from './ITreeItemActions';
import styles from './TreeView.module.scss';

/**
 * Renders the controls for Button TreeItem action component
 */
export default class ButtonTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepares the command bar button
   */
  private prepareCommandBarButton = (treeItemAction: ITreeItemAction): { name: string, text: string, iconProps: IIconProps, btnTitle: string } => {
    let name: string = treeItemAction.title;
    let text: string = treeItemAction.title;
    let iconProps: IIconProps = treeItemAction.iconProps;
    let btnTitle: string = treeItemAction.title;

    return { name, text, iconProps, btnTitle };
  }

  /**
   * Gets the action button styling
   */
  private getTreeItemActionButtonStyle = (treeItemAction: ITreeItemAction): React.CSSProperties => {
    let result: React.CSSProperties = {
      backgroundColor: "transparent",
      height: "32px"
    };

    return result;
  }

  /**
   * Check if there are action to immediatly invoke
   */
  private checkForImmediateInvocations() {
    const { treeItemActions } = this.props;

    for (const action of treeItemActions) {
      if (action.invokeActionOnRender) {
        this.onActionExecute(action);
      }
    }
  }

  /**
   * On action execution
   */
  private onActionExecute = async (treeItemAction: ITreeItemAction) => {
    await treeItemAction.actionCallback(this.props.treeItem);
    this.props.treeItemActionCallback();
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IConcreteTreeItemActionProps> {
    const { treeItem, treeItemActions } = this.props;

    // Check if there are actions to show
    const actionsToShow = treeItemActions.filter(a => !a.hidden);
    if (actionsToShow && actionsToShow.length === 0) {
      return null;
    }

    return (
      <div>
        {
          treeItemActions &&
          treeItemActions.map(treeItemAction => {
            const { name, text, iconProps, btnTitle } = this.prepareCommandBarButton(treeItemAction);

            return (
              treeItemAction.hidden ? (
                null
              ) : (
                  <div>
                    <CommandBarButton split={true}
                      onClick={() => { this.onActionExecute(treeItemAction); }}
                      iconProps={iconProps}
                      text={text}
                      title={btnTitle}
                      name={name}
                      key={treeItem.key}
                      className={styles.actionButton} />
                  </div>
                )
            );
          })
        }
      </div>
    );
  }
}
