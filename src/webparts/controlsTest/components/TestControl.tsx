import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import {
  UploadFiles,
} from '../../../controls/uploadFiles/components/UploadFiles/UploadFiles';
import { EnhancedThemeProvider } from '../../../EnhancedThemeProvider';

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant?: IReadonlyTheme;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const { context, themeVariant } = props;

  return (
    <>
    <EnhancedThemeProvider theme={themeVariant} context={context}>
      <Stack>
        <UploadFiles
          context={context}
          title="Upload Files"
          onUploadFiles={(files) => {
            console.log("files", files);
          }}
          themeVariant={themeVariant}
        />
      </Stack>
      </EnhancedThemeProvider>
    </>
  );
};
