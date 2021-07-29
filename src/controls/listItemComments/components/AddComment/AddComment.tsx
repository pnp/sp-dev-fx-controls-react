import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { useContext, useRef, useState } from "react";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext, useMsGraphAPI } from "../..";
import { IUserInfo } from "../../models/IUsersResults";
import { IErrorInfo } from "../ErrorInfo/IErrorInfo";
import { MentionsInput, Mention, SuggestionDataItem } from "react-mentions";
import { useCallback } from "react";
import { useAddCommentStyles } from "./useAddCommentStyles";
import { PHOTO_URL } from "../../common/constants";
import { IconButton, Text } from "@fluentui/react";
import { ECommentAction } from "../../common/ECommentAction";

export interface IAddCommentProps {}

export const AddComment: React.FunctionComponent<IAddCommentProps> = () => {
  const [commentText, setCommentText] = useState<any>("");
  const { getUsers, getSuggestions } = useMsGraphAPI();
  const { setlistItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { reactMentionStyles, mentionsClasses, componentClasses } = useAddCommentStyles();
  const [singleLine, setSingleLine] = useState<boolean>(true);
  const [, setErrorInfo] = useState<IErrorInfo>({} as IErrorInfo);
  let sugestionsContainer = useRef<HTMLDivElement>();
  let _reactMentionStyles = reactMentionStyles;

  const _onChange = useCallback((event, newValue) => {
    let _reactMentionStyles = reactMentionStyles;
    if (newValue) {
      setSingleLine(false);
      _reactMentionStyles["&multiLine"].control = { height: 63 };
    } else {
      setSingleLine(true);
      _reactMentionStyles["&multiLine"].control = { height: 35 };
    }

    setCommentText(newValue);
  }, []);

  const _addComment = useCallback(() => {
    // TODO call API to Add Comment
    setlistItemCommentsState({ type: EListItemCommentsStateTypes.SET_COMMENT_ACTION, payload: ECommentAction.ADD });
    setCommentText("");
  }, []);

  const _searchData = (search: string, callback: (users: SuggestionDataItem[]) => void) => {
    // Try to get sugested users from recent comments when user type '@'
    if (!search) {
      getSuggestions()
        .then((res) => res.users.map((user) => ({ display: user.displayName, id: user.mail })))
        .then(callback);
    } else {
      getUsers(search)
        .then((res) => res.users.map((user) => ({ display: user.displayName, id: user.mail })))
        .then(callback);
    }
  };

  const renderSugestion = useCallback((suggestion: SuggestionDataItem): React.ReactNode => {
    const _user: IUserInfo = {
      id: suggestion.id as string,
      displayName: suggestion.display,
      mail: suggestion.id as string,
    };
    return (
      <>
        <Stack tokens={{ padding: 5 }} styles={{ root: { width: 260 } }}>
          <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 10 }}>
            <img src={`${PHOTO_URL}${_user.mail}`} width={30} height={30} style={{ borderRadius: "50%" }} />
            <Stack>
              <Text styles={{ root: { fontWeight: 700 } }} variant="smallPlus" nowrap>
                {_user.displayName}
              </Text>
              <Text variant="small" nowrap>
                {_user.mail}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  }, []);

  return (
    <>
      <div
        id="renderSugestions"
        ref={(el) => {
          sugestionsContainer.current = el;
        }}
      ></div>
      <div className={componentClasses.container} style={{ height: singleLine ? 35 : "unset" }}>
        <MentionsInput
          value={commentText}
          onChange={_onChange}
          placeholder="@mention or comment"
          style={_reactMentionStyles}
          suggestionsPortalHost={sugestionsContainer.current}
        >
          <Mention
            trigger="@"
            data={_searchData}
            renderSuggestion={renderSugestion}
            displayTransform={(id, display) => `@${display}`}
            className={mentionsClasses.mention}
          />
        </MentionsInput>
        <Stack horizontal horizontalAlign="end" tokens={{ padding: 10 }}>
          <IconButton
            iconProps={{ iconName: "send" }}
            title="Send"
            onClick={() => {
              _addComment();
            }}
          />
        </Stack>
      </div>
    </>
  );
};
