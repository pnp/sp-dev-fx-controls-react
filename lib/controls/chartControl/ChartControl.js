var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import styles from './ChartControl.module.scss';
import { css } from '@fluentui/react/lib/Utilities';
import { Chart } from 'chart.js';
import { PaletteGenerator } from './PaletteGenerator';
import { AccessibleChartTable } from './AccessibleChartTable';
import * as telemetry from '../../common/telemetry';
import { ChartPalette } from './ChartControl.types';
import { ThemeColorHelper } from '../../common/utilities/ThemeColorHelper';
var ChartControl = /** @class */ (function (_super) {
    __extends(ChartControl, _super);
    function ChartControl(props) {
        var _this = _super.call(this, props) || this;
        /**
         * The canvas element that will host the chart
         */
        _this._canvasElem = undefined;
        _this._linkCanvas = function (e) {
            _this._canvasElem = e;
        };
        telemetry.track('ReactChartComponent', {
            type: !!props.type,
            className: !!props.className,
            palette: !!props.palette,
            accessibility: !!props.accessibility.enable
        });
        _this.state = {
            isLoading: false,
            rejected: undefined,
            data: undefined
        };
        return _this;
    }
    /**
     * componentDidMount lifecycle hook
     */
    ChartControl.prototype.componentDidMount = function () {
        if (this.props.datapromise) {
            this._doPromise(this.props.datapromise);
        }
        else {
            this._initChart(this.props, this.props.data);
        }
    };
    /**
     * componentWillReceiveProps lifecycle hook
     *
     * @param nextProps
     */
    ChartControl.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (nextProps.datapromise !== this.props.datapromise) {
            this.setState({
                isLoading: false
            });
            this._doPromise(nextProps.datapromise);
        }
        else {
            this._destroyChart();
            this._initChart(nextProps, this.props.data);
        }
    };
    /**
     * componentWillUnmount lifecycle hook
     */
    ChartControl.prototype.componentWillUnmount = function () {
        this._destroyChart();
    };
    /**
    * shouldComponentUpdate lifecycle hook
    *
    * @param nextProps
    * @param nextState
    */
    ChartControl.prototype.shouldComponentUpdate = function (nextProps, nextState) {
        var _a = this.props, data = _a.data, options = _a.options, plugins = _a.plugins, className = _a.className, accessibility = _a.accessibility, useTheme = _a.useTheme, palette = _a.palette;
        return data !== nextProps.data ||
            options !== nextProps.options ||
            plugins !== nextProps.plugins ||
            className !== nextProps.className ||
            useTheme !== nextProps.useTheme ||
            palette !== nextProps.palette ||
            accessibility !== nextProps.accessibility;
    };
    /**
     * Default React render method
     */
    ChartControl.prototype.render = function () {
        var _a = this.props, type = _a.type, accessibility = _a.accessibility, useTheme = _a.useTheme, options = _a.options, data = _a.data;
        // If we're still loading, try to show the loading template
        if (this.state.isLoading) {
            if (this.props.loadingtemplate) {
                if (typeof this.props.loadingtemplate === "function") {
                    return this.props.loadingtemplate();
                }
                else {
                    return this.props.loadingtemplate;
                }
            }
        }
        // If promise was rejected, try to show the rejected template
        if (this.state.rejected) {
            if (this.props.rejectedtemplate) {
                if (typeof this.props.rejectedtemplate === "function") {
                    return this.props.rejectedtemplate(this.state.rejected);
                }
                else {
                    return this.props.rejectedtemplate;
                }
            }
        }
        var alternateText = accessibility.alternateText;
        return (React.createElement("div", { className: css(styles.chartComponent, (useTheme ? styles.themed : null), this.props.className) },
            React.createElement("canvas", { ref: this._linkCanvas, role: 'img', "aria-label": alternateText }),
            accessibility.enable === undefined || accessibility.enable ? (React.createElement(AccessibleChartTable, { chartType: type, data: data || this.state.data, chartOptions: options, className: accessibility.className, caption: accessibility.caption, summary: accessibility.summary, onRenderTable: accessibility.onRenderTable })) : null));
    };
    /**
     * Triggers an update of the chart.
     * This can be safely called after updating the data object.
     * This will update all scales, legends, and then re-render the chart.
     * @param config duration (number): Time for the animation of the redraw in milliseconds
     * lazy (boolean): If true, the animation can be interrupted by other animations
     * easing (string): The animation easing function.
     */
    ChartControl.prototype.update = function (config) {
        this._chart.update(config);
    };
    /**
     * Triggers a redraw of all chart elements.
     * Note, this does not update elements for new data. Use .update() in that case.
     * @param config  duration is the time for the animation of the redraw in milliseconds
      lazy is a boolean. If true, the animation can be interrupted by other animations
     */
    ChartControl.prototype.renderChart = function (config) {
        this._chart.render(config);
    };
    /**
     Use this to stop any current animation loop.
     This will pause the chart during any current animation frame.
     Call .render() to re-animate.
     */
    ChartControl.prototype.stop = function () {
        this._chart.stop();
    };
    /**
     Will clear the chart canvas.
     Used extensively internally between animation frames, but you might find it useful.
     */
    ChartControl.prototype.clear = function () {
        this._chart.clear();
    };
    /**
   Returns a base 64 encoded string of the chart in it's current state.
   @returns {string} A base-64 encoded PNG data URL containing image of the chart in its current state
   */
    ChartControl.prototype.toBase64Image = function () {
        return this._chart.toBase64Image();
    };
    /**
     Return the chartjs instance
     */
    //  tslint:disable-next-line no-any
    ChartControl.prototype.getChart = function () {
        return this._chart;
    };
    /**
    Return the canvass element that contains the chart
    @returns {HTMLCanvasElement} the canvas element containig the chart
     */
    ChartControl.prototype.getCanvas = function () {
        return this._chart.canvas;
    };
    /**
     Looks for the element under the event point,
     then returns all elements from that dataset.
     This is used internally for 'dataset' mode highlighting
     * @param e An array of elements
     */
    ChartControl.prototype.getDatasetAtEvent = function (e) {
        return this.getChart().getDatasetAtEvent(e);
    };
    /**
   * Calling getElementAtEvent(event) on your Chart instance passing an argument of an event,
   * or jQuery event, will return the single element at the event position.
   * If there are multiple items within range, only the first is returned.
   * The value returned from this method is an array with a single parameter.
   * An array is used to keep a consistent API between the get*AtEvent methods.
   * @param e the first element at the event point.
   */
    ChartControl.prototype.getElementAtEvent = function (e) {
        return this.getChart().getElementAtEvent(e);
    };
    /**
    Looks for the element under the event point, then returns all elements
    at the same data index. This is used internally for 'label' mode highlighting.
   Calling getElementsAtEvent(event) on your Chart instance passing an argument of an
   event, or jQuery event, will return the point elements that are at that
   the same position of that event.
    * @param e
    */
    ChartControl.prototype.getElementsAtEvent = function (e) {
        return this.getChart().getElementsAtEvent(e);
    };
    /**
     * Initializes the chart
     * @param props chart control properties
     */
    ChartControl.prototype._initChart = function (props, data) {
        var _this = this;
        var options = props.options, type = props.type, plugins = props.plugins, useTheme = props.useTheme;
        // add event handlers -- if they weren't already provided through options
        if (this.props.onClick !== undefined) {
            if (options.onClick === undefined) {
                options.onClick = this.props.onClick;
            }
        }
        // Add onhover
        if (this.props.onHover !== undefined) {
            if (options.onHover === undefined) {
                options.onHover = function (event, activeElements) {
                    _this.props.onHover(_this.getChart(), event, activeElements);
                };
            }
        }
        // Add onResize
        // Note that onResize won't work unless the chart is
        // position: relative and has a height and width defined
        if (this.props.onResize !== undefined) {
            if (options.onResize === undefined) {
                options.onResize = function (newSize) {
                    _this.props.onResize(_this.getChart(), newSize);
                };
            }
        }
        this._applyDatasetPalette(data);
        if (useTheme) {
            this._applyChartThemes();
        }
        this._chart = new Chart(this._canvasElem, {
            type: type,
            data: data,
            options: options,
            plugins: plugins
        });
    };
    ChartControl.prototype._applyDatasetPalette = function (data) {
        var _this = this;
        try {
            // Get the dataset
            var datasets = data.datasets;
            if (datasets !== undefined) {
                datasets.forEach(function (dataset) {
                    var _a;
                    if (dataset.backgroundColor === undefined) {
                        var datasetLength = (_a = dataset.data) === null || _a === void 0 ? void 0 : _a.length;
                        if (datasetLength) {
                            dataset.backgroundColor = PaletteGenerator.GetPalette(_this.props.palette, datasetLength);
                        }
                    }
                });
            }
        }
        catch (_a) {
            // no-op;
        }
    };
    ChartControl.prototype._applyChartThemes = function () {
        try {
            Chart.defaults.global.defaultFontColor = ThemeColorHelper.GetThemeColor(styles.defaultFontColor);
            Chart.defaults.global.defaultFontFamily = styles.defaultFontFamily;
            Chart.defaults.global.defaultFontSize = this._getFontSizeNumber(styles.defaultFontSize);
            Chart.defaults.global.title.fontColor = ThemeColorHelper.GetThemeColor(styles.titleColor);
            Chart.defaults.global.title.fontFamily = styles.titleFont;
            Chart.defaults.global.title.fontSize = this._getFontSizeNumber(styles.titleFontSize);
            Chart.defaults.global.legend.labels.fontColor = ThemeColorHelper.GetThemeColor(styles.legendColor);
            Chart.defaults.global.legend.labels.fontFamily = styles.legendFont;
            Chart.defaults.global.legend.labels.fontSize = this._getFontSizeNumber(styles.legendFontSize);
            Chart.defaults.global.tooltips.backgroundColor = ThemeColorHelper.GetThemeColor(styles.tooltipBackgroundColor);
            Chart.defaults.global.tooltips.bodyFontColor = ThemeColorHelper.GetThemeColor(styles.tooltipBodyColor);
            Chart.defaults.global.tooltips.bodyFontFamily = styles.tooltipFont;
            Chart.defaults.global.tooltips.bodyFontSize = this._getFontSizeNumber(styles.tooltipFontSize);
            Chart.defaults.global.tooltips.titleFontColor = ThemeColorHelper.GetThemeColor(styles.tooltipTitleColor);
            Chart.defaults.global.tooltips.titleFontFamily = styles.tooltipTitleFont;
            Chart.defaults.global.tooltips.titleFontSize = this._getFontSizeNumber(styles.tooltipTitleFontSize);
            Chart.defaults.global.tooltips.footerFontColor = ThemeColorHelper.GetThemeColor(styles.tooltipFooterColor);
            Chart.defaults.global.tooltips.footerFontFamily = styles.tooltipFooterFont;
            Chart.defaults.global.tooltips.footerFontSize = this._getFontSizeNumber(styles.tooltipFooterFontSize);
            Chart.defaults.global.tooltips.borderColor = ThemeColorHelper.GetThemeColor(styles.tooltipBorderColor);
            if (Chart.defaults
                && Chart.defaults.scale
                && Chart.defaults.scale.gridLines
                && Chart.defaults.scale.gridLines.color) {
                Chart.defaults.scale.gridLines.color = ThemeColorHelper.GetThemeColor(styles.lineColor);
            }
        }
        catch (_a) {
            // no-op;
        }
    };
    ChartControl.prototype._destroyChart = function () {
        try {
            if (this._chart !== undefined) {
                this._chart.destroy();
            }
        }
        catch (_a) {
            // no-op;
        }
    };
    // Reads one of the Office Fabric defined font sizes
    // and converts to a number
    ChartControl.prototype._getFontSizeNumber = function (value) {
        try {
            return parseInt(value.replace('px', ''), 10);
        }
        catch (_a) {
            return undefined;
        }
    };
    /**
     * Gets the results of a promise and returns it to the chart
     * @param promise
     */
    ChartControl.prototype._doPromise = function (promise) {
        var _this = this;
        this.setState({
            isLoading: true
        }, function () {
            promise.then(function (results) {
                _this.setState({
                    isLoading: false,
                    data: results
                }, function () {
                    _this._initChart(_this.props, results);
                });
            }, function (rejected) {
                _this.setState({
                    isLoading: false,
                    rejected: rejected
                });
            });
        });
    };
    /**
     * Sets default properties
     */
    ChartControl.defaultProps = {
        // We want accessibility on by default
        // -- it's the law in some countries!!!
        accessibility: {
            enable: true
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
    return ChartControl;
}(React.Component));
export { ChartControl };
//# sourceMappingURL=ChartControl.js.map