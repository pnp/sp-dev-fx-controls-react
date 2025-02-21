/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { EventPopoverCard } from "./EventPopoverCard";
import { IEvent } from "./models/IEvents";
import {
 mergeClasses,
} from "@fluentui/react-components";
import { useUtils } from "./hooks/useUtils";
import { useWeekViewStyles } from "./hooks/useWeekViewStyles";

interface IEventRendererProps {
  event: IEvent;
  eventCount: number;
  spanSlots: number;
  rowHeight: number;
  eventIndex: number;
  view: "day" | "week";
}

export const EventRenderer: React.FC<IEventRendererProps> = ({
  event,
  eventCount,
  spanSlots,
  rowHeight,
  eventIndex,
  view,
}) => {
  const { styles } = useWeekViewStyles();
  const { getEventColors } = useUtils();
  const colors = getEventColors(event.category as string);

  // Memoize the function that determines the custom render function
  const customOnRenderEvent = React.useCallback(() => {
    return view === "day" ? event.onRenderInDayView : event.onRenderInWeekView;
  }, [event, view]);

  if (React.isValidElement(customOnRenderEvent)) {
    return React.cloneElement(customOnRenderEvent as React.ReactElement, {
      event,
      className: mergeClasses(
        (customOnRenderEvent.props as any).className,
        styles.eventCard
      ),
      style: {
        ...(customOnRenderEvent.props as any).style,
        flex: `0 0 calc(100% / ${eventCount})`,
        height: `${rowHeight * spanSlots}px`, // Dynamically calculate height
        left: `${eventIndex * 10}%`, // Adjust for overlapping events
        width: `calc(${100 - eventIndex * 10}% - 8px)`, // Adjust width for overlap
        margin: 4, // Add margin for spacing
      },
    });
  }

  // Return  default card
  return (

        <EventPopoverCard
          key={event.id}
          event={event}
          colors={colors}
          spanSlots={spanSlots}
          rowHeight={rowHeight}
          eventIndex={eventIndex}
          eventCount={eventCount}
        />


  );
};
