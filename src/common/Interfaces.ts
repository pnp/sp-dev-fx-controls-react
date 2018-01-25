import { SPHttpClient } from '@microsoft/sp-http';
import { PageContext, SPField } from '@microsoft/sp-page-context';
import { ListViewAccessor } from "@microsoft/sp-listview-extensibility";
import { ISPField } from './SPEntities';

/**
 * Customizer context interface.
 * Can be used in different types of customizers
 */
export interface IContext {
    spHttpClient: SPHttpClient;
    pageContext: PageContext;
    listView?: ListViewAccessor | null;
    field?: SPField | null;
}

/**
 * Interface that represents dictionary of fields
 */
export interface IFields {
    [id: string]: ISPField;
}

/**
 * Parent of all props interfaces that needs context
 */
export interface IProps {
    context: IContext;
}