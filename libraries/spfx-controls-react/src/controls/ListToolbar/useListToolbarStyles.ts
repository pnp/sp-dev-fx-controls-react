import { css } from "@emotion/css";
import { tokens } from "@fluentui/react-components";

export interface IListToolbarStyles {
  toolbar: string;
  leftSection: string;
  measureSection: string;
  rightGroup: string;
  farItemsContainer: string;
  countBadge: string;
  divider: string;
  toolbarItem: string;
  toolbarButtonBase: string;
  overflowButton: string;
  farItemButton: string;
  farItemLabel: string;
}

export const useListToolbarStyles = (): IListToolbarStyles => {
  return {
    /** Outer toolbar container */
    toolbar: css`
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      padding: ${tokens.spacingVerticalS} ${tokens.spacingHorizontalM};
      background-color: ${tokens.colorNeutralBackground1};
      border-bottom: 1px solid ${tokens.colorNeutralStroke2};
      min-height: 48px;
      gap: ${tokens.spacingHorizontalXS};
      white-space: nowrap;
      position: relative;
    `,

    /** Visible container for regular (left-side) items */
    leftSection: css`
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      gap: ${tokens.spacingHorizontalXS};
      flex: 0 0 auto !important;
      min-width: 0;
    `,

    /** Hidden mirror — renders ALL items for unclipped measurement */
    measureSection: css`
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: ${tokens.spacingHorizontalXS};
      position: absolute;
      top: 0;
      left: 0;
      visibility: hidden;
      pointer-events: none;
      height: 0;
      overflow: visible;
      z-index: -1;
    `,

    /** Far-items group — pushed to the right edge */
    rightGroup: css`
      display: flex !important;
      flex-wrap: nowrap !important;
      align-items: center !important;
      gap: ${tokens.spacingHorizontalXS};
      flex: 0 0 auto !important;
      margin-left: auto;
      white-space: nowrap;
    `,

    /** Inner wrapper for far-items inside rightGroup */
    farItemsContainer: css`
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      gap: inherit;
    `,

    /** Base style for all ToolbarButton instances */
    toolbarButtonBase: css`
      min-width: auto;
    `,

    /** "..." overflow menu trigger button */
    overflowButton: css`
      flex-shrink: 0;
    `,

    /** Count badge — hidden on mobile */
    countBadge: css`
      flex-shrink: 0;
      @media (max-width: 768px) {
        display: none;
      }
    `,

    /** Divider between groups */
    divider: css`
      height: 24px;
      margin: 0 ${tokens.spacingHorizontalXS};
    `,

    /** Regular toolbar item */
    toolbarItem: css`
      flex-shrink: 0;
      width: fit-content;
      white-space: nowrap;
    `,

    /** Far-item button */
    farItemButton: css`
      flex-shrink: 0;
    `,

    /** Label text inside far-item buttons — hidden on mobile */
    farItemLabel: css`
      @media (max-width: 768px) {
        display: none;
      }
    `,
  };
};
