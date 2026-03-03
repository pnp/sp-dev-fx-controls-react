import * as React from "react";
import { IFilePickerProps } from "./IFilePickerProps";
import { IFilePickerState } from "./IFilePickerState";
export declare class FilePicker extends React.Component<IFilePickerProps, IFilePickerState> {
    private fileBrowserService;
    private oneDriveService;
    private orgAssetsService;
    private fileSearchService;
    constructor(props: IFilePickerProps);
    componentDidMount(): Promise<void>;
    /**
   * componentWillReceiveProps lifecycle hook
   *
   * @param nextProps
   */
    UNSAFE_componentWillReceiveProps(nextProps: IFilePickerProps): void;
    render(): JSX.Element;
    /**
     * Renders the panel header
     */
    private _renderHeader;
    /**
     * Open the panel
     */
    private _handleOpenPanel;
    /**
     * Closes the panel
     */
    private _handleClosePanel;
    /**
     * On save action
     */
    private _handleSave;
    private _handleOnChange;
    /**
     * Changes the selected tab when a link is selected
     */
    private _handleLinkClick;
    /**
     * Prepares navigation panel options
     */
    private _getNavPanelOptions;
    /**
     * Sorts navigation tabs based on the tabOrder prop
     */
    private _getTabOrder;
    /**
     * Returns the default selected tab key
     */
    private _getDefaultSelectedTabKey;
}
//# sourceMappingURL=FilePicker.d.ts.map