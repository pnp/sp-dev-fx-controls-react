import { BaseComponentContext } from "@microsoft/sp-component-base";
import { ICustomCollectionField } from "./ICustomCollectionField";
import { IPanelProps } from "@fluentui/react";
export interface IFieldCollectionDataProps {
    /**
     * An unique key that indicates the identity of this control.
     */
    key: string;
    /**
     * Property field label displayed on top.
     */
    label?: string;
    /**
     * Label to be used as the header in the panel.
     */
    panelHeader: string;
    /**
     * Property that allows you to specify a description in the collection panel.
     */
    panelDescription?: string;
    /**
     * Label of the button to open the panel.
     */
    manageBtnLabel: string;
    /**
     * Label of the cancel button
     */
    cancelBtnLabel?: string;
    /**
     * Label of the save button
     */
    saveBtnLabel?: string;
    /**
     * Label of the save and add button
     */
    saveAndAddBtnLabel?: string;
    /**
     * The fields to be used for the list of collection data.
     */
    fields: ICustomCollectionField[];
    /**
     * The collection data value.
     */
    value: any[];
    /**
     * Specify if you want to enable sorting
     */
    enableSorting?: boolean;
    /**
     * Specify if the control is disabled.
     */
    disabled?: boolean;
    /**
     * Allows you to specify if user can create new items
     */
    disableItemCreation?: boolean;
    /**
     * Allows you to specify if users can delete already inserted items
     */
    disableItemDeletion?: boolean;
    /**
     * Allows you to specify a custom CSS class name for the collection data panel
     */
    panelClassName?: string;
    /**
     * Allows you to specify a custom CSS class name for the collection data table inside the panel
     */
    tableClassName?: string;
    /**
     * Allows you to specify the amount of items displayed per page. Paging control is added automatically.
     */
    itemsPerPage?: number;
    /**
     * Allow overriding panel props such as size, type, layerProps, etc.
     */
    panelProps?: IPanelProps;
    /**
     * Allows you to show Search Box and specify own filtering logic.
     */
    executeFiltering?: (searchFilter: string, item: any) => boolean;
    onChanged: (value: any[]) => void;
    /**
     * Used for CustomCollectionFieldType peoplepicker
     */
    context?: BaseComponentContext;
    /**
     * Show the collectionDataViewer inside the panel, defaults to true
     */
    usePanel?: boolean;
    /**
     * The message when no data is added
     */
    noDataMessage?: string;
}
export interface IFieldCollectionDataState {
    panelOpen: boolean;
}
//# sourceMappingURL=IFieldCollectionData.d.ts.map