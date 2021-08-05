import { WebPartContext } from "@microsoft/sp-webpart-base";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { ListItemComments } from "../../../controls/listItemComments";
export interface ITestControlProps {
  context: WebPartContext;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  return (
    <>
        <Stack>
        <ListItemComments
          listId={"e738c4b3-6cff-493a-a8da-dbbf4732e3bf"}
          itemId={"26"}
          serviceScope={props.context.serviceScope}
          numberCommentsPerPage={10}
          label="List Item Comments"
        ></ListItemComments>
      </Stack>
    </>
  );
};
