import * as React from 'react';

import { useAtom } from 'jotai';

import {
  FontIcon,
  INavLink,
  Stack,
  Text,
} from '@fluentui/react';
import {
  Tag16Regular,
  TagMultiple16Regular,
} from '@fluentui/react-icons';

import { globalState } from './atoms/globalState';
import { NavigationContextMenu } from './NavigationContextMenu';
import { useNavigationStyles } from './useNavigationStyles';

export interface IRenderLinkProps {
  link: INavLink;
  showContextMenu?: boolean;

}

export const RenderLink: React.FunctionComponent<IRenderLinkProps> = (
  props: React.PropsWithChildren<IRenderLinkProps>
) => {
  const { link, showContextMenu  } = props;
  const { controlStyles, textNavLinkStyles } = useNavigationStyles();
  const [appGlobalState] = useAtom(globalState);
  const { selectedItem , contextMenuItems } = appGlobalState;
  const hasChildren = React.useMemo(() => link?.links.length, [link]);

  const onClick = React.useCallback(
    (ev: React.MouseEvent<HTMLElement>): void => {
      ev.preventDefault();
      link.isExpanded = !link.isExpanded;
    },
    [link]
  );

  const showContext = React.useMemo(() => {
    return showContextMenu && selectedItem?.key === link.key && contextMenuItems && contextMenuItems.length;
  }, [ showContextMenu, selectedItem, contextMenuItems]);

  return (
    <>
      <div className={controlStyles.navlink}>
        {hasChildren ? (
          <>
            <FontIcon
              iconName={link.isExpanded ? "ChevronRight" : "ChevronDown"}
              style={{ fontSize: 16,  }}
              onClick={onClick}
            />
            <TagMultiple16Regular  />
          </>
        ) : (
          <>
            <div style={{height: 16 }} />
           <Tag16Regular />
          </>
        )}
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="medium" styles={textNavLinkStyles(link)}>
            {link.name}
          </Text>
          {showContext && <NavigationContextMenu />}
        </Stack>
      </div>
    </>
  );
};
