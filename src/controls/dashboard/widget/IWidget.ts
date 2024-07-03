/**
 * Dashboard Widget Action
 */
export interface IWidgetActionKey {
  /**
   * Action id
   */
  id: string;
  /**
   * Action icon
   */
  icon?: JSX.Element;
  /**
   * Action title
   */
  title: string;
  /**
   * Action handler
   */
  onClick?: () => void;
}

/**
 * Dashboard widget size
 */
export enum WidgetSize {
  Single = "single",
  Double = "double",
  Triple = "triple",
  Quadruple = "quadruple",
  Box = "box",
}

/**
 * Widget options
 */
export interface IWidgetControlOptions {
  /**
   * Specifies if current widget is hidden
   */
  isHidden?: boolean;
}

/**
 * Dashboard widget
 */
export interface IWidget {
  /**
   * Size
   */
  size: WidgetSize;
  /**
   * Title
   */
  title: string;
  /**
   * Description
   */
  desc?: string;
  /**
   * Actions
   */
  widgetActionGroup?: IWidgetActionKey[];
  /**
   * Options
   */
  controlOptions?: IWidgetControlOptions;
  /**
   * Widget's content (children)
   */
  body?: IWidgetBodyContent[];
  /**
   * Widget's link
   */
  link?: IWidgetLink;
}

/**
 * Widget content
 */
export interface IWidgetBodyContent {
  /**
   * Id
   */
  id: string;
  /**
   * title
   */
  title: string;
  /**
   * Content
   */
  content: React.ReactNode;
}

/**
 * Widget link
 */
export interface IWidgetLink {
  href: string;
}
