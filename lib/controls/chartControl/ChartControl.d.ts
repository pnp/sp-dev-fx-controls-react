import * as React from 'react';
import { IChartControlState, IChartControlProps } from './ChartControl.types';
export declare class ChartControl extends React.Component<IChartControlProps, IChartControlState> {
    /**
     * Sets default properties
     */
    static defaultProps: Partial<IChartControlProps>;
    /**
     * The ChartJs instance
     */
    private _chart;
    /**
     * The canvas element that will host the chart
     */
    private _canvasElem;
    constructor(props: IChartControlProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    /**
     * componentWillReceiveProps lifecycle hook
     *
     * @param nextProps
     */
    UNSAFE_componentWillReceiveProps(nextProps: IChartControlProps): void;
    /**
     * componentWillUnmount lifecycle hook
     */
    componentWillUnmount(): void;
    /**
    * shouldComponentUpdate lifecycle hook
    *
    * @param nextProps
    * @param nextState
    */
    shouldComponentUpdate(nextProps: IChartControlProps, nextState: IChartControlState): boolean;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IChartControlProps>;
    /**
     * Triggers an update of the chart.
     * This can be safely called after updating the data object.
     * This will update all scales, legends, and then re-render the chart.
     * @param config duration (number): Time for the animation of the redraw in milliseconds
     * lazy (boolean): If true, the animation can be interrupted by other animations
     * easing (string): The animation easing function.
     */
    update(config?: number | boolean | string): void;
    /**
     * Triggers a redraw of all chart elements.
     * Note, this does not update elements for new data. Use .update() in that case.
     * @param config  duration is the time for the animation of the redraw in milliseconds
      lazy is a boolean. If true, the animation can be interrupted by other animations
     */
    renderChart(config: {}): void;
    /**
     Use this to stop any current animation loop.
     This will pause the chart during any current animation frame.
     Call .render() to re-animate.
     */
    stop(): void;
    /**
     Will clear the chart canvas.
     Used extensively internally between animation frames, but you might find it useful.
     */
    clear(): void;
    /**
   Returns a base 64 encoded string of the chart in it's current state.
   @returns {string} A base-64 encoded PNG data URL containing image of the chart in its current state
   */
    toBase64Image(): string;
    /**
     Return the chartjs instance
     */
    getChart(): Chart;
    /**
    Return the canvass element that contains the chart
    @returns {HTMLCanvasElement} the canvas element containig the chart
     */
    getCanvas(): HTMLCanvasElement;
    /**
     Looks for the element under the event point,
     then returns all elements from that dataset.
     This is used internally for 'dataset' mode highlighting
     * @param e An array of elements
     */
    getDatasetAtEvent(e: MouseEvent): Array<{}>;
    /**
   * Calling getElementAtEvent(event) on your Chart instance passing an argument of an event,
   * or jQuery event, will return the single element at the event position.
   * If there are multiple items within range, only the first is returned.
   * The value returned from this method is an array with a single parameter.
   * An array is used to keep a consistent API between the get*AtEvent methods.
   * @param e the first element at the event point.
   */
    getElementAtEvent(e: MouseEvent): {};
    /**
    Looks for the element under the event point, then returns all elements
    at the same data index. This is used internally for 'label' mode highlighting.
   Calling getElementsAtEvent(event) on your Chart instance passing an argument of an
   event, or jQuery event, will return the point elements that are at that
   the same position of that event.
    * @param e
    */
    getElementsAtEvent(e: MouseEvent): Array<{}>;
    /**
     * Initializes the chart
     * @param props chart control properties
     */
    private _initChart;
    private _applyDatasetPalette;
    private _applyChartThemes;
    private _destroyChart;
    private _linkCanvas;
    private _getFontSizeNumber;
    /**
     * Gets the results of a promise and returns it to the chart
     * @param promise
     */
    private _doPromise;
}
//# sourceMappingURL=ChartControl.d.ts.map