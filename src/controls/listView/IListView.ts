import { Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IColumn } from 'office-ui-fabric-react/lib/components/DetailsList';

export { SelectionMode };

export interface IListViewProps {
    /**
     * Specify the name of the file URL path which will be used to show the file icon.
     */
    iconFieldName?: string;
    /** 
     * The items to render.
     */
    items: any[];
    /**
     * The fields you want to view in your list view
     */
    viewFields?: IViewField[];
    /** 
     * Boolean value to indicate if the component should render in compact mode. 
     * Set to false by default 
     */
    compact?: boolean;
    /**
     * Specify the item selection mode.
     * By default this is set to none.
     */
    selectionMode?: SelectionMode;
    /**
     * Selection event that passes the selected item(s)
     */
    selection?: (items: any[]) => void;
}

export interface IListViewState {
    /** 
     * The items to render.
     */
    items: any[];
    /** 
     * Given column defitions. 
     * If none are provided, default columns will be created based on the item's properties. 
     */
    columns?: IColumn[];
}

export interface IViewField {
    /**
     * Name of the field
     */
    name: string;
    /**
     * Name of the field that will be used as the column title
     */
    displayName?: string;
    /**
     * Specify the field name that needs to be used to render a link
     */
    linkPropertyName?: string;
    /**
     * Specify if you want to enable column sorting
     */
    sorting?: boolean;
    /**
     * Specify the maximum width of the column
     */
    maxWidth?: number;
    /**
     * Override the render method of the field
     */
    render?: (item?: any, index?: number, column?: IColumn) => any;
}