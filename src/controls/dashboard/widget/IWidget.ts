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
  /**
   * Link to be opened
   */
  href: string;
  /**
   * The text to display for the link, if not provided, the default text will be used
   */
  title?: string;
  /**
   * The color of the link, if not provided, the "brand" color will be used. The available colors can be found on the [official Fluent UI documentation of the Text control](https://fluentsite.z22.web.core.windows.net/0.66.2/components/text/definition#variations-color)
   */
  color?: string;
  /**
   * The target for the generated anchor tag, if not provided, the default target will be _blank
   */
  target?: "_blank" | "_self" | "_parent" | "_top" | "framename";
}
