import * as React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { ModernTaxonomyPicker } from '../../../src/controls/modernTaxonomyPicker/ModernTaxonomyPicker';
import { SPTaxonomyService } from '../../../src/services/SPTaxonomyService';
import { listId, mockContext } from '../../services/restTestHelpers';
import { IGroup, IGroupRenderProps, Link } from '@fluentui/react';
import { TaxonomyTree } from '../../../src/controls/modernTaxonomyPicker/taxonomyTree/TaxonomyTree';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from '../../../src/services/SPTaxonomyService.types';
import { TaxonomyPanelContents } from '../../../src/controls/modernTaxonomyPicker/taxonomyPanelContents';
import { Guid } from '@microsoft/sp-core-library';

jest.mock('@fluentui/react', () => {
  const react = require('react');
  const host = (props: object) => react.createElement('div', props);
  return {
    GroupedList: (props: object) => react.createElement('div', { ...props, 'data-test': 'groups' }),
    GroupHeader: host, Label: host,
    Spinner: (props: object) => react.createElement('div', { ...props, 'data-test': 'spinner' }),
    FocusZone: host, FontIcon: host, Checkbox: host, ChoiceGroup: host,
    Link: (props: object) => react.createElement('a', props),
    css: (...values: string[]) => values.join(' '), getRTLSafeKeyCode: (key: number) => key,
    FocusZoneDirection: { vertical: 1 }, KeyCodes: {},
    Selection: class {
      setItems(): void {}
      setKeySelected(): void {}
      getSelection(): unknown[] { return []; }
    }
  };
});

describe('TaxonomyTree failed request recovery', () => {
  const termSet: ITermSetInfo = {
    id: listId, localizedNames: [{ name: 'Terms', languageTag: 'en-US' }], childrenCount: 1,
    description: '', createdDateTime: '', customSortOrder: [], groupId: 'group',
    isOpen: true, isAvailableForTagging: true, contact: ''
  };
  const store: ITermStoreInfo = { id: 'store', name: 'Store', languageTags: ['en-US'], defaultLanguageTag: 'en-US' };
  function term(id: string, childrenCount = 0): ITermInfo {
    return {
      id, childrenCount, labels: [{ name: id, languageTag: 'en-US', isDefault: true }],
      createdDateTime: '', lastModifiedDateTime: '', descriptions: [], customSortOrder: [],
      properties: [], localProperties: [], topicRequested: false, isDeprecated: false,
      isAvailableForTagging: [{ setId: listId, isAvailable: true }]
    };
  }
  function treeProps(renderer: ReactTestRenderer): { groups: IGroup[]; groupProps: IGroupRenderProps } {
    const props = renderer.root.findByProps({ 'data-test': 'groups' }).props;
    return { groups: props.groups, groupProps: props.groupProps };
  }
  function footer(renderer: ReactTestRenderer, group: IGroup) {
    return treeProps(renderer).groupProps.onRenderFooter({ group, groupLevel: group.level }) as React.ReactElement<{
      children: React.ReactElement<{ onClick: () => void }>
    }>;
  }
  beforeEach(() => jest.spyOn(console, 'error').mockImplementation(() => undefined));
  afterEach(() => jest.restoreAllMocks());

  test.each([[false, true], [true, true], [false, false], [true, false]])(
    'clears a failed initial load and preserves selection restrictions (anchored: %s, descendants: %s)',
    async (anchored, allowSelectingChildren) => {
    const anchor = anchored ? term('anchor', 1) : undefined;
    const load = jest.fn().mockRejectedValueOnce(new Error('Denied'))
      .mockResolvedValueOnce({ value: [term('child', 1)], skiptoken: '' });
    let renderer: ReactTestRenderer;
    await act(async () => {
      renderer = create(<TaxonomyTree
        termSetInfo={termSet} termStoreInfo={store} anchorTermInfo={anchor} languageTag="en-US"
        allowSelectingChildren={allowSelectingChildren}
        pageSize={50} terms={[]} setTerms={jest.fn()} onLoadMoreData={load}
      />);
    });
    const root = treeProps(renderer).groups[0];
    expect(root.data.isLoading).toBe(false);
    expect(root.hasMoreData).toBe(true);
    expect(root.children).toEqual([]);
    const retry = footer(renderer, root);
    expect(retry.props.children.type).toBe(Link);
    await act(async () => retry.props.children.props.onClick());
    expect(load).toHaveBeenCalledTimes(2);
    expect(load.mock.calls[1][1].toString()).toBe(anchor?.id || '00000000-0000-0000-0000-000000000000');
    expect(root.children[0].key).toBe('child');
    expect(root.children[0].hasMoreData).toBe(allowSelectingChildren);
    expect(root.children[0].children).toEqual(allowSelectingChildren ? [] : undefined);
    expect(root.data.isLoading).toBe(false);
    await act(async () => renderer.unmount());
  });

  test.each(['expansion', 'load-more'])('clears a failed %s request without losing children or skip tokens', async phase => {
    const child = term('child', 1);
    const load = jest.fn().mockResolvedValueOnce({ value: [child], skiptoken: 'next-page' })
      .mockRejectedValueOnce(new Error('Denied'))
      .mockResolvedValueOnce({ value: [term('new-child')], skiptoken: '' });
    let renderer: ReactTestRenderer;
    await act(async () => {
      renderer = create(<TaxonomyTree
        termSetInfo={termSet} termStoreInfo={store} languageTag="en-US"
        pageSize={50} terms={[]} setTerms={jest.fn()} onLoadMoreData={load}
      />);
    });
    const root = treeProps(renderer).groups[0];
    const group = phase === 'expansion' ? root.children[0] : root;
    const initialChildren = [...group.children];
    const skiptoken = group.data.skiptoken;
    if (phase === 'expansion') {
      const header = treeProps(renderer).groupProps.onRenderHeader({ group }) as React.ReactElement<{
        onToggleCollapse: (group: IGroup) => void
      }>;
      await act(async () => header.props.onToggleCollapse(group));
    } else {
      await act(async () => footer(renderer, group).props.children.props.onClick());
    }
    expect(group.data.isLoading).toBe(false);
    expect(group.children).toEqual(initialChildren);
    expect(group.hasMoreData).toBe(true);
    expect(group.data.skiptoken).toBe(skiptoken);
    const retry = footer(renderer, group);
    expect(retry.props.children.type).toBe(Link);
    await act(async () => retry.props.children.props.onClick());
    expect(load).toHaveBeenCalledTimes(3);
    expect(load.mock.calls[2][2]).toBe(skiptoken);
    expect(group.children.map(value => value.key)).toEqual([...initialChildren.map(value => value.key), 'new-child']);
    expect(group.data.isLoading).toBe(false);
    await act(async () => renderer.unmount());
  });
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
jest.mock('../../../src/controls/modernTaxonomyPicker/modernTermPicker/ModernTermPicker', () => {
  const react = require('react');
  return { ModernTermPicker: (props: object) => react.createElement('div', { ...props, 'data-test': 'term-picker' }) };
});
jest.mock('@fluentui/react/lib/MessageBar', () => {
  const react = require('react');
  return {
    MessageBar: (props: object) => react.createElement('div', { ...props, 'data-test': 'error' }),
    MessageBarType: { error: 1 }
  };
});

describe('ModernTaxonomyPicker error recovery', () => {
  afterEach(() => jest.restoreAllMocks());

  async function setup(isPathRendered = false) {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { context } = mockContext();
    Object.assign(context.pageContext, { cultureInfo: { currentUICultureName: 'en-US' } });
    jest.spyOn(SPTaxonomyService.prototype, 'getTermStoreInfo').mockResolvedValue({
      id: 'store', name: 'Store', languageTags: ['en-US'], defaultLanguageTag: 'en-US'
    });
    jest.spyOn(SPTaxonomyService.prototype, 'getTermSetInfo').mockResolvedValue({
      id: listId, localizedNames: [{ name: 'Terms', languageTag: 'en-US' }],
      childrenCount: 0, description: '', createdDateTime: '', customSortOrder: [],
      groupId: 'group', isOpen: true, isAvailableForTagging: true, contact: ''
    });
    let renderer: ReactTestRenderer;
    await act(async () => {
      renderer = create(<ModernTaxonomyPicker
        context={context} termSetId={listId} label="Terms" panelTitle="Terms" isPathRendered={isPathRendered}
      />);
    });
    return renderer;
  }
  function messages(renderer: ReactTestRenderer): string[] {
    return renderer.root.findAllByProps({ 'data-test': 'error' }).map(node => node.props.children);
  }

  test('clears only the recovered search or tree operation, keeping unrelated errors', async () => {
    const children = jest.spyOn(SPTaxonomyService.prototype, 'getTerms')
      .mockRejectedValueOnce(new Error('Tree failed')).mockResolvedValue({ value: [], skiptoken: '' });
    const renderer = await setup();
    const search = jest.spyOn(SPTaxonomyService.prototype, 'searchTerm')
      .mockRejectedValueOnce(new Error('Search failed')).mockResolvedValue([]);
    await act(async () => { await renderer.root.findByProps({ 'data-test': 'term-picker' }).props.onResolveSuggestions('term'); });
    expect(messages(renderer)).toEqual(['Search failed']);
    await act(async () => renderer.root.findByProps({ 'data-test': 'open' }).props.onClick());
    const load = () => renderer.root.findByType(TaxonomyPanelContents).props.onLoadMoreData(Guid.parse(listId), Guid.empty, 'page', true, 50);
    await act(async () => { await load().catch((): void => undefined); });
    expect(messages(renderer)).toEqual(['Search failed', 'Tree failed']);
    await act(async () => { await load(); });
    expect(children).toHaveBeenCalledTimes(2);
    expect(messages(renderer)).toEqual(['Search failed']);
    await act(async () => {
      await renderer.root.findAllByProps({ 'data-test': 'term-picker' })[0].props.onResolveSuggestions('term');
    });
    expect(search).toHaveBeenCalledTimes(2);
    expect(messages(renderer)).toEqual([]);
    await act(async () => renderer.unmount());
  });

  test('a success for another tree node does not clear a failed node', async () => {
    jest.spyOn(SPTaxonomyService.prototype, 'getTerms')
      .mockRejectedValueOnce(new Error('First node failed')).mockResolvedValue({ value: [], skiptoken: '' });
    const renderer = await setup();
    await act(async () => renderer.root.findByProps({ 'data-test': 'open' }).props.onClick());
    const load = (parent: string) => renderer.root.findByType(TaxonomyPanelContents).props.onLoadMoreData(Guid.parse(listId), Guid.parse(parent), '', true);
    await act(async () => { await load('first').catch((): void => undefined); });
    await act(async () => { await load('second'); });
    expect(messages(renderer)).toEqual(['First node failed']);
    await act(async () => { await load('first'); });
    expect(messages(renderer)).toEqual([]);
    await act(async () => renderer.unmount());
  });

  test('clears selection-path errors after retry succeeds', async () => {
    const renderer = await setup(true);
    const selected = {
      id: 'term', labels: [{ name: 'Term', languageTag: 'en-US', isDefault: true }]
    } as ITermInfo;
    jest.spyOn(SPTaxonomyService.prototype, 'getTermById')
      .mockRejectedValueOnce(new Error('Path failed')).mockResolvedValue(selected);
    await act(async () => renderer.root.findByProps({ 'data-test': 'term-picker' }).props.onChange([selected]));
    expect(messages(renderer)).toEqual(['Path failed']);
    await act(async () => renderer.root.findByProps({ 'data-test': 'term-picker' }).props.onChange([selected]));
    expect(messages(renderer)).toEqual([]);
    expect(renderer.root.findByProps({ 'data-test': 'term-picker' }).props.selectedItems).toEqual([selected]);
    await act(async () => renderer.unmount());
  });

  test('ignores an older search failure after the latest search succeeded', async () => {
    const renderer = await setup();
    let reject: (error: Error) => void;
    const oldSearch = new Promise<ITermInfo[]>((_resolve, fail) => { reject = fail; });
    jest.spyOn(SPTaxonomyService.prototype, 'searchTerm').mockReturnValueOnce(oldSearch).mockResolvedValue([]);
    let pending: Promise<ITermInfo[]>;
    await act(async () => { pending = renderer.root.findByProps({ 'data-test': 'term-picker' }).props.onResolveSuggestions('old'); });
    await act(async () => { await renderer.root.findByProps({ 'data-test': 'term-picker' }).props.onResolveSuggestions('new'); });
    await act(async () => { reject(new Error('Old failure')); await pending; });
    expect(messages(renderer)).toEqual([]);
    await act(async () => renderer.unmount());
  });
});

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
