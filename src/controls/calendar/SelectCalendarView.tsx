import * as React from 'react';

import {
  CalendarDayFilled,
  CalendarDayRegular,
  CalendarMonthFilled,
  CalendarMonthRegular,
  CalendarWorkWeekFilled,
  CalendarWorkWeekRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  Menu,
  MenuButton,
  MenuItemRadio,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
} from '@fluentui/react-components';

import { ECalendarViews } from './models/ECalendarViews';
import strings from 'ControlStrings';

export interface ISelectCalendarViewProps {
  onSelected: (view: ECalendarViews) => void;
  value?: ECalendarViews;
}

export const SelectCalendarView: React.FunctionComponent<
  ISelectCalendarViewProps
> = (props: React.PropsWithChildren<ISelectCalendarViewProps>) => {
  const { onSelected, value } = props;

  // State for selected view
  const [selectedView, setSelectedView] = React.useState<ECalendarViews>(
    value ?? ECalendarViews.Month
  );

  const [checkedValues, setCheckedValues] = React.useState<
    Record<string, string[]>
  >({
    view: [value ?? ECalendarViews.Month],
  });

  const DayView = React.useMemo(
    () => bundleIcon(CalendarDayFilled, CalendarDayRegular),
    []
  );
  const MonthView = React.useMemo(
    () => bundleIcon(CalendarMonthFilled, CalendarMonthRegular),
    []
  );
  const WeekView = React.useMemo(
    () => bundleIcon(CalendarWorkWeekFilled, CalendarWorkWeekRegular),
    []
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedView(value);
      setCheckedValues({ view: [value] });
    }
  }, [value]);

  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps['onOpenChange'] = React.useCallback(
    (_e, data) => {
      setOpen(data.open);
    },
    []
  );

  const viewIcon = React.useCallback(() => {
    switch (selectedView) {
      case ECalendarViews.Month:
        return <MonthView />;
      case ECalendarViews.Week:
        return <WeekView />;
      case ECalendarViews.Day:
        return <DayView />;
      default:
        return <MonthView />;
    }
  }, [selectedView]);

  const getViewLabel = React.useCallback((view: ECalendarViews) => {
    switch (view) {
      case ECalendarViews.Month:
        return strings.CalendarControlViewMonthLabel;
      case ECalendarViews.Week:
        return  strings.CalendarControlViewWeekLabel;
      case ECalendarViews.Day:
        return  strings.CalendarControlViewDayLabel;
      default:
        return  strings.CalendarControlViewMonthLabel;
    }
  }, []);

  const onCheckedValueChange: MenuProps['onCheckedValueChange'] =
    React.useCallback(
      (
        _e: unknown,
        { name, checkedItems }: { name: string; checkedItems: string[] }
      ) => {
        if (name === 'view') {
          const newView = checkedItems[0] as ECalendarViews;
          setSelectedView(newView);
          setCheckedValues({ view: checkedItems });
          onSelected(newView);
        }
      },
      [onSelected]
    );

  return (
    <>
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            shape="circular"
            icon={viewIcon()}
            style={{ minWidth: '150px' }}
          >
            {getViewLabel(selectedView)}
          </MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList
            onCheckedValueChange={onCheckedValueChange}
            checkedValues={checkedValues}
          >
            <MenuItemRadio
              icon={<DayView />}
              name="view"
              value={ECalendarViews.Day}
            >
              {strings.CalendarControlViewDayLabel}
            </MenuItemRadio>
            <MenuItemRadio
              icon={<WeekView />}
              name="view"
              value={ECalendarViews.Week}
            >
              {strings.CalendarControlViewWeekLabel}
            </MenuItemRadio>
            <MenuItemRadio
              icon={<MonthView />}
              name="view"
              value={ECalendarViews.Month}
            >
              {strings.CalendarControlViewMonthLabel}
            </MenuItemRadio>
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};
