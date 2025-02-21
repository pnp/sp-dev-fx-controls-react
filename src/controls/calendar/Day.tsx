import * as React from "react";

import { Body2, mergeClasses } from "@fluentui/react-components";
import { Card, Stack } from "@nuvemerudita/react-controls";

import { IEvent } from "./models/IEvents";
import { RenderEventToDayOfMonth } from "./RenderEventToDayOfMonth";
import { isSameDay } from "date-fns";
import { useCalendarStyles } from "./hooks/useCalendarStyles";

export interface IDayProps {
  day: number;
  date: Date;
  currentMonth: boolean;
  events: IEvent[];
  columnHeight: number;
}

export const Day: React.FunctionComponent<IDayProps> = (
  props: React.PropsWithChildren<IDayProps>
) => {
  const { day, currentMonth, events, date, columnHeight } = props;
  const { styles } = useCalendarStyles(props);
  const currentDate = new Date();
  const [isEventHovered, setIsEventHovered] = React.useState(false);

  const isCurrentDayAndMonth = React.useMemo(() => {
    return isSameDay(date, currentDate);
  }, [date, currentDate]);

  const renderCurrentDayLabel = React.useMemo(() => {
    return (
      <Stack
        horizontal
        horizontalAlign="start"
        verticalAlign="center"
        RowGap={10}
      >
        <Body2 className={styles.currentDayLabel}>
          {day} {currentDate.toLocaleString("default", { month: "short" })}
        </Body2>
      </Stack>
    );
  }, [day]);

  const handleCardHoverChange = React.useCallback(
    (isHovered: boolean): void => {
      setIsEventHovered(isHovered);
    },
    []
  );

  return (
    <>
      <Card
        className={mergeClasses(
          styles.cardDay,
          currentMonth ? "" : styles.otherMonthDay,
          isCurrentDayAndMonth ? styles.currentDay : "",
          !isEventHovered ? styles.cardDayOnHover : ""
        )}
        cardHeader={
          isCurrentDayAndMonth ? renderCurrentDayLabel : <Body2>{day}</Body2>
        }
        padding="xsmall"
        cardBody={
          <RenderEventToDayOfMonth
            events={events}
            date={date}
            onCardHoverChange={handleCardHoverChange}
            columnHeight={columnHeight - 60}
          />
        }
      />
    </>
  );
};
