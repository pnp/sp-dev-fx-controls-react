import * as React from 'react';

import {
  Body1,
  makeStyles,
  shorthands,
  tokens,
} from '@fluentui/react-components';
import { Person20Filled } from '@fluentui/react-icons';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { UserPicker } from '../../../controls/userPicker';
import { IUserInfo } from '../../../controls/userPicker/models/IUserInfo';

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant: any;
}

const useTestControlStyles =  makeStyles({

  attributeContainer: {
    width: "100%",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    ...shorthands.gap('10px')
  },

  attributeHader: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    ...shorthands.gap("10px"),
  },
  });



export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const { themeVariant, context } = props;
  const styles = useTestControlStyles();

  const onSelectedUsers = React.useCallback((users: IUserInfo[]) => {
    console.log(users);

  }, []);
  const onRemovedUser = React.useCallback((user: IUserInfo) => {
    console.log(user);
  }, []);



  return (
    <>
      <UserPicker
        context={context}
        secondaryTextPropertyName="mail"
        theme={themeVariant as any}
        label={
          <div className={styles.attributeHader}>
            <Person20Filled color={tokens.colorBrandForeground1} />
            <Body1>Select User</Body1>
          </div>
        }
        placeholder={"Search User"}
        onSelectedUsers={onSelectedUsers}
        onRemoveSelectedUser={onRemovedUser}
      />
    </>
  );
};
