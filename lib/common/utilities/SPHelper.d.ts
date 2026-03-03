import { IContext } from '../Interfaces';
import { ListItemAccessor } from '@microsoft/sp-listview-extensibility';
import '@pnp/sp/fields';
import '@pnp/sp/site-users/web';
import '@pnp/sp/webs';
import "@pnp/sp/lists";
import { ISiteUserInfo } from '@pnp/sp/site-users/types';
/**
 * Helper class to work with SharePoint objects and entities
 */
export declare class SPHelper {
    /**
     * Gets field's Real Name from FieldNamesMapping
     * @param columnName current field name
     */
    static getStoredFieldName(columnName: string): string;
    /**
     * Gets Field's text
     * @param fieldValue field value as it appears in Field Customizer's onRenderCell event
     * @param listItem List Item accessor
     * @param context Customizer's context
     */
    static getFieldText(fieldValue: any, listItem: ListItemAccessor, context: IContext): Promise<string>;
    /**
     * Gets property of the Field by Field's ID and Property Name
     * @param fieldId Field's ID
     * @param propertyName Property name
     * @param context SPFx context
     * @param fromSchemaXml true if the field should be read from Field Schema Xml
     */
    static getFieldProperty(fieldId: string, propertyName: string, context: IContext, fromSchemaXml: boolean): Promise<any>;
    /**
     * Asynchronously gets the Diplay Form Url for the Lookup field
     * @param fieldId Field Id
     * @param context SPFx Context
     */
    static getLookupFieldListDispFormUrl(fieldId: string, context: IContext): Promise<string>;
    /**
     * Gets column's value for the row using List Item Accessor.
     * This method works with private property _values of List Item Accessor to get such values as FriendlyDisplay text for Date, and more.
     * @param listItem List Item Accessor
     * @param itemName column name
     */
    static getRowItemValueByName(listItem: ListItemAccessor, itemName: string): any;
    /**
     * Gets SchemaXml for the field by List Title and Field Id
     * @param fieldId Field's Id
     * @param listTitle List Title
     * @param context Customizer's context
     */
    static getFieldSchemaXmlById(fieldId: string, listTitle: string, context: IContext): Promise<string>;
    /**
     * Gets correct view id from the page
     * @param context SPFx Context
     */
    static getPageViewId(context: IContext): string;
    /**
     * Returns the user corresponding to the specified member identifier for the current site
     * @param id user id
     * @param context SPFx context
     */
    static getUserById(id: number, context: IContext): Promise<ISiteUserInfo>;
    /**
     * Returns user profile properties
     * @param loginName User's login name
     * @param context SPFx context
     */
    static getUserProperties(loginName: string, context: IContext): Promise<any>;
    static isTextFieldType(fieldType?: string): boolean;
    private static _updateFieldInSessionStorage;
    private static _updateSessionStorageLoadedViewFields;
    private static _getLoadedViewFieldsFromStorage;
}
//# sourceMappingURL=SPHelper.d.ts.map