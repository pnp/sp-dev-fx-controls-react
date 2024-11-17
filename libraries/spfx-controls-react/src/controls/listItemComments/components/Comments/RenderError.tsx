import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { ErrorInfo } from "../ErrorInfo";
import { IErrorInfo } from "../ErrorInfo/IErrorInfo";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
export interface IRenderErrorProps {
  errorInfo: IErrorInfo;
}
export const RenderError: React.FunctionComponent<IRenderErrorProps> = (
  props: React.PropsWithChildren<IRenderErrorProps>
) => {
  const { showError, error } = props.errorInfo || ({} as IErrorInfo);
  const { documentCardStyles } = useListItemCommentsStyles();

  if (!showError) return null;
  return (
    <DocumentCard styles={documentCardStyles} key="errorInfo">
      <DocumentCardDetails key={Guid.newGuid().toString()}>
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          tokens={{ padding: 5 }}
          key={Guid.newGuid().toString()}
        >
          <ErrorInfo showError={showError} error={error} />
        </Stack>
      </DocumentCardDetails>
    </DocumentCard>
  );
};
