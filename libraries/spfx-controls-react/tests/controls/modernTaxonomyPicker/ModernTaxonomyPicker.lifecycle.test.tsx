import * as React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { ModernTaxonomyPicker } from '../../../src/controls/modernTaxonomyPicker/ModernTaxonomyPicker';
import { SPTaxonomyService } from '../../../src/services/SPTaxonomyService';
import { listId, mockContext } from '../../services/restTestHelpers';

jest.mock('@fluentui/react', () => {
  const react = require('react');
  const host = (props: object) => react.createElement('div', props);
  return {
    GroupedList: (props: object) => react.createElement('div', { ...props, 'data-test': 'groups' }),
    GroupHeader: host, Label: host, Spinner: host, FocusZone: host, FontIcon: host,
    Checkbox: host, ChoiceGroup: host, Link: host,
    css: (...values: string[]) => values.join(' '), getRTLSafeKeyCode: (key: number) => key,
    FocusZoneDirection: { vertical: 1 }, KeyCodes: {},
    Selection: class {
      setItems(): void {}
      setKeySelected(): void {}
      getSelection(): unknown[] { return []; }
    }
  };
});
jest.mock('@fluentui/react/lib/Button', () => {
  const react = require('react');
  return {
    IconButton: (props: object) => react.createElement('button', { ...props, 'data-test': 'open' }),
    PrimaryButton: (): null => null, DefaultButton: (): null => null
  };
});
jest.mock('@fluentui/react/lib/Panel', () => {
  const react = require('react');
  return {
    Panel: (props: { isOpen: boolean; children: React.ReactNode }) => props.isOpen ? react.createElement('section', {}, props.children) : null,
    PanelType: { custom: 1, medium: 2 }
  };
});
jest.mock('@fluentui/react/lib/Tooltip', () => {
  const react = require('react');
  return { TooltipHost: (props: { children: React.ReactNode }) => react.createElement('div', {}, props.children) };
});
jest.mock('../../../src/controls/modernTaxonomyPicker/modernTermPicker/ModernTermPicker', () => ({ ModernTermPicker: (): null => null }));

describe('ModernTaxonomyPicker target isolation', () => {
  afterEach(() => jest.restoreAllMocks());

  test('remounts an open tree only after the new target metadata is loaded', async () => {
    const { context } = mockContext();
    Object.assign(context.pageContext, { cultureInfo: { currentUICultureName: 'en-US' } });
    jest.spyOn(SPTaxonomyService.prototype, 'getTermStoreInfo').mockResolvedValue({
      id: 'store', name: 'Store', languageTags: ['en-US'], defaultLanguageTag: 'en-US'
    });
    jest.spyOn(SPTaxonomyService.prototype, 'getTermSetInfo').mockImplementation(async id => ({
      id: id.toString(), localizedNames: [{ name: id.toString(), languageTag: 'en-US' }],
      childrenCount: 1, description: '', createdDateTime: '', customSortOrder: [],
      groupId: 'group', isOpen: true, isAvailableForTagging: true, contact: ''
    }));
    const loads: string[] = [];
    jest.spyOn(SPTaxonomyService.prototype, 'getTerms').mockImplementation(async id => {
      loads.push(id.toString());
      return { value: [], skiptoken: '' };
    });
    const props = { context, termSetId: listId, label: 'Terms', panelTitle: 'Terms' };
    let renderer: ReactTestRenderer;
    await act(async () => { renderer = create(<ModernTaxonomyPicker {...props} />); });
    await act(async () => { renderer.root.findByProps({ 'data-test': 'open' }).props.onClick(); });
    const secondSet = '22222222-2222-4222-8222-222222222222';
    await act(async () => { renderer.update(<ModernTaxonomyPicker {...props} termSetId={secondSet} />); });
    expect(loads).toEqual([listId, secondSet]);
    expect(renderer.root.findByProps({ 'data-test': 'groups' }).props.groups[0].key).toBe(secondSet);
    await act(async () => renderer.unmount());
  });
});
