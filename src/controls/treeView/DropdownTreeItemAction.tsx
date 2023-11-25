import { IconButton } from '@fluentui/react/lib/Button';
import { IContextualMenuItem, IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import * as React from 'react';
import { ITreeItem } from './ITreeItem';
import { IConcreteTreeItemActionProps, ITreeItemAction } from './ITreeItemActions';
import styles from './TreeView.module.scss';

/**
 * Renders the controls for Dropdown TreeItem action component
 */
export class DropdownTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {

  /**
   * componentWillMount lifecycle hook
   */
  public UNSAFE_componentWillMount(): void {
    this.checkForImmediateInvocations();
  }

  /**
   * Prepates contextual menu items for dropdown.
   */
  private prepareContextualMenuProps = (treeItem: ITreeItem, treeItemActions: ITreeItemAction[]): IContextualMenuProps => {
    const items: IContextualMenuItem[] = [];
    let useTargetWidth = true;

    for (const treeItemAction of treeItemActions) {
      if (!treeItemAction.hidden) {
        const treeItemActionMenuItem: IContextualMenuItem = {
          key: treeItem.key.toString(),
          onClick: () => {
            this.onActionExecute(treeItemAction)
            .then(() => {
              // no-op;
            })
            .catch(() => {
              // no-op;
            });
          }
        };

        treeItemActionMenuItem.text = treeItemAction.title;
        treeItemActionMenuItem.name = treeItemAction.title;
        treeItemActionMenuItem.iconProps = treeItemAction.iconProps;
        useTargetWidth = treeItemActionMenuItem.iconProps ? false : true;

        items.push(treeItemActionMenuItem);
      }
    }

    const contextualMenuProps: IContextualMenuProps = {
      items,
      useTargetWidth
    };
    return contextualMenuProps;
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
   * Handler to execute selected action.
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

    const contextualMenuProps = this.prepareContextualMenuProps(treeItem, treeItemActions);

    return (
      <div>
        <IconButton
          menuProps={contextualMenuProps}
          menuIconProps={{ iconName: 'MoreVertical' }}
          className={styles.actionMore}
          title="More"
          ariaLabel="More"
          theme={this.props.theme}
        />
      </div>
    );
  }
}
