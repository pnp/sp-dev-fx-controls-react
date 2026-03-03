/// <reference types="sinon" />
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ChartControl } from './ChartControl';
import styles from './ChartControl.module.scss';
describe('<ChartControl />', function () {
    var chartControl;
    var dummyTitle = "Dummy Title";
    var dummyClass = "DummyClass";
    var dummyData = {
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
    afterEach(function () {
        chartControl.unmount();
    });
    it('Check that an accessible table gets created by default', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData }));
        expect(chartControl.find("div.".concat(styles.accessibleTable))).to.have.length(1);
        done();
    });
    it('Check that the accessible table accepts a custom classname', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData, accessibility: { className: "customClass" } }));
        expect(chartControl.find("div.customClass")).to.have.length(1);
        done();
    });
    it('Check that the accessible table doesn\'t get rendered if disabled', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData, accessibility: { enable: false } }));
        expect(chartControl.find("div.".concat(styles.accessibleTable))).to.have.length(0);
        done();
    });
    it('Check that an accessible table gets created with the caption matching the title', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", accessibility: { enable: true }, options: { title: { text: dummyTitle } }, data: dummyData }));
        expect(chartControl.find("div.".concat(styles.accessibleTable, " table caption")).text()).to.be.equal(dummyTitle);
        done();
    });
    it('Check that an accessible table gets created with a caption', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", accessibility: { enable: true, caption: dummyTitle }, data: dummyData }));
        expect(chartControl.find("div.".concat(styles.accessibleTable, " table caption")).text()).to.be.equal(dummyTitle);
        done();
    });
    it('Check that the accessible table has a number of rows matching the number of data elements', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData }));
        expect(chartControl.find("div.".concat(styles.accessibleTable, " table tbody tr"))).to.have.length(4);
        done();
    });
    it('Check that the accessible table has only one header row', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData }));
        expect(chartControl.find("div.".concat(styles.accessibleTable, " table thead tr"))).to.have.length(1);
        done();
    });
    it('Check that custom class gets rendered', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", className: dummyClass, data: dummyData }));
        expect(chartControl.find("div.".concat(dummyClass))).to.have.length(1);
        done();
    });
    it('Check that a canvas gets rendered', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData }));
        expect(chartControl.find("div.".concat(styles.chartComponent, " canvas"))).to.have.length(1);
        done();
    });
    it('Check that it doesn\'t crash if data is omitted', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar" }));
        expect(chartControl.find("div.".concat(styles.chartComponent, " canvas"))).to.have.length(1);
        expect(chartControl.find("div.".concat(styles.accessibleTable))).to.have.length(0);
        done();
    });
    it('Check that it applies a themed background by default', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData }));
        expect(chartControl.find("div.".concat(styles.chartComponent, ".").concat(styles.themed))).to.have.length(1);
        done();
    });
    it('Check that it disables themed background when useTheme is set to false', function (done) {
        chartControl = mount(React.createElement(ChartControl, { type: "bar", data: dummyData, useTheme: false }));
        expect(chartControl.find("div.".concat(styles.chartComponent, ".").concat(styles.themed))).to.have.length(0);
        done();
    });
});
//# sourceMappingURL=ChartControl.test.js.map