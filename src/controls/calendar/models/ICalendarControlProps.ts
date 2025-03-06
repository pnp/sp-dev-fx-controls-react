import { ECalendarViews } from "./ECalendarViews";
import { IEvent } from "./IEvents";
import { Theme } from "@fluentui/react-components";

export interface ICalendarControlProps {
  events: IEvent[];
  height?: string | number
  theme?: Theme
  onMonthChange?: (date: Date) => void;
  onDayChange?: (date: Date) => void;
  onWeekChange?: (date: Date) => void;
  onNext?: (date: Date) => void;
  onPrev?: (date:Date) => void;
  onViewChange?: (view: string) => void;
  onDaySlotClick?: (date: Date) => void;
  defaultView? :ECalendarViews | undefined
}
