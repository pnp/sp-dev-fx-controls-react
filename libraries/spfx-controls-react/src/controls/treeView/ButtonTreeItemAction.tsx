import { CommandBarButton } from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react/lib/Icon';
import * as React from 'react';
import { IConcreteTreeItemActionProps, ITreeItemAction } from './ITreeItemActions';
import styles from './TreeView.module.scss';

/**
 * Renders the controls for Button TreeItem action component
 */
export default class ButtonTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public UNSAFE_componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepares the command bar button
   */
  private prepareCommandBarButton = (treeItemAction: ITreeItemAction): { name: string, text: string, iconProps: IIconProps, btnTitle: string } => {
    const name: string = treeItemAction.title;
    const text: string = treeItemAction.title;
    const iconProps: IIconProps = treeItemAction.iconProps;
    const btnTitle: string = treeItemAction.title;

    return { name, text, iconProps, btnTitle };
  }

  /**
   * Check if there are action to immediatly invoke
   */
  private checkForImmediateInvocations(): void {
    const { treeItemActions } = this.props;

    for (const action of treeItemActions) {
      if (action.invokeActionOnRender) {
        this.onActionExecute(action)
        .then(() => {
          // no-op;
        })
        .catch(() => {
          // no-op;
        });
      }
    }
  }

  /**
   * On action execution
   */
  private onActionExecute = async (treeItemAction: ITreeItemAction): Promise<void> => {
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
                    onClick={() => {
                      this.onActionExecute(treeItemAction)
                      .then(() => {
                        // no-op;
                      })
                      .catch(() => {
                        // no-op;
                      });
                    }}
                    iconProps={iconProps}
                    text={text}
                    title={btnTitle}
                    name={name}
                    key={treeItem.key}
                    className={styles.actionButton}
                    theme={this.props.theme} />
                </div>
              )
            );
          })
        }
      </div>
    );
  }
}
