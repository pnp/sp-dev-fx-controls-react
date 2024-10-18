import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPHttpClientOptions, SPHttpClient } from "@microsoft/sp-http";
import filter from 'lodash/filter';
import find from 'lodash/find';
import { ISPContentType, ISPField, ISPList, ISPLists, IUploadImageResult, ISPViews } from "../common/SPEntities";
import { SPHelper, urlCombine } from "../common/utilities";
import { IContentTypesOptions, IFieldsOptions, ILibsOptions, IRenderListDataAsStreamClientFormResult, ISPService, LibsOrderBy } from "./ISPService";
import {orderBy } from '../controls/viewPicker/IViewPicker';

interface ICachedListItems {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  expiration: number;
}

export default class SPService implements ISPService {

  private _webAbsoluteUrl: string;
  private _cachedListItems: Map<string, ICachedListItems> = new Map<string, ICachedListItems>();


  constructor(private _context: BaseComponentContext, webAbsoluteUrl?: string) {
    this._webAbsoluteUrl = webAbsoluteUrl ? webAbsoluteUrl : this._context.pageContext.web.absoluteUrl;
  }

  public async getContentTypes(options?: IContentTypesOptions): Promise<ISPContentType[]> {
    try {
      const queryUrlString: string = options.listId ? `${this._webAbsoluteUrl}/_api/web/lists('${options.listId}')/ContentTypes?` : `${this._webAbsoluteUrl}/_api/web/ContentTypes?`;
      const queryUrl = new URL(queryUrlString);

      if (options.orderBy) {
        queryUrl.searchParams.set('$orderby', options.orderBy.toString());
      }
      if (options.filter) {
        queryUrl.searchParams.set('$filter', options.filter);
      }
      else {
        if (options.group) {
          queryUrl.searchParams.set('$filter', `Group eq '${options.group}'`);
        }
        if (!options.includeHidden) {
          const usedFilter = queryUrl.searchParams.get('$filter');
          const filterPrefix = usedFilter ? usedFilter + ' and ' : '';
          queryUrl.searchParams.set('$filter', filterPrefix + 'Hidden eq false');
        }
        if (!options.includeReadOnly) {
          const usedFilter = queryUrl.searchParams.get('$filter');
          const filterPrefix = usedFilter ? usedFilter + ' and ' : '';
          queryUrl.searchParams.set('$filter', filterPrefix + 'ReadOnly eq false');
        }
      }

      const data = await this._context.spHttpClient.get(queryUrl.toString(), SPHttpClient.configurations.v1);
      if (!data.ok) {
        return null;
      }

      const result: { value: ISPContentType[] } = await data.json();
      return result.value;
    } catch (error) {
      throw Error(error);
    }
  }

  public async getFields(options: IFieldsOptions): Promise<ISPField[]> {
    try {
      let queryUrlString: string = `${this._webAbsoluteUrl}/_api/web`;
      if (options.listId) {
        queryUrlString += `/lists('${options.listId}')`;
      }
      queryUrlString += `/fields?`;

      const queryUrl = new URL(queryUrlString);

      if (options.orderBy) {
        queryUrl.searchParams.set('$orderby', options.orderBy.toString());
      }
      if (options.filter) {
        queryUrl.searchParams.set('$filter', options.filter);
      }
      else {
        if (options.group) {
          queryUrl.searchParams.set('$filter', `Group eq '${options.group}'`);
        }
        if (!options.includeHidden) {
          const usedFilter = queryUrl.searchParams.get('$filter');
          const filterPrefix = usedFilter ? usedFilter + ' and ' : '';
          queryUrl.searchParams.set('$filter', filterPrefix + 'Hidden eq false');
        }
        if (!options.includeReadOnly) {
          const usedFilter = queryUrl.searchParams.get('$filter');
          const filterPrefix = usedFilter ? usedFilter + ' and ' : '';
          queryUrl.searchParams.set('$filter', filterPrefix + 'ReadOnlyField eq false');
        }
      }

      const data = await this._context.spHttpClient.get(queryUrl.toString(), SPHttpClient.configurations.v1);
      if (!data.ok) {
        return null;
      }

      const result: { value: ISPField[] } = await data.json();
      return result.value;
    } catch (error) {
      throw Error(error);
    }
  }

  public getField = async (listId: string, internalColumnName: string, webUrl?: string): Promise<ISPField | undefined> => {
    try {
      const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/fields/getByInternalNameOrTitle('${internalColumnName}')`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          const field = results as ISPField;

          if (field.TypeAsString === 'Calculated') {
            const resultTypeRegEx = /ResultType="(\w+)"/gmi;
            const resultTypeMatch = resultTypeRegEx.exec(field.SchemaXml);

            field.ResultType = resultTypeMatch[1];
          }

          return field;
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get lists or libraries
   *
   * @param options
   */
  public async getLibs(options?: ILibsOptions): Promise<ISPLists> {
    let filtered: boolean;
    let queryUrl: string = `${this._webAbsoluteUrl}/_api/web/lists?$select=Title,id,BaseTemplate`;
    if (options.contentTypeId) {
      queryUrl += `,ContentTypes/Id&$expand=ContentTypes`;
    }
    if (options.orderBy) {
      queryUrl += `&$orderby=${options.orderBy === LibsOrderBy.Id ? 'Id' : 'Title'}`;
    }

    if (options.filter) {
      queryUrl += `&$filter=${encodeURIComponent(options.filter)}`;
    } else {
      if (options.baseTemplate) {
        if (Array.isArray(options.baseTemplate)) {
          const numbers: number[] = options.baseTemplate;
          const mapNumbers = numbers.map((i) => {
            if (i === numbers[0]) {
              return `BaseTemplate eq ${i}`;
            } else {
              return `or BaseTemplate eq ${i}`;
            }
          });
          queryUrl += `&$filter=${mapNumbers.join(" ")}`;
          filtered = true;
        } else {
          queryUrl += `&$filter=BaseTemplate eq ${options.baseTemplate}`;
          filtered = true;
        }
      }

      if (options.includeHidden === false) {
        queryUrl += filtered ? ' and Hidden eq false' : '&$filter=Hidden eq false';
        filtered = true;
      }
    }

    const data = await this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const result: ISPLists = await data.json();
      if (options.contentTypeId) {
        const filteredLists = filter(result.value, (aList: ISPList) => {
          return find(aList.ContentTypes, (ct) => {
            return ct.Id.StringValue.toUpperCase().startsWith(options.contentTypeId.toUpperCase());
          });

        });
        result.value = filteredLists as ISPList[];
      }
      return result as ISPLists;
    } else {
      return null;
    }
  }

  public async getListId(
      listName: string,
  ): Promise<string> {

    const webAbsoluteUrl = this._webAbsoluteUrl
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists/getByTitle(@listName)/Id?@listName='${encodeURIComponent(listName)}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const results = await data.json();
      if (results) {
        return results.value;
      }
    }

    return;
  }

  /**
   * Get List Items
   */
  public async getListItems(
    filterText: string,
    listId: string,
    internalColumnName: string,
    field: ISPField | undefined,
    keyInternalColumnName?: string,
    webUrl?: string,
    filterString?: string,
    substringSearch: boolean = false,
    orderBy?: string,
    top?: number,
    cacheInterval: number = 1): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
    let apiUrl = '';
    let isPost = false;
    let processItems: ((items: any[]) => any[]) | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

    if (field && field.TypeAsString === 'Calculated' && SPHelper.isTextFieldType(field.ResultType)) { // for calculated fields we need to use CAML query
      let orderByStr = '';

      if (orderBy) {
        const orderByParts = orderBy.split(' ');
        let ascStr = '';
        if (orderByParts[1] && orderByParts[1].toLowerCase() === 'desc') {
          ascStr = `Ascending="FALSE"`;
        }
        orderByStr = `<OrderBy><FieldRef Name="${orderByParts[0]}" ${ascStr} />`;
      }

      let filterPart = ""
      if (filterText) {
        filterPart = `<Where>${substringSearch ? '<Contains>' : '<BeginsWith>'}<FieldRef Name="${internalColumnName}"/><Value Type="${field.ResultType}">${filterText}</Value>${substringSearch ? '</Contains>' : '</BeginsWith>'}</Where>`
      }

      const camlQuery = `<View><Query>${filterPart}${orderByStr}</Query></View>`;

      apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/GetItems(query=@v1)?$select=${keyInternalColumnName || 'Id'},${internalColumnName}&@v1=${JSON.stringify({ ViewXml: camlQuery })}`;
      isPost = true;
    }
    else if (SPHelper.isTextFieldType(field.TypeAsString)) {
      const filterStr = substringSearch ? // JJ - 20200613 - find by substring as an option
        `${filterText ? `substringof('${encodeURIComponent(filterText.replace("'", "''"))}',${internalColumnName})` : ''}${filterString ? (filterText ? ' and ' : '') + filterString : ''}`
        : `${filterText ? `startswith(${internalColumnName},'${encodeURIComponent(filterText.replace("'", "''"))}')` : ''}${filterString ? (filterText ? ' and ' : '') + filterString : ''}`; //string = filterList  ? `and ${filterList}` : '';
      apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/items?$select=${keyInternalColumnName || 'Id'},${internalColumnName}&$filter=${filterStr}&$orderby=${orderBy}${top ? `&$top=${top}` : ''}`;
    }
    else { // we need to get FieldValuesAsText and cache them
      const mapKey = `${webAbsoluteUrl}##${listId}##${internalColumnName}##${keyInternalColumnName || 'Id'}`;
      const cachedItems = this._cachedListItems.get(mapKey);

      if (cachedItems && cachedItems.expiration > Date.now()) {
        const filteredItems = this._filterListItemsFieldValuesAsText(cachedItems.items, internalColumnName, filterText, substringSearch);
        return filteredItems;
      }

      apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/items?$select=${keyInternalColumnName || 'Id'},${internalColumnName},FieldValuesAsText/${internalColumnName}&$expand=FieldValuesAsText&$orderby=${orderBy}${filterString ? '&$filter=' + filterString : ''}${top ? `&$top=${top}` : ''}`;
      isPost = false;

      //eslint-disable-next-line @typescript-eslint/no-explicit-any
      processItems = (items: any[]) => {

        this._cachedListItems.set(mapKey, {
          items,
          expiration: Date.now() + cacheInterval * 60 * 1000
        });

        return this._filterListItemsFieldValuesAsText(items, internalColumnName, filterText, substringSearch);
      };
    }

    try {
      const data = isPost ? await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {}) : await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.value && results.value.length > 0) {
          return processItems ? processItems(results.value) : results.value;
        }
      }

      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
* Gets list items for list item picker
* @param filterText
* @param listId
* @param internalColumnName
* @param [keyInternalColumnName]
* @param [webUrl]
* @param [filterList]
* @returns list items for list item picker
*/
  public async getListItemsForListItemPicker(
    filterText: string,
    listId: string,
    internalColumnName: string,
    keyInternalColumnName?: string,
    webUrl?: string,
    filterList?: string
  ): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    let _filter: string = `$filter=startswith(${internalColumnName},'${encodeURIComponent(
      filterText.replace("'", "''")
    )}') `;
    let costumfilter: string = filterList
      ? `and ${filterList}`
      : "";
    let _top = " &$top=2000";

    // test wild character "*"  if "*" load first 30 items
    if (
      (filterText.trim().indexOf("*") === 0 &&
        filterText.trim().length === 1) ||
      filterText.trim().length === 0
    ) {
      _filter = "";
      costumfilter = filterList ? `$filter=${filterList}&` : "";
      _top = `$top=500`;
    }

    try {
      const webAbsoluteUrl = !webUrl
        ? this._webAbsoluteUrl
        : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/items?$orderby=${internalColumnName}&$select=${keyInternalColumnName ||
        "Id"},${internalColumnName}&${_filter}${costumfilter}${_top}`;
      const data = await this._context.spHttpClient.get(
        apiUrl,
        SPHttpClient.configurations.v1
      );
      if (data.ok) {
        const results = await data.json();
        if (
          results &&
          results.value &&
          results.value.length > 0
        ) {
          return results.value;
        }
      }
      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }



  /**
   * Get list item attachments
   *
   * @param listId
   * @param itemId
   * @param webUrl
   */
  public async getListItemAttachments(listId: string, itemId: number, webUrl?: string): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.value) {
          return results.value;
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   * Delete attachment
   *
   * @param fileName
   * @param listId
   * @param itemId
   * @param webUrl
   */
  public async deleteAttachment(fileName: string, listId: string, itemId: number, webUrl?: string): Promise<void> {
    try {
      const spOpts: ISPHttpClientOptions = {
        headers: { "X-HTTP-Method": 'DELETE', }
      };
      const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/getByFileName(@fileName)/RecycleObject?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}&@fileName='${encodeURIComponent(fileName.replace(/'/g, "''"))}'`;
      await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts);
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   * Add attachment
   *
   * @param listId
   * @param itemId
   * @param fileName
   * @param file
   * @param webUrl
   */
  public async addAttachment(listId: string, itemId: number, fileName: string, file: File, webUrl?: string): Promise<void> {
    try {
      // Remove special characters in FileName
      //Updating the escape characters for filename as per the doucmentations
      //https://support.microsoft.com/en-us/kb/905231
      fileName = fileName.replace(/[~#%&*{}\\:<>?/+|]/gi, '');
      // Check if attachment exists
      const fileExists = await this.checkAttachmentExists(listId, itemId, fileName, webUrl);
      // Delete attachment if it exists
      if (fileExists) {
        await this.deleteAttachment(fileName, listId, itemId, webUrl);
      }
      // Add attachment
      const spOpts: ISPHttpClientOptions = {
        body: file
      };
      const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/add(FileName=@fileName)?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}&@fileName='${encodeURIComponent(fileName.replace(/'/g, "''"))}'`;
      await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts);
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get attachement for list item
   *
   * @param listId
   * @param itemId
   * @param fileName
   * @param webUrl
   */
  public async getAttachment(listId: string, itemId: number, fileName: string, webUrl?: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/GetByFileBame(@fileName))?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}&@fileName='${encodeURIComponent(fileName.replace(/'/g, "''"))}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const file = await data.json();
      if (file) {
        return file;
      }
    }

    return null;
  }

  /**
   * Check if the attachment exists
   *
   * @param listId
   * @param itemId
   * @param fileName
   * @param webUrl
   */
  public async checkAttachmentExists(listId: string, itemId: number, fileName: string, webUrl?: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const listServerRelativeUrl = await this.getListServerRelativeUrl(listId, webUrl);
      const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
      const fileServerRelativeUrl = `${listServerRelativeUrl}/Attachments/${itemId}/${fileName}`;
      const apiUrl = `${webAbsoluteUrl}/_api/web/getfilebyserverrelativeurl(@url)/Exists?@url='${encodeURIComponent(fileServerRelativeUrl.replace(/'/g, "''"))}'`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results.value;
        }
      }

      return false;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get the list name
   *
   * @param listId
   * @param webUrl
   */
  public async getListName(listId: string, webUrl?: string): Promise<string> {
    const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/RootFolder/Name?@listId=guid'${encodeURIComponent(listId)}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const results = await data.json();
      if (results) {
        return results.value;
      }
    }

    return;
  }

  /**
   * Get the list server relative url
   *
   * @param listId
   * @param webUrl
   */
  public async getListServerRelativeUrl(listId: string, webUrl?: string): Promise<string> {
    const webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/RootFolder/ServerRelativeUrl?@listId=guid'${encodeURIComponent(listId)}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const results = await data.json();
      if (results) {
        return results.value;
      }
    }

    return;
  }

  public async getLookupValue(listId: string, listItemID: number, fieldName: string, lookupFieldName: string | undefined, webUrl?: string): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(${listItemID})/?@listId=guid'${encodeURIComponent(listId)}'&$select=${fieldName}/ID,${fieldName}/${lookupFieldName || 'Title'}&$expand=${fieldName}`;

      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const result = await data.json();
        if (result && result[fieldName]) {
          return [{ key: result[fieldName].ID, name: result[fieldName][lookupFieldName || 'Title'] }];
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  public async getLookupValues(listId: string, listItemID: number, fieldName: string, lookupFieldName: string | undefined, webUrl?: string): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(${listItemID})?@listId=guid'${encodeURIComponent(listId)}'&$select=${fieldName}/ID,${fieldName}/${lookupFieldName || 'Title'}&$expand=${fieldName}`;

      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const result = await data.json();
        if (result && result[fieldName]) {
          const lookups = [];
           const isArray = Array.isArray(result[fieldName]);
           //multiselect lookups are arrays
           if (isArray) {
            result[fieldName].forEach(element => {                
              let value = element[lookupFieldName || 'Title'];
              const dateVal = Date.parse(value);
              if (!Number.isNaN(dateVal)) {
                  value = new Date(value).toLocaleDateString();
              }        
              lookups.push({ key: element.ID, name: value });
            });
           }
           //single select lookups are objects
           else {
             const singleItem = result[fieldName];
             let value = singleItem[lookupFieldName || 'Title'];
              const dateVal = Date.parse(value);
              if (!Number.isNaN(dateVal)) {
                  value = new Date(value).toLocaleDateString();
              }       
             lookups.push({ key: singleItem.ID, name: value });
           }
          return lookups;
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  public async getTaxonomyFieldInternalName(listId: string, fieldId: string, webUrl?: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/Fields/getById(guid'${fieldId}')/InternalName?@listId=guid'${encodeURIComponent(listId)}'`;

      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results;
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  public async getUsersUPNFromFieldValue(listId: string, listItemId: number, fieldName: string, webUrl?: string): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(${listItemId})?@listId=guid'${encodeURIComponent(listId)}'&$select=${fieldName}/Title,${fieldName}/Id,${fieldName}/Name&$expand=${fieldName}`;

      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const result = await data.json();
        if (result && result[fieldName]) {
          const emails = [];
          result[fieldName].forEach(element => {
            const loginNameWithoutClaimsToken = element.Name.split("|").pop();
            if(!loginNameWithoutClaimsToken.toLowerCase().includes('null')){
              if(!element.Title.toLowerCase().includes('null')){
                emails.push(loginNameWithoutClaimsToken + "/" + element.Title);
              }
            }
          });
          return emails;
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  public async getUserUPNFromFieldValue(listId: string, listItemId: number, fieldName: string, webUrl?: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(${listItemId})?@listId=guid'${encodeURIComponent(listId)}'&$select=${fieldName}/Title,${fieldName}/Id,${fieldName}/Name&$expand=${fieldName}`;

      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const result = await data.json();
        if (result && result[fieldName]) {
          const element = result[fieldName]
          const loginNameWithoutClaimsToken = element.Name.split("|").pop();
          if(!loginNameWithoutClaimsToken.toLowerCase().includes('null')){
            if(!element.Title.toLowerCase().includes('null')){
              return loginNameWithoutClaimsToken + "/" + element.Title;
            }
          }
        }
      }

      return [];
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  public async getSingleManagedMetadataLabel(listId: string, listItemId: number, fieldName: string, webUrl?: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/RenderListDataAsStream?@listId=guid'${encodeURIComponent(listId)}'`;
      const data = await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
        body: JSON.stringify({
          parameters: {
            RenderOptions: 2,
            ViewXml: `<View Scope="RecursiveAll">
                        <ViewFields>
                          <FieldRef Name="${fieldName}"/>
                        </ViewFields>
                        <Query>
                          <Where>
                            <Eq>
                              <FieldRef Name="ID"/>
                              <Value Type="Number">${listItemId}</Value>
                            </Eq>
                          </Where>
                        </Query>
                        <RowLimit Paged="TRUE">1</RowLimit>
                      </View>`
          }
        })
      });
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results.Row[0][fieldName];
        }
      }
      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  public async uploadImage(listId: string, itemId: number | undefined, fileName: string, file: ArrayBuffer, listTitle: string | undefined, webUrl?: string): Promise<IUploadImageResult> {
    const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;

    let listTitleValue = listTitle;
    if (!listTitle) {
      const listApiUrl = urlCombine(webAbsoluteUrl, `/_api/web/lists('${listId}')`, false);
      const listResponse = await this._context.spHttpClient.get(listApiUrl, SPHttpClient.configurations.v1);
      const listJson = await listResponse.json();
      listTitleValue = listJson.Title;
    }

    const apiUrl = urlCombine(webAbsoluteUrl, `/_api/web/UploadImage(listTitle=@a1,imageName=@a2,listId=@a3,itemId=@a4)?@a1='${listTitleValue}'&@a2='${fileName}'&@a3='${listId}'&@a4=${itemId || 0}`, false);

    const response = await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
      body: file,
      headers: {
        'content-length': file.byteLength.toString()
      }
    });

    const result = await response.json() as IUploadImageResult;

    return result;
  }

  public async getRegionalWebSettings(webUrl?: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
    const apiRequestPath = "/_api/web/regionalsettings";

    const apiUrl = urlCombine(webAbsoluteUrl, apiRequestPath, false);
    const response = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    const result = await response.json();
    return result;
  }

  /** 
   * Get form rendering information for a SharePoint list. 
   */
  async getListFormRenderInfo(listId: string, webUrl?: string): Promise<IRenderListDataAsStreamClientFormResult> {
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiRequestPath = `/_api/web/lists(guid'${listId}')/RenderListDataAsStream`;

      const apiUrl = urlCombine(webAbsoluteUrl, apiRequestPath, false);
      const response = await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
        body: JSON.stringify({
          "parameters": {
            "RenderOptions": 64,
            "ViewXml":"<View><ViewFields><FieldRef Name=\"ID\"/></ViewFields></View>",
            "AddRequiredFields":true
          }
        })
      });

      if (response.ok) {
        const result = await response.json() as IRenderListDataAsStreamClientFormResult;
        return result;
      }
      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   * Get additional form rendering and validation information for a SharePoint list.
   * Captures information not returned by RenderListDataAsStream with RenderOptions = 64
   */
  async getAdditionalListFormFieldInfo(listId: string, webUrl?: string): Promise<ISPField[]> {
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiRequestPath = `/_api/web/lists(guid'${listId}')/Fields?$filter=TypeAsString eq 'Number' or TypeAsString eq 'Currency' or ValidationFormula ne null`;

      const apiUrl = urlCombine(webAbsoluteUrl, apiRequestPath, false);
      const response = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      const result = await response.json();
      return result.value;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  private _filterListItemsFieldValuesAsText(items: any[], internalColumnName: string, filterText: string | undefined, substringSearch: boolean): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    const lowercasedFilterText = filterText.toLowerCase();

    return items.filter(i => {
      let fieldValue = i.FieldValuesAsText[internalColumnName];
      if (!fieldValue) {
        return false;
      }
      fieldValue = fieldValue.toLowerCase();

      if (!filterText) {
        return true;
      }

      return substringSearch ? fieldValue.indexOf(lowercasedFilterText) > -1 : fieldValue.startsWith(lowercasedFilterText);
    });
  }

  /**
   * Gets the collection of view for a selected list
   */
  public async getViews(listId?: string, orderby?: orderBy, filter?: string): Promise<ISPViews> {
    if (listId === undefined || listId === "") {
      return this.getEmptyViews();
    }

    // If the running environment is SharePoint, request the lists REST service
    let queryUrl: string = `${this._webAbsoluteUrl}/_api/lists(guid'${listId}')/Views?$select=Title,Id`;

    // Check if the orderBy property is provided
    if (orderby !== null) {
      queryUrl += '&$orderby=';
      switch (orderby) {
        case orderBy.Id:
          queryUrl += 'Id';
          break;
        case orderBy.Title:
          queryUrl += 'Title';
          break;
      }

      // Adds an OData Filter to the list
      if (filter) {
        queryUrl += `&$filter=${encodeURIComponent(filter)}`;
      }

      const response = await this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);
      const views = (await response.json()) as ISPViews;

      return views;
    }
  }

  /**
   * Returns an empty view for when a list isn't selected
   */
  private getEmptyViews(): Promise<ISPViews> {
    return new Promise<ISPViews>((resolve) => {
      const listData: ISPViews = {
        value: [
        ]
      };

      resolve(listData);
    });
  }
}
