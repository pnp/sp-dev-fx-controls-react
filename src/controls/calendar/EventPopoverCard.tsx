import * as React from "react";

import {
  Caption1,
  Caption1Strong,
  Card,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  mergeClasses,
  useId,
} from "@fluentui/react-components";

import { EventDetailsPopover } from "./EventDetailsPopover";
import { IEvent } from "./models/IEvents";
import { Stack } from "@nuvemerudita/react-controls";
import { useUtils } from "./hooks/useUtils";
import { useWeekViewStyles } from "./hooks/useWeekViewStyles";

interface EventPopoverCardProps {
  event: IEvent;
  colors: { backgroundColor: string; hoverColor: string };
  spanSlots: number;
  rowHeight: number;
  eventIndex: number;
  eventCount: number;
}

export const EventPopoverCard: React.FC<EventPopoverCardProps> = ({
  event,
  colors,
  spanSlots,
  rowHeight,
  eventIndex,
  eventCount,
}) => {
  const headerId = useId();
  const { styles, applyEventHouverColorClass, appyDynamicStyles } =
    useWeekViewStyles();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const { formatDate } = useUtils();

  const cardContent = React.useMemo(
    () => (
      <div>
        <Stack columnGap={4} verticalAlign="center">
          <Caption1Strong className={styles.eventTitle}>
            {event.title}
          </Caption1Strong>
          <Stack
            columnGap={4}
            horizontal
            verticalAlign="center"
            horizontalAlign="start"
          >
            <Caption1>{formatDate(event.start, "HH:mm")}H</Caption1>
            {" - "}
            <Caption1>{formatDate(event.end, "HH:mm")}H</Caption1>
          </Stack>
        </Stack>
      </div>
    ),
    [event],
  );

  return (
    <Card
      ref={cardRef}
      key={event.id}
      className={mergeClasses(
        styles.eventCard,
        applyEventHouverColorClass(
          colors.backgroundColor,
          colors.backgroundColor,
        ),
        appyDynamicStyles(eventIndex, eventCount, rowHeight, spanSlots),
      )}
    >
      {event.enableOnHover ? (
        <Popover
          withArrow
          mouseLeaveDelay={50}
          closeOnScroll={true}
          closeOnIframeFocus={true}
          openOnHover
        >
          <PopoverTrigger>{cardContent}</PopoverTrigger>
          <PopoverSurface
            aria-labelledby={headerId}
            className={mergeClasses(styles.popoverContent)}
          >
            <EventDetailsPopover event={event} />
          </PopoverSurface>
        </Popover>
      ) : (
        cardContent
      )}
    </Card>
  );
};
