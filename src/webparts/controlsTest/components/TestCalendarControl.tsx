/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";

import { Calendar, IEvent } from "../../../Calendar";
import {
  Dropdown,
  Field,
  FluentProvider,
  IdPrefixProvider,
  Option,
  OptionOnSelectData,
  SelectionEvents,
  Theme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  tokens,
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
    start: "2026-06-24T09:00:00",
    end: "2026-06-24T09:30:00",
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
    start: "2026-06-25T00:00:00",
    end: "2026-06-25T23:59:59",
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
    start: "2026-06-26T14:00:00",
    end: "2026-06-26T15:00:00",
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
    start: "2026-06-26T12:00:00",
    end: "2026-06-26T13:00:00",
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
    start: "2026-06-30T16:00:00",
    end: "2026-06-30T17:30:00",
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
    start: "2026-07-01T10:00:00",
    end: "2026-07-01T11:00:00",
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
    start: "2026-07-09T18:00:00",
    end: "2026-07-09T21:00:00",
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
    start: "2026-08-05T14:30:00",
    end: "2026-08-05T16:00:00",
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
    start: "2026-06-24T11:00:00",
    end: "2026-06-24T11:30:00",
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
    title: "Webinar: AI in 2026",
    start: "2026-08-12T19:00:00",
    end: "2026-08-12T20:30:00",
    category: "Webinar",
    isOnlineMeeting: true,
    location: "Webex",
    importance: "Medium",
    description: "An in-depth look at AI trends for the upcoming year.",
    enableOnHover: true,
    imageUrl: "https://via.placeholder.com/150",
    color: "magenta",
  },
];

type CalendarScenarioKey =
  | "default"
  | "aestLocal"
  | "globalOffsets"
  | "dateBoundaries";

interface ICalendarScenario {
  key: CalendarScenarioKey;
  label: string;
  events: IEvent[];
}

const calendarScenarios: ICalendarScenario[] = [
  {
    key: "default",
    label: "Default mock events",
    events: mockEvents,
  },
  {
    key: "aestLocal",
    label: "AEST local ISO events",
    events: [
      {
        id: "aest-1",
        title: "AEST Weekly Sync: Development Team",
        start: "2026-06-24T10:00:00",
        end: "2026-06-24T11:00:00",
        location: "Microsoft Teams",
        attendees: [
          { name: "AJ", id: "1", email: "test@test.com" },
          { name: "ML", id: "2", email: "test2@test.com" },
        ],
        category: "Meeting",
        isOnlineMeeting: true,
        color: "blue",
      },
      {
        id: "aest-2",
        title: "AEST Project Deadline",
        start: "2026-07-15T23:59:00",
        end: "2026-07-15T23:59:00",
        category: "Deadline",
        importance: "High",
        color: "red",
      },
    ],
  },
  {
    key: "globalOffsets",
    label: "Global offset events",
    events: [
      {
        id: "global-1",
        title: "Honolulu Planning (-10:00)",
        start: "2026-07-06T23:30:00-10:00",
        end: "2026-07-07T00:30:00-10:00",
        category: "Meeting",
        location: "Honolulu",
        color: "teal",
      },
      {
        id: "global-2",
        title: "New York Morning Sync (-04:00)",
        start: "2026-07-07T09:30:00-04:00",
        end: "2026-07-07T10:30:00-04:00",
        category: "Meeting",
        location: "New York",
        color: "cornflower",
      },
      {
        id: "global-3",
        title: "London Review (+01:00)",
        start: "2026-07-08T09:00:00+01:00",
        end: "2026-07-08T10:00:00+01:00",
        category: "Workshop",
        location: "London",
        color: "forest",
      },
      {
        id: "global-4",
        title: "Kolkata Delivery (+05:30)",
        start: "2026-07-09T18:30:00+05:30",
        end: "2026-07-09T19:30:00+05:30",
        category: "Deadline",
        location: "Kolkata",
        color: "gold",
      },
      {
        id: "global-5",
        title: "Sydney Product Sync (+10:00)",
        start: "2026-07-10T10:00:00+10:00",
        end: "2026-07-10T11:00:00+10:00",
        category: "Team Meeting",
        location: "Sydney",
        color: "peach",
      },
      {
        id: "global-6",
        title: "Kiritimati Launch (+14:00)",
        start: "2026-07-13T08:00:00+14:00",
        end: "2026-07-13T09:00:00+14:00",
        category: "Company Event",
        location: "Kiritimati",
        color: "purple",
      },
    ],
  },
  {
    key: "dateBoundaries",
    label: "Date boundary and full-day events",
    events: [
      {
        id: "boundary-1",
        title: "UTC Event Crossing Into Next Local Day",
        start: "2026-08-03T18:45:00Z",
        end: "2026-08-03T19:15:00Z",
        category: "Meeting",
        location: "UTC",
        color: "magenta",
      },
      {
        id: "boundary-2",
        title: "US Pacific Late Evening",
        start: "2026-08-04T23:15:00-07:00",
        end: "2026-08-05T00:15:00-07:00",
        category: "Workshop",
        location: "Los Angeles",
        color: "lavender",
      },
      {
        id: "boundary-3",
        title: "Tokyo Full-Day Window",
        start: "2026-08-06",
        end: "2026-08-07",
        isFullDay: true,
        category: "Holiday",
        location: "Tokyo",
        color: "seafoam",
      },
      {
        id: "boundary-4",
        title: "AEST Midnight Deadline",
        start: "2026-08-10T23:59:00+10:00",
        end: "2026-08-10T23:59:00+10:00",
        category: "Deadline",
        importance: "High",
        color: "red",
      },
    ],
  },
];

export const TestCalendarControl: React.FunctionComponent<ICalendarProps> = (
  props: React.PropsWithChildren<ICalendarProps>,
) => {
  const { theme, themeString, hasTeamsContext } = props;

  const [FUI9theme, setFUI9theme] = React.useState<Partial<Theme> | undefined>(
    undefined,
  );
  const [selectedScenarioKey, setSelectedScenarioKey] =
    React.useState<CalendarScenarioKey>("default");

  const selectedScenario = React.useMemo<ICalendarScenario>(() => {
    return (
      calendarScenarios.find(
        (scenario: ICalendarScenario) => scenario.key === selectedScenarioKey,
      ) ?? calendarScenarios[0]
    );
  }, [selectedScenarioKey]);

  const onScenarioChange = React.useCallback(
    (_event: SelectionEvents, data: OptionOnSelectData): void => {
      if (data.optionValue) {
        setSelectedScenarioKey(data.optionValue as CalendarScenarioKey);
      }
    },
    [],
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
          <Field
            label="Calendar event timezone scenario"
            style={{ marginBottom: tokens.spacingVerticalL }}
          >
            <Dropdown
              selectedOptions={[selectedScenario.key]}
              value={selectedScenario.label}
              onOptionSelect={onScenarioChange}
            >
              {calendarScenarios.map((scenario: ICalendarScenario) => (
                <Option key={scenario.key} value={scenario.key}>
                  {scenario.label}
                </Option>
              ))}
            </Dropdown>
          </Field>
          <Calendar
            events={selectedScenario.events}
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
