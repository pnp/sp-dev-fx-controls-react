
import * as React from 'react';

import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
} from '@fluentui/react-components';

import { CalendarMonth } from './CalendarMonth';
import strings from 'ControlStrings';
import { format } from 'date-fns';

export interface ISelectMonthProps {
  onSelected: (date: Date) => void;
  value?: Date;
}



export const SelectMonth: React.FunctionComponent<ISelectMonthProps> = (
  props: React.PropsWithChildren<ISelectMonthProps>
) => {
  const { onSelected, value } = props;


  const Calendar = bundleIcon(CalendarMonthFilled, CalendarMonthRegular);
  const [selectedDate, setSelectedDate] = React.useState<Date>(value ?? new Date());

  React.useEffect(() => {
    onSelected(value ?? new Date());
    setSelectedDate(value ?? new Date());
  }, [value]);

  const [open, setOpen] = React.useState(false);
  const onOpenChange: MenuProps["onOpenChange"] = (_e, data) => {
    setOpen(data.open);
  };

  const onDateChange = React.useCallback((date: Date) => {
    onSelected(date);
    setSelectedDate(date);
  }, []);

  return (
    <>
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton shape="circular" icon={<Calendar />} style={{minWidth: "200px"}} aria-label={`${strings.CalendarControlSelectMonthLabel}: ${format(selectedDate, "MMMM yyyy")}`}>
            {format(selectedDate, "MMMM yyyy" )}
          </MenuButton>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <CalendarMonth
              onDateChange={onDateChange}
              defaultSelectedDate={selectedDate}
              onDismiss={() => {
                setOpen(false);
              }}
            />
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
};
