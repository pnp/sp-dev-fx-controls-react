import React from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtomValue } from 'jotai/utils';
import { FontWeights } from 'office-ui-fabric-react';
import { IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { ITextStyles } from 'office-ui-fabric-react/lib/Text';

import { globalState } from '../../jotai/atoms/globalState';

export const useUploadFilesStyles = () => {
  const appGlobalState = useAtomValue(globalState);
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
        height: "100%",
        width: "100%",
        overflow: "hidden",
      },
    };
  }, [themeVariant]);

  return { titleStyles, mainContainer };
};
