/**
 * Selection mode of tree item
 */
export var TreeViewSelectionMode;
(function (TreeViewSelectionMode) {
    TreeViewSelectionMode[TreeViewSelectionMode["Single"] = 0] = "Single";
    TreeViewSelectionMode[TreeViewSelectionMode["Multiple"] = 1] = "Multiple";
    TreeViewSelectionMode[TreeViewSelectionMode["None"] = 2] = "None";
})(TreeViewSelectionMode || (TreeViewSelectionMode = {}));
export var SelectChildrenMode;
(function (SelectChildrenMode) {
    SelectChildrenMode[SelectChildrenMode["None"] = 0] = "None";
    SelectChildrenMode[SelectChildrenMode["Select"] = 1] = "Select";
    SelectChildrenMode[SelectChildrenMode["Unselect"] = 2] = "Unselect";
    SelectChildrenMode[SelectChildrenMode["Mount"] = 4] = "Mount";
    SelectChildrenMode[SelectChildrenMode["Update"] = 8] = "Update";
    SelectChildrenMode[SelectChildrenMode["All"] = 15] = "All"; // 1111
})(SelectChildrenMode || (SelectChildrenMode = {}));
//# sourceMappingURL=ITreeViewProps.js.map