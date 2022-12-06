import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import {
  UploadFiles,
} from '../../../controls/uploadFiles/components/UploadFiles/UploadFiles';

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
      <Stack>
        <UploadFiles
          pageSize={30}
          context={context}
          title="Upload Files"
          onUploadFiles={(files) => {
            console.log("files", files);
          }}
          themeVariant={themeVariant}
        />
      </Stack>
    </>
  );
};
