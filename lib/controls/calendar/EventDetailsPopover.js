import * as React from 'react';
import { AvatarGroup, AvatarGroupItem, AvatarGroupPopover, Badge, Body1, Button, Divider, Subtitle1, partitionAvatarGroupItems, } from '@fluentui/react-components';
import { Card, RenderLabel, Stack } from '@nuvemerudita/react-controls';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useUtils } from './hooks/useUtils';
var PADDING_LEFT = '32px';
var useStyles = function () {
    var styles = {
        banner: css({
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            padding: "5px 10px 0px 10px",
        }),
        fieldContainer: css({
            paddingLeft: PADDING_LEFT,
        }),
    };
    return { styles: styles };
};
var RenderProperty = function (_a) {
    var fieldLabel = _a.fieldLabel, fieldValue = _a.fieldValue, icon = _a.icon;
    return (React.createElement(Stack, null,
        React.createElement(RenderLabel, { label: fieldLabel, icon: icon }),
        React.createElement(Stack, { paddingLeft: PADDING_LEFT },
            React.createElement(Body1, null, fieldValue))));
};
export var EventDetailsPopover = function (props) {
    var event = props.event;
    var title = event.title, start = event.start, end = event.end, location = event.location, category = event.category, attendees = event.attendees, webLink = event.webLink;
    var styles = useStyles().styles;
    var formatDate = useUtils().formatDate;
    var formatedStartDate = formatDate(start, 'PPp');
    var formatedEndDate = formatDate(end, 'PPp');
    var partitionedItems = partitionAvatarGroupItems({
        items: (attendees === null || attendees === void 0 ? void 0 : attendees.map(function (attendee) { return attendee.id; })) || [],
    });
    var getAttendee = React.useCallback(function (id) {
        return (attendees === null || attendees === void 0 ? void 0 : attendees.find(function (attendee) { return attendee.id === id; })) || undefined;
    }, [attendees]);
    var RenderAttendees = React.useCallback(function () {
        return (React.createElement(Stack, null,
            React.createElement(RenderLabel, { label: strings.CalendarControlAttendeessLabel, icon: 'ph:users-three' }),
            React.createElement(Stack, { paddingLeft: PADDING_LEFT },
                React.createElement(AvatarGroup, { layout: "stack" },
                    partitionedItems.inlineItems.map(function (id) {
                        var _a, _b;
                        return (React.createElement(AvatarGroupItem, { name: (_a = getAttendee(id)) === null || _a === void 0 ? void 0 : _a.name, key: id, image: { src: (_b = getAttendee(id)) === null || _b === void 0 ? void 0 : _b.imageUrl } }));
                    }),
                    partitionedItems.overflowItems && (React.createElement(AvatarGroupPopover, null, partitionedItems.overflowItems.map(function (id) {
                        var _a, _b;
                        return (React.createElement(AvatarGroupItem, { name: (_a = getAttendee(id)) === null || _a === void 0 ? void 0 : _a.name, key: id, image: { src: (_b = getAttendee(id)) === null || _b === void 0 ? void 0 : _b.imageUrl } }));
                    })))))));
    }, [partitionedItems]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { appearance: "subtle", padding: "m", paddingTop: 's', width: "250px", cardBody: React.createElement(Stack, { RowGap: 10 },
                React.createElement("div", { className: styles.banner },
                    React.createElement(Subtitle1, null, title)),
                React.createElement(Divider, null),
                category && (React.createElement(Stack, { horizontal: true, horizontalAlign: "end", width: '100%' },
                    React.createElement(Badge, { appearance: "filled" }, category))),
                React.createElement(RenderProperty, { fieldLabel: "Start", fieldValue: formatedStartDate, icon: 'mingcute:time-line' }),
                React.createElement(RenderProperty, { fieldLabel: "End", fieldValue: formatedEndDate, icon: 'mingcute:time-line' }),
                React.createElement(RenderProperty, { fieldLabel: "Location", fieldValue: location, icon: 'mingcute:location-line' }),
                React.createElement(RenderAttendees, null)), cardFooterContent: React.createElement(Stack, { horizontal: true, horizontalAlign: "end", width: "100%" },
                React.createElement(Button, { appearance: "subtle", onClick: function () {
                        window.open(webLink, '_blank');
                    } }, strings.CalendarControlDetailsLabel)) })));
};
//# sourceMappingURL=EventDetailsPopover.js.map