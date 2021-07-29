import { Spinner } from "@fluentui/react/lib/Spinner";
import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "office-ui-fabric-react/lib/DocumentCard";
import { SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { useContext } from "react";
import { ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";

export interface IRenderScrollingInfoProps {}

export const RenderScrollingInfo: React.FunctionComponent<IRenderScrollingInfoProps> = (
  props: React.PropsWithChildren<IRenderScrollingInfoProps>
) => {
  const { documentCardStyles } = useListItemCommentsStyles();
  const { listItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { isScrolling } = listItemCommentsState;
  if (!isScrolling) return null;
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
          <Spinner size={SpinnerSize.medium}></Spinner>
        </Stack>
      </DocumentCardDetails>
    </DocumentCard>
  );
};
