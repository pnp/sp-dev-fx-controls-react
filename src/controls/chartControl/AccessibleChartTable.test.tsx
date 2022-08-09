/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { AccessibleChartTable, ChartType } from './';
import styles from './ChartControl.module.scss';

describe('<AccessibleChartTable />', () => {
  let tableControl: ReactWrapper;
  const dummyClass: string = "DummyClass";
  const dummyCaption: string = "Dummy Summary";
  const dummyTitle: string = "Dummy Title";
  const dummySummary: string = "Dummy Summary";
  const dummyLabels: string[] = ['Human', 'Chimp', 'Dolphin', 'Cat'];
  const dummyXAxisLabel: string = "X";
  const dummyYAxisLabel: string = "Y";
  const dummyDatasetLabel: string = "Millions";
  const dummyDatasetData: number[] = [11000, 6200, 5800, 300];
  const dummyDatasetLabel2: string = "Minions";
  const dummyDatasetData2: number[] = [12000, 7200, 6800, 400];
  const dummyData: Chart.ChartData = {
    labels: dummyLabels,
    datasets: [
      {
        label: dummyDatasetLabel,
        data: dummyDatasetData
      }
    ]
  };

  const dummyDataNoLabels: Chart.ChartData = {
    datasets: [
      {
        label: dummyDatasetLabel,
        data: dummyDatasetData
      }
    ]
  };

  const dummyOptions: Chart.ChartOptions = {
    title: {
      text: dummyTitle
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            labelString: dummyXAxisLabel
          }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            labelString: dummyYAxisLabel
          }
        }
      ]
    }
  };

  const dummyMultisetData: Chart.ChartData = {
    labels: dummyLabels,
    datasets: [
      {
        label: dummyDatasetLabel,
        data: dummyDatasetData
      },
      {
        label: dummyDatasetLabel2,
        data: dummyDatasetData2
      }
    ]
  };


  afterEach(() => {
    tableControl.unmount();
  });


  it('Should render only one table', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData}  />);
    expect(tableControl.find(`div.${styles.accessibleTable}`)).to.have.length(1);
    done();
  });

  it('Should render with a custom className if one is provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} className={dummyClass} />);
    expect(tableControl.find(`div.${dummyClass}`)).to.have.length(1);
    done();
  });

  it('Should render a caption if one is provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} caption={dummyCaption} />);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption`).text()).to.be.equal(dummyCaption);
    done();
  });

  it('Should render a caption if no caption is provided but a title is available', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} chartOptions={dummyOptions} />);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption`).text()).to.be.equal(dummyTitle);
    done();
  });

  it('Should prioritize the caption if both caption and title are provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} chartOptions={dummyOptions} caption={dummyCaption} />);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption`).text()).to.be.equal(dummyCaption);
    done();
  });

  it('Should render the same number of rows as there are data elements', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData}  />);
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`)).to.have.length(4);
    done();
  });

  it('Should render a table matching the data provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData}  />);
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(0).find('th').at(0).text()).to.equal('Human');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(1).find('th').at(0).text()).to.equal('Chimp');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(2).find('th').at(0).text()).to.equal('Dolphin');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(3).find('th').at(0).text()).to.equal('Cat');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(0).find('td').at(0).text()).to.equal('11000');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(1).find('td').at(0).text()).to.equal('6200');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(2).find('td').at(0).text()).to.equal('5800');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(3).find('td').at(0).text()).to.equal('300');
    done();
  });

  it('Should include a summary in the caption if one is provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} summary={dummySummary} caption={dummyCaption} />);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption br`)).to.have.length(1);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption span`)).to.have.length(1);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption span`).text()).to.be.equals(dummySummary);
    done();
  });

  it('Should include a summary in the caption if one is provided -- even if no title is provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} summary={dummySummary}/>);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption br`)).to.have.length(0);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption span`)).to.have.length(1);
    expect(tableControl.find(`div.${styles.accessibleTable} table caption span`).text()).to.be.equals(dummySummary);
    done();
  });

  it('Should do nothing if there are no data labels', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyDataNoLabels}  />);
    expect(tableControl.find(`div.${styles.accessibleTable} table`)).to.have.length(0);
    done();
  });

  it('Should render an X and Y label if axis labels are provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyData} chartOptions={dummyOptions} />);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(0).find('th').at(0).text()).to.be.equal("");
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(0).find('th')).to.have.length(2);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(0).find('th').at(1).text()).to.be.equal(dummyYAxisLabel);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th')).to.have.length(2);

    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th').at(1).text()).to.be.equal(dummyDatasetLabel);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th').at(0).text()).to.be.equal(dummyXAxisLabel);
    done();
  });

  it('Should render multi dataset labels', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyMultisetData} chartOptions={dummyOptions} />);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(0).find('th').at(0).text()).to.be.equal("");
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(0).find('th')).to.have.length(2);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(0).find('th').at(1).text()).to.be.equal(dummyYAxisLabel);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th')).to.have.length(3);

    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th').at(0).text()).to.be.equal(dummyXAxisLabel);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th').at(1).text()).to.be.equal(dummyDatasetLabel);
    expect(tableControl.find(`div.${styles.accessibleTable} table thead tr`).at(1).find('th').at(2).text()).to.be.equal(dummyDatasetLabel2);
    done();
  });

  it('Should render a multi dataset table matching the data provided', (done) => {
    tableControl = mount(<AccessibleChartTable chartType={ChartType.Bar} data={dummyMultisetData}  />);
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(0).find('th').at(0).text()).to.equal('Human');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(1).find('th').at(0).text()).to.equal('Chimp');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(2).find('th').at(0).text()).to.equal('Dolphin');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(3).find('th').at(0).text()).to.equal('Cat');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(0).find('td').at(0).text()).to.equal('11000');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(1).find('td').at(0).text()).to.equal('6200');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(2).find('td').at(0).text()).to.equal('5800');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(3).find('td').at(0).text()).to.equal('300');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(0).find('td').at(1).text()).to.equal('12000');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(1).find('td').at(1).text()).to.equal('7200');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(2).find('td').at(1).text()).to.equal('6800');
    expect(tableControl.find(`div.${styles.accessibleTable} table tbody tr`).at(3).find('td').at(1).text()).to.equal('400');
    done();
  });
});
