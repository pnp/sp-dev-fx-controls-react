import { IContext, IFields } from '../Interfaces';
import { GeneralHelper } from './GeneralHelper';
import { ISPField, ISPFieldLookupValue, IPrincipal, ITerm } from '../SPEntities';
import * as Constants from '../Constants';
import { ListItemAccessor } from '@microsoft/sp-listview-extensibility';
import { SPField } from '@microsoft/sp-page-context';
import { sp } from '@pnp/sp';
import '@pnp/sp/fields';
import { SPHttpClient } from '@microsoft/sp-http';
import { IFieldInfo } from '@pnp/sp/fields';
import '@pnp/sp/site-users/web';
import '@pnp/sp/webs';
import "@pnp/sp/lists";
import { ISiteUserInfo } from '@pnp/sp/site-users/types';

interface IFieldLookupInfo extends IFieldInfo {
  LookupWebId: string;
  LookupList: string;
}

/**
 * Helper class to work with SharePoint objects and entities
 */
export class SPHelper {

    /**
     * Gets field's Real Name from FieldNamesMapping
     * @param columnName current field name
     */
    public static getStoredFieldName(columnName: string): string {
        if (!columnName)
            return '';

        return Constants.FieldNamesMapping[columnName] ? Constants.FieldNamesMapping[columnName].storedName : columnName;
    }

    /**
     * Gets Field's text
     * @param fieldValue field value as it appears in Field Customizer's onRenderCell event
     * @param listItem List Item accessor
     * @param context Customizer's context
     */
    public static getFieldText(fieldValue: any, listItem: ListItemAccessor, context: IContext): Promise<string> { // eslint-disable-line @typescript-eslint/no-explicit-any
        return new Promise<string>(resolve => {
            const field: SPField = context.field;

            if (!field) {
                resolve('');
                return;
            }

            const fieldName: string = field.internalName; //this.getFieldNameById(field.id.toString());
            const fieldType: string = field.fieldType;
            const strFieldValue: string = fieldValue ? fieldValue.toString() : '';
            let friendlyDisplay: string | undefined;
            let titles: string[] | undefined;
            let users: IPrincipal[] | undefined;
            let lookupValues: ISPFieldLookupValue[] | undefined;
            let lookupTexts: string[] | undefined;
            let isImage: boolean = false;
            let terms: ITerm[] | undefined;
            let termTexts: string[] | undefined;
            let storedName: string | undefined;

            switch (fieldType) {
                case 'Note':
                    SPHelper.getFieldProperty(field.id.toString(), "RichText", context, false).then(richText => {
                        const isRichText: boolean = richText === 'TRUE';
                        if (isRichText) {
                            resolve(GeneralHelper.getTextFromHTML(strFieldValue));
                        }
                        resolve(fieldValue);
                    }).catch(() => { /* no-op; */ });
                    break;
                case 'DateTime':
                    friendlyDisplay = SPHelper.getRowItemValueByName(listItem, `${fieldName}.FriendlyDisplay`);
                    resolve(friendlyDisplay ? GeneralHelper.getRelativeDateTimeString(friendlyDisplay) : strFieldValue);
                    break;
                case 'User':
                case 'UserMulti':
                    titles = [];
                    users = <IPrincipal[]>fieldValue;

                    if (!users) {
                        resolve('');
                    }

                    for (let i = 0, len = users.length; i < len; i++) {
                        titles.push(users[i].title);
                    }
                    resolve(titles.join('\n'));
                    break;
                case "Lookup":
                case "LookupMulti":
                    lookupValues = fieldValue as ISPFieldLookupValue[];

                    if (!lookupValues) {
                        resolve('');
                    }

                    lookupTexts = [];
                    for (let i = 0, len = lookupValues.length; i < len; i++) {
                        lookupTexts.push(lookupValues[i].lookupValue);
                    }
                    resolve(lookupTexts.join('\n'));
                    break;
                case 'URL':
                    SPHelper.getFieldProperty(field.id.toString(), 'Format', context, true).then(format => {
                        isImage = format === 'Image';
                        if (isImage) {
                            resolve('');
                        }
                        resolve(SPHelper.getRowItemValueByName(listItem, `${fieldName}.desc`));
                    }).catch(() => { /* no-op; */ });
                    break;
                case 'Taxonomy':
                case 'TaxonomyFieldType':
                case 'TaxonomyFieldTypeMulti':
                    terms = Array.isArray(fieldValue) ? <ITerm[]>fieldValue : <ITerm[]>[fieldValue];

                    if (!terms) {
                        resolve('');
                    }

                    termTexts = [];
                    for (let i = 0, len = terms.length; i < len; i++) {
                        termTexts.push(terms[i].Label);
                    }
                    resolve(termTexts.join('\n'));
                    break;
                case 'Attachments':
                    resolve('');
                    break;
                case 'Computed':
                    storedName = this.getStoredFieldName(fieldName);
                    if (storedName === 'URL') {
                        resolve(this.getRowItemValueByName(listItem, 'URL.desc') || strFieldValue);
                    }
                    resolve(strFieldValue);
                    break;
                default:
                    resolve(strFieldValue);
            }
        });
    }

    /**
     * Gets property of the Field by Field's ID and Property Name
     * @param fieldId Field's ID
     * @param propertyName Property name
     * @param context SPFx context
     * @param fromSchemaXml true if the field should be read from Field Schema Xml
     */
    public static getFieldProperty(fieldId: string, propertyName: string, context: IContext, fromSchemaXml: boolean): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
        return new Promise<any>(resolve => { // eslint-disable-line @typescript-eslint/no-explicit-any
            let loadedViewFields: { [viewId: string]: IFields } = SPHelper._getLoadedViewFieldsFromStorage();
            const viewId: string = SPHelper.getPageViewId(context);

            if (!loadedViewFields) {
                loadedViewFields = {};
            }

            if (!loadedViewFields[viewId]) {
                loadedViewFields[viewId] = {};
            }

            let field: ISPField = loadedViewFields[viewId][fieldId];
            if (!field) {
                field = {
                    Id: fieldId
                };
            }


            if (GeneralHelper.isDefined(field[propertyName])) {
                resolve(field[propertyName]);
                return;
            }

            sp.setup({
                spfxContext: context
            });

            if (fromSchemaXml) {
                SPHelper.getFieldSchemaXmlById(fieldId, context.pageContext.list.title, context).then(schemaXml => {
                    let fieldValue: string;
                    const xml: Document = GeneralHelper.parseXml(schemaXml);
                    const fieldEls = xml.getElementsByTagName('Field');
                    if (fieldEls.length) {
                        const fieldEl = fieldEls[0];
                        fieldValue = fieldEl.getAttribute(propertyName);
                        if (!GeneralHelper.isDefined(fieldValue)) {
                            fieldValue = fieldEl.textContent;
                        }
                    }
                    if (!GeneralHelper.isDefined(fieldValue)) {
                        fieldValue = '';
                    }
                    field[propertyName] = fieldValue;
                    SPHelper._updateFieldInSessionStorage(field, context);
                }, (error) => {
                    resolve('');
                });
            }
            else {
                sp.web.lists.getByTitle(context.pageContext.list.title).fields.getById(fieldId).select(propertyName).get().then(f => {
                    field[propertyName] = f[propertyName];

                    loadedViewFields[viewId][field.Id] = field;

                    SPHelper._updateSessionStorageLoadedViewFields(loadedViewFields);
                    resolve(field[propertyName]);
                }, (error) => {
                    resolve('');
                });
            }
        });
    }

    /**
     * Asynchronously gets the Diplay Form Url for the Lookup field
     * @param fieldId Field Id
     * @param context SPFx Context
     */
    public static getLookupFieldListDispFormUrl(fieldId: string, context: IContext): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let loadedViewFields: { [viewId: string]: IFields } = SPHelper._getLoadedViewFieldsFromStorage();
            const viewId: string = SPHelper.getPageViewId(context);

            if (!loadedViewFields) {
                loadedViewFields = {};
            }

            if (!loadedViewFields[viewId]) {
                loadedViewFields[viewId] = {};
            }

            let field: ISPField = loadedViewFields[viewId][fieldId];
            if (!field) {
                field = {
                    Id: fieldId
                };
            }

            if (GeneralHelper.isDefined(field.LookupDisplayUrl)) {
                resolve(field.LookupDisplayUrl);
                return;
            }
            sp.setup({
                spfxContext: context
            });
            sp.web.lists.getByTitle(context.pageContext.list.title).fields.getById(fieldId).select('LookupWebId', 'LookupList').get().then((f: IFieldLookupInfo) => {
                sp.site.openWebById(f.LookupWebId).then(openedWeb => {
                    openedWeb.web.select('Url').get().then(w => {
                        field.LookupDisplayUrl = `${w.Url}/_layouts/15/listform.aspx?PageType=4&ListId=${f.LookupList}`;
                        SPHelper._updateFieldInSessionStorage(field, context);
                        resolve(field.LookupDisplayUrl);
                    }, (error) => {
                        reject(error);
                    });
                }).catch(() => { /* no-op; */ });
            }).catch(() => { /* no-op; */ });
        });
    }

    /**
     * Gets column's value for the row using List Item Accessor.
     * This method works with private property _values of List Item Accessor to get such values as FriendlyDisplay text for Date, and more.
     * @param listItem List Item Accessor
     * @param itemName column name
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    public static getRowItemValueByName(listItem: ListItemAccessor, itemName: string): any {
        const _values: any = (<any>listItem)._values;

        if (_values) {
            return (_values as Map<string, any>).get(itemName);
        }
        else {
            //
            // TODO: here we should call make a POST request to _api/web/GetList(@listUrl)/RenderListDataAsStream with correct parameters to get correct data
            // the parameters should contain view, folder, pagination data, etc.
            // I hope that Dev team will expose this data in API before I implement that because it's pretty complicated and they already have it in place
            //

            return null;
        }
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    /**
     * Gets SchemaXml for the field by List Title and Field Id
     * @param fieldId Field's Id
     * @param listTitle List Title
     * @param context Customizer's context
     */
    public static getFieldSchemaXmlById(fieldId: string, listTitle: string, context: IContext): Promise<string> {
        return new Promise<string>((resolve) => {
            let loadedViewFields: { [viewId: string]: IFields } = SPHelper._getLoadedViewFieldsFromStorage();
            const viewId: string = SPHelper.getPageViewId(context);

            if (!loadedViewFields) {
                loadedViewFields = {};
            }

            if (!loadedViewFields[viewId]) {
                loadedViewFields[viewId] = {};
            }

            let field: ISPField = loadedViewFields[viewId][fieldId];
            if (!field) {
                field = {
                    Id: fieldId
                };
            }


            if (GeneralHelper.isDefined(field.SchemaXml)) {
                resolve(field.SchemaXml);
                return;
            }
            sp.setup({
                spfxContext: context
            });

            sp.web.lists.getByTitle(listTitle).fields.getById(fieldId).select('SchemaXml').get().then((f) => {
                field.SchemaXml = f && f.SchemaXml;

                loadedViewFields[viewId][field.Id] = field;

                SPHelper._updateSessionStorageLoadedViewFields(loadedViewFields);
                resolve(f ? f.SchemaXml : '');
            }, (error) => {
                resolve('');
            });
        });
    }

    /**
     * Gets correct view id from the page
     * @param context SPFx Context
     */
    public static getPageViewId(context: IContext): string {
        const urlParams: URLSearchParams = new URLSearchParams(location.search);
        let viewIdQueryParam: string = urlParams.get('viewid');
        if (viewIdQueryParam && viewIdQueryParam.indexOf('{') !== 0) {
            viewIdQueryParam = `{${viewIdQueryParam}}`;
        }
        return viewIdQueryParam || context.pageContext.legacyPageContext.viewId;
    }

    /**
     * Returns the user corresponding to the specified member identifier for the current site
     * @param id user id
     * @param context SPFx context
     */
    public static async getUserById(id: number, context: IContext): Promise<ISiteUserInfo> {
        sp.setup({
            spfxContext: context
        });

        return sp.web.getUserById(id).get();
    }

    /**
     * Returns user profile properties
     * @param loginName User's login name
     * @param context SPFx context
     */
    public static async getUserProperties(loginName: string, context: IContext): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
        let url: string;
        url = context.pageContext.web.absoluteUrl;
        url = GeneralHelper.trimSlash(url);

        url += "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='" + encodeURIComponent(loginName) + "'";
         return context.spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then((response): Promise<any> => { // eslint-disable-line @typescript-eslint/no-explicit-any
                return response.json();
            })
            .then((value) => {
                return value;
            });
    }

    public static isTextFieldType(fieldType?: string): boolean {
      if (!fieldType) {
        return true;
      }
      const lowercasedFieldType = fieldType.toLowerCase();
      return lowercasedFieldType === 'text' || lowercasedFieldType === 'note';
    }


    private static _updateFieldInSessionStorage(field: ISPField, context: IContext): void {
        let loadedViewFields: { [viewId: string]: IFields } = SPHelper._getLoadedViewFieldsFromStorage();
        if (!loadedViewFields) {
            loadedViewFields = {};
        }
        const viewId: string = SPHelper.getPageViewId(context);
        if (!loadedViewFields[viewId]) {
            loadedViewFields[viewId] = {};
        }
        loadedViewFields[viewId][field.Id] = field;
        SPHelper._updateSessionStorageLoadedViewFields(loadedViewFields);
    }

    private static _updateSessionStorageLoadedViewFields(loadedViewFields: { [viewId: string]: IFields }): void {
        try {
            if (window.sessionStorage) {
                window.sessionStorage.setItem(Constants.LoadedViewFieldsKey, JSON.stringify(loadedViewFields));
            }
        } catch {
            // do nothing, no need to stop fn execution
        }
    }

    private static _getLoadedViewFieldsFromStorage(): { [viewId: string]: IFields } {
        try {
            if (window.sessionStorage) {
                const loadedViewFields = sessionStorage.getItem(Constants.LoadedViewFieldsKey);
                if (loadedViewFields) {
                    return JSON.parse(loadedViewFields);
                }
            }
            else {
                return null;
            }
        } catch {
            return null;
        }
    }
}
