/// <reference types="sinon" />
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { WebPartTitle } from './WebPartTitle';
import styles from './WebPartTitle.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';
describe('<WebPartTitle />', function () {
    var webparttitle;
    var dummyTitle = "Dummy Title";
    var dummyClass = "DummyClass";
    var dummyMoreLink = "See all";
    var dummyColor = "#ffffff";
    var dummyUpdateFnc = sinon.spy(function (value) { return value; });
    afterEach(function () {
        webparttitle.unmount();
    });
    it('Check the read mode of the component', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Read, title: dummyTitle, updateProperty: function () { } }));
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " span")).text()).to.be.equal(dummyTitle);
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " textarea"))).to.have.length(0);
        done();
    });
    it('Check the edit mode of the component', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Edit, title: dummyTitle, updateProperty: function () { } }));
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " span"))).to.have.length(0);
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " textarea"))).to.have.length(1);
        done();
    });
    it('Check class change', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Read, title: dummyTitle, updateProperty: function () { }, className: dummyClass }));
        expect(webparttitle.find("div.".concat(dummyClass, " span")).text()).to.be.equal(dummyTitle);
        done();
    });
    it('Check if the change is processed correctly', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Edit, title: dummyTitle, updateProperty: dummyUpdateFnc }));
        // Specify a new web part title
        var textArea = webparttitle.find("div.".concat(styles.webPartTitle, " textarea"));
        textArea.simulate('change', { target: { value: "New web part title" } });
        // Check if function is called
        /* eslint-disable */
        expect(dummyUpdateFnc.called).to.be.true;
        /* eslint-enable */
        // Check if the returned value is correct
        expect(dummyUpdateFnc.args[0]).contains("New web part title");
        done();
    });
    it('Check more link is shown if function specified', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Read, title: dummyTitle, updateProperty: function () { }, moreLink: function () { return React.createElement("a", { href: "#" }, dummyMoreLink); } }));
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " span")).text()).to.be.equal(dummyTitle);
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " textarea"))).to.have.length(0);
        expect(webparttitle.find("span.".concat(styles.moreLink))).to.have.length(1);
        expect(webparttitle.find("span.".concat(styles.moreLink, " a"))).to.have.length(1);
        expect(webparttitle.find("span.".concat(styles.moreLink, " a")).text()).to.be.equal(dummyMoreLink);
        done();
    });
    it('Check more link is shown if children specified', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Read, title: dummyTitle, updateProperty: function () { }, moreLink: React.createElement("a", { href: "#" }, dummyMoreLink) }));
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " span")).text()).to.be.equal(dummyTitle);
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " textarea"))).to.have.length(0);
        expect(webparttitle.find("span.".concat(styles.moreLink))).to.have.length(1);
        expect(webparttitle.find("span.".concat(styles.moreLink, " a"))).to.have.length(1);
        expect(webparttitle.find("span.".concat(styles.moreLink, " a")).text()).to.be.equal(dummyMoreLink);
        done();
    });
    it('Check more link is not shown otherwise', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Read, title: dummyTitle, updateProperty: function () { } }));
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " span")).text()).to.be.equal(dummyTitle);
        expect(webparttitle.find("div.".concat(styles.webPartTitle, " textarea"))).to.have.length(0);
        expect(webparttitle.find("span.".concat(styles.moreLink))).to.have.length(0);
        done();
    });
    it('Check theme\'s color is used if specified', function (done) {
        webparttitle = mount(React.createElement(WebPartTitle, { displayMode: DisplayMode.Edit, title: dummyTitle, updateProperty: dummyUpdateFnc, themeVariant: { semanticColors: { bodyText: dummyColor } } }));
        expect(webparttitle.find("div.".concat(styles.webPartTitle)).prop('style')).property("color").to.equal(dummyColor);
        done();
    });
});
//# sourceMappingURL=WebPartTitle.test.js.map