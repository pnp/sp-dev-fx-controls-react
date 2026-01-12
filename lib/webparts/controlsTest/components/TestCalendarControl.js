var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { Calendar } from "../../../Calendar";
import { FluentProvider, IdPrefixProvider, teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme, } from "@fluentui/react-components";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
export var mockEvents = [
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
];
export var TestCalendarControl = function (props) {
    var theme = props.theme, themeString = props.themeString, hasTeamsContext = props.hasTeamsContext;
    var _a = React.useState(undefined), FUI9theme = _a[0], setFUI9theme = _a[1];
    var setTheme = React.useCallback(function () {
        if (hasTeamsContext) {
            return themeString === "dark"
                ? teamsDarkTheme
                : themeString === "contrast"
                    ? teamsHighContrastTheme
                    : __assign({}, teamsLightTheme);
        }
        else {
            var nthme = createV9Theme(theme);
            return nthme;
        }
    }, [themeString, theme, hasTeamsContext, createV9Theme]);
    React.useEffect(function () {
        setFUI9theme(setTheme());
    }, [setTheme]);
    if (!FUI9theme)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(IdPrefixProvider, { value: "calendar-webpart-" },
            React.createElement(FluentProvider, { theme: FUI9theme },
                React.createElement(Calendar, { events: mockEvents, height: 800, theme: FUI9theme, onDayChange: function (date) { return console.log("day", date); }, onMonthChange: function (date) { return console.log("month", date); }, onWeekChange: function (date) { return console.log("week", date); }, onViewChange: function (view) { return console.log("view", view); } })))));
};
export default TestCalendarControl;
//# sourceMappingURL=TestCalendarControl.js.map