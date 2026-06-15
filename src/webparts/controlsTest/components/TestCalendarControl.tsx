/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";

import { Calendar, IEvent } from "../../../Calendar";
import {
  FluentProvider,
  IdPrefixProvider,
  Theme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
} from "@fluentui/react-components";

import { BaseComponentContext } from "@microsoft/sp-component-base";
import { EAppHostName } from "../../../controls/userPicker/constants/EAppHostname";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";

export interface ICalendarProps {
  hasTeamsContext: boolean;
  themeString: string;
  theme?: Partial<Theme> | undefined;
  context: BaseComponentContext;
  title: string;
  appHostName: EAppHostName;
}

export const mockEvents: IEvent[] = [
  {
    id: "1",
    title: "Team Standup Meeting",
    start: "2025-03-03T09:00:00",
    end: "2025-03-03T09:30:00",
    category: "Meeting",
    location: "Conference Room A",
    importance: "High",
    isOrganizer: true,
    sensitivity: "Normal",
    type: "Work",
    isOnlineMeeting: true,
    description: "Daily team standup to discuss tasks and blockers.",
    enableOnHover: true,
    imageUrl: "https://via.placeholder.com/150",
    color: "blue",
    webLink: "https://outlook.com",
  },
  {
    id: "2",
    title: "Project Deadline: Marketing Campaign",
    start: "2025-03-04T00:00:00",
    end: "2025-03-04T23:59:59",
    isFullDay: true,
    category: "Deadline",
    importance: "High",
    sensitivity: "Confidential",
    description: "Final deadline for the Q1 marketing campaign submission.",
    enableOnHover: false,
    color: "red",
    webLink: "https://outlook.com",
  },
  {
    id: "3",
    title: "Client Meeting: ABC Corp",
    start: "2025-03-04T14:00:00",
    end: "2025-03-04T15:00:00",
    category: "Client Meeting",
    location: "Zoom",
    isOnlineMeeting: true,
    attendees: [
      {
        name: "John Doe",
        email: "joao.j.mendes@nuvemerudita.com",
        id: "567891",
      },
      {
        name: "Jane Smith",
        email: "geral@nuvemerudita.com",
        id: "987654",
      },
    ],
    importance: "Medium",
    description: "Quarterly review meeting with ABC Corp.",
    enableOnHover: true,
    color: "gold",
    webLink: "https://outlook.com",
  },
  {
    id: "4",
    title: "Lunch Break",
    start: "2025-03-04T12:00:00",
    end: "2025-03-04T13:00:00",
    category: "Break",
    importance: "Low",
    description: "Time to relax and enjoy some food!",
    enableOnHover: false,
    color: "cornflower",
    webLink: null,
  },
  {
    id: "5",
    title: "Company Town Hall",
    start: "2025-03-04T16:00:00",
    end: "2025-03-04T17:30:00",
    category: "Company Event",
    location: "Main Auditorium",
    importance: "High",
    sensitivity: "Public",
    description: "Quarterly town hall with leadership updates.",
    enableOnHover: true,
    imageUrl: "https://via.placeholder.com/150",
    webLink: "https://outlook.com",
    color: "seafoam",
  },
  {
    id: "6",
    title: "Weekly Sync: Development Team",
    start: "2025-03-05T10:00:00",
    end: "2025-03-05T11:00:00",
    category: "Team Meeting",
    location: "Microsoft Teams",
    isOnlineMeeting: true,
    attendees: [
      {
        name: "Alex Johnson",
        email: "alex.johnson@example.com",
        id: "23456",
      },
      {
        name: "Maria Lee",
        email: "maria.lee@example.com",
        id: "78900",
      },
    ],
    importance: "Medium",
    description: "Weekly update call with the dev team.",
    enableOnHover: true,
    color: "peach",
    webLink: "https://outlook.com",
  },
  {
    id: "7",
    title: "Networking Event: Tech Innovators",
    start: "2025-03-06T18:00:00",
    end: "2025-03-06T21:00:00",
    category: "Networking",
    location: "Downtown Convention Center",
    importance: "High",
    description: "Meet with top industry leaders and innovators.",
    enableOnHover: true,
    imageUrl: "https://via.placeholder.com/150",
    webLink: "https://outlook.com",
    color: "purple",
  },
  {
    id: "8",
    title: "Quarterly Financial Review",
    start: "2025-02-27T14:30:00",
    end: "2025-02-27T16:00:00",
    category: "Finance",
    location: "Board Room",
    importance: "High",
    sensitivity: "Confidential",
    description: "Review of financial reports and upcoming projections.",
    enableOnHover: true,
    imageUrl: "https://via.placeholder.com/150",
    webLink: "https://outlook.com",
    color: "steel",
  },
  {
    id: "9",
    title: "One-on-One: Manager Meeting",
    start: "2025-02-27T11:00:00",
    end: "2025-02-27T11:30:00",
    category: "Meeting",
    location: "Manager’s Office",
    importance: "Medium",
    description: "Weekly check-in with direct manager.",
    enableOnHover: true,
    color: "lavender",
    webLink: "https://outlook.com",
  },
  {
    id: "10",
    title: "Webinar: AI in 2025",
    start: "2025-02-26T19:00:00",
    end: "2025-02-26T20:30:00",
    category: "Webinar",
    isOnlineMeeting: true,
    location: "Webex",
    importance: "Medium",
    description: "An in-depth look at AI trends for the upcoming year.",
    enableOnHover: true,
    imageUrl: "https://via.placeholder.com/150",
    color: "magenta",
  },
  // midnight event — UTC+10 users: 00:30 local
  {
    id: "11",
    title: "Midnight Deployment",
    start: "2026-06-14T00:30:00",
    end: "2026-06-14T01:00:00",
    category: "Task",
    importance: "High",
    description: "Edge case: early morning event (00:30 local). Fails to render in month view without the date key fix for UTC+ timezones.",
    enableOnHover: true,
    color: "steel",
    webLink: null,
  },
  // 02:00 local — UTC+4 users: 02:00 local
  {
    id: "12",
    title: "Early Morning Sync",
    start: "2026-06-15T02:00:00",
    end: "2026-06-15T02:30:00",
    category: "Meeting",
    importance: "Medium",
    description: "Edge case: 02:00 local. Misplaced in month view for UTC+4 users without the date key fix.",
    enableOnHover: true,
    color: "lavender",
    webLink: null,
  },
  // event spanning midnight
  {
    id: "13",
    title: "Overnight On-call",
    start: "2026-06-17T23:00:00",
    end: "2026-06-18T01:00:00",
    category: "Task",
    importance: "High",
    description: "Edge case: spans midnight. Should appear on both Jun 15 and Jun 16.",
    enableOnHover: true,
    color: "cranberry",
    webLink: null,
  },
  // negative offset (UTC-5, New York)
  {
    id: "14",
    title: "New York All-Hands (UTC-5)",
    start: "2026-06-19T14:00:00-05:00",
    end: "2026-06-19T15:00:00-05:00",
    category: "Meeting",
    location: "New York HQ",
    importance: "High",
    description: "Timezone test: negative offset UTC-5. Stored as 19:00 UTC — each user sees it in their local time.",
    enableOnHover: true,
    color: "navy",
    webLink: "https://outlook.com",
  },
  // zero offset (UTC)
  {
    id: "15",
    title: "London Sprint Review (UTC+0)",
    start: "2026-06-20T09:00:00Z",
    end: "2026-06-20T10:00:00Z",
    category: "Meeting",
    location: "London Office",
    importance: "Medium",
    description: "Timezone test: UTC (Z suffix). Each user sees it in their local time.",
    enableOnHover: true,
    color: "anchor",
    webLink: "https://outlook.com",
  },
  // positive offset (UTC+5:30, India)
  {
    id: "16",
    title: "Mumbai Design Review (UTC+5:30)",
    start: "2026-06-20T15:30:00+05:30",
    end: "2026-06-20T16:30:00+05:30",
    category: "Meeting",
    location: "Mumbai Office",
    importance: "Medium",
    description: "Timezone test: positive offset UTC+5:30. Stored as 10:00 UTC — each user sees it in their local time.",
    enableOnHover: true,
    color: "brass",
    webLink: "https://outlook.com",
  },
];

export const TestCalendarControl: React.FunctionComponent<ICalendarProps> = (
  props: React.PropsWithChildren<ICalendarProps>,
) => {
  const { theme, themeString, hasTeamsContext } = props;

  const [FUI9theme, setFUI9theme] = React.useState<Partial<Theme> | undefined>(
    undefined,
  );

  const setTheme = React.useCallback((): Partial<Theme> => {
    if (hasTeamsContext) {
      return themeString === "dark"
        ? teamsDarkTheme
        : themeString === "contrast"
          ? teamsHighContrastTheme
          : {
              ...teamsLightTheme,
            };
    } else {
      const nthme = createV9Theme(theme as never);

      return nthme;
    }
  }, [themeString, theme, hasTeamsContext, createV9Theme]);

  React.useEffect(() => {
    setFUI9theme(setTheme());
  }, [setTheme]);

  if (!FUI9theme) return null;

  return (
    <>
      <IdPrefixProvider value={"calendar-webpart-"}>
        <FluentProvider theme={FUI9theme}>
          <Calendar
            events={mockEvents}
            height={800}
            theme={FUI9theme as Theme}
            onDayChange={(date: Date) => console.log("day", date)}
            onMonthChange={(date: Date) => console.log("month", date)}
            onWeekChange={(date: Date) => console.log("week", date)}
            onViewChange={(view: string) => console.log("view", view)}
          />
        </FluentProvider>
      </IdPrefixProvider>
    </>
  );
};

export default TestCalendarControl;
