import * as React from "react";
import { ListItemCommentsStateProvider } from "./components/ListItemCommentsStateProvider";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { ServiceScope } from "@microsoft/sp-core-library";
import { AppContext } from "./common";
import { Theme } from "spfx-uifabric-themes"; // Don't remove this import is need to theme load form global var from window object
import { CommentsList } from "./components/Comments/CommentsList";
export interface IListItemCommentsProps {
  webUrl: string;
  listId: string;
  itemId: string;
  themeVariant?: IReadonlyTheme;
  serviceScope: ServiceScope;
  numberCommentsPerPage?: 5 | 10 | 15 | 20;
}
const theme = window.__themeState__.theme;
export const ListItemComments: React.FunctionComponent<IListItemCommentsProps> = (
  props: React.PropsWithChildren<IListItemCommentsProps>
) => {
  return (
    <>
      <ListItemCommentsStateProvider>
        <AppContext.Provider
          value={{
            webUrl: props.webUrl,
            listId: props.listId,
            itemId: props.itemId,
            theme: theme,
            serviceScope: props.serviceScope,
            numberCommentsPerPage: props.numberCommentsPerPage,
          }}
        >
          <CommentsList></CommentsList>
        </AppContext.Provider>
      </ListItemCommentsStateProvider>
    </>
  );
};
