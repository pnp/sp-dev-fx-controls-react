import * as React from 'react';

import { useAtom } from 'jotai';

import { EnhancedThemeProvider } from '../enhancedThemeProvider';
import { globalState } from './atoms/globalState';
import { INavigationProps } from './INavigationProps';
import { Navigation } from './Navigation';

export const TermSetNavigation: React.FunctionComponent<INavigationProps> = (
  props: React.PropsWithChildren<INavigationProps>
) => {
  const { themeVariant, context } = props;
  const [, setAppGlobalState] = useAtom(globalState);

  React.useEffect(() => {
    setAppGlobalState((state) => ({ ...state, ...props }));
  }, [props]);

  if (!context || !themeVariant   ) return null;

  return (
    <>
      <EnhancedThemeProvider theme={themeVariant} context={context}>
        <Navigation {...props} />
      </EnhancedThemeProvider>
    </>
  );
};
