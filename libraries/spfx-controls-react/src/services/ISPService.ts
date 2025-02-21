import { ISPContentType, ISPField, ISPLists, ISPViews } from "../common/SPEntities";
import {orderBy } from '../controls/viewPicker/IViewPicker';

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

/**
 * Interfaces and Types for RenderListDataAsStream
 * when RenderOptions = 64
 * Not currently provided by @pnp/sp
 */

// These interfaces and types are not represented in the @pnp/sp package

export enum IMEMode {
  Auto = 0,
  Inactive = 1,
  Active  = 2, 
  Disabled = 3
}
export type ClientFormFieldInfoFieldType = "Attachments" | "Text" | "Number" | "Boolean" | "Choice" | "MultiChoice" | "User" | "UserMulti" | "Note" | "DateTime" | "URL" | "Lookup" | "LookupMulti" | "Hyperlink" | "Thumbnail" | "Currency" | "Location" | "TaxonomyFieldType" | "TaxonomyFieldTypeMulti" | "File";
export type ClientFormFieldInfoType = "Attachments" | "Text" | "Number" | "Boolean" | "Choice" | "User" | "Note" | "DateTime" | "URL" | "Lookup" | "URL" | "Thumbnail" | "Currency" | "Location" | "File";
export interface IClientFormBaseInfo {
  Id: string;
  Title: string;
  InternalName: string;
  Hidden: boolean;
  IMEMode: IMEMode;
  Name: string;
  Required: boolean;
  Direction: string;
  FieldType: ClientFormFieldInfoFieldType;
  Description: string;
  ReadOnlyField: boolean;
  IsAutoHyperLink: boolean;
  Type: ClientFormFieldInfoType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DefaultValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DefaultValueTyped: any;
  ClientValidationFormula: string;
  ClientValidationMessage: string;
  CustomFormatter: string;
}
export interface IClientFormImageFieldInfo extends IClientFormBaseInfo {
  FieldType: "Thumbnail";
  Type: "Thumbnail";
}
export interface IClientFormHyperlinkFieldInfo extends IClientFormBaseInfo {
  FieldType: "Hyperlink";
  Type: "URL";
}
export interface IClientFormLocationFieldInfo extends IClientFormBaseInfo {
  FieldType: "Location";
  Type: "Location";
}
export interface IClientFormBooleanFieldInfo extends IClientFormBaseInfo {
  FieldType: "Boolean";
  Type: "Boolean";
}
export interface IClientFormFileFieldInfo extends IClientFormBaseInfo {
  FieldType: "File";
  Type: "File";
}
export interface IClientFormTextFieldInfo extends IClientFormBaseInfo {
  FieldType: "Text" | "Note";
  Type: "Text" | "Note";
  MaxLength: number;
  RichText: boolean;
  AppendOnly: boolean;
  RichTextMode: number;
  NumberOfLines: number;
  AllowHyperlink: false;
  RestrictedMode: boolean;
}
export interface IClientFormNumericFieldBaseInfo extends IClientFormBaseInfo {
  FieldType: "Number" | "Currency";
  Type: "Number" | "Currency";
  ShowAsPercentage: boolean;
  CommaSeparator: boolean;
  Unit: string;
}
export interface IClientFormNumberFieldInfo extends IClientFormNumericFieldBaseInfo {
  FieldType: "Number";
  Type: "Number";
}
export interface IClientFormCurrencyFieldInfo extends IClientFormNumericFieldBaseInfo {
  FieldType: "Currency";
  Type: "Currency";
}
export interface IClientFormChoiceFieldInfo extends IClientFormBaseInfo {
  FieldType: "Choice" | "MultiChoice";
  Type: "Choice";
  FillInChoice: boolean;
  MultiChoices: string[];
  Choices: string[];
  FormatType: number;
}
export interface IClientFormDateFieldInfo extends IClientFormBaseInfo {
  FieldType: "DateTime";
  Type: "DateTime";
  DisplayFormat: number;
  TimeZoneDifference: string;
  CalendarType: 1,
  ShowWeekNumber: boolean;
  TimeSeparator: string;
  FirstDayOfWeek: number;
  FirstWeekOfYear: number;
  HijriAdjustment: number;
  WorkWeek: string;
  LocaleId: string;
  LanguageId: string;
  MinJDay: number;
  MaxJDay: number;
  HoursMode24: boolean;
  HoursOptions: string[];
  DefaultValueFormatted: string;
  DateFormat: "DateTime" | "DateOnly";
  TimeFormat: string;
}
export interface IClientFormBaseLookupFieldInfo extends IClientFormBaseInfo {
  FieldType: "User" | "UserMulti" | "Lookup" | "LookupMulti" | "TaxonomyFieldType" | "TaxonomyFieldTypeMulti";
  Type: "User" | "Lookup";
  DependentLookup: boolean;
  AllowMultipleValues: boolean;
}
export interface IClientFormTaxonomyFieldInfo extends IClientFormBaseLookupFieldInfo {
  FieldType: "TaxonomyFieldType" | "TaxonomyFieldTypeMulti";
  Type: "Lookup";
  Throttled: boolean;
  LookupListId: string;
  ChoiceCount: number;
  Choices: string[];
  SspId: string;
  TermSetId: string;
  AnchorId: string;
  AllowFillIn: boolean;
  WidthCss: string;
  LcId: number;
  IsSpanTermSets: boolean;
  IsSpanTermStores: boolean;
  IsAddTerms: boolean;
  IsDocTagsEnabled: boolean;
  IsEnhancedImageTagsEnabled: boolean;
  IsUseCommaAsDelimiter: boolean;
  Disable: boolean;
  WebServiceUrl: string;
  HiddenListInternalName: string;
}
export interface IClientFormUserFieldInfo extends IClientFormBaseLookupFieldInfo {
  FieldType: "User" | "UserMulti";
  Type: "User";
  Presence: boolean;
  WithPicture: boolean;
  DefaultRender: boolean;
  WithPictureDetail: boolean;
  ListFormUrl: string;
  UserDisplayUrl: string;
  EntitySeparator: string;
  PictureOnly: boolean;
  PictureSize: string;
  UserInfoListId: string;
  SharePointGroupID: number;
  PrincipalAccountType: string;
  SearchPrincipalSource: number;
  ResolvePrincipalSource: number;
  UserNoQueryPermission: boolean;
  UserDisplayOptions: string;
}
export interface IClientFormLookupFieldInfo extends IClientFormBaseLookupFieldInfo {
  FieldType: "Lookup" | "LookupMulti";
  Type: "Lookup";
  BaseDisplayFormUrl: string;
  Throttled: boolean;
  LookupListId: string;
  LookupListUrl: string;
  LookupFieldName: string;
}
export type ClientFormFieldInfo = IClientFormTextFieldInfo | IClientFormNumberFieldInfo | IClientFormChoiceFieldInfo | IClientFormDateFieldInfo | IClientFormLookupFieldInfo | IClientFormUserFieldInfo | IClientFormTaxonomyFieldInfo | IClientFormImageFieldInfo | IClientFormHyperlinkFieldInfo | IClientFormLocationFieldInfo | IClientFormCurrencyFieldInfo | IClientFormBooleanFieldInfo | IClientFormFileFieldInfo;
export interface IClientFormInfoByContentType {
  [contentType: string]: ClientFormFieldInfo[];
}
export interface IClientFormInfoByDisplayMode {
  [displayMode: string]: IClientFormInfoByContentType;
}
export interface IClientFormRenderModes {
  [formName: string]: {
      RenderType: number;
  }
}
export interface IClientFormRenderModeByContentType {
  [contentType: string]: IClientFormRenderModes;
}
export interface IRenderListDataAsStreamClientFormResult {
  ClientForms: IClientFormInfoByDisplayMode;
  ContentTypeIdToNameMap: Record<string, string>;
  ClientFormCustomFormatter: Record<string, string>;
  EnableAttachments: "true" | "false";
  FormRenderModes: IClientFormRenderModeByContentType;
}

export interface ISPService {
    /**
     * Get the lists from SharePoint
     * @param options Options used to order and filter during the API query
     */
    getLibs(options?: ILibsOptions): Promise<ISPLists>;
    getListItems?(filterText: string, listId: string, internalColumnName: string, field: ISPField, keyInternalColumnName?: string, webUrl?: string): Promise<any[]>; // eslint-disable-line @typescript-eslint/no-explicit-any
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

    /**
     * Get form rendering information for a SharePoint list.
     */
    getListFormRenderInfo(listId: string): Promise<IRenderListDataAsStreamClientFormResult>;

    /**
     * Get additional form rendering and validation information for a SharePoint list.
     * Captures information not returned by RenderListDataAsStream with RenderOptions = 64
     */
    getAdditionalListFormFieldInfo(listId: string, webUrl?: string): Promise<ISPField[]>;

    /**
     *  Get the views from lists or libraries
     * @params listId, orderBy, onViewsRetrived
     */
    getViews(listId?: string, orderBy?: orderBy, filter?: string): Promise<ISPViews>;
}
