/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { WebPartTitle } from './WebPartTitle';
import styles from './WebPartTitle.module.scss';
import { DisplayMode } from '@microsoft/sp-core-library';

declare const sinon;

describe('<WebPartTitle />', () => {
  let webparttitle: ReactWrapper;
  const dummyTitle = "Dummy Title";
  const dummyClass = "DummyClass";
  const dummyMoreLink = "See all";
  const dummyColor = "#ffffff";
  const dummyUpdateFnc = sinon.spy((value) => { return value; });

  afterEach(() => {
    webparttitle.unmount();
  });

  it('Check the read mode of the component', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Read} title={dummyTitle} updateProperty={() => {}} />);
    expect(webparttitle.find(`div.${styles.webPartTitle} span`).text()).to.be.equal(dummyTitle);
    expect(webparttitle.find(`div.${styles.webPartTitle} textarea`)).to.have.length(0);
    done();
  });

  it('Check the edit mode of the component', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Edit} title={dummyTitle} updateProperty={() => {}} />);
    expect(webparttitle.find(`div.${styles.webPartTitle} span`)).to.have.length(0);
    expect(webparttitle.find(`div.${styles.webPartTitle} textarea`)).to.have.length(1);
    done();
  });

  it('Check class change', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Read} title={dummyTitle} updateProperty={() => {}} className={dummyClass} />);
    expect(webparttitle.find(`div.${dummyClass} span`).text()).to.be.equal(dummyTitle);
    done();
  });

  it('Check if the change is processed correctly', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Edit} title={dummyTitle} updateProperty={dummyUpdateFnc} />);
    // Specify a new web part title
    const textArea = webparttitle.find(`div.${styles.webPartTitle} textarea`);
    textArea.simulate('change', { target: { value: "New web part title" }});

    // Check if function is called
    /* eslint-disable */
    expect(dummyUpdateFnc.called).to.be.true;
    /* eslint-enable */

    // Check if the returned value is correct
    expect(dummyUpdateFnc.args[0]).contains("New web part title");

    done();
  });

  it('Check more link is shown if function specified', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Read} title={dummyTitle} updateProperty={() => {}}
    moreLink={()=> <a href="#">{dummyMoreLink}</a>} />);
    expect(webparttitle.find(`div.${styles.webPartTitle} span`).text()).to.be.equal(dummyTitle);
    expect(webparttitle.find(`div.${styles.webPartTitle} textarea`)).to.have.length(0);
    expect(webparttitle.find(`span.${styles.moreLink}`)).to.have.length(1);
    expect(webparttitle.find(`span.${styles.moreLink} a`)).to.have.length(1);
    expect(webparttitle.find(`span.${styles.moreLink} a`).text()).to.be.equal(dummyMoreLink);
    done();
  });

  it('Check more link is shown if children specified', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Read} title={dummyTitle} updateProperty={() => {}}
    moreLink={<a href="#">{dummyMoreLink}</a>} />);
    expect(webparttitle.find(`div.${styles.webPartTitle} span`).text()).to.be.equal(dummyTitle);
    expect(webparttitle.find(`div.${styles.webPartTitle} textarea`)).to.have.length(0);
    expect(webparttitle.find(`span.${styles.moreLink}`)).to.have.length(1);
    expect(webparttitle.find(`span.${styles.moreLink} a`)).to.have.length(1);
    expect(webparttitle.find(`span.${styles.moreLink} a`).text()).to.be.equal(dummyMoreLink);
    done();
  });

  it('Check more link is not shown otherwise', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Read} title={dummyTitle} updateProperty={() => {}} />);
    expect(webparttitle.find(`div.${styles.webPartTitle} span`).text()).to.be.equal(dummyTitle);
    expect(webparttitle.find(`div.${styles.webPartTitle} textarea`)).to.have.length(0);
    expect(webparttitle.find(`span.${styles.moreLink}`)).to.have.length(0);
    done();
  });

  it('Check theme\'s color is used if specified', (done) => {
    webparttitle = mount(<WebPartTitle displayMode={DisplayMode.Edit} title={dummyTitle} updateProperty={dummyUpdateFnc} themeVariant={{ semanticColors: { bodyText: dummyColor }}} />);
    expect(webparttitle.find(`div.${styles.webPartTitle}`).prop('style')).property("color").to.equal(dummyColor);
    done();
  });

});
