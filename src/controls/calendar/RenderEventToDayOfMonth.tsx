/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
  Caption1,
  Popover,
  PopoverSurface,
  PopoverTrigger,
  PositioningImperativeRef,
  mergeClasses,
  useId,
} from "@fluentui/react-components";
import { endOfDay, isWithinInterval, startOfDay } from "date-fns";

import { Card } from "@nuvemerudita/react-controls";
import { EventDetailsPopover } from "./EventDetailsPopover";
import { IEvent } from "./models/IEvents";
import { IEventColors } from "./models/IEventColors";
import { useCalendarStyles } from "./hooks/useCalendarStyles";
import { useUtils } from "./hooks/useUtils";

export interface IRenderEventToDayOfMonthProps {
  events: IEvent[];
  date: Date;
  onCardHoverChange?: (isHovered: boolean, eventTitle: string) => void;
  columnHeight: number; // Height of the column passed as a prop
}

export const RenderEventToDayOfMonth: React.FunctionComponent<
  IRenderEventToDayOfMonthProps
> = (props: React.PropsWithChildren<IRenderEventToDayOfMonthProps>) => {
  const headerId = useId();
  const { events, date, onCardHoverChange, columnHeight } = props;
  const { styles, applyEventHouverColorClass } = useCalendarStyles();

  const positioningRef = React.useRef<PositioningImperativeRef>(null);
  const { getEventColors, getCalendarColors } = useUtils();

  const handleMouseEnter = React.useCallback(
    (eventTitle: string): void => {
      if (onCardHoverChange) {
        onCardHoverChange(true, eventTitle);
      }
    },
    [onCardHoverChange],
  );

  const handleMouseLeave = React.useCallback(
    (eventTitle: string) => {
      if (onCardHoverChange) {
        onCardHoverChange(false, eventTitle);
      }
    },
    [onCardHoverChange],
  );

  // Set the target for the popover
  const buttonRef = React.useCallback(
    (el: HTMLDivElement | null) => {
      positioningRef.current?.setTarget(el);
    },
    [positioningRef],
  );

  // Render the card
  const renderCard = React.useCallback(
    (index: number, calEvent: IEvent, colors: IEventColors) => {
      return (
        <div ref={buttonRef}>
          <Card
            key={index}
            className={mergeClasses(
              styles.eventCard,
              applyEventHouverColorClass(
                colors.backgroundColor,
                colors.backgroundColor,
              ),
            )}
            paddingTop="4px"
            paddingBottom="4px"
            paddingLeft="8px"
            paddingRight="8px"
            marginTop={index === 0 ? "0px" : "5px"}
            cardHeader={<Caption1>{calEvent.title}</Caption1>}
            onMouseEnter={() => handleMouseEnter(calEvent.title)}
            onMouseLeave={() => handleMouseLeave(calEvent.title)}
          />
        </div>
      );
    },
    [handleMouseEnter, handleMouseLeave, applyEventHouverColorClass],
  );

  const renderCardWithPopOver = React.useCallback(
    (calEvent: IEvent, index: number, colors: IEventColors) => {
      return (
        <>
          <Popover
            withArrow
            key={index}
            mouseLeaveDelay={30}
            closeOnScroll={true}
            closeOnIframeFocus={true}
            openOnHover
          >
            <PopoverTrigger>
              {renderCard(index, calEvent, colors)}
            </PopoverTrigger>
            <PopoverSurface
              aria-labelledby={headerId}
              className={mergeClasses(styles.popoverContent)}
            >
              <EventDetailsPopover event={calEvent} />
            </PopoverSurface>
          </Popover>
        </>
      );
    },
    [renderCard],
  );

  if (!events || !events?.length) return <> </>;

  return (
    <>
      <div style={{ height: columnHeight }} className={styles.eventContainer}>
        {events.map((calEvent, index) => {
          const eventStart = startOfDay(new Date(calEvent.start));
          const eventEnd = endOfDay(new Date(calEvent.end));

          const isEventInDay = isWithinInterval(date, {
            start: eventStart,
            end: eventEnd,
          });

          if (!isEventInDay) return null;
          let colors: IEventColors | undefined = undefined;
          if (calEvent.color) {
            colors = getCalendarColors(calEvent.color);
          } else {
            colors = getEventColors(calEvent.category!);
          }
          const customRender = calEvent.onRenderInMonthView?.(calEvent);
          // If the event has a custom renderer, use it
          if (React.isValidElement(customRender)) {
            return React.cloneElement(customRender as React.ReactElement, {
              className: mergeClasses(
                (customRender.props as any).className,
                styles.eventCard,
              ),
            });
          }
          return calEvent.enableOnHover
            ? renderCardWithPopOver(calEvent, index, colors)
            : renderCard(index, calEvent, colors);
        })}
      </div>
    </>
  );
};
