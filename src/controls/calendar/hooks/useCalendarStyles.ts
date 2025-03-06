import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IUseCalendarStyles {
  styles: ICalendarStyles;
  applyEventHouverColorClass: (backgroundColor: string, houverColor: string) => string;
}

export interface ICalendarStyles {
  calendarWrapper: string;
  header: string;
  dayHeader: string;
  day: string;
  otherMonthDay: string;
  cardDay: string;
  cardDayOnHover: string;
  currentDay: string;
  currentDayLabel: string;
  eventCard: string;
  eventContainer: string;
  eventCardWeekView: string;
  popoverContent: string;
}

export const useCalendarStyles = ():  IUseCalendarStyles => {
  const styles: ICalendarStyles = {
    calendarWrapper: css({
      padding: "20px",
      paddingTop: "10px",
      overflow: "auto",
      flex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)", // 7 columns for the days of the week
      gridTemplateRows: "auto", // Automatically sizes the header row
      gridAutoRows: "minmax(100px, 1fr)", // Ensures all rows have a minimum height of 100px and grow equally
      gap: "1px", // Gap between cells
      width: "calc(100% - 40px)", // Full width minus padding
    }),
    header: css({
      display: "flex",
      justifyContent: "start",
      gap: "10px",
      alignItems: "center",
      padding: "16px",
    }),
    dayHeader: css({
      textAlign: "start",
      padding: "8px",
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    day: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      backgroundColor: tokens.colorNeutralBackground1,
      position: "relative", // Ensure proper stacking context
    }),
    otherMonthDay: css({
      color: tokens.colorNeutralStroke2,
      backgroundColor: tokens.colorNeutralBackground2,
    }),
    cardDay: css({
      height: "100%",
      minHeight: 100,
      borderRadius: 0,
      overflow: "hidden !important",
    }),
    cardDayOnHover: css({
      ":hover": {
        backgroundColor: tokens.colorNeutralBackground2,
      },
    }),
    currentDay: css({
      borderTop: `5px solid ${tokens.colorBrandBackground}`,
    }),
    currentDayLabel: css({
      color: tokens.colorBrandBackground,
      fontWeight: 600,
    }),
    eventCard: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      zIndex: 1, // Ensure it appears above parent hover styles
    }),
    eventContainer: css({
      display: "flex",
      flexDirection: "column",
      overflowY: "auto", // Ensures proper overflow handling
      paddingTop: "5px",
      paddingBottom: "5px",
      paddingLeft: "5px",
      paddingRight: "5px",
      // Scrollbar styles
      "::-webkit-scrollbar": {
        width: "5px", // Width for vertical scrollbars
        height: "5px", // Height for horizontal scrollbars
      },
      "::-webkit-scrollbar-track": {
        background: tokens.colorNeutralBackground4, // Light gray for the track
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        background: tokens.colorBrandStroke2Hover, // Dark gray for the thumb
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: tokens.colorNeutralStroke2, // Dark gray for the thumb
      },
    }),
    eventCardWeekView: css({
      backgroundColor: tokens.colorBrandBackground,
      color: tokens.colorNeutralForegroundOnBrand,
      borderRadius: "4px",
      padding: "4px",
      margin: "2px",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      height: "100%",
    }),
    popoverContent: css({
      padding: 0,
      borderTopWidth: 20,
      borderTopStyle: "solid",
    }),
  };

  const applyEventHouverColorClass = (
    backgroundColor: string,
    houverColor: string
  ): string => {
    return css({
      backgroundColor: backgroundColor ?? tokens.colorBrandBackground,
      ":hover": {
        backgroundColor: houverColor ?? tokens.colorBrandBackgroundHover,
      },
    });
  };

  return { styles, applyEventHouverColorClass };
};
