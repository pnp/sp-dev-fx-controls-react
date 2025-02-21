/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";

import { useAtom } from "jotai";
import { pullAllBy } from "lodash";

import {
  Card,
  Spinner,
} from "@fluentui/react-components";
import { User as IUser } from "@microsoft/microsoft-graph-types";

import { globalState } from "./atoms/globalState";
import { EMessageType } from "./constants/EMessageTypes";
import { useGraphUserAPI } from "./hooks/useGraphUserAPI";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { IUserInfo } from "./models/IUserInfo";
import { ShowMessage } from "./showMessage/ShowMessage";
import { NoUser } from "./userCard/NoUser";
import { UserCard } from "./userCard/UserCard";
import { useUserPickerStyles } from "./useUserPickerStyles";

interface IPopUpMenuProps {
  isOpen: boolean;
  searchValue: string;
  onDismiss: (open?: boolean) => void;
  containerRef: React.MutableRefObject<HTMLDivElement>;

  secondaryTextPropertyName?:
    | "jobTitle"
    | "department"
    | "mail"
    | "officeLocation"
    | "mobilePhone"
    | "businessPhones"
    | "userPrincipalName";
}

export const PopUpMenu = (props: IPopUpMenuProps): JSX.Element => {
  const { searchValue, isOpen, onDismiss, containerRef , secondaryTextPropertyName} = props;
  const [appGlobalState, setAppGlobalState] = useAtom(globalState);
  const { context, selectedUsers } = appGlobalState;
  const [renderUsers, setRenderUsers] = React.useState<JSX.Element[]>([]);
  const { getUserByName } = useGraphUserAPI(context);
  const styles = useUserPickerStyles();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const [isSearching, setIsSearching] = React.useState<boolean>(false);
  useOnClickOutside(true, containerRef, () => onDismiss(false));

  const onSelected = React.useCallback((user: IUserInfo) => {
    setAppGlobalState({ ...appGlobalState, selectedUsers: [...selectedUsers, user] });
    onDismiss(false);
  }, []);

  const RenderUsers = React.useCallback((): JSX.Element => {

    if (error) return <ShowMessage messageType={EMessageType.ERROR} message={error.message} />;
    if (!isLoading && !error) return <div className={styles.usersContainer}>{renderUsers}</div>;
    return <></>;
  }, [isLoading, error, renderUsers, styles.usersContainer]);

  React.useEffect(() => {
    if (searchValue.length < 2) return;
    if (isSearching) return;
    setIsSearching(true);
    setTimeout(async () => {
      try {
        setIsLoading(true);
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
                secondaryTextPropertyName={secondaryTextPropertyName}
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
        setIsSearching(false);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  }, [searchValue, selectedUsers, getUserByName, onSelected, secondaryTextPropertyName]);

  if (!isOpen) return <></>;
  return (
    <>
      <Card ref={containerRef} className={styles.popupContainer}>
        {
          isLoading && !error ? <Spinner size="small" /> : <RenderUsers />
        }
      </Card>
    </>
  );
};
