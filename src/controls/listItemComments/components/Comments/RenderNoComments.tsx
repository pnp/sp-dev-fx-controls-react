import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "office-ui-fabric-react/lib/DocumentCard";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { Text } from "office-ui-fabric-react/lib/Text";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";

export interface IRenderNoCommentsProps {}

export const RenderNoComments: React.FunctionComponent<IRenderNoCommentsProps> = (
  props: React.PropsWithChildren<IRenderNoCommentsProps>
) => {
  const { documentCardStyles } = useListItemCommentsStyles();

  return (
    <>
      <DocumentCard styles={documentCardStyles} key={"noData"}>
        <DocumentCardDetails key={Guid.newGuid().toString()}>
          <Stack
            horizontal
            horizontalAlign="center"
            verticalAlign="center"
            tokens={{ padding: 20 }}
            key={Guid.newGuid().toString()}
          >
            <Text variant={"smallPlus"}>There is no Comments</Text>
          </Stack>
        </DocumentCardDetails>
      </DocumentCard>
    </>
  );
};
