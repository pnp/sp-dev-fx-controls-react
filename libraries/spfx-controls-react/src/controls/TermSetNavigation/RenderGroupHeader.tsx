import * as React from 'react';

import {
  FontIcon,
  IRenderGroupHeaderProps,
  Text,
} from '@fluentui/react';

import { useNavigationStyles } from './useNavigationStyles';

export const RenderGroupHeader: React.FunctionComponent<IRenderGroupHeaderProps> = (
  group: React.PropsWithChildren<IRenderGroupHeaderProps>
) => {
  const { textGroupLinkStyles } = useNavigationStyles();
  return (
    <>
      <FontIcon
        iconName={group.isExpanded ? "ChevronRight" : "ChevronDown"}
        style={{ fontSize: 16 }}
        onClick={(ev) => {
          ev.preventDefault();
          group.onHeaderClick(ev);
        }}
      />
      <FontIcon iconName="CustomList" style={{ fontSize: 16 }} />
      <Text styles={textGroupLinkStyles(group.groupData.termSet)} variant="large">
        {group.name}
      </Text>
    </>
  );
};
