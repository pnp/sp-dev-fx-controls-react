import { Spinner } from "@fluentui/react/lib/Spinner";
import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { useContext } from "react";
import { ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";

export const RenderSpinner: React.FunctionComponent = () => {
  const { documentCardStyles } = useListItemCommentsStyles();
  const { listItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { isScrolling , isLoading} = listItemCommentsState;
  if (!isScrolling && !isLoading) return null;
  return (
    <DocumentCard styles={documentCardStyles} key={"isScrolling"}>
      <DocumentCardDetails key={Guid.newGuid().toString()}>
        <Stack
          horizontal
          horizontalAlign="center"
          verticalAlign="center"
          tokens={{ padding: 20 }}
          key={Guid.newGuid().toString()}
        >
          <Spinner size={SpinnerSize.medium} />
        </Stack>
      </DocumentCardDetails>
    </DocumentCard>
  );
};
