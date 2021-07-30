import { WebPartContext } from "@microsoft/sp-webpart-base";

import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { ListItemComments } from "../../../controls/listItemComments";
import { Text} from '@fluentui/react/lib/Text'
export interface ITestControlProps {
  context: WebPartContext;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {


  return (
    <>
      <Text variant="large"> List Item Comments Control </Text>
        <Stack tokens={{childrenGap: 5, padding: 15}}>
        <Text variant="medium"> WebUrl: https://spteck.sharepoint.com/sites/ThePerspective </Text>
        <Text variant="medium"> ListId: e738c4b3-6cff-493a-a8da-dbbf4732e3bf </Text>
        <Text variant="medium"> ItemId: 26 </Text>
        </Stack>

        <Stack>
        <ListItemComments
          webUrl={"https://spteck.sharepoint.com/sites/ThePerspective"}
          listId={"e738c4b3-6cff-493a-a8da-dbbf4732e3bf"}
          itemId={"26"}
          serviceScope={props.context.serviceScope}
        ></ListItemComments>
      </Stack>
    </>
  );
};
