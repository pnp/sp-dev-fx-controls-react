import * as React from 'react';

import { Calendar, CalendarStrings, DateRangeType } from "@fluentui/react-calendar-compat";

import strings from 'ControlStrings';
import { css } from '@emotion/css';

const useCalendarStyles = (): { root: string } => {
  return {
    root: css({
      outline: "none",
    }),
  };
};


export const defaultCalendarMonthStrings: CalendarStrings = {
  months: [
    strings.DatePickerMonthLongJanuary,
    strings.DatePickerMonthLongFebruary,
    strings.DatePickerMonthLongMarch,
    strings.DatePickerMonthLongApril,
    strings.DatePickerMonthLongMay,
    strings.DatePickerMonthLongJune,
    strings.DatePickerMonthLongJuly,
    strings.DatePickerMonthLongAugust,
    strings.DatePickerMonthLongSeptember,
    strings.DatePickerMonthLongOctober,
    strings.DatePickerMonthLongNovember,
    strings.DatePickerMonthLongDecember,
  ],
  shortMonths: [
    strings.DatePickerMonthShortJanuary,
    strings.DatePickerMonthShortFebruary,
    strings.DatePickerMonthShortMarch,
    strings.DatePickerMonthShortApril,
    strings.DatePickerMonthShortMay,
    strings.DatePickerMonthShortJune,
    strings.DatePickerMonthShortJuly,
    strings.DatePickerMonthShortAugust,
    strings.DatePickerMonthShortSeptember,
    strings.DatePickerMonthShortOctober,
    strings.DatePickerMonthShortNovember,
    strings.DatePickerMonthShortDecember,
  ],
  days: [
    strings.DatePickerDayLongSunday,
    strings.DatePickerDayLongMonday,
    strings.DatePickerDayLongTuesday,
    strings.DatePickerDayLongWednesday,
    strings.DatePickerDayLongThursday,
    strings.DatePickerDayLongFriday,
    strings.DatePickerDayLongSaturday,
  ],
  shortDays: [
    strings.DatePickerDayShortSunday,
    strings.DatePickerDayShortMonday,
    strings.DatePickerDayShortTuesday,
    strings.DatePickerDayShortWednesday,
    strings.DatePickerDayShortThursday,
    strings.DatePickerDayShortFriday,
    strings.DatePickerDayShortSaturday,
  ],
  goToToday: strings.DatePickerGoToToday,
};

export interface ICalendarMonthProps {
  onDateChange: (date: Date) => void;
  defaultSelectedDate?: Date;
  onDismiss: () => void;
  strings?: CalendarStrings;
}

export const CalendarMonth: React.FunctionComponent<ICalendarMonthProps> = (
  props: React.PropsWithChildren<ICalendarMonthProps>
) => {
  const { onDateChange, defaultSelectedDate, onDismiss, strings = defaultCalendarMonthStrings } = props;
  const styles = useCalendarStyles();
  const [selectedDate, setSelectedDate] = React.useState<Date>(defaultSelectedDate ?? new Date());

  const onSelectDate = React.useCallback((date: Date, _selectedDateRangeArray?: Date[] | undefined): void => {
    setSelectedDate(date);
    onDateChange(date);
    onDismiss();
  }, [onDateChange, onDismiss]);

  return (
    <>
      <Calendar
        className={styles.root}
        dateRangeType={DateRangeType.Month}
        highlightSelectedMonth
        isDayPickerVisible={false}
        onSelectDate={onSelectDate}
        value={selectedDate}
        onDismiss={onDismiss}
        showGoToToday={false}
        allFocusable={false}
        strings={strings}
      />
    </>
  );
};
