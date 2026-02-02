import * as React from "react";
import { Caption1, Caption1Strong, Card, Popover, PopoverSurface, PopoverTrigger, mergeClasses, useId, } from "@fluentui/react-components";
import { EventDetailsPopover } from "./EventDetailsPopover";
import { Stack } from "@nuvemerudita/react-controls";
import { useUtils } from "./hooks/useUtils";
import { useWeekViewStyles } from "./hooks/useWeekViewStyles";
export var EventPopoverCard = function (_a) {
    var event = _a.event, colors = _a.colors, spanSlots = _a.spanSlots, rowHeight = _a.rowHeight, eventIndex = _a.eventIndex, eventCount = _a.eventCount;
    var headerId = useId();
    var _b = useWeekViewStyles(), styles = _b.styles, applyEventHouverColorClass = _b.applyEventHouverColorClass, appyDynamicStyles = _b.appyDynamicStyles;
    var cardRef = React.useRef(null);
    var formatDate = useUtils().formatDate;
    var cardContent = React.useMemo(function () { return (React.createElement("div", null,
        React.createElement(Stack, { columnGap: 4, verticalAlign: "center" },
            React.createElement(Caption1Strong, { className: styles.eventTitle }, event.title),
            React.createElement(Stack, { columnGap: 4, horizontal: true, verticalAlign: "center", horizontalAlign: "start" },
                React.createElement(Caption1, null,
                    formatDate(event.start, "HH:mm"),
                    "H"),
                " - ",
                React.createElement(Caption1, null,
                    formatDate(event.end, "HH:mm"),
                    "H"))))); }, [event]);
    return (React.createElement(Card, { ref: cardRef, key: event.id, className: mergeClasses(styles.eventCard, applyEventHouverColorClass(colors.backgroundColor, colors.backgroundColor), appyDynamicStyles(eventIndex, eventCount, rowHeight, spanSlots)) }, event.enableOnHover ? (React.createElement(Popover, { withArrow: true, mouseLeaveDelay: 50, closeOnScroll: true, closeOnIframeFocus: true, openOnHover: true },
        React.createElement(PopoverTrigger, null, cardContent),
        React.createElement(PopoverSurface, { "aria-labelledby": headerId, className: mergeClasses(styles.popoverContent) },
            React.createElement(EventDetailsPopover, { event: event })))) : (cardContent)));
};
//# sourceMappingURL=EventPopoverCard.js.map