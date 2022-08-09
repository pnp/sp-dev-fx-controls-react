/*
* Parameter descriptions are from https://www.chartjs.org/docs/latest, where possible.
*/
import {
  Chart,
  ChartSize,
  ChartData,
  ChartOptions
} from 'chart.js';

/**
 * The properties for the ChartComponent object
 */
export interface IChartControlProps {
  /**
   * Provides an accessible version of the chart for
   * users with visual impairment
   */
  accessibility?: IChartAccessibility;

  /**
  The data to be displayed in the chart
  @type {ChartData}
  */
  data?: ChartData;

  /**
  Promise to the data to be displayed in the chart.
  ChartControl will automatically display data when
  promise returns.
  @type {Promise<ChartData>}
  */
  datapromise?: Promise<Chart.ChartData>;

  /**
  If using datapromises, sets the content to display while loading the data.
  @type {JSX.Element | Function}
   */
  loadingtemplate?: JSX.Element | (() => JSX.Element | undefined);

  /**
  If using datapromises, sets the content to display when a promise is rejected
  @type {JSX.Element | Function}
   */
  rejectedtemplate?: JSX.Element | ((rejected: {}) => JSX.Element | undefined);

  /**
  The options for the chart
  @type {ChartOptions}
   */
  options?: ChartOptions;

  /**
   The type of chart to render
   @type {ChartType}
   */
  type: ChartType;

  /**
   The custom CSS classname
   @type {string}
   */
  className?: string;

  /**
   * Specifies one of the Office color palettes.
   * If the background color is set in the datasets, this option will be overwritten.
   */
  palette?: ChartPalette;

  /**
   Plugins are the most efficient way to customize or change the default behavior of a chart.
   They have been introduced in chart.js version 2.1.0 (global plugins only) and extended
   in version 2.5.0 (per chart plugins and options).
   @type {object[]} an array of plugins
   */
  plugins?: object[];

  /**
   * Enables or disables the chart control's ability to detect the environment themes.
   * @default true
   */
  useTheme?: boolean;

  /**
   * Called if the event is of type 'mouseup' or 'click'.
   * Called in the context of the chart and passed the event and an array of active elements.
   * If onClick is defined in the chart options, this callback will be ignored.
   * @param event
   * @param activeElements
   */
  onClick?(event?: MouseEvent, activeElements?: Array<{}>): void;

  /**
   * Called when any of the events fire.
   * Called in the context of the chart and passed the event and an array of active elements (bars, points, etc).
   * If onHover is defined in the chart options, this callback will be ignored
   * @param chart @type {IChartJs}
   * @param event  @type {MouseEvent}
   * @param activeElements @type {Array<{}>}
   */
  onHover?(chart: Chart, event: MouseEvent, activeElements: Array<{}>): void;

  /**
    * Called when a resize occurs. Gets passed two arguments: the chart instance and the new size.
    * If onResize is defined in the chart options, this callback will be ignored
    * OnResize doesn't get called when the chart doesn't use relative positioning.
    * @param chart @type {IChartJs}  the chart instance
    * @param newSize @type {IChartSize} the new size.
    */
  onResize?(chart: Chart, newSize: ChartSize): void;
}

/**
 * The state of a chart
 */
export interface IChartControlState {
  isLoading: boolean;
  data?: Chart.ChartData;
  rejected?: {};
}

/**
 * The color palettes available within Office.
 */
export enum ChartPalette {
  /**
   * Office Colorful Palette 1:
   * Blue, Orange, Grey, Gold, Blue, Green
   */
  OfficeColorful1,

  /**
  * Office Colorful Palette 2:
  * Blue, Grey, Blue, Dark Blue, Dark Grey, Dark Blue
   */
  OfficeColorful2,

  /**
   * Office Colorful Palette 3:
   *  Orange, Gold, Green, Brown, Dark Yellow, Dark Green */
  OfficeColorful3,

  /**
   * Office Colorful Palette 4:
   * Green, Blue, Gold, Dark Green, Dark Blue, Dark Yellow */
  OfficeColorful4,

  /**
   * Monochromatic Palette 1:
   * Blue gradient, dark to light
   */
  OfficeMonochromatic1,

  /**
   * Monochromatic Palette 2:
   * Orange gradient, dark to light
   */
  OfficeMonochromatic2,

  /**
   * Monochromatic Palette 3:
   * Grey gradient, dark to light
   */
  OfficeMonochromatic3,

  /**
   * Monochromatic Palette 4:
   * Gold gradient, dark to light
   */
  OfficeMonochromatic4,

  /**
   * Monochromatic Palette 5:
   * Blue gradient, dark to light
   */
  OfficeMonochromatic5,

  /**
   * Monochromatic Palette 6:
   * Green gradient, dark to light
   */
  OfficeMonochromatic6,

  /**
   * Monochromatic Palette 7:
   * Dark Grey, Light Grey, Grey, Dark Grey, Light Grey, Grey
   */
  OfficeMonochromatic7,

  /**
   * Monochromatic Palette 8:
   * Blue gradient, light to dark
   */
  OfficeMonochromatic8,

  /**
   * Monochromatic Palette 9:
   * Orange gradient, light to dark
   */
  OfficeMonochromatic9,

  /**
   * Monochromatic Palette 10:
   * Grey gradient, light to dark
   */
  OfficeMonochromatic10,

  /**
   * Monochromatic Palette 11:
   * Gold gradient, light to dark
   */
  OfficeMonochromatic11,

  /**
   * Monochromatic Palette 12:
   * Blue gradient, light to dark
   */
  OfficeMonochromatic12,

  /**
   * Monochromatic Palette 13:
   * Green gradient, light to dark
   */
  OfficeMonochromatic13
}

export interface IChartAccessibility {
  /**
   * Indicates if the chart should render
   * a hidden table that will appear for
   * screen readers
   * @default true
   */
  enable?: boolean;

  /**
   * Allows you to overwrite the default classname
   * of the accessible table
   */
  className?: string;

  /**
   * Provides a caption for the accessible table
   * @default defaults to the chart's title if any
   */
  caption?: string;

  /**
   * Provides a summary of the data
   */
  summary?: string;

  /**
   * Provides an alternate text for the chart.
   */
  alternateText?: string;

  /**
   * Allows you to custom-render your own accessible table
   */
  onRenderTable?: () => JSX.Element;
}

/**
 * Use this interface if you'd like to create a plugin
 */
export interface IChartPlugin {
   beforeInit?(chartInstance: Chart, options?: {}): void;
  afterInit?(chartInstance: Chart, options?: {}): void;

  beforeUpdate?(chartInstance: Chart, options?: {}): void;
  afterUpdate?(chartInstance: Chart, options?: {}): void;

  beforeLayout?(chartInstance: Chart, options?: {}): void;
  afterLayout?(chartInstance: Chart, options?: {}): void;

  beforeDatasetsUpdate?(chartInstance: Chart, options?: {}): void;
  afterDatasetsUpdate?(chartInstance: Chart, options?: {}): void;

  // This is called at the start of a render.
  // It is only called once, even if the animation will run
  // for a number of frames. Use beforeDraw or afterDraw
  // to do something on each animation frame
  beforeRender?(chartInstance: Chart, options?: {}): void;
  afterRender?(chartInstance: Chart, options?: {}): void;

  // Easing is for animation
  beforeDraw?(chartInstance: Chart, easing: string, options?: {}): void;
  afterDraw?(chartInstance: Chart, easing: string, options?: {}): void;

  // Before the datasets are drawn but after scales are drawn
  beforeDatasetsDraw?(chartInstance: Chart, easing: string, options?: {}): void;
  afterDatasetsDraw?(chartInstance: Chart, easing: string, options?: {}): void;

  // Called before drawing the `tooltip`. If any plugin returns `false`,
  // the tooltip drawing is cancelled until another `render` is triggered.
  beforeTooltipDraw?(chartInstance: Chart, tooltipData?: {}, options?: {}): void;
  // Called after drawing the `tooltip`. Note that this hook will not,
  // be called if the tooltip drawing has been previously cancelled.
  afterTooltipDraw?(chartInstance: Chart, tooltipData?: {}, options?: {}): void;

  // Called when an event occurs on the chart
  beforeEvent?(chartInstance: Chart, event: Event, options?: {}): void;
  afterEvent?(chartInstance: Chart, event: Event, options?: {}): void;

  resize?(chartInstance: Chart, newChartSize: Chart.ChartSize, options?: {}): void;
  destroy?(chartInstance: Chart): void;
}

/**
 * The types of charts available
 */
export type ChartType = 'line'
  | 'bar'
  | 'horizontalBar'
  | 'radar'
  | 'doughnut'
  | 'polarArea'
  | 'bubble'
  | 'pie'
  | 'scatter';

/**
 * The types of charts available
 */
/* tslint:disable */
export const ChartType = {
  Line: 'line' as ChartType,
  Bar: 'bar' as ChartType,
  HorizontalBar: 'horizontalBar' as ChartType,
  Radar: 'radar' as ChartType,
  Doughnut: 'doughnut' as ChartType,
  PolarArea: 'polarArea' as ChartType,
  Bubble: 'bubble' as ChartType,
  Pie: 'pie' as ChartType,
  Scatter: 'scatter' as ChartType
};
/* tslint:enable */
