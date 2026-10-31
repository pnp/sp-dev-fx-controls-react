import { Selection } from '@fluentui/react/lib/Selection';

/**
 * Returns a valid max number of files limit, or undefined when no limit applies.
 * A limit is only valid when it is an integer greater than 0.
 */
export function getValidMaxNumberOfFiles(value?: number): number | undefined {
  return value !== undefined && Number.isInteger(value) && value > 0 ? value : undefined;
}

/**
 * Result of enforcing a max number of files limit on a Fluent Selection.
 */
export interface IEnforceMaxNumberOfFilesResult {
  /** Indices of the resulting valid selection. */
  indices: number[];
  /** True when the selection was reverted because the limit was exceeded. */
  reverted: boolean;
}

/**
 * Enforces a max number of files limit on a Fluent Selection (multi-select mode).
 * When the current selection contains more files than the limit allows, the
 * selection is reverted to the last valid one and change events are re-raised
 * once so subscribers (DetailsList/TilesList checkboxes) refresh and the
 * selection-changed handler is re-invoked with the valid selection. Folders
 * (items for which isFile returns false) never count towards the limit.
 * Returns the indices of the resulting valid selection and whether it was reverted.
 */
export function enforceMaxNumberOfFiles<T = unknown>(
  selection: Selection,
  limit: number | undefined,
  isFile: (item: T) => boolean,
  lastValidIndices: number[]
): IEnforceMaxNumberOfFilesResult {
  if (limit === undefined || limit <= 1) {
    return { indices: selection.getSelectedIndices().slice(), reverted: false };
  }

  const selectedFilesCount = (selection.getSelection() as T[]).filter(isFile).length;

  if (selectedFilesCount > limit) {
    // Revert to the last valid selection and re-raise change events once so
    // subscribers refresh and the selection-changed handler is re-invoked with
    // the valid selection.
    selection.setChangeEvents(false);
    selection.setAllSelected(false);
    lastValidIndices.forEach(i => selection.setIndexSelected(i, true, false));
    selection.setChangeEvents(true);
    return { indices: lastValidIndices, reverted: true };
  }

  return { indices: selection.getSelectedIndices().slice(), reverted: false };
}
