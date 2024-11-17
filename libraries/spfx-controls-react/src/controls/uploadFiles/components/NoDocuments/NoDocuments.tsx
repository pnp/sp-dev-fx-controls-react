import * as React from 'react';

import strings from 'ControlStrings';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import { useNoDocumentsStyles } from './useNoDocumentsStyles';

export interface INoDocumentsProps {}

export const NoDocuments: React.FunctionComponent<INoDocumentsProps> = (
  props: React.PropsWithChildren<INoDocumentsProps>
) => {
  const { stackContainerStyles,controlStyles } = useNoDocumentsStyles();
  return (
    <>
      <Stack
        styles={stackContainerStyles}
        verticalAlign="center"
        horizontal
        horizontalAlign="center"
        tokens={{ padding: 20, childrenGap: 10 }}
      >
        <FontIcon iconName="BulkUpload" className={controlStyles.iconStyles}/>
        <Text variant="mediumPlus">{strings.UpLoadFilesDragDropLabel} </Text>
      </Stack>
    </>
  );
};
