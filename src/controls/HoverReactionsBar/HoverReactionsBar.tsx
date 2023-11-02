import * as React from 'react';

import { useTheme } from '@fluentui/react';
import {
  FluentProvider,
  Theme,
} from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

import {
  HoverReactionsBarControl,
} from './components/hoverReactionbarControl/HoverReactionBarControl';
import { IHoverReactionsBarProps } from './IHoverReactionsBarProps';

export const HoverReactionsBar: React.FunctionComponent<IHoverReactionsBarProps> = (
  props: React.PropsWithChildren<IHoverReactionsBarProps>
) => {
  const { themeV8 } = props;
  const theme =  themeV8 ?? useTheme();
  const setTheme = React.useCallback((): Partial<Theme> => {
    return createV9Theme(theme);
  }, [theme]);

  return (
    <>
      <FluentProvider theme={setTheme()}>
        <HoverReactionsBarControl {...props} />
      </FluentProvider>
    </>
  );
};
