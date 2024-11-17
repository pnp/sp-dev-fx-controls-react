import React from 'react';
import { useAtom } from 'jotai';
import { IStackStyles, FontWeights, ITextStyles } from '@fluentui/react';

import { globalState } from '../../jotai/atoms/globalState';

export const useUploadFilesStyles: () => {
  titleStyles: ITextStyles;
  mainContainer: IStackStyles;
} = () => {
  const [appGlobalState] = useAtom(globalState);
  const { themeVariant } = appGlobalState;

  const titleStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        paddingRight: 20,
        paddingLeft: 20,

        fontWeight: FontWeights.semibold,
      },
    };
  }, [themeVariant]);

  const mainContainer: IStackStyles = React.useMemo(() => {
    return {
      root: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
      },
    };
  }, [themeVariant]);

  return { titleStyles, mainContainer };
};
