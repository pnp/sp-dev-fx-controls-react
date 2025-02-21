
export interface IAccordionProps {
  defaultCollapsed?: boolean;
  title: string;
  className?: string;
  collapsedIcon?: string;
  expandedIcon?: string;
}

export interface IAccordionState {
  expanded: boolean;
}
