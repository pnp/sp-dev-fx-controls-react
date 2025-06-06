import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Mention } from "./IComment";
import { Text } from "@fluentui/react/lib/Text";
import { LivePersona } from "../../../LivePersona";
import { AppContext, URL_REGEX } from '../../common';
import regexifyString from 'regexify-string';
import { Stack } from '@fluentui/react/lib/Stack';
import { isArray, isObject } from 'lodash';
import he from 'he';
import { Link } from '@fluentui/react';
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

  const convertTextToLinksAndText = (
    text: string
  ): (string | JSX.Element)[] => {
    const parts = text.split(URL_REGEX);
    return parts.map((part, index) => {
      if (part.match(URL_REGEX)) {
        return (
          <Link
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: theme.link }}
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <>
      <Stack wrap horizontal horizontalAlign="start" verticalAlign="center">
        {isArray(commentText) ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (commentText as any[]).map((el, i) => {
            if (isObject(el)) {
              return (
                <span key={i} style={{ paddingRight: 5 }}>
                  {el}
                </span>
              );
            } else {
              const _el: string = el.trim();
              if (_el.length) {
                return (
                  <Text style={{ paddingRight: 5 }} variant="small" key={i}>
                    {convertTextToLinksAndText(he.decode(_el))}
                  </Text>
                );
              }
            }
          })
        ) : (
          <Text variant="small">
            {convertTextToLinksAndText(he.decode(commentText))}
          </Text>
        )}
      </Stack>
    </>
  );
};
