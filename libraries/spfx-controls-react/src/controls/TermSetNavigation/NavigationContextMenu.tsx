import * as React from 'react';

import { useAtom } from 'jotai';

import { IconButton } from '@fluentui/react/lib/Button';
import { IContextualMenuProps } from '@fluentui/react/lib/ContextualMenu';
import { IIconProps } from '@fluentui/react/lib/Icon';

import { globalState } from './atoms/globalState';

export interface INavigationContextMenuProps {}

export const NavigationContextMenu: React.FunctionComponent<INavigationContextMenuProps> = (
  props: React.PropsWithChildren<INavigationContextMenuProps>
) => {
  const moreVerticaliIcon: IIconProps = { iconName: "MoreVertical" };
  const [appGlobalState] = useAtom(globalState);
  const { contextMenuItems, onSelectedTermAction, selectedItem } = appGlobalState;
  const menuProps: IContextualMenuProps = React.useMemo(() => {
    return {
      items: contextMenuItems.length ? contextMenuItems : [],
      directionalHintFixed: true,
      onItemClick: (ev, item) => {
        ev.preventDefault();
        onSelectedTermAction(selectedItem.data, item.text);
      },
    };
  }, [contextMenuItems]);

  return (
    <>
      <IconButton
        menuProps={menuProps}
        iconProps={moreVerticaliIcon}
        ariaLabel="Menu"
        styles={{ menuIcon: { display: "none" } }}
      />
    </>
  );
};
