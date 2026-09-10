import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { RichText } from './RichText';

describe('<RichText />', () => {
  let host: HTMLDivElement;
  let richtext: ReactWrapper;

  // The toolbar positions itself from its parent element on mount, so the
  // component has to be attached to the document rather than mounted detached.
  beforeEach(() => {
    host = document.createElement('div');
    document.body.appendChild(host);
  });

  afterEach(() => {
    richtext.detach();
    document.body.removeChild(host);
  });

  const toolbarButton = (format: string): Element =>
    richtext
      .find(`button[aria-describedby="${format}-richtextbutton"]`)
      .getDOMNode();

  it('exposes the pressed state of the text formatting buttons', (done) => {
    richtext = mount(<RichText isEditMode={true} value="<p>text</p>" />, {
      attachTo: host,
    });

    // The inactive state is covered here through the rendered public contract.
    // Exercising the active state requires Quill selection APIs that are not
    // available in this jsdom test environment and is verified manually.
    ['bold', 'italic', 'underline'].forEach((format) => {
      expect(
        toolbarButton(format).getAttribute('aria-pressed'),
        `${format} button`
      ).to.equal('false');
    });

    done();
  });

  it('exposes the pressed state of the link button', (done) => {
    richtext = mount(<RichText isEditMode={true} value="<p>text</p>" />, {
      attachTo: host,
    });

    // The link button's checked value reflects whether the selection is inside
    // an existing hyperlink (formats.link from quill.getFormat), so it carries
    // the same pressed semantics as the text formatting buttons.
    expect(
      toolbarButton('link').getAttribute('aria-pressed'),
      'link button'
    ).to.equal('false');

    done();
  });
});

describe('customStyles', () => {
  const baseProps = {
    value: '',
    isEditMode: false,
  };

  const getStyleElement = (id: string): HTMLStyleElement =>
    document.head.querySelector(
      `style[data-richtext-formatting="${id}"]`
    ) as HTMLStyleElement;

  const getStyleText = (id: string): string =>
    getStyleElement(id)?.textContent || '';

  afterEach(() => {
    document.head
      .querySelectorAll('style[data-richtext-formatting]')
      .forEach((element) => element.remove());
  });

  it('injects styles scoped to the rich text instance id', () => {
    const wrapper = mount(
      <RichText
        {...baseProps}
        id="rich-text-one"
        customStyles={{
          normal: { color: 'red' },
          header2: { fontSize: 20 },
        }}
      />
    );

    expect(getStyleElement('rich-text-one')).to.not.equal(null);
    expect(getStyleText('rich-text-one')).to.contain(
      '#rich-text-one.ql-editor'
    );
    expect(getStyleText('rich-text-one')).to.contain('color: red;');
    expect(getStyleText('rich-text-one')).to.contain('h2');
    expect(getStyleText('rich-text-one')).to.not.contain('rich-text-two');

    wrapper.unmount();
  });

  it('keeps styles isolated between instances', () => {
    const first = mount(
      <RichText
        {...baseProps}
        id="rich-text-one"
        customStyles={{ normal: { color: 'red' } }}
      />
    );
    const second = mount(
      <RichText
        {...baseProps}
        id="rich-text-two"
        customStyles={{ normal: { color: 'blue' } }}
      />
    );

    expect(getStyleText('rich-text-one')).to.contain('color: red;');
    expect(getStyleText('rich-text-one')).to.not.contain('color: blue;');
    expect(getStyleText('rich-text-two')).to.contain('color: blue;');

    first.unmount();
    second.unmount();
  });

  it('updates styles when customStyles changes', () => {
    const wrapper = mount(
      <RichText
        {...baseProps}
        id="rich-text-one"
        customStyles={{ normal: { color: 'red' } }}
      />
    );

    wrapper.setProps({
      customStyles: {
        normal: { color: 'green' },
        header3: { marginTop: 8 },
      },
    });

    expect(getStyleText('rich-text-one')).to.contain('color: green;');
    expect(getStyleText('rich-text-one')).to.contain('margin-top: 8px;');
    expect(getStyleText('rich-text-one')).to.not.contain('color: red;');

    wrapper.unmount();
  });

  it('removes styles when customStyles is removed', () => {
    const wrapper = mount(
      <RichText
        {...baseProps}
        id="rich-text-one"
        customStyles={{ normal: { color: 'red' } }}
      />
    );

    expect(getStyleElement('rich-text-one')).to.not.equal(null);

    wrapper.setProps({ customStyles: undefined });

    expect(getStyleElement('rich-text-one')).to.equal(null);
    wrapper.unmount();
  });

  it('removes styles when unmounted', () => {
    const wrapper = mount(
      <RichText
        {...baseProps}
        id="rich-text-one"
        customStyles={{ normal: { color: 'red' } }}
      />
    );

    expect(getStyleElement('rich-text-one')).to.not.equal(null);

    wrapper.unmount();

    expect(getStyleElement('rich-text-one')).to.equal(null);
  });
});
