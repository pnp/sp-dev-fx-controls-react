/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import { EventPopoverCard } from './EventPopoverCard';
import { IEvent } from './models/IEvents';
import { mergeClasses } from '@fluentui/react-components';
import { useUtils } from './hooks/useUtils';
import { useWeekViewStyles } from './hooks/useWeekViewStyles';

interface IEventRendererProps {
  event: IEvent;
  eventCount: number;
  spanSlots: number;
  rowHeight: number;
  eventIndex: number;
  view: 'day' | 'week';
}

export const EventRenderer: React.FC<IEventRendererProps> = ({
  event,
  eventCount,
  spanSlots,
  rowHeight,
  eventIndex,
  view,
}) => {
  const { styles, appyDynamicStyles } = useWeekViewStyles();
  const { getEventColors } = useUtils();
  const colors = getEventColors(event.category as string);

  // Memoize the function that determines the custom render function
  const customOnRenderEvent =
    view === 'day'
      ? event.onRenderInDayView?.(event)
      : event.onRenderInWeekView?.(event);

  if (React.isValidElement(customOnRenderEvent)) {
    return React.cloneElement(customOnRenderEvent as React.ReactElement, {
      event,
      className: mergeClasses(
        (customOnRenderEvent.props as any).className,
        styles.eventCard,
        appyDynamicStyles(eventIndex, eventCount, rowHeight, spanSlots)
      ),
      style: {
        ...(customOnRenderEvent.props as any).style,
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
