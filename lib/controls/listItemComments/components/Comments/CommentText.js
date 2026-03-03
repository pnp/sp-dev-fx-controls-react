import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { Text } from "@fluentui/react/lib/Text";
import { LivePersona } from "../../../LivePersona";
import { AppContext, URL_REGEX } from '../../common';
import regexifyString from 'regexify-string';
import { Stack } from '@fluentui/react/lib/Stack';
import { isArray, isObject } from 'lodash';
import he from 'he';
import { Link } from '@fluentui/react';
export var CommentText = function (props) {
    var _a = useState(""), commentText = _a[0], setCommentText = _a[1];
    var _b = useContext(AppContext), theme = _b.theme, serviceScope = _b.serviceScope;
    var text = props.text, mentions = props.mentions;
    var mentionsResults = mentions;
    useEffect(function () {
        var hasMentions = (mentions === null || mentions === void 0 ? void 0 : mentions.length) ? true : false;
        var result = text;
        if (hasMentions) {
            result = regexifyString({
                pattern: /@mention&#123;\d+&#125;/g,
                decorator: function (match, index) {
                    var mention = mentionsResults[index];
                    var _name = "@".concat(mention.name);
                    return (React.createElement(React.Fragment, null,
                        React.createElement(LivePersona, { serviceScope: serviceScope, upn: mention.email, template: React.createElement("span", { style: { color: theme.themePrimary, whiteSpace: "nowrap" } }, _name) })));
                },
                input: text,
            });
        }
        setCommentText(result);
    }, []);
    var convertTextToLinksAndText = function (text) {
        var parts = text.split(URL_REGEX);
        return parts.map(function (part, index) {
            if (part.match(URL_REGEX)) {
                return (React.createElement(Link, { key: index, href: part, target: "_blank", rel: "noopener noreferrer", style: { color: theme.link } }, part));
            }
            return part;
        });
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { wrap: true, horizontal: true, horizontalAlign: "start", verticalAlign: "center" }, isArray(commentText) ? (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        commentText.map(function (el, i) {
            if (isObject(el)) {
                return (React.createElement("span", { key: i, style: { paddingRight: 5 } }, el));
            }
            else {
                var _el = el.trim();
                if (_el.length) {
                    return (React.createElement(Text, { style: { paddingRight: 5 }, variant: "small", key: i }, convertTextToLinksAndText(he.decode(_el))));
                }
            }
        })) : (React.createElement(Text, { variant: "small" }, convertTextToLinksAndText(he.decode(commentText)))))));
};
//# sourceMappingURL=CommentText.js.map