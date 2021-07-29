import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import { IRenderFunction } from "@fluentui/utilities";
import uniqBy from "lodash/uniqBy";
import {
  ContextualMenu,
  ContextualMenuItemType,
  IContextualMenuItem,
  IContextualMenuListProps,
} from "office-ui-fabric-react/lib/ContextualMenu";
import * as React from "react";
import { useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext, useMsGraphAPI } from "../..";

import { IUserInfo, IUsersResults } from "../../models/IUsersResults";
import { RenderError } from "../Comments/RenderError";
import { RenderUser } from "../Comments/RenderUser/RenderUser";
import { useListItemCommentsStyles } from "../Comments/useListItemCommentsStyles";
import { IErrorInfo } from "../ErrorInfo/IErrorInfo";

export interface ISelectUsersProps {
  search?: string;
  showList: boolean;
  onDismis: () => void;
  onSelectUser: (user: IUserInfo) => void;
  target: any;
}

export const SelectUsers: React.FunctionComponent<ISelectUsersProps> = (
  props: React.PropsWithChildren<ISelectUsersProps>
) => {
  const { getUsers } = useMsGraphAPI();
  const { search, showList, onDismis, onSelectUser, target } = props;
  const [userInfo, setUserInfo] = useState<IUsersResults>();
  const [ isLoading, setIsLoading] = useState(false);
  const { listItemCommentsState, setlistItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { userListContainerStyles } = useListItemCommentsStyles();
  const [errorInfo, setErrorInfo] = useState<IErrorInfo>({} as IErrorInfo);
  const { comments } = listItemCommentsState;
  const renderUserList = React.useCallback(
    (menuListProps: IContextualMenuListProps, defaultRender: IRenderFunction<IContextualMenuListProps>) => {
      return <Stack styles={userListContainerStyles}>{defaultRender(menuListProps)}</Stack>;
    },
    []
  );

  const contextualMenuItems = useMemo((): IContextualMenuItem[] => {
    const { showError, error } = errorInfo;
    const _items: IContextualMenuItem[] = [
      {
        key: "sugestions",
        itemType: ContextualMenuItemType.Header,
        text: "Suggestions",
      },
      {
        key: "div",
        itemType: ContextualMenuItemType.Divider,
      },
    ];

    if (showError) {
      _items.push({
        key: "error",
        onRender: () => {
          return <RenderError errorInfo={errorInfo} />;
        },
      });
    }

    if (isLoading && !showError) {
      _items.push({
        key: "loading",
        onRender: () => {
          return (
            <Stack horizontal horizontalAlign="center">
              <Spinner size={SpinnerSize.medium}></Spinner>
            </Stack>
          );
        },
      });
    } else {
      const { users } = userInfo || ({} as IUsersResults);
      if (!users) return;
      for (const user of users) {
        _items.push({
          key: user.id,
          data: user,
          onRender: () => {
            return <RenderUser user={user} />;
          },
        });
      }
    }
    return _items;
  }, [userInfo, isLoading]);

  useEffect(() => {
    (async () => {
      let _usersInfo: IUsersResults = {} as IUsersResults;
      setIsLoading(true);
      try {
        const _p1 = search.indexOf("@");
        if (_p1 !== -1) {
          const _stringArray = search.split("");
          let _searchString: string = "";
          for (let index = _p1 + 1; index < _stringArray.length; index++) {
            const element = _stringArray[index];
            if (element !== "") {
              _searchString = _searchString + _stringArray[index];
            } else {
              break;
            }
          }
          if (!_searchString) {
            const _users: IUserInfo[] = [];
            for (const comment of comments) {
              const { mentions } = comment;
              for (const mention of mentions) {
                _users.push({ displayName: mention.name, mail: mention.email, id: mention.id.toString() });
              }
            }
            _usersInfo = { users: uniqBy(_users, "mail") };
          } else {
            _usersInfo = await getUsers(_searchString);
          }
        }
        setErrorInfo({ showError: false, error: undefined });
        setUserInfo(_usersInfo);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        const _errorInfo: IErrorInfo = { showError: true, error: error };
        setErrorInfo(_errorInfo);
      }
    })();
  }, [search]);

  return (
    <>
      <ContextualMenu
        onRenderMenuList={renderUserList}
        items={contextualMenuItems}
        hidden={!showList}
        target={target}
        onItemClick={(
          ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>,
          item?: IContextualMenuItem
        ) => {
          onSelectUser(item.data);
          onDismis();
        }}
        onDismiss={onDismis}
      />
    </>
  );
};
