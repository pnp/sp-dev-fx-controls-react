import { AppContext } from "../common";
import { useContext, useCallback } from "react";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import { IlistItemCommentsResults } from "./../models";
import { IAddCommentPayload } from "../models/IAddCommentPayload";
import { IComment } from "../components/Comments/IComment";
import { PageContext } from "@microsoft/sp-page-context";
interface returnObject {
  getListItemComments: () => Promise<IlistItemCommentsResults>;
  getNextPageOfComments: (
    nextLink: string
  ) => Promise<IlistItemCommentsResults>;
  addComment: (comment: IAddCommentPayload) => Promise<IComment>;
  deleteComment: (commentId: number) => Promise<void>;
  likeComment: (commentId: number) => Promise<void>;
  unlikeComment: (commentId: number) => Promise<void>;
}

export const useSpAPI = (): returnObject => {
  const { serviceScope, webUrl, listId, itemId, numberCommentsPerPage } =
    useContext(AppContext);
  let _webUrl: string = '';
  serviceScope.whenFinished(async () => {
    _webUrl = serviceScope.consume(PageContext.serviceKey).web.absoluteUrl;
  });
  //https://contoso.sharepoint.com/sites/ThePerspective/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)?@a1=%27%7BE738C4B3%2D6CFF%2D493A%2DA8DA%2DDBBF4732E3BF%7D%27&@a2=%2729%27&@a3=%273%27

  const deleteComment = useCallback(
    async (commentId: number): Promise<void> => {
      const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      if (!spHttpClient) return;
      const _endPointUrl = `${
        webUrl ?? _webUrl
      }/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)?@a1='${listId}'&@a2='${itemId}'&@a3='${commentId}'`;
      const spOpts: ISPHttpClientOptions = {
        method: 'DELETE',
      };
      await spHttpClient.fetch(
        `${_endPointUrl}`,
        SPHttpClient.configurations.v1,
        spOpts
      );
      return;
    },
    [serviceScope]
  );

  const addComment = useCallback(
    async (comment: IAddCommentPayload): Promise<IComment> => {
      const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      if (!spHttpClient) return;
      const _endPointUrl = `${
        webUrl ?? _webUrl
      }/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1='${listId}'&@a2='${itemId}'`;
      const spOpts: ISPHttpClientOptions = {
        body: `{ "text": "${comment.text}", "mentions": ${JSON.stringify(
          comment.mentions
        )}}`,
      };
      const _listResults: SPHttpClientResponse = await spHttpClient.post(
        `${_endPointUrl}`,
        SPHttpClient.configurations.v1,
        spOpts
      );
      const _commentResults: IComment = (await _listResults.json()) as IComment;
      return _commentResults;
    },
    [serviceScope]
  );

  const likeComment = useCallback(
    async (commentId: number): Promise<void> => {
      const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      if (!spHttpClient) return;
      const _endPointUrl = `${
        webUrl ?? _webUrl
      }/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)/like?@a1='${listId}'&@a2='${itemId}'&@a3='${commentId}'`;

      const spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: 'application/json;odata=nometadata',
        },
      };
      await spHttpClient.post(
        `${_endPointUrl}`,
        SPHttpClient.configurations.v1,
        spOpts
      );
    },
    [serviceScope, webUrl, _webUrl, listId, itemId]
  );

  const unlikeComment = useCallback(
    async (commentId: number): Promise<void> => {
      const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      if (!spHttpClient) return;
      const _endPointUrl = `${
        webUrl ?? _webUrl
      }/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)/unlike?@a1='${listId}'&@a2='${itemId}'&@a3='${commentId}'`;

      const spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: 'application/json;odata=nometadata',
        },
      };
      await spHttpClient.post(
        `${_endPointUrl}`,
        SPHttpClient.configurations.v1,
        spOpts
      );
    },
    [serviceScope, webUrl, _webUrl, listId, itemId]
  );

  const getListItemComments =
    useCallback(async (): Promise<IlistItemCommentsResults> => {
      const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      if (!spHttpClient) return;
      const _endPointUrl = `${
        webUrl ?? _webUrl
      }/_api/web/lists(@a1)/GetItemById(@a2)/GetComments()?@a1='${listId}'&@a2='${itemId}'&$top=${
        numberCommentsPerPage ?? 10
      }&$expand=likedBy`;
      const _listResults: SPHttpClientResponse = await spHttpClient.get(
        `${_endPointUrl}`,
        SPHttpClient.configurations.v1
      );
      const _commentsResults = (await _listResults.json()) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      const _returnComments: IlistItemCommentsResults = {
        comments: _commentsResults.value,
        hasMore: _commentsResults['@odata.nextLink'] ? true : false,
        nextLink: _commentsResults['@odata.nextLink'] ?? undefined,
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
      const _commentsResults = (await _listResults.json()) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      const _returnComments: IlistItemCommentsResults = {
        comments: _commentsResults.value,
        hasMore: _commentsResults['@odata.nextLink'] ? true : false,
        nextLink: _commentsResults['@odata.nextLink'] ?? undefined,
      };
      return _returnComments;
    },
    [serviceScope]
  );

  return {
    getListItemComments,
    getNextPageOfComments,
    addComment,
    deleteComment,
    likeComment,
    unlikeComment,
  };
};
