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
import { Guid } from '@microsoft/sp-core-library';
import { css } from '@fluentui/react/lib/Utilities';
import { escape } from '@microsoft/sp-lodash-subset';
var AccessibleChartTable = /** @class */ (function (_super) {
    __extends(AccessibleChartTable, _super);
    function AccessibleChartTable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AccessibleChartTable.prototype.render = function () {
        var _a = this.props, onRenderTable = _a.onRenderTable, data = _a.data;
        if (data === undefined || data.datasets === undefined || data.datasets.length < 1) {
            // tslint:disable-next-line:no-null-keyword
            return null;
        }
        if (onRenderTable !== undefined) {
            return (React.createElement("div", { className: styles.accessibleTable }, onRenderTable()));
        }
        var tableBody = this._renderTableBody();
        return (React.createElement("div", { className: css(styles.accessibleTable, this.props.className) }, tableBody && tableBody.length > 0 ?
            React.createElement("table", null,
                this._renderCaption(),
                React.createElement("thead", null, this._renderTableHeader()),
                React.createElement("tbody", null, tableBody))
            : undefined));
    };
    /**
     * Adds a caption to the top of the accessible table
     */
    AccessibleChartTable.prototype._renderCaption = function () {
        var summary = this.props.summary;
        var title = this._getAccessibleTitle();
        var summaryElement = summary && React.createElement("span", null, escape(summary));
        return title || summary ?
            React.createElement("caption", null,
                escape(title),
                title && summaryElement && React.createElement("br", null),
                summaryElement) : undefined;
    };
    /**
     * Renders the table's headers for X and Y axes
     */
    AccessibleChartTable.prototype._renderTableHeader = function () {
        var _a = this.props, chartOptions = _a.chartOptions, data = _a.data;
        var datasets = data.datasets;
        // See if there are labels; we'll need them for the headers
        var hasLabels = true;
        datasets.forEach(function (dataSet) {
            if (dataSet.label === undefined) {
                hasLabels = false;
            }
        });
        // If there are no labels, there is no need to render headers
        if (!hasLabels) {
            return undefined;
        }
        // Get the Y Axis label
        var yAxisLabel = chartOptions
            && chartOptions.scales
            && chartOptions.scales.yAxes
            && chartOptions.scales.yAxes[0].scaleLabel
            && chartOptions.scales.yAxes[0].scaleLabel.labelString;
        // Generate the Y header row
        var yHeaderRow = yAxisLabel
            && React.createElement("tr", { key: "yHeader-".concat(Guid.newGuid().toString()) },
                React.createElement("th", null),
                React.createElement("th", { colSpan: datasets.length }, escape(yAxisLabel)));
        // Get the X axis label
        var xAxisLabel = chartOptions
            && chartOptions.scales
            && chartOptions.scales.xAxes
            && chartOptions.scales.xAxes[0].scaleLabel
            && chartOptions.scales.xAxes[0].scaleLabel.labelString;
        // Generate the X asix table cells
        var xHeaderCells = datasets.map(function (dataSet) {
            return React.createElement("th", { scope: 'col', key: "colHeading-".concat(Guid.newGuid().toString()) }, escape(dataSet.label));
        });
        // Generate the X axis header row
        var xHeaderRow = React.createElement("tr", { key: "xHeader-".concat(Guid.newGuid().toString()) },
            React.createElement("th", null, escape(xAxisLabel)),
            xHeaderCells);
        return [
            yHeaderRow,
            xHeaderRow
        ];
    };
    /**
     * Renders an accessible table body with data from the chart
     */
    AccessibleChartTable.prototype._renderTableBody = function () {
        var data = this.props.data;
        // The data must have matching labels to render
        // otherwise this is pointless
        return data.labels && data.labels.map(function (labelValue, rowIndex) {
            var cells = data.datasets.map(function (dataSet, dsIndex) {
                return React.createElement("td", { key: "dataCell-".concat(Guid.newGuid().toString()) }, dataSet.data[rowIndex]);
            });
            return React.createElement("tr", { key: "dataRow-".concat(Guid.newGuid().toString()) },
                React.createElement("th", { key: "dataCellHEader-".concat(Guid.newGuid().toString()) }, escape(labelValue)),
                cells);
        });
    };
    /**
     * Gets the caption for the table.
     * If no caption, gets the title.
     */
    AccessibleChartTable.prototype._getAccessibleTitle = function () {
        var _a = this.props, chartOptions = _a.chartOptions, caption = _a.caption;
        // Is there a caption?
        if (caption !== undefined) {
            // Let's use it!
            return caption;
        }
        // No caption. Look for the title
        if (chartOptions && chartOptions.title && chartOptions.title.text) {
            // ChartJs supports titles in a string array to make them multiline
            if (chartOptions.title.text instanceof Array) {
                // If we're using an array, join them into a single string
                return chartOptions.title.text.join(' ');
            }
            else {
                // Return the title
                return chartOptions.title.text;
            }
        }
        // If all else fails, no titles for you
        return undefined;
    };
    return AccessibleChartTable;
}(React.Component));
export { AccessibleChartTable };
//# sourceMappingURL=AccessibleChartTable.js.map