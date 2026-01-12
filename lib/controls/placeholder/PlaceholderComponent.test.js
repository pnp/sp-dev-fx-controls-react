/// <reference types="sinon" />
import * as React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import { Placeholder } from './PlaceholderComponent';
//import styles from './PlaceholderComponent.module.scss';
import { getClassNames } from './PlaceholderComponent.styles';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';
var themeToApply = getFluentUIThemeOrDefault();
var styles = getClassNames(themeToApply);
describe('<Placeholder />', function () {
    var placeholder;
    var dummyDescription = "Dummy description";
    var dummyIcon = "Add";
    var dummyText = "Dummy icon text";
    var dummyClass = "dummyClass";
    var dummyLabel = "Dummy label";
    var dummyOnConfigure = sinon.spy(function (evt) { });
    beforeAll(function () {
        // Suppress icon warnings.
        setIconOptions({
            disableWarnings: true
        });
    });
    afterEach(function () {
        placeholder.unmount();
    });
    it('Test that placeholder renders', function (done) {
        placeholder = mount(React.createElement(Placeholder, { description: dummyDescription, iconName: dummyIcon, iconText: dummyText }));
        done();
    });
    it('Test placeholder without button', function (done) {
        placeholder = mount(React.createElement(Placeholder, { description: dummyDescription, iconName: dummyIcon, iconText: dummyText }));
        expect(placeholder.find('i[data-icon-name="Add"]')).to.have.length(1);
        expect(placeholder.find(".".concat(styles.placeholderText))).to.have.length(1);
        expect(placeholder.find(".".concat(styles.placeholderText)).text()).to.be.equal(dummyText);
        expect(placeholder.find(".".concat(styles.placeholderDescriptionText))).to.have.length(1);
        expect(placeholder.find(".".concat(styles.placeholderDescriptionText)).text()).to.be.equal(dummyDescription);
        expect(placeholder.find('button')).to.have.length(0);
        done();
    });
    it('Test placeholder with custom classname', function (done) {
        placeholder = mount(React.createElement(Placeholder, { description: dummyDescription, iconName: dummyIcon, iconText: dummyText, contentClassName: dummyClass }));
        expect(placeholder.find("div.".concat(styles.placeholder, ".").concat(dummyClass))).to.have.length(1);
        done();
    });
    it('Test placeholder with null values', function (done) {
        placeholder = mount(React.createElement(Placeholder, { description: null, iconName: null, iconText: null }));
        expect(placeholder.find('i[data-icon-name="Add"]')).to.have.length(0);
        expect(placeholder.find("div .".concat(styles.placeholderText))).to.have.length(1);
        expect(placeholder.find("div .".concat(styles.placeholderText)).text()).to.be.equal('');
        expect(placeholder.find("div .".concat(styles.placeholderDescriptionText))).to.have.length(1);
        expect(placeholder.find("div .".concat(styles.placeholderDescriptionText)).text()).to.be.equal('');
        expect(placeholder.find('button')).to.have.length(0);
        done();
    });
    it('Test placeholder with button', function (done) {
        placeholder = mount(React.createElement(Placeholder, { description: dummyDescription, iconName: dummyIcon, iconText: dummyText, buttonLabel: dummyLabel }));
        expect(placeholder.find("button")).to.have.length(1);
        expect(placeholder.find("button").text()).to.contain(dummyLabel);
        done();
    });
    it('Test button onConfigure trigger', function (done) {
        placeholder = mount(React.createElement(Placeholder, { description: dummyDescription, iconName: dummyIcon, iconText: dummyText, buttonLabel: dummyLabel, onConfigure: dummyOnConfigure }));
        placeholder.find('button').simulate('click');
        /* eslint-disable */
        expect(dummyOnConfigure.called).to.be.true;
        /* eslint-enable */
        done();
    });
});
//# sourceMappingURL=PlaceholderComponent.test.js.map