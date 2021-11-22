import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IBasePickerStyles } from "office-ui-fabric-react/lib/Pickers";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { ListItemComments } from "../../../controls/listItemComments";
import { PeoplePicker, PrincipalType } from "../../../PeoplePicker";
export interface ITestControlProps {
  context: WebPartContext;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const theme =  window["__themeState__"].theme;
  const pickerStylesSingle: Partial<IBasePickerStyles> = {
    root: {
      width: "100%",
      borderRadius: 0,
      marginTop: 0,
    },
    input: {
      width: "100%",
      backgroundColor:  theme.white,
    },
    text: {
      borderStyle: "solid",
      width: "100%",
      borderWidth: 1,
      backgroundColor:  theme.white,
      borderRadius: 0,
      borderColor:  theme.neutralQuaternaryAlt,
      ":focus": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  theme.themePrimary,
      },
      ":hover": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  theme.themePrimary,
      },
      ":after": {
        borderWidth: 0,
        borderRadius: 0,
      },
    },
  };
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
        <PeoplePicker context={props.context}
          titleText="People Picker with custom styles"
          styles={pickerStylesSingle}
          personSelectionLimit={5}
          ensureUser={true}
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}

          onChange={ (items: any[]) => {
            console.log('Items:', items);
          }}  />

         <PeoplePicker context={ props.context}


          titleText="People Picker "
          webAbsoluteUrl={ props.context.pageContext.site.absoluteUrl}
          principalTypes={[PrincipalType.User, PrincipalType.SharePointGroup, PrincipalType.SecurityGroup, PrincipalType.DistributionList]}
          defaultSelectedUsers={["admin@tenant.onmicrosoft.com", "test@tenant.onmicrosoft.com"]}
          onChange={ (items: any[]) => {
            console.log('Items:', items);
          }}  />
      </Stack>
    </>
  );
};
