import { ITreeItem } from './ITreeItem';
/**
 * TreeView state interface
 */
export interface ITreeViewState {
    /**
     * Specifies if the tree view is loaded.
     */
    loaded: boolean;
    /**
     * Specifies default exapnded mode.
     */
    defaultExpanded: boolean;
    /**
     * List of selected tree items.
     */
    activeItems: ITreeItem[];
}
//# sourceMappingURL=ITreeViewState.d.ts.map