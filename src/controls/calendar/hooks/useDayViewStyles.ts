import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export const useDayViewStyles = (): {
  styles: { [key: string]: string };
  applyEventHouverColorClass: (
    backgroundColor: string,
    hoverColor: string,
  ) => string;
} => {
  const styles = {
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
    dayGrid: css({
      display: 'grid',
      gridTemplateColumns: '80px 1fr',
      gridTemplateRows: '50px 40px repeat(48, 33px)',
      height: 'calc(100vh - 100px)',
      overflowY: 'auto',
      border: `1px solid ${tokens.colorNeutralStroke1}`,
      maxHeight: 'fit-content',
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
      maxHeight: '32px',
      minHeight: '32px',
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
      gridTemplateColumns: '80px 33px', // Time column + 7 day columns
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
      gap: '2px',
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
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '2px',
      zIndex: 1,
      position: 'absolute',
      alignContent: 'center',

      overflow: 'hidden',
    }),

    dayCell: css({
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
      borderRight: `1px solid ${tokens.colorNeutralStroke1}`,
      position: 'relative',
      overflow: 'visible',
      flexDirection: 'column',
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
  };

  const applyEventHouverColorClass = (
    backgroundColor: string,
    houveColor: string,
  ): string => {
    return css({
      backgroundColor: backgroundColor ?? tokens.colorBrandBackground,
      ':hover': {
        backgroundColor: houveColor ?? tokens.colorBrandBackgroundHover,
      },
    });
  };

  return { styles, applyEventHouverColorClass };
};
