import * as React from "react";

import {
  FluentProvider,
  makeStyles,
  shorthands,
  Theme,
  Title3,
} from "@fluentui/react-components";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { UserPicker } from "../../../controls/userPicker";
import { IUserInfo } from "../../../controls/userPicker/models/IUserInfo";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    ...shorthands.gap("10px"),
    marginLeft: "50%",
    marginRight: "50%",
    height: "fit-content",
    width: "fit-content",
  },
  image: {
    width: "20px",
    height: "20px",
  },
  title: {
    marginBottom: "30px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant: any;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const { themeVariant, context } = props;

  const styles = useStyles();

  const setTheme = React.useCallback((): Partial<Theme> => {
    return createV9Theme(themeVariant);
  }, [themeVariant]);

 const onSelectedUsers = (users: IUserInfo[]) => {
  console.log('selected users',users);
 };

  return (
    <>
      <FluentProvider theme={setTheme()}>
        <div className={styles.title}>
          <Title3>Test Control - userPicker</Title3>
        </div>
          <UserPicker context={context} onSelectedUsers={onSelectedUsers}/>


      </FluentProvider>
    </>
  );
};
