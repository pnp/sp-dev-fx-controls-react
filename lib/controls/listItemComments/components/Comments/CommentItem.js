import * as React from "react";
import { useMemo } from "react";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import { ActivityItem } from "@fluentui/react/lib/ActivityItem";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { CommentText } from "./CommentText";
import { isEmpty } from "lodash";
var PHOTO_URL = "/_layouts/15/userphoto.aspx?size=M&accountname=";
export var CommentItem = function (props) {
    if (isEmpty(props.comment))
        return null;
    var _a = props.comment, author = _a.author, createdDate = _a.createdDate, text = _a.text, mentions = _a.mentions;
    var activityDescription = useMemo(function () {
        var _activity = [];
        _activity.push(React.createElement(Text, { variant: "smallPlus", styles: { root: { fontWeight: 700 } } }, author.name));
        _activity.push(React.createElement(CommentText, { text: text, mentions: mentions }));
        return _activity;
    }, [mentions, text]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, null,
            React.createElement(ActivityItem, { activityPersonas: [{ imageUrl: "".concat(PHOTO_URL).concat(author.email) }], activityDescription: activityDescription, timeStamp: format(parseISO(createdDate), "PPpp") }))));
};
//# sourceMappingURL=CommentItem.js.map