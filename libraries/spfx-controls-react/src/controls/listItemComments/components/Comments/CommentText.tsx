import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Mention } from "./IComment";
import { Text } from "@fluentui/react/lib/Text";
import { LivePersona } from "../../../LivePersona";
import { AppContext } from "../../common";
import regexifyString from "regexify-string";
import { Stack } from "@fluentui/react/lib/Stack";
import { isArray, isObject } from "lodash";
import he from 'he';
export interface ICommentTextProps {
  text: string;
  mentions: Mention[];
}

export const CommentText: React.FunctionComponent<ICommentTextProps> = (
  props: React.PropsWithChildren<ICommentTextProps>
) => {
  const [commentText, setCommentText] = useState<string | JSX.Element[]>("");
  const { theme, serviceScope } = useContext(AppContext);
  const { text, mentions } = props;
  const mentionsResults: Mention[] = mentions;

  useEffect(() => {
    const hasMentions = mentions?.length ? true : false;
    let result: string | JSX.Element[] = text;
    if (hasMentions) {
      result = regexifyString({
        pattern: /@mention&#123;\d+&#125;/g,
        decorator: (match, index) => {
          const mention = mentionsResults[index];
          const _name = `@${mention.name}`;
          return (
            <>
              <LivePersona
                serviceScope={serviceScope}
                upn={mention.email}
                template={<span style={{ color: theme.themePrimary, whiteSpace: "nowrap" }}>{_name}</span>}
              />
            </>
          );
        },
        input: text,
      }) as JSX.Element[];
    }
    setCommentText(result);
  }, []);

  return (
    <>
      <Stack wrap horizontal horizontalAlign="start" verticalAlign="center">
        {isArray(commentText) ? (
          (commentText as any[]).map((el, i) => { // eslint-disable-line @typescript-eslint/no-explicit-any
            if (isObject(el)) {
              return <span style={{ paddingRight: 5 }}>{el}</span>;
            } else {
              const _el: string = el.trim();
              if (_el.length) {
                return (
                  <Text style={{ paddingRight: 5 }} variant="small" key={i}>
                    {he.decode(_el)}
                  </Text>
                );
              }
            }
          })
        ) : (
          <Text variant="small">{he.decode(commentText)}</Text>
        )}
      </Stack>
    </>
  );
};
