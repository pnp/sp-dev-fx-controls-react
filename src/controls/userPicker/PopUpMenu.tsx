/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { useAtom } from 'jotai';
import { pullAllBy } from 'lodash';

import { Card } from '@fluentui/react-components';
import { User as IUser } from '@microsoft/microsoft-graph-types';

import { globalState } from './atoms/globalState';
import { useGraphUserAPI } from './hooks/useGraphUserAPI';
import { useOnClickOutside } from './hooks/useOnClickOutside';
import { IUserInfo } from './models/IUserInfo';
import { NoUser } from './userCard/NoUser';
import { UserCard } from './userCard/UserCard';
import { useUserPickerStyles } from './useUserPickerStyles';

interface IPopUpMenuProps {
  isOpen: boolean;
  searchValue: string;
  onDismiss: (open?: boolean) => void;
  target: React.RefObject<HTMLDivElement>;
  secondaryTextPropertyName?: "jobTitle" | "department" | "mail" | "officeLocation" | "mobilePhone" | "businessPhones" | "userPrincipalName";
}

export const PopUpMenu = (props: IPopUpMenuProps): JSX.Element => {
  const { searchValue, isOpen, onDismiss, target } = props;
  const [appGlobalState, setAppGlobalState] = useAtom(globalState);
  const { context, selectedUsers } = appGlobalState;
  const [renderUsers, setRenderUsers] = React.useState<JSX.Element[]>([]);
  const { getUserByName } = useGraphUserAPI(context);
  const styles = useUserPickerStyles();

  useOnClickOutside(true, target, () => onDismiss(false));

  const onSelected = React.useCallback((user: IUserInfo) => {
    console.log(user);
    setAppGlobalState({ ...appGlobalState, selectedUsers: [...selectedUsers, user] });
    onDismiss(false);
  }, []);

  React.useEffect(() => {
    if (searchValue.length < 2) return;
    setTimeout(async () => {
      setRenderUsers([]);
      const users: IUser[] = (await getUserByName(searchValue)) ?? [];
      const usersToRender: JSX.Element[] = [];
      const removeSelectedUsers = pullAllBy(users, selectedUsers, "mail");

      for (const user of removeSelectedUsers) {
        usersToRender.push(
          <>
            <UserCard
              userId={user.mail ?? ""}
              showOverCard={false}
              onSelected={onSelected}
              className={styles.userCardStyles}
              secondaryTextPropertyName={props.secondaryTextPropertyName}
            />
          </>
        );
      }
      if (usersToRender.length === 0) {
        usersToRender.push(
          <>
            <NoUser />
          </>
        );
      }
      setRenderUsers(usersToRender);
    }, 500);
  }, [searchValue, selectedUsers, getUserByName, onSelected]);

  if (renderUsers.length === 0 || !isOpen) return <></>;
  return (
    <>
      <Card className={styles.popupContainer}>{renderUsers}</Card>
    </>
  );
};
