import type {
  IModernTaxonomyPickerProps, ITaxonomyPanelContentsProps, ITaxonomyTreeProps,
  ITermInfo, TaxonomyTreeUpdateCallback
} from '../../../src/ModernTaxonomyPicker';

type PickerUpdate = NonNullable<Parameters<NonNullable<IModernTaxonomyPickerProps['onRenderActionButton']>>[3]>;
type PanelUpdate = NonNullable<Parameters<NonNullable<ITaxonomyPanelContentsProps['onRenderActionButton']>>[3]>;
type TreeUpdate = NonNullable<Parameters<NonNullable<ITaxonomyTreeProps['onRenderActionButton']>>[3]>;

test('all public taxonomy action callbacks accept the same four update positions', () => {
  const newTerms: ITermInfo[] = [];
  const parents: ITermInfo[] = [];
  const updated: ITermInfo[] = [];
  const deleted: ITermInfo[] = [];
  const calls: Parameters<TaxonomyTreeUpdateCallback>[] = [];
  const callback: TaxonomyTreeUpdateCallback = (...args) => { calls.push(args); };
  const picker: PickerUpdate = callback;
  const panel: PanelUpdate = callback;
  const tree: TreeUpdate = callback;
  picker(newTerms, parents, updated, deleted);
  panel(newTerms, parents, updated, deleted);
  tree(newTerms, parents, updated, deleted);
  expect(calls).toHaveLength(3);
  calls.forEach(args => {
    expect(args[0]).toBe(newTerms);
    expect(args[1]).toBe(parents);
    expect(args[2]).toBe(updated);
    expect(args[3]).toBe(deleted);
  });
});
