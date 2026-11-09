import type * as React from 'react';

export interface IAccordionProps {
  /**
   * Content rendered inside the control.
   */
  children?: React.ReactNode;
  defaultCollapsed?: boolean;
  title: string;
  className?: string;
  collapsedIcon?: string;
  expandedIcon?: string;
}

export interface IAccordionState {
  expanded: boolean;
}
