import * as React from 'react';
import { IChartControlState, IChartControlProps } from '.';
import styles from './ChartControl.module.scss';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { Chart, ChartSize } from 'chart.js';
import { PaletteGenerator } from './PaletteGenerator';
import { AccessibleChartTable } from './AccessibleChartTable';
import * as telemetry from '../../common/telemetry';
import { ChartPalette } from './ChartControl.types';

export class ChartControl extends React.Component<IChartControlProps, IChartControlState> {
  /**
   * Sets default properties
   */
  public static defaultProps: Partial<IChartControlProps> = {
    // We want accessibility on by default
    // -- it's the law in some countries!!!
    accessibility: {
      display: true
    },
    useTheme: true,
    palette: ChartPalette.OfficeColorful1,
    // Make charts responsive so that they fit within their
    // parent elements
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  };

  /**
   * The ChartJs instance
   */
  private _chart: Chart;

  /**
   * The canvas element that will host the chart
   */
  private _canvasElem: HTMLCanvasElement = undefined;

  constructor(props: IChartControlProps) {
    super(props);

    telemetry.track('ReactChartComponent', {
      type: !!props.type,
      className: !!props.className,
      palette: !!props.palette,
      accessibility: !!props.accessibility.display
    });
  }

  public componentDidMount(): void {
    this._initChart(this.props);
  }

  public componentWillReceiveProps(nextProps: IChartControlProps): void {
    this._destroyChart();
    this._initChart(nextProps);
  }

  public componentWillUnmount(): void {
    this._destroyChart();
  }

   /**
   * shouldComponentUpdate lifecycle hook
   * @param nextProps
   * @param nextState
   */
  public shouldComponentUpdate(nextProps: IChartControlProps, nextState: IChartControlState): boolean {
    const { data,
      options,
      plugins,
      className,
      accessibility,
    useTheme,
  palette } = this.props;
    return data !== nextProps.data ||
      options !== nextProps.options ||
      plugins !== nextProps.plugins ||
      className !== nextProps.className ||
      useTheme !== nextProps.useTheme ||
      palette !== nextProps.palette ||
      accessibility !== nextProps.accessibility;
  }
  
  public render(): React.ReactElement<IChartControlProps> {
    const {
      data,
      options,
      type,
      accessibility,
      useTheme
    } = this.props;

    const alternateText: string = accessibility && accessibility.alternateText;

    return (
      <div className={css(styles.chartComponent, (useTheme ? styles.themed : null), this.props.className)} >
        <canvas ref={this._linkCanvas} role='img' aria-label={alternateText} />
        {accessibility.display === undefined || accessibility.display ?
          <AccessibleChartTable
            chartType={type}
            data={data}
            chartOptions={options}
            caption={accessibility.caption}
            summary={accessibility.summary}
            onRenderTable={accessibility.onRenderTable}
          /> : undefined}
      </div>
    );
  }

  /**
   * Triggers an update of the chart.
   * This can be safely called after updating the data object.
   * This will update all scales, legends, and then re-render the chart.
   * @param config duration (number): Time for the animation of the redraw in milliseconds
   * lazy (boolean): If true, the animation can be interrupted by other animations
   * easing (string): The animation easing function.
   */
  public update(config?: number | boolean | string): void {
    this._chart.update(config);
  }

  /**
   * Triggers a redraw of all chart elements.
   * Note, this does not update elements for new data. Use .update() in that case.
   * @param config  duration is the time for the animation of the redraw in milliseconds
    lazy is a boolean. If true, the animation can be interrupted by other animations
   */
  public renderChart(config: {}): void {
    this._chart.render(config);
  }

  /**
   Use this to stop any current animation loop.
   This will pause the chart during any current animation frame.
   Call .render() to re-animate.
   */
  public stop(): void {
    this._chart.stop();
  }

  /**
   Will clear the chart canvas.
   Used extensively internally between animation frames, but you might find it useful.
   */
  public clear(): void {
    this._chart.clear();
  }

  /**
 Returns a base 64 encoded string of the chart in it's current state.
 @returns {string} A base-64 encoded PNG data URL containing image of the chart in its current state
 */
  public toBase64Image(): string {
    return this._chart.toBase64Image();
  }

  /**
   Return the chartjs instance
   */
  //  tslint:disable-next-line no-any
  public getChart(): Chart {
    return this._chart;
  }

  /**
  Return the canvass element that contains the chart
  @returns {HTMLCanvasElement} the canvas element containig the chart
   */
  public getCanvas(): HTMLCanvasElement {
    return this._chart.canvas;
  }

  /**
   Looks for the element under the event point,
   then returns all elements from that dataset.
   This is used internally for 'dataset' mode highlighting
   * @param e An array of elements
   */
  public getDatasetAtEvent(e: MouseEvent): Array<{}> {
    return this.getChart().getDatasetAtEvent(e);
  }

  /**
 * Calling getElementAtEvent(event) on your Chart instance passing an argument of an event,
 * or jQuery event, will return the single element at the event position.
 * If there are multiple items within range, only the first is returned.
 * The value returned from this method is an array with a single parameter.
 * An array is used to keep a consistent API between the get*AtEvent methods.
 * @param e the first element at the event point.
 */
  public getElementAtEvent(e: MouseEvent): {} {
    return this.getChart().getElementAtEvent(e);
  }

  /**
  Looks for the element under the event point, then returns all elements
  at the same data index. This is used internally for 'label' mode highlighting.
 Calling getElementsAtEvent(event) on your Chart instance passing an argument of an
 event, or jQuery event, will return the point elements that are at that
 the same position of that event.
  * @param e
  */
  public getElementsAtEvent(e: MouseEvent): Array<{}> {
    return this.getChart().getElementsAtEvent(e);
  }

  /**
   * Initializes the chart
   * @param props chart control properties
   */
  private _initChart(props: IChartControlProps): void {
    const {
      data,
      options,
      type,
      plugins,
      useTheme
    } = this.props;

    // add event handlers -- if they weren't already provided through options
    if (this.props.onClick !== undefined) {
      if (options.onClick === undefined) {
        options.onClick = this.props.onClick;
      } else {
        // we really shouldn't have English text here
        // but we're trying to warn people
        // we could also just ignore the settings quietly
        console.warn('You should pick either options.onClick'
          + ' or the chart control\'s onClick property'
          + ' -- not both. The value specified in options.onClick will be used.');
      }
    }

    // Add onhover
    if (this.props.onHover !== undefined) {
      if (options.onHover === undefined) {
        options.onHover = (event: MouseEvent, activeElements: {}[]) => {
          this.props.onHover(this.getChart(), event, activeElements);
        };
      } else {
        console.warn('You should pick either options.onHover'
          + ' or the chart control\'s onHover property'
          + ' -- not both. The value specific in options.onHover will be used.');
      }
    }

    // Add onResize
    // Note that onResize won't work unless the chart is
    // position: relative and has a height and width defined
    if (this.props.onResize !== undefined) {
      if (options.onResize === undefined) {
        options.onResize = (newSize: ChartSize) => {
          this.props.onResize(this.getChart(), newSize);
        };
      } else {
        console.warn('You should pick either options.onResize'
          + ' or the chart control\'s onResize property'
          + ' not both. The value specific in options.onResize will be used.');
      }
    }

    this._applyDatasetPalette();

    if (useTheme) {
      this._applyChartThemes();
    }

    this._chart = new Chart(this._canvasElem, {
      type: type,
      data: data,
      options: options,
      plugins: plugins
    });
  }

  private _applyDatasetPalette() {
    const {
      data
    } = this.props;

    try {
      if (data !== undefined && data.datasets !== undefined) {
        data.datasets.forEach(dataset => {
          if (dataset.backgroundColor === undefined) {
            dataset.backgroundColor = PaletteGenerator.GetPalette(this.props.palette, dataset.data.length);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _applyChartThemes(): void {
    try {
      Chart.defaults.global.defaultFontColor = this._getThemeColor(styles.defaultFontColor);
      Chart.defaults.global.defaultFontFamily = styles.defaultFontFamily;
      Chart.defaults.global.defaultFontSize = this._getFontSizeNumber(styles.defaultFontSize);
      Chart.defaults.global.title.fontColor = this._getThemeColor(styles.titleColor);
      Chart.defaults.global.title.fontFamily = styles.titleFont;
      Chart.defaults.global.title.fontSize = this._getFontSizeNumber(styles.titleFontSize);
      Chart.defaults.global.legend.labels.fontColor = this._getThemeColor(styles.legendColor);
      Chart.defaults.global.legend.labels.fontFamily = styles.legendFont;
      Chart.defaults.global.legend.labels.fontSize = this._getFontSizeNumber(styles.legendFontSize);
      Chart.defaults.global.tooltips.backgroundColor = this._getThemeColor(styles.tooltipBackgroundColor);
      Chart.defaults.global.tooltips.bodyFontColor = this._getThemeColor(styles.tooltipBodyColor);
      Chart.defaults.global.tooltips.bodyFontFamily = styles.tooltipFont;
      Chart.defaults.global.tooltips.bodyFontSize = this._getFontSizeNumber(styles.tooltipFontSize);
      Chart.defaults.global.tooltips.titleFontColor = this._getThemeColor(styles.tooltipTitleColor);
      Chart.defaults.global.tooltips.titleFontFamily = styles.tooltipTitleFont;
      Chart.defaults.global.tooltips.titleFontSize = this._getFontSizeNumber(styles.tooltipTitleFontSize);
      Chart.defaults.global.tooltips.footerFontColor = this._getThemeColor(styles.tooltipFooterColor);
      Chart.defaults.global.tooltips.footerFontFamily = styles.tooltipFooterFont;
      Chart.defaults.global.tooltips.footerFontSize = this._getFontSizeNumber(styles.tooltipFooterFontSize);
      Chart.defaults.global.tooltips.borderColor = this._getThemeColor(styles.tooltipBorderColor);

      if (Chart.defaults
        && Chart.defaults.scale
        && Chart.defaults.scale.gridLines
        && Chart.defaults.scale.gridLines.color) {
        Chart.defaults.scale.gridLines.color = this._getThemeColor(styles.lineColor);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private _destroyChart(): void {
    if (this._chart !== undefined) {
      this._chart.destroy();
    }
  }

  private _linkCanvas = (e: HTMLCanvasElement) => {
    this._canvasElem = e;
  }

  private _getThemeColor(value: string): string {
    if (value.indexOf('theme:') > 0) {
      // This value has a theme substitution
      const themeParts: string[] = value.replace('[', '').replace(']', '').replace('"', '').split(',');
      let defaultValue: string = undefined;
      let themeValue: string = undefined;

      // Break the theme string into it's components
      themeParts.forEach(themePart => {
        if (themePart.indexOf('theme:') >= 0) {
          themeValue = themePart.replace('theme:', '');
        } else if (themePart.indexOf('default:') >= 0) {
          defaultValue = themePart.replace('default:', '').replace('"', '').trim();
        }
      });

      // If there is a theme value, try to read from environment
      if (themeValue !== undefined) {
        try {
          // This should definitely be easier to do in SPFx!

          // tslint:disable-next-line
          const themeStateVariable: any = window['__themeState__'];
          if (themeStateVariable === undefined) {
            return defaultValue;
          }
          const themeState: {} = themeStateVariable.theme;

          if (themeState === undefined) {
            return defaultValue;
          }

          for (const varName in themeState) {
            if (!themeState.hasOwnProperty(varName)) {
              continue;
            }

            // Cheesy cleanup of variables to remove extra quotes
            if (varName === themeValue) {
              return themeState[varName].replace('"', '').trim();
            }
          }
        } catch (error) {
          // do nothing
        }

        return defaultValue;
      }
    }

    return value;
  }

  // Reads one of the Office Fabric defined font sizes
  // and converts to a number
  private _getFontSizeNumber(value: string): number {
    return parseInt(value.replace('px', ''), 10);
  }
}
