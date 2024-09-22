/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { ChartControl } from './ChartControl';
import styles from './ChartControl.module.scss';

describe('<ChartControl />', () => {
  let chartControl: ReactWrapper;
  const dummyTitle = "Dummy Title";
  const dummyClass = "DummyClass";
  const dummyData = {
    labels: ['Human', 'Chimp', 'Dolphin', 'Cat'],
    datasets: [
      {
        label: 'Millions',
        data: [
          11000, 6200, 5800, 300
        ]
      }
    ]
  };

  afterEach(() => {
    chartControl.unmount();
  });

  it('Check that an accessible table gets created by default', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData}  />);
    expect(chartControl.find(`div.${styles.accessibleTable}`)).to.have.length(1);
    done();
  });

  it('Check that the accessible table accepts a custom classname', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData} accessibility={{ className: "customClass"}} />);
    expect(chartControl.find(`div.customClass`)).to.have.length(1);
    done();
  });

  it('Check that the accessible table doesn\'t get rendered if disabled', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData} accessibility={{enable:false}}  />);
    expect(chartControl.find(`div.${styles.accessibleTable}`)).to.have.length(0);
    done();
  });

  it('Check that an accessible table gets created with the caption matching the title', (done) => {
    chartControl = mount(<ChartControl type={"bar"} accessibility={{enable:true}} options={{title:{ text:dummyTitle}}} data={dummyData}  />);
    expect(chartControl.find(`div.${styles.accessibleTable} table caption`).text()).to.be.equal(dummyTitle);
    done();
  });

  it('Check that an accessible table gets created with a caption', (done) => {
    chartControl = mount(<ChartControl type={"bar"} accessibility={{enable:true, caption: dummyTitle}} data={dummyData}  />);
    expect(chartControl.find(`div.${styles.accessibleTable} table caption`).text()).to.be.equal(dummyTitle);
    done();
  });

  it('Check that the accessible table has a number of rows matching the number of data elements', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData}  />);
    expect(chartControl.find(`div.${styles.accessibleTable} table tbody tr`)).to.have.length(4);
    done();
  });

  it('Check that the accessible table has only one header row', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData}  />);
    expect(chartControl.find(`div.${styles.accessibleTable} table thead tr`)).to.have.length(1);
    done();
  });

  it('Check that custom class gets rendered', (done) => {
    chartControl = mount(<ChartControl type={"bar"} className={dummyClass} data={dummyData}  />);
    expect(chartControl.find(`div.${dummyClass}`)).to.have.length(1);
    done();
  });

  it('Check that a canvas gets rendered', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData}  />);
    expect(chartControl.find(`div.${styles.chartComponent} canvas`)).to.have.length(1);
    done();
  });

  it('Check that it doesn\'t crash if data is omitted', (done) => {
    chartControl = mount(<ChartControl type={"bar"} />);
    expect(chartControl.find(`div.${styles.chartComponent} canvas`)).to.have.length(1);
    expect(chartControl.find(`div.${styles.accessibleTable}`)).to.have.length(0);
    done();
  });

  it('Check that it applies a themed background by default', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData} />);
    expect(chartControl.find(`div.${styles.chartComponent}.${styles.themed}`)).to.have.length(1);
    done();
  });

  it('Check that it disables themed background when useTheme is set to false', (done) => {
    chartControl = mount(<ChartControl type={"bar"} data={dummyData} useTheme={false} />);
    expect(chartControl.find(`div.${styles.chartComponent}.${styles.themed}`)).to.have.length(0);
    done();
  });

});


