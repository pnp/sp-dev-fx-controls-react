import * as React from 'react';

import {
  Provider,
  useAtom,
} from 'jotai';

import { FluentProvider } from '@fluentui/react-components';

import { globalState } from './atoms/globalState';
import { IUserPickerProps } from './IUserPickerProps';
import { UserPickerControl } from './UserPickerControl';

export const UserPIcker: React.FunctionComponent<IUserPickerProps> = (
  props: React.PropsWithChildren<IUserPickerProps>
) => {
  const [appglobalState, setAppGlobalState] = useAtom(globalState);
  const { theme } = appglobalState;


  React.useEffect(() => {
    setAppGlobalState({ ...appglobalState, ...props });
  }, []);

  return (
    <>
      <FluentProvider theme={theme}>
        <Provider>
          <UserPickerControl {...props} />
        </Provider>
      </FluentProvider>
    </>
  );
};
