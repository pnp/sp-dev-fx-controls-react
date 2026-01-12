/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { Caption1, Popover, PopoverSurface, PopoverTrigger, mergeClasses, useId, } from "@fluentui/react-components";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { Card } from "@nuvemerudita/react-controls";
import { EventDetailsPopover } from "./EventDetailsPopover";
import { useCalendarStyles } from "./hooks/useCalendarStyles";
import { useUtils } from "./hooks/useUtils";
export var RenderEventToDayOfMonth = function (props) {
    var headerId = useId();
    var events = props.events, date = props.date, onCardHoverChange = props.onCardHoverChange, columnHeight = props.columnHeight;
    var _a = useCalendarStyles(), styles = _a.styles, applyEventHouverColorClass = _a.applyEventHouverColorClass;
    var positioningRef = React.useRef(null);
    var _b = useUtils(), getEventColors = _b.getEventColors, getCalendarColors = _b.getCalendarColors;
    var handleMouseEnter = React.useCallback(function (eventTitle) {
        if (onCardHoverChange) {
            onCardHoverChange(true, eventTitle);
        }
    }, [onCardHoverChange]);
    var handleMouseLeave = React.useCallback(function (eventTitle) {
        if (onCardHoverChange) {
            onCardHoverChange(false, eventTitle);
        }
    }, [onCardHoverChange]);
    // Set the target for the popover
    var buttonRef = React.useCallback(function (el) {
        var _a;
        (_a = positioningRef.current) === null || _a === void 0 ? void 0 : _a.setTarget(el);
    }, [positioningRef]);
    // Render the card
    var renderCard = React.useCallback(function (index, calEvent, colors) {
        return (React.createElement("div", { ref: buttonRef },
            React.createElement(Card, { key: index, className: mergeClasses(styles.eventCard, applyEventHouverColorClass(colors.backgroundColor, colors.backgroundColor)), paddingTop: "4px", paddingBottom: "4px", paddingLeft: "8px", paddingRight: "8px", marginTop: index === 0 ? "0px" : "5px", cardHeader: React.createElement(Caption1, null, calEvent.title), onMouseEnter: function () { return handleMouseEnter(calEvent.title); }, onMouseLeave: function () { return handleMouseLeave(calEvent.title); } })));
    }, [handleMouseEnter, handleMouseLeave, applyEventHouverColorClass]);
    var renderCardWithPopOver = React.useCallback(function (calEvent, index, colors) {
        return (React.createElement(React.Fragment, null,
            React.createElement(Popover, { withArrow: true, key: index, mouseLeaveDelay: 30, closeOnScroll: true, closeOnIframeFocus: true, openOnHover: true },
                React.createElement(PopoverTrigger, null, renderCard(index, calEvent, colors)),
                React.createElement(PopoverSurface, { "aria-labelledby": headerId, className: mergeClasses(styles.popoverContent) },
                    React.createElement(EventDetailsPopover, { event: calEvent })))));
    }, [renderCard]);
    if (!events || !(events === null || events === void 0 ? void 0 : events.length))
        return React.createElement(React.Fragment, null, " ");
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { height: columnHeight }, className: styles.eventContainer }, events.map(function (calEvent, index) {
            var _a;
            var eventStart = startOfDay(new Date(calEvent.start));
            var eventEnd = endOfDay(new Date(calEvent.end));
            var isEventInDay = isWithinInterval(date, {
                start: eventStart,
                end: eventEnd,
            });
            if (!isEventInDay)
                return null;
            var colors = undefined;
            if (calEvent.color) {
                colors = getCalendarColors(calEvent.color);
            }
            else {
                colors = getEventColors(calEvent.category);
            }
            var customRender = (_a = calEvent.onRenderInMonthView) === null || _a === void 0 ? void 0 : _a.call(calEvent, calEvent);
            // If the event has a custom renderer, use it
            if (React.isValidElement(customRender)) {
                return React.cloneElement(customRender, {
                    className: mergeClasses(customRender.props.className, styles.eventCard),
                });
            }
            return calEvent.enableOnHover
                ? renderCardWithPopOver(calEvent, index, colors)
                : renderCard(index, calEvent, colors);
        }))));
};
//# sourceMappingURL=RenderEventToDayOfMonth.js.map