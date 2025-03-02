import React from 'react';
import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

interface WeekViewStyles {
  container: string;
  header: string;
  weekGrid: string;
  blankHeader: string;
  timeColumn: string;
  timeCell: string;
  fullDayRow: string;
  fullDayLabel: string;
  fullDayCell: string;
  fullDayEvent: string;
  dayHeaderCell: string;
  todayHeaderCell: string;
  eventCard: string;
  event: string;
  dayCell: string;
  currentTimeIndicator: string;
  currentHalfHourCell: string;
  eventTitle: string;
  popoverContent: string;
}

interface UseWeekViewStyles {
  styles: WeekViewStyles;
  applyEventHouverColorClass: (
    backgroundColor: string,
    hoverColor: string
  ) => string;
  appyDynamicStyles: (
    eventIndex: number,
    eventCount: number,
    rowHeight: number,
    spanSlots: number
  ) => string;
}

export const useWeekViewStyles = (): UseWeekViewStyles => {
  const styles: WeekViewStyles = {
    container: css({
      display: 'flex',
      flexDirection: 'column',
      width: 'calc(100% - 40px)',
      height: '100vh', // Make the container take the full viewport height
      overflow: 'hidden', // Prevent window scrolling
      padding: '20px',
    }),
    header: css({
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    weekGrid: css({
      display: 'grid',
      gridTemplateColumns: '80px repeat(7, 1fr)', // Time column + 7 day columns
      gridTemplateRows: '50px 40px repeat(48, 33px)', // Header row + Full-day row + 48 rows (2 per hour)
      height: 'fit-content',
      overflowY: 'auto',
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      maxHeight: 'calc(100vh - 100px)', // Limit the grid height to the viewport minus header/footer areas
      scrollbarWidth: 'thin', // Thin scrollbar for Firefox
      scrollbarColor: `${tokens.colorBrandBackground} ${tokens.colorNeutralBackground1}`, // Scrollbar colors for Firefox
      '&::-webkit-scrollbar': {
        width: '8px', // Width of the scrollbar
      },
      '&::-webkit-scrollbar-track': {
        background: tokens.colorNeutralBackground1, // Scrollbar track background
      },
      '&::-webkit-scrollbar-thumb': {
        background: tokens.colorBrandBackground, // Scrollbar thumb color (brand color)
        borderRadius: '4px', // Rounded corners for the thumb
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: tokens.colorBrandBackgroundHover, // Lighter color on hover
      },
    }),
    blankHeader: css({
      gridColumn: '1',
      backgroundColor: tokens.colorNeutralBackground3,
      borderBottom: `3px solid ${tokens.colorNeutralStroke3}`,
      position: 'sticky',
      top: 0, // Sticks to the top of the scrollable container
      zIndex: 10, // Ensures it stays above the scrolling grid
    }),
    timeColumn: css({
      gridColumn: '1',
      gridRow: '3 / span 49', // Spans the entire rows after the header and full-day row
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: tokens.colorNeutralBackground1,
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    timeCell: css({
      height: '100%', // Let the height be dictated by the grid row's size
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: tokens.colorNeutralForeground3,
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      justifyContent: 'center',
    }),
    fullDayRow: css({
      gridRow: '2', // Full-day events occupy the second row
      display: 'grid',
      gridTemplateColumns: '80px repeat(7, 1fr)', // Time column + 7 day columns
      gap: '0', // Ensure cells align properly
      padding: '0', // Remove padding for proper alignment
      backgroundColor: tokens.colorNeutralBackground2,
      borderBottom: `3px solid ${tokens.colorNeutralStroke2}`, // Bottom border for the row
    }),
    fullDayLabel: css({
      gridColumn: '1', // Place in the first column
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      color: tokens.colorBrandBackground,
      padding: '5px',
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`, // Right border for the label cell
      borderBottom: `3px solid ${tokens.colorNeutralStroke2}`, // Bottom border for the cell
    }),
    fullDayCell: css({
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`, // Right border between day cells
      display: 'flex',
      flexDirection: 'row', // Arrange events horizontally
      gap: '0px',
      padding: '4px', // Ensure events have spacing within the cell
      borderBottom: `3px solid ${tokens.colorNeutralStroke2}`, // Bottom border for the cell
      overflow: 'hidden', // Ensure events don’t overflow the cell
    }),
    fullDayEvent: css({
      flex: '1 1 auto', // Allow events to share space equally
      minWidth: '24px',
      height: '24px',
      padding: '4px 8px',
      backgroundColor: tokens.colorBrandBackground,

      borderRadius: '4px',
      overflow: 'hidden',

      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    dayHeaderCell: css({
      textAlign: 'center',
      backgroundColor: tokens.colorNeutralBackground2,
      padding: '8px',
      fontWeight: 'bold',
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      position: 'sticky',
      top: 0, // Sticks to the top of the scrollable container
      zIndex: 10, // Ensures it stays above the scrolling grid
    }),
    todayHeaderCell: css({
      borderTop: `5px solid ${tokens.colorBrandBackground}`,
    }),
    eventCard: css({
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '2px', // Spacing between events
      zIndex: 1, // Ensure event appears above others
      position: 'absolute', // Position relative to the cell
      alignContent: 'center',
      overflow: 'hidden',
      ':hover': {
        pointerEvents: 'auto',
        cursor: 'pointer',
      },
    }),
    event: css({
      height: '100%',
      backgroundColor: tokens.colorBrandBackground,
      borderRadius: '4px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '2px', // Spacing between events
      zIndex: 1, // Ensure event appears above others
      position: 'absolute', // Position relative to the cell
      alignContent: 'center',
      ':hover': {
        pointerEvents: 'auto',
        cursor: 'pointer',
      },
    }),
    dayCell: css({
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`, // Cell borders
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
      position: 'relative', // Allow child events to be positioned absolutely
      overflow: 'visible', // Ensure events aren't clipped
      FlexDirection: 'column', // Ensure events are stacked vertically
      gap: '4px',
    }),
    currentTimeIndicator: css({
      position: 'absolute',
      left: 0,
      height: '2px',
      backgroundColor: tokens.colorPaletteRedBorderActive,
      width: '100%',
      zIndex: 1,
    }),
    currentHalfHourCell: css({
      border: `2px solid ${tokens.colorPaletteRedBorderActive}`, // Highlight with a red border
    }),
    eventTitle: css({
      display: '-webkit-box',
      '-webkit-line-clamp': '1',
      '-webkit-box-orient': 'vertical',
      textAlign: 'start',
      textOverflow: 'ellipsis',
      paddingLeft: '8px',
      wordBreak: 'break-word',
      overflow: 'hidden',
    }),
    popoverContent: css({
      padding: 0,
      borderTopWidth: 20,
      borderTopStyle: 'solid',
    }),
  };

  const applyEventHouverColorClass = React.useCallback(
    (backgroundColor: string, hoverColor: string) => {
      return css({
        backgroundColor: backgroundColor ?? tokens.colorBrandBackground,

        ':hover': {
          backgroundColor: hoverColor ?? tokens.colorBrandBackgroundHover,
        },
      });
    },
    [tokens.colorBrandBackground, tokens.colorBrandBackgroundHover]
  );

  const appyDynamicStyles = React.useCallback(
    (
      eventIndex: number,
      eventCount: number,
      rowHeight: number,
      spanSlots: number
    ) => {
      return css({
        flex: `0 0 calc(100% / ${eventCount})`,
        height: `${rowHeight * spanSlots}px`, // Dynamically calculate height
        left: `${eventIndex * 10}%`, // Adjust for overlapping events
        width: `calc(${100 - eventIndex * 10}% - 8px)`, // Adjust width for overlap
        margin: 4, // Add margin for spacing
        marginTop: 0,
        marginBottom: 0,
      });
    },
    []
  );

  return { styles, applyEventHouverColorClass, appyDynamicStyles };
};
