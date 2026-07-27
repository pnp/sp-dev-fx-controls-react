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
