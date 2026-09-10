import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export const DETAILS_LIST_HEADER_HEIGHT = 42;
export const DETAILS_LIST_HEADER_TOP_SPACING = 16;
export const DETAILS_LIST_SELECTION_COLUMN_WIDTH = 48;
export const DETAILS_LIST_DEFAULT_ROW_HEIGHT = 42;
export const DETAILS_LIST_COMPACT_ROW_HEIGHT = 32;
export const DETAILS_LIST_DEFAULT_HEIGHT = 600;

const DETAILS_LIST_SCROLLBAR_SIZE = '3px';

interface IDetailsListClassNames {
  root: string;
  viewport: string;
  grid: string;
  headerViewport: string;
  headerWrapper: string;
  headerRow: string;
  headerCell: string;
  headerButton: string;
  headerLabel: string;
  headerIcon: string;
  resizeHandle: string;
  row: string;
  selectedRow: string;
  disabledRow: string;
  dropTargetRow: string;
  cell: string;
  paddedCell: string;
  multilineCell: string;
  rowHeaderCell: string;
  cellText: string;
  selectionCell: string;
  selectionCellOnHover: string;
  groupHeader: string;
  groupButton: string;
  groupIndent: string;
  body: string;
  shimmerRow: string;
  shimmerCell: string;
  virtualEntry: string;
  stateContainer: string;
  loadingMore: string;
}

export const useDetailsListStyles = (): IDetailsListClassNames => {
  const selectionCell = css({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    minWidth: 0,
    overflow: 'hidden',
  });

  const row = css({
    position: 'relative',
    display: 'grid',
    alignItems: 'stretch',
    minWidth: '100%',
    boxSizing: 'border-box',
    color: tokens.colorNeutralForeground2,
    backgroundColor: tokens.colorNeutralBackground1,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    cursor: 'default',
    outline: 'none',
    '&:hover': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
    '&:focus-visible': {
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: '-2px',
      zIndex: 1,
    },
    [`&:hover .${selectionCell}, &:focus-within .${selectionCell}`]: {
      opacity: 1,
    },
  });

  return {
    root: css({
      position: 'relative',
      width: '100%',
      minWidth: 0,
      color: tokens.colorNeutralForeground2,
      backgroundColor: tokens.colorNeutralBackground1,
      fontFamily: tokens.fontFamilyBase,
      fontSize: tokens.fontSizeBase200,
      lineHeight: tokens.lineHeightBase200,
    }),
    viewport: css({
      position: 'relative',
      flex: '1 1 auto',
      width: '100%',
      minWidth: 0,
      minHeight: 0,
      overflow: 'auto',
      overscrollBehavior: 'contain',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'thin',
      scrollbarColor: `${tokens.colorBrandBackground} ${tokens.colorNeutralBackground3}`,
      '&::-webkit-scrollbar': {
        width: DETAILS_LIST_SCROLLBAR_SIZE,
        height: DETAILS_LIST_SCROLLBAR_SIZE,
      },
      '&::-webkit-scrollbar-track': {
        background: tokens.colorNeutralBackground3,
        borderRadius: tokens.borderRadiusMedium,
      },
      '&::-webkit-scrollbar-thumb': {
        background: tokens.colorBrandBackground,
        borderRadius: tokens.borderRadiusMedium,
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: tokens.colorBrandBackgroundHover,
      },
    }),
    grid: css({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minWidth: 0,
      outline: 'none',
    }),
    headerViewport: css({
      flex: '0 0 auto',
      width: '100%',
      minWidth: 0,
      overflow: 'hidden',
    }),
    headerWrapper: css({
      position: 'relative',
      minWidth: '100%',
      boxSizing: 'border-box',
      paddingTop: tokens.spacingVerticalL,
      backgroundColor: tokens.colorNeutralBackground1,
      borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    headerRow: css({
      display: 'grid',
      alignItems: 'stretch',
      minWidth: '100%',
      height: DETAILS_LIST_HEADER_HEIGHT,
      boxSizing: 'border-box',
    }),
    headerCell: css({
      position: 'relative',
      display: 'flex',
      minWidth: 0,
      height: DETAILS_LIST_HEADER_HEIGHT,
      boxSizing: 'border-box',
      overflow: 'visible',
      backgroundColor: tokens.colorNeutralBackground1,
    }),
    headerButton: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: tokens.spacingHorizontalXS,
      width: '100%',
      minWidth: 0,
      height: '100%',
      boxSizing: 'border-box',
      padding: `0 ${tokens.spacingHorizontalS} 0 ${tokens.spacingHorizontalM}`,
      color: 'inherit',
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: 0,
      font: 'inherit',
      textAlign: 'left',
      cursor: 'pointer',
      outline: 'none',
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground1Hover,
      },
      '&:active': {
        backgroundColor: tokens.colorNeutralBackground1Pressed,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.colorBrandStroke1}`,
        outlineOffset: '-2px',
      },
      '&:disabled': {
        cursor: 'default',
      },
    }),
    headerLabel: css({
      minWidth: 0,
      flexGrow: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    }),
    headerIcon: css({
      flexShrink: 0,
      color: tokens.colorNeutralForeground3,
    }),
    resizeHandle: css({
      position: 'absolute',
      top: 0,
      right: -8,
      bottom: 0,
      zIndex: 2,
      width: 16,
      padding: 0,
      backgroundColor: 'transparent',
      border: 0,
      // Fluent UI 9 Button applies a pointer cursor to its root. The resize
      // handle must keep the native horizontal-resize affordance instead.
      cursor: 'col-resize !important',
      touchAction: 'none',
      outline: 'none',
      '&:hover, &:active, &:focus-visible': {
        cursor: 'col-resize !important',
      },
      '&::after': {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: 1,
        content: '""',
        backgroundColor: tokens.colorNeutralStroke1,
        opacity: 0,
      },
      '&:hover::after, &:focus-visible::after': {
        opacity: 1,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.colorBrandStroke1}`,
        outlineOffset: '-2px',
      },
    }),
    row,
    selectedRow: css({
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorSubtleBackgroundSelected,
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground3,
      },
    }),
    disabledRow: css({
      color: tokens.colorNeutralForegroundDisabled,
      pointerEvents: 'none',
    }),
    dropTargetRow: css({
      outline: `2px solid ${tokens.colorBrandStroke1}`,
      outlineOffset: '-2px',
    }),
    cell: css({
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      boxSizing: 'border-box',
      overflow: 'hidden',
      padding: `0 ${tokens.spacingHorizontalS} 0 ${tokens.spacingHorizontalM}`,
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    }),
    paddedCell: css({
      paddingRight: tokens.spacingHorizontalXXL,
    }),
    multilineCell: css({
      alignItems: 'flex-start',
      paddingTop: tokens.spacingVerticalS,
      paddingBottom: tokens.spacingVerticalS,
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      textOverflow: 'clip',
    }),
    rowHeaderCell: css({
      color: tokens.colorNeutralForeground1,
      fontSize: tokens.fontSizeBase300,
    }),
    cellText: css({
      display: 'block',
      minWidth: 0,
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'inherit',
    }),
    selectionCell,
    selectionCellOnHover: css({
      opacity: 0,
    }),
    groupHeader: css({
      display: 'grid',
      alignItems: 'stretch',
      minWidth: '100%',
      boxSizing: 'border-box',
      backgroundColor: tokens.colorNeutralBackground2,
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    }),
    groupButton: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: tokens.spacingHorizontalS,
      minWidth: 0,
      width: '100%',
      padding: `0 ${tokens.spacingHorizontalM}`,
      color: tokens.colorNeutralForeground1,
      backgroundColor: 'transparent',
      border: 0,
      borderRadius: 0,
      font: 'inherit',
      textAlign: 'left',
      cursor: 'pointer',
      outline: 'none',
      '&:hover': {
        backgroundColor: tokens.colorNeutralBackground2Hover,
      },
      '&:focus-visible': {
        outline: `2px solid ${tokens.colorBrandStroke1}`,
        outlineOffset: '-2px',
      },
    }),
    groupIndent: css({
      flex: `0 0 ${tokens.spacingHorizontalXXL}`,
      width: tokens.spacingHorizontalXXL,
    }),
    body: css({
      position: 'relative',
      minWidth: '100%',
      overflowAnchor: 'none',
    }),
    shimmerRow: css({
      display: 'grid',
      alignItems: 'stretch',
      minWidth: '100%',
      boxSizing: 'border-box',
      backgroundColor: tokens.colorNeutralBackground1,
      borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
      pointerEvents: 'none',
    }),
    shimmerCell: css({
      display: 'flex',
      alignItems: 'center',
      minWidth: 0,
      boxSizing: 'border-box',
      overflow: 'hidden',
      padding: `0 ${tokens.spacingHorizontalS} 0 ${tokens.spacingHorizontalM}`,
    }),
    virtualEntry: css({
      position: 'absolute',
      right: 0,
      left: 0,
    }),
    stateContainer: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacingHorizontalS,
      minHeight: 160,
      padding: tokens.spacingVerticalXXL,
      boxSizing: 'border-box',
    }),
    loadingMore: css({
      position: 'sticky',
      left: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: tokens.spacingHorizontalS,
      minHeight: DETAILS_LIST_COMPACT_ROW_HEIGHT,
      color: tokens.colorNeutralForeground2,
      backgroundColor: tokens.colorNeutralBackground1,
    }),
  };
};
