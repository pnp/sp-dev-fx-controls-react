import * as React from 'react';
import { expect } from 'chai';
import { mount, ReactWrapper } from 'enzyme';
import { KeyCodes } from '@fluentui/react/lib/Utilities';
import SwatchColorPickerGroup from './SwatchColorPickerGroup';
import { ISwatchColor } from './SwatchColorPickerGroup.types';

const themeColors: ISwatchColor[] = [
  { color: '#FF0000', id: 'red', label: 'Red' },
  { color: '#00FF00', id: 'green', label: 'Green' },
  { color: '#0000FF', id: 'blue', label: 'Blue' },
  { color: '#FFFF00', id: 'yellow', label: 'Yellow' },
  { color: '#00FFFF', id: 'cyan', label: 'Cyan' },
  { color: '#FF00FF', id: 'magenta', label: 'Magenta' },
  { color: '#000000', id: 'black', label: 'Black' }
];

describe('<SwatchColorPickerGroup />', () => {
  let container: HTMLDivElement;
  let wrapper: ReactWrapper;

  const swatches = (): HTMLElement[] => Array.from(container.querySelectorAll<HTMLElement>('[data-is-focusable="true"]'));

  // Fires the key on the focused swatch and reports whether the group took it
  // (preventDefault stops the browser from moving focus out of the group).
  const pressTab = (swatch: HTMLElement, shiftKey: boolean): boolean => {
    swatch.focus();
    const preventDefault = jest.fn();
    // decided to match the prop rather than a CSS id selector, ids contain the group text ("Theme Colors-...")
    wrapper.find('button').filterWhere(b => b.prop('id') === swatch.id)
      .simulate('keydown', { which: KeyCodes.tab, keyCode: KeyCodes.tab, key: 'Tab', shiftKey, preventDefault });
    return preventDefault.mock.calls.length > 0;
  };

  const pressKey = (swatch: HTMLElement, keyCode: number, key: string): void => {
    swatch.focus();
    wrapper.find('button').filterWhere(b => b.prop('id') === swatch.id)
      .simulate('keydown', { which: keyCode, keyCode, key });
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    wrapper = mount(
      <SwatchColorPickerGroup groupText="Theme Colors" groupColors={themeColors} onColorChanged={() => { }} />,
      { attachTo: container }
    );
    // Note: jsdom has no layout, so Fluent's focus utilities would treat every element as hidden and skip it.
    // `isVisible` is Fluent's own testing hook for isElementVisible (@fluentui/utilities focus.ts).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    container.querySelectorAll('*').forEach(el => { (el as any).isVisible = true; });
  });

  afterEach(() => {
    wrapper.detach();
    document.body.removeChild(container);
  });

  it('lets Tab on the last swatch leave the group (#1944)', () => {
    const all = swatches();
    const last = all[all.length - 1];

    const tabTaken = pressTab(last, false);

    expect(document.activeElement.id, 'focus wrapped back inside the color group').to.equal(last.id);
    expect(tabTaken, 'Tab was handled inside the color group').to.equal(false);
  });

  it('lets Shift-Tab on the first swatch leave the group (#1944)', () => {
    const first = swatches()[0];

    const tabTaken = pressTab(first, true);

    expect(document.activeElement.id, 'focus wrapped back inside the color group').to.equal(first.id);
    expect(tabTaken, 'Shift-Tab was handled inside the color group').to.equal(false);
  });

  it('lets Tab on a middle swatch leave the group (#1944)', () => {
    const middle = swatches()[3];

    const tabTaken = pressTab(middle, false);

    expect(document.activeElement.id, 'focus moved to another swatch in the group').to.equal(middle.id);
    expect(tabTaken, 'Tab was handled inside the color group').to.equal(false);
  });

  it('keeps arrow keys circular inside the group', () => {
    const all = swatches();
    const first = all[0];
    const last = all[all.length - 1];

    pressKey(last, KeyCodes.right, 'ArrowRight');
    expect(document.activeElement.id, 'Right on the last swatch').to.equal(first.id);

    pressKey(first, KeyCodes.left, 'ArrowLeft');
    expect(document.activeElement.id, 'Left on the first swatch').to.equal(last.id);
  });

  it('makes the group a single Tab stop', () => {
    const tabStops = swatches().filter(s => s.getAttribute('tabindex') === '0');

    expect(tabStops.length).to.equal(1);
  });
});
