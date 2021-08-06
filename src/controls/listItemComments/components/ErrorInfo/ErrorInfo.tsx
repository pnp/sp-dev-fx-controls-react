import * as React from "react";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";
import { Stack } from "office-ui-fabric-react/lib/Stack";
export interface IErrorInfoProps {
  error: Error;
  showError: boolean;
  showStack?: boolean;
}

export const ErrorInfo: React.FunctionComponent<IErrorInfoProps> = (
  props: React.PropsWithChildren<IErrorInfoProps>
) => {
  const { error, showStack, showError } = props;
  return (
    <>
      {showError ? (
        <Stack tokens={{ padding: 10, childrenGap: 10 }}>
          <MessageBar messageBarType={MessageBarType.error} isMultiline>
            {error.message}
            {showStack ? error.stack : ""}
          </MessageBar>
        </Stack>
      ) : null}
    </>
  );
};
