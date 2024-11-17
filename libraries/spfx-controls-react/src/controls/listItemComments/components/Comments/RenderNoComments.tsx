import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
import strings from "ControlStrings";

export const RenderNoComments: React.FunctionComponent = () => {
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
            <Text variant={"smallPlus"}>{strings.ListItemCommentsNoCommentsLabel}</Text>
          </Stack>
        </DocumentCardDetails>
      </DocumentCard>
    </>
  );
};
