/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { Provider } from 'jotai';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import { EnhancedThemeProvider } from '../../../enhancedThemeProvider';
import { IUploadFilesProps } from './IUploadFilesProps';
import { UploadFilesControl } from './UploadFilesControl';
import { useUploadFilesStyles } from './useUploadFilesStyles';

export const UploadFiles: React.FunctionComponent<IUploadFilesProps> = (
  props: React.PropsWithChildren<IUploadFilesProps>
) => {
  const { themeVariant, title } = props;
  const { mainContainer, titleStyles } = useUploadFilesStyles();
  return (
    <>
      <Stack styles={mainContainer} tokens={{ childrenGap: 20 }}>
        <Text variant="xLarge" styles={ titleStyles}>
          {title}
        </Text>

        <EnhancedThemeProvider context={props.context as any} theme={themeVariant}>
          <section>
            <Provider>
              <UploadFilesControl {...props} />
            </Provider>
          </section>
        </EnhancedThemeProvider>
      </Stack>
    </>
  );
};
