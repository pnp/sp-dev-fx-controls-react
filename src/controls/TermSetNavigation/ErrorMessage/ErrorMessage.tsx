import * as React from 'react';

import {
  MessageBar,
  MessageBarType,
} from '@fluentui/react/lib/MessageBar';
import { Stack } from '@fluentui/react/lib/Stack';

import { IErrorMessageProps } from '../models/IErrorMessageProps';
import { useErrorMessageStyles } from './useErrorMessageStyles';

export const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = (
  props: React.PropsWithChildren<IErrorMessageProps>
) => {
  const { showError, errorMessage, children } = props;
  const { messageErrorContainerStyles} = useErrorMessageStyles();
  if (!showError) return null;
  return (
    <>
      <Stack verticalAlign="center" tokens={{ childrenGap: 10 }} styles={messageErrorContainerStyles}>
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          {errorMessage}
          {children}
        </MessageBar>
      </Stack>
    </>
  );
};
