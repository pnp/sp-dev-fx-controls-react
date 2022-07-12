import { ISPContentType, ISPField, ISPLists } from "../common/SPEntities";

export enum LibsOrderBy {
    Id = 1,
    Title
}

export enum FieldsOrderBy {
  Title = 'Title',
  InternalName = 'InternalName',
}

export enum ContentTypesOrderBy {
  Name = 'Name',
  Id = 'StringId',
}

/**
 * Options used to sort and filter
 */
export interface ILibsOptions {
    orderBy?: LibsOrderBy;
    baseTemplate?: number | number[];
    includeHidden?: boolean;
    filter?: string;
    contentTypeId?: string;
}

export interface IFieldsOptions {
  listId?: string;
  orderBy?: FieldsOrderBy;
  includeHidden?: boolean;
  includeReadOnly?: boolean;
  filter?: string;
  group?: string;
}

export interface IContentTypesOptions {
  listId?: string;
  orderBy?: ContentTypesOrderBy;
  includeHidden?: boolean;
  includeReadOnly?: boolean;
  filter?: string;
  group?: string;
}

export interface ISPService {
    /**
     * Get the lists from SharePoint
     * @param options Options used to order and filter during the API query
     */
    getLibs(options?: ILibsOptions): Promise<ISPLists>;
    getListItems?(filterText: string, listId: string, internalColumnName: string, field: ISPField, keyInternalColumnName?: string, webUrl?: string): Promise<any[]>;
    getField: (listId: string, internalColumnName: string, webUrl?: string) => Promise<ISPField | undefined>;
    /**
     * Get the fields from SharePoint web or list.
     * @param options Options used to order and filter during the API query.
     */
    getFields(options?: IFieldsOptions): Promise<ISPField[]>;

    /**
     * Get the content types from SharePoint web or list.
     * @param options Options used to order and filter during the API query.
     */
    getContentTypes(options?: IContentTypesOptions): Promise<ISPContentType[]>;
}
