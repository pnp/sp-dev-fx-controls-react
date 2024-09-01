import * as React from 'react';
import { IAccessibleChartTableState, IAccessibleChartTableProps } from './AccessibleChartTable.types';
import styles from './ChartControl.module.scss';
import { ChartDataSets } from 'chart.js';
import { Guid } from '@microsoft/sp-core-library';
import { css } from '@fluentui/react/lib/Utilities';
import { escape } from '@microsoft/sp-lodash-subset';

export class AccessibleChartTable extends React.Component<IAccessibleChartTableProps, IAccessibleChartTableState> {
  public render(): React.ReactElement<IAccessibleChartTableProps> {
    const {
      onRenderTable,
      data
    } = this.props;

    if (data === undefined || data.datasets === undefined || data.datasets.length < 1) {
      // tslint:disable-next-line:no-null-keyword
      return null;
    }

    if (onRenderTable !== undefined) {
      return (
        <div className={styles.accessibleTable}>
          {onRenderTable()}
        </div>);
    }
    const tableBody: JSX.Element[] = this._renderTableBody();

    return (
      <div className={css(styles.accessibleTable, this.props.className)}>
        {tableBody && tableBody.length > 0 ?
          <table >
            {this._renderCaption()}
            <thead>
              {this._renderTableHeader()}
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
          : undefined}
      </div>
    );
  }

  /**
   * Adds a caption to the top of the accessible table
   */
  private _renderCaption(): JSX.Element {
    const { summary } = this.props;
    const title: string = this._getAccessibleTitle();
    const summaryElement: JSX.Element = summary && <span>{escape(summary)}</span>;


    return title || summary ?
    <caption>
    {escape(title)}
    { title && summaryElement && <br/>}
    { summaryElement }
    </caption> : undefined;
  }

  /**
   * Renders the table's headers for X and Y axes
   */
  private _renderTableHeader(): JSX.Element[] {
    const { chartOptions,
      data } = this.props;

    const {
      datasets
    } = data;

    // See if there are labels; we'll need them for the headers
    let hasLabels: boolean = true;
    datasets.forEach((dataSet: ChartDataSets) => {
      if (dataSet.label === undefined) {
        hasLabels = false;
      }
    });

    // If there are no labels, there is no need to render headers
    if (!hasLabels) {
      return undefined;
    }

    // Get the Y Axis label
    const yAxisLabel: string = chartOptions
      && chartOptions.scales
      && chartOptions.scales.yAxes
      && chartOptions.scales.yAxes[0].scaleLabel
      && chartOptions.scales.yAxes[0].scaleLabel.labelString;

    // Generate the Y header row
    const yHeaderRow: JSX.Element = yAxisLabel
      && <tr key={`yHeader-${Guid.newGuid().toString()}`}>
        <th />
        <th colSpan={datasets.length}>{escape(yAxisLabel)}</th>
      </tr>;

    // Get the X axis label
    const xAxisLabel: string =
      chartOptions
      && chartOptions.scales
      && chartOptions.scales.xAxes
      && chartOptions.scales.xAxes[0].scaleLabel
      && chartOptions.scales.xAxes[0].scaleLabel.labelString;

    // Generate the X asix table cells
    const xHeaderCells: JSX.Element[] = datasets.map((dataSet: ChartDataSets) => {
      return <th scope='col' key={`colHeading-${Guid.newGuid().toString()}`}>{escape(dataSet.label)}</th>;
    });

    // Generate the X axis header row
    const xHeaderRow: JSX.Element = <tr key={`xHeader-${Guid.newGuid().toString()}`}>
      <th>{escape(xAxisLabel)}</th>
      {xHeaderCells}
    </tr>;

    return [
      yHeaderRow,
      xHeaderRow
    ];
  }

  /**
   * Renders an accessible table body with data from the chart
   */
  private _renderTableBody(): JSX.Element[] {
    const {
      data
    } = this.props;

    // The data must have matching labels to render
    // otherwise this is pointless
    return data.labels && data.labels.map((labelValue: string, rowIndex: number) => {
      const cells: JSX.Element[] = data.datasets.map((dataSet: ChartDataSets, dsIndex: number) => {
        return <td key={`dataCell-${Guid.newGuid().toString()}`}>{dataSet.data[rowIndex]}</td>;
      });
      return <tr key={`dataRow-${Guid.newGuid().toString()}`}>
        <th key={`dataCellHEader-${Guid.newGuid().toString()}`}>{escape(labelValue)}</th>
        {cells}
      </tr>;
    });
  }

  /**
   * Gets the caption for the table.
   * If no caption, gets the title.
   */
  private _getAccessibleTitle(): string {
    const {
      chartOptions,
      caption
    } = this.props;

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
      } else {
        // Return the title
        return chartOptions.title.text;
      }
    }

    // If all else fails, no titles for you
    return undefined;
  }
}
