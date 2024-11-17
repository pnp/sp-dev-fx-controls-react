/// <reference types="sinon" />

import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { setIconOptions } from '@fluentui/react/lib/Styling';
import { Placeholder } from './PlaceholderComponent';
//import styles from './PlaceholderComponent.module.scss';
import { getClassNames } from './PlaceholderComponent.styles';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';

declare const sinon;

const themeToApply = getFluentUIThemeOrDefault();
const styles = getClassNames(themeToApply);

describe('<Placeholder />', () => {
  let placeholder: ReactWrapper;
  const dummyDescription = "Dummy description";
  const dummyIcon = "Add";
  const dummyText = "Dummy icon text";
  const dummyClass = "dummyClass";
  const dummyLabel = "Dummy label";
  const dummyOnConfigure = sinon.spy((evt) => { /* Nothing to do here */ });

  beforeAll(() => {
    // Suppress icon warnings.
    setIconOptions({
      disableWarnings: true
    });
  });

  afterEach(() => {
    placeholder.unmount();
  });

  it('Test that placeholder renders', (done) => {
    placeholder = mount(<Placeholder description={dummyDescription} iconName={dummyIcon} iconText={dummyText} />);
    done();
  });

  it('Test placeholder without button', (done) => {
    placeholder = mount(<Placeholder description={dummyDescription} iconName={dummyIcon} iconText={dummyText} />);

    expect(placeholder.find('i[data-icon-name="Add"]')).to.have.length(1);

    expect(placeholder.find(`.${styles.placeholderText}`)).to.have.length(1);
    expect(placeholder.find(`.${styles.placeholderText}`).text()).to.be.equal(dummyText);

    expect(placeholder.find(`.${styles.placeholderDescriptionText}`)).to.have.length(1);
    expect(placeholder.find(`.${styles.placeholderDescriptionText}`).text()).to.be.equal(dummyDescription);

    expect(placeholder.find('button')).to.have.length(0);
    done();
  });

  it('Test placeholder with custom classname', (done) => {
    placeholder = mount(<Placeholder description={dummyDescription} iconName={dummyIcon} iconText={dummyText} contentClassName={dummyClass} />);

    expect(placeholder.find(`div.${styles.placeholder}.${dummyClass}`)).to.have.length(1);
    done();
  });

  it('Test placeholder with null values', (done) => {
    placeholder = mount(<Placeholder description={null} iconName={null} iconText={null} />);

    expect(placeholder.find('i[data-icon-name="Add"]')).to.have.length(0);

    expect(placeholder.find(`div .${styles.placeholderText}`)).to.have.length(1);
    expect(placeholder.find(`div .${styles.placeholderText}`).text()).to.be.equal('');

    expect(placeholder.find(`div .${styles.placeholderDescriptionText}`)).to.have.length(1);
    expect(placeholder.find(`div .${styles.placeholderDescriptionText}`).text()).to.be.equal('');

    expect(placeholder.find('button')).to.have.length(0);
    done();
  });

  it('Test placeholder with button', (done) => {
    placeholder = mount(<Placeholder description={dummyDescription} iconName={dummyIcon} iconText={dummyText} buttonLabel={dummyLabel} />);

    expect(placeholder.find(`button`)).to.have.length(1);
    expect(placeholder.find(`button`).text()).to.contain(dummyLabel);
    done();
  });

  it('Test button onConfigure trigger', (done) => {
    placeholder = mount(<Placeholder description={dummyDescription} iconName={dummyIcon} iconText={dummyText} buttonLabel={dummyLabel} onConfigure={dummyOnConfigure} />);

    placeholder.find('button').simulate('click');
    /* eslint-disable */
    expect(dummyOnConfigure.called).to.be.true;
    /* eslint-enable */

    done();
  });
});
