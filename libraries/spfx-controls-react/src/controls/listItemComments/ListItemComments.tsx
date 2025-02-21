import * as React from "react";
import { ListItemCommentsStateProvider } from "./components/ListItemCommentsStateProvider";
import { ServiceScope } from "@microsoft/sp-core-library";
import { AppContext } from "./common";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Theme } from "spfx-uifabric-themes"; // Don't remove this import is need to theme load form global var from window object
import { CommentsList } from "./components/Comments/CommentsList";
import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";

export interface IListItemCommentsProps {
  webUrl?: string;
  listId: string;
  itemId: string;
  serviceScope: ServiceScope;
  numberCommentsPerPage?: 5 | 10 | 15 | 20;
  label?: string;
  highlightedCommentId?:string;
}
const theme = window.__themeState__.theme;
export const ListItemComments: React.FunctionComponent<IListItemCommentsProps> = (
  props: React.PropsWithChildren<IListItemCommentsProps>
) => {
  const { webUrl, listId, itemId, serviceScope, numberCommentsPerPage, label,highlightedCommentId } = props;

  if (!listId && !itemId && !serviceScope) return;

  return (
    <>
      <ListItemCommentsStateProvider>
        <AppContext.Provider
          value={{
            webUrl: webUrl,
            listId: listId,
            itemId: itemId,
            theme: theme,
            serviceScope: serviceScope,
            label: label,
            highlightedCommentId:highlightedCommentId,
            numberCommentsPerPage: numberCommentsPerPage,
          }}
        >
        <Stack>
        <Text variant={"medium"} style={{fontWeight: 600}}>{label}</Text>
        <CommentsList/>
        </Stack>
        </AppContext.Provider>
      </ListItemCommentsStateProvider>
    </>
  );
};
