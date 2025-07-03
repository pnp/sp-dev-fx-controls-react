import { AvatarNamedColor } from "@fluentui/react-components";
import { IAttendee } from "./IAttendee";

export interface IEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  isFullDay?: boolean;
  attendees?: IAttendee[];
  category?: string;
  description?: string;
  location?: string;
  importance?: string;
  isOrganizer?: boolean;
  sensitivity?: string;
  type?: string;
  isOnlineMeeting?: boolean;
  onRenderInMonthView?: (event: IEvent) => JSX.Element;
  onRenderInWeekView?: (event: IEvent) => JSX.Element;
  onRenderInDayView?: (event: IEvent) => JSX.Element;
  enableOnHover?: boolean;
  imageUrl?: string;
  webLink?: string;
  color?: AvatarNamedColor;
}
