var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { EventPopoverCard } from './EventPopoverCard';
import { mergeClasses } from '@fluentui/react-components';
import { useUtils } from './hooks/useUtils';
import { useWeekViewStyles } from './hooks/useWeekViewStyles';
export var EventRenderer = function (_a) {
    var _b, _c;
    var event = _a.event, eventCount = _a.eventCount, spanSlots = _a.spanSlots, rowHeight = _a.rowHeight, eventIndex = _a.eventIndex, view = _a.view;
    var _d = useWeekViewStyles(), styles = _d.styles, appyDynamicStyles = _d.appyDynamicStyles;
    var getEventColors = useUtils().getEventColors;
    var colors = getEventColors(event.category);
    // Memoize the function that determines the custom render function
    var customOnRenderEvent = view === 'day'
        ? (_b = event.onRenderInDayView) === null || _b === void 0 ? void 0 : _b.call(event, event)
        : (_c = event.onRenderInWeekView) === null || _c === void 0 ? void 0 : _c.call(event, event);
    if (React.isValidElement(customOnRenderEvent)) {
        return React.cloneElement(customOnRenderEvent, {
            event: event,
            className: mergeClasses(customOnRenderEvent.props.className, styles.eventCard, appyDynamicStyles(eventIndex, eventCount, rowHeight, spanSlots)),
            style: __assign({}, customOnRenderEvent.props.style),
        });
    }
    // Return  default card
    return (React.createElement(EventPopoverCard, { key: event.id, event: event, colors: colors, spanSlots: spanSlots, rowHeight: rowHeight, eventIndex: eventIndex, eventCount: eventCount }));
};
//# sourceMappingURL=EventRender.js.map