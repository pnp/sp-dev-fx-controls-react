import * as React from 'react';

import { useAtom } from 'jotai';

import { IStackStyles } from '@fluentui/react/lib/Stack';

import { globalState } from '../atoms/globalState';

interface IErrorMessageStyles {
  messageErrorContainerStyles: IStackStyles;
}

export const useErrorMessageStyles =  ():IErrorMessageStyles => {
  const [appGlobalState] = useAtom(globalState);
  const { themeVariant } = appGlobalState;
  const messageErrorContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
       width:'100%',
      },
    };
  }, [ themeVariant]);

  return {messageErrorContainerStyles}
};
