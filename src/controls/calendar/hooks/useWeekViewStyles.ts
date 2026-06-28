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
      height: '100vh',
      overflow: 'hidden',
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
      gridTemplateColumns: '80px repeat(7, 1fr)',
      gridTemplateRows: '50px 40px repeat(48, 33px)',
      height: 'fit-content',
      overflowY: 'auto',
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      maxHeight: 'calc(100vh - 100px)',
      scrollbarWidth: 'thin',
      scrollbarColor: `${tokens.colorBrandBackground} ${tokens.colorNeutralBackground1}`,
      '&::-webkit-scrollbar': {
        width: '8px',
      },
      '&::-webkit-scrollbar-track': {
        background: tokens.colorNeutralBackground1,
      },
      '&::-webkit-scrollbar-thumb': {
        background: tokens.colorBrandBackground,
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: tokens.colorBrandBackgroundHover,
      },
    }),
    blankHeader: css({
      gridColumn: '1',
      backgroundColor: tokens.colorNeutralBackground3,
      borderBottom: `3px solid ${tokens.colorNeutralStroke3}`,
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }),
    timeColumn: css({
      gridColumn: '1',
      gridRow: '3 / span 49',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: tokens.colorNeutralBackground1,
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    timeCell: css({
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: tokens.colorNeutralForeground3,
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      justifyContent: 'center',
    }),
    fullDayRow: css({
      gridRow: '2',
      display: 'grid',
      gridTemplateColumns: '80px repeat(7, 1fr)',
      gap: '0',
      padding: '0',
      backgroundColor: tokens.colorNeutralBackground2,
      borderBottom: `3px solid ${tokens.colorNeutralStroke2}`,
    }),
    fullDayLabel: css({
      gridColumn: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignContent: 'center',
      color: tokens.colorBrandBackground,
      padding: '5px',
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
      borderBottom: `3px solid ${tokens.colorNeutralStroke2}`,
    }),
    fullDayCell: css({
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
      display: 'flex',
      flexDirection: 'row',
      gap: '0px',
      padding: '4px',
      borderBottom: `3px solid ${tokens.colorNeutralStroke2}`,
      overflow: 'hidden',
    }),
    fullDayEvent: css({
      flex: '1 1 auto',
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
      top: 0,
      zIndex: 10,
    }),
    todayHeaderCell: css({
      borderTop: `5px solid ${tokens.colorBrandBackground}`,
    }),
    eventCard: css({
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '2px',
      zIndex: 1,
      position: 'absolute',
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
      marginRight: '2px',
      zIndex: 1,
      position: 'absolute',
      alignContent: 'center',
      ':hover': {
        pointerEvents: 'auto',
        cursor: 'pointer',
      },
    }),
    dayCell: css({
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
      position: 'relative',
      overflow: 'visible',
      FlexDirection: 'column',
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
      border: `2px solid ${tokens.colorPaletteRedBorderActive}`,
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
        height: `${rowHeight * spanSlots}px`,
        left: `${eventIndex * 10}%`,
        width: `calc(${100 - eventIndex * 10}% - 8px)`,
        margin: 4,
        marginTop: 0,
        marginBottom: 0,
      });
    },
    []
  );

  return { styles, applyEventHouverColorClass, appyDynamicStyles };
};
