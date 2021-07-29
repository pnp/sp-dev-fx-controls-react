import { AppContext } from "../common";
import { useContext, useCallback } from "react";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IlistItemCommentsResults } from "./../models";

export const useSpAPI = () => {
  const { serviceScope, webUrl, listId, itemId, numberCommentsPerPage } = useContext(AppContext);
  const getListItemComments = useCallback(async (): Promise<IlistItemCommentsResults> => {
    const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
    if (!spHttpClient) return;
    const _endPointUrl = `${webUrl}/_api/web/lists(@a1)/GetItemById(@a2)/GetComments()?@a1='${listId}'&@a2='${itemId}'&$top=${
      numberCommentsPerPage ?? 10
    }`;
    const _listResults: SPHttpClientResponse = await spHttpClient.get(
      `${_endPointUrl}`,
      SPHttpClient.configurations.v1
    );
    const _commentsResults = (await _listResults.json()) as any;
    const _returnComments: IlistItemCommentsResults = {
      comments: _commentsResults.value,
      hasMore: _commentsResults["@odata.nextLink"] ? true : false,
      nextLink: _commentsResults["@odata.nextLink"] ?? undefined,
    };
    return _returnComments;
  }, [serviceScope]);

  const getNextPageOfComments = useCallback(
    async (nextLink: string): Promise<IlistItemCommentsResults> => {
      const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      if (!spHttpClient || !nextLink) return;
      const _endPointUrl = nextLink;
      const _listResults: SPHttpClientResponse = await spHttpClient.get(
        `${_endPointUrl}`,
        SPHttpClient.configurations.v1
      );
      const _commentsResults = (await _listResults.json()) as any;
      const _returnComments: IlistItemCommentsResults = {
        comments: _commentsResults.value,
        hasMore: _commentsResults["@odata.nextLink"] ? true : false,
        nextLink: _commentsResults["@odata.nextLink"] ?? undefined,
      };
      return _returnComments;
    },
    [serviceScope]
  );

  return { getListItemComments, getNextPageOfComments };
};
