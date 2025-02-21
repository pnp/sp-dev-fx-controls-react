import * as React from 'react';

import {
  Body1,
  Body1Strong,
  Card,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  mergeClasses,
  useId,
} from '@fluentui/react-components';

import { EventDetailsPopover } from './EventDetailsPopover';
import { IEvent } from './models/IEvents';
import { Stack } from '@nuvemerudita/react-controls';
import { format } from 'date-fns';
import { useWeekViewStyles } from './hooks/useWeekViewStyles';

// Assuming Stack is part of your library

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
  const { styles, applyEventHouverColorClass } = useWeekViewStyles();
  const cardRef = React.useRef<HTMLDivElement>(null);


  const cardContent = React.useMemo(
    () => (
      <div>
        <Stack columnGap={4} verticalAlign="center">
          <Body1Strong className={styles.eventTitle}>{event.title}</Body1Strong>
          <Stack
            columnGap={4}
            horizontal
            verticalAlign="center"
            horizontalAlign="start"
          >
            <Body1>{format(new Date(event.start), "HH:mm")}H</Body1>
            {" - "}
            <Body1>{format(new Date(event.end), "HH:mm")}H</Body1>
          </Stack>
        </Stack>
      </div>
    ),
    [event]
  );

  return (
    <Card
      ref={cardRef}
      key={event.id}
      className={mergeClasses(
        styles.eventCard,
        applyEventHouverColorClass(colors.backgroundColor, colors.hoverColor)
      )}
      style={{
        flex: `0 0 calc(100% / ${eventCount})`, // Ensure equal width for each event
        height: `${rowHeight * spanSlots}px`, // Height spans the slots
        left: `${eventIndex * 10}%`, // Adjust for overlap
        width: `calc(${100 - eventIndex * 10}% - 8px)`, // Adjust width for overlap
        margin: 4,
      }}
    >
      {event.enableOnHouver ? (
        <Popover
          withArrow
          mouseLeaveDelay={50}
          closeOnScroll={true}
          closeOnIframeFocus={true}
          openOnHover
        >
          <PopoverTrigger>
            {cardContent}
          </PopoverTrigger>
          <PopoverSurface
            aria-labelledby={headerId}
            className={mergeClasses(
              styles.popoverContent,
              applyEventHouverColorClass(
                colors.backgroundColor,
                colors.hoverColor
              )
            )}
          >
            <EventDetailsPopover event={event} />
          </PopoverSurface>
        </Popover>
      ) : (
         {cardContent}
      )}
    </Card>
  );
};
