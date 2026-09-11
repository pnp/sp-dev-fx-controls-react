import * as React from "react";
import { ListItemCommentsStateProvider } from "./components/ListItemCommentsStateProvider";
import { ServiceScope } from "@microsoft/sp-core-library";
import { AppContext } from "./common";
import { getTheme, IPalette } from "@fluentui/react/lib/Styling";
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

export const ListItemComments: React.FunctionComponent<IListItemCommentsProps> = (
  props: React.PropsWithChildren<IListItemCommentsProps>
) => {
  const { webUrl, listId, itemId, serviceScope, numberCommentsPerPage, label,highlightedCommentId } = props;

  // Read the host theme at render time (not at module load) so the SPFx theme is already applied; falls back to the default Fluent theme.
  const theme = React.useMemo<IPalette>(() => (window.__themeState__?.theme as unknown as IPalette) ?? getTheme().palette, []);

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
