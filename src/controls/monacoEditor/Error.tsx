
import { Stack } from "@fluentui/react/lib/components/Stack";
import { MessageBarType, MessageBar } from "@fluentui/react/lib/MessageBar";
import * as React from "react";

export interface IErrorProps {
  error: Error;
  show: boolean;
}

export const Error: React.FunctionComponent<IErrorProps> = (props: React.PropsWithChildren<IErrorProps>) => {
  const { error, show } = props;
  return (
    <>
      {(show && error) ?
        <Stack horizontal horizontalAlign="start">
          <MessageBar isMultiline messageBarType={MessageBarType.error}>
            {error.message}
          </MessageBar>
        </Stack>
        :
        null
      }
    </>
  );
};
