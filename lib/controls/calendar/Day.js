import * as React from 'react';
import { Body2, mergeClasses } from '@fluentui/react-components';
import { Card } from '@nuvemerudita/react-controls';
import { RenderEventToDayOfMonth } from './RenderEventToDayOfMonth';
import { Stack } from '@nuvemerudita/react-controls';
import { isSameDay } from 'date-fns';
import { useCalendarStyles } from './hooks/useCalendarStyles';
export var Day = function (props) {
    var day = props.day, currentMonth = props.currentMonth, events = props.events, date = props.date, columnHeight = props.columnHeight, onDayClick = props.onDayClick;
    var styles = useCalendarStyles().styles;
    var currentDate = new Date();
    var _a = React.useState(false), isEventHovered = _a[0], setIsEventHovered = _a[1];
    var isCurrentDayAndMonth = React.useMemo(function () {
        return isSameDay(date, currentDate);
    }, [date, currentDate]);
    var renderCurrentDayLabel = React.useMemo(function () {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", paddingLeft: 'm', paddingRight: 'm' },
            React.createElement(Body2, { className: styles.currentDayLabel },
                day,
                " ",
                currentDate.toLocaleString('default', { month: 'short' }))));
    }, [day]);
    var handleCardHoverChange = React.useCallback(function (isHovered) {
        setIsEventHovered(isHovered);
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { onClick: onDayClick ? function () { return onDayClick(date); } : undefined, className: mergeClasses(styles.cardDay, currentMonth ? '' : styles.otherMonthDay, isCurrentDayAndMonth ? styles.currentDay : '', !isEventHovered ? styles.cardDayOnHover : ''), cardHeader: isCurrentDayAndMonth ? (renderCurrentDayLabel) : (React.createElement(Stack, { horizontal: true, paddingLeft: 'm', paddingRight: 'm' },
                React.createElement(Body2, null, day))), paddingTop: "m", paddingBottom: "m", paddingLeft: "0px", paddingRight: "0px", cardBody: React.createElement(RenderEventToDayOfMonth, { events: events, date: date, onCardHoverChange: handleCardHoverChange, columnHeight: columnHeight - 60 }) })));
};
//# sourceMappingURL=Day.js.map