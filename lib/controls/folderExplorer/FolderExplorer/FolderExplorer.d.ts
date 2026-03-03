import * as React from 'react';
import { IFolderExplorerProps, IFolderExplorerState } from '.';
export declare class FolderExplorer extends React.Component<IFolderExplorerProps, IFolderExplorerState> {
    private _spService;
    private _allLibraries;
    private _allFolders;
    private _allFiles;
    constructor(props: IFolderExplorerProps);
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IFolderExplorerProps>;
    /**
   * Get HTML elements for rendering breadcrumb
   */
    private _getBreadcrumbDOM;
    /**
   * Get breadcrumb items
   * @returns an array of IBreadcrumbItem objects
   */
    private _getCurrentBreadcrumbItems;
    /**
   * Filter list of folders based on user input
   * @param filterText - The text to use when filtering the collection
   */
    private _onChangeFilterText;
    /**
  * Load sub folders and files within a given folder
  * @param folder - Name of the folder
  */
    private _getFolders;
    /**
    * Add new subfolder to current folder
    */
    private _addSubFolder;
}
//# sourceMappingURL=FolderExplorer.d.ts.map