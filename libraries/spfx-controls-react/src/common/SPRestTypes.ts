/* eslint-disable @rushstack/no-new-null -- Preserve SharePoint's nullable response contracts. */
export interface IFileInfo {
  readonly "odata.id": string;
  CheckInComment: string;
  CheckOutType: number;
  ContentTag: string;
  CustomizedPageStatus: number;
  ETag: string;
  Exists: boolean;
  IrmEnabled: boolean;
  Length: string;
  Level: number;
  LinkingUri: string | null;
  LinkingUrl: string;
  ListId: string;
  MajorVersion: number;
  MinorVersion: number;
  Name: string;
  ServerRelativeUrl: string;
  SiteId: string;
  TimeCreated: string;
  TimeLastModified: string;
  Title: string | null;
  UIVersion: number;
  UIVersionLabel: string;
  UniqueId: string;
  WebId: string;
}

export interface ISiteUserInfo {
  Id: number;
  LoginName: string;
  Title: string;
  Email: string;
  IsHiddenInUI: boolean;
  PrincipalType: number;
  IsSiteAdmin: boolean;
  Expiration: string;
  IsEmailAuthenticationGuestUser: boolean;
  IsShareByEmailGuestUser: boolean;
  UserId: { NameId: string; NameIdIssuer: string };
  UserPrincipalName: string | null;
}

export interface IFieldInfo {
  DefaultFormula: string | null;
  DefaultValue: string | null;
  Description: string;
  Direction: string;
  EnforceUniqueValues: boolean;
  EntityPropertyName: string;
  FieldTypeKind: FieldTypes;
  Filterable: boolean;
  FromBaseType: boolean;
  Group: string;
  Hidden: boolean;
  Id: string;
  Indexed: boolean;
  IndexStatus: number;
  JSLink: string;
  PinnedToFiltersPane: boolean;
  ReadOnlyField: boolean;
  Required: boolean;
  Title: string;
  InternalName: string;
  TypeAsString: string;
  SchemaXml: string;
  Scope: string;
  Sealed: boolean;
  ShowInFiltersPane: number;
  Sortable: boolean;
  StaticName: string;
  TypeDisplayName: string;
  TypeShortDescription: string;
  ValidationFormula: string | null;
  ValidationMessage: string | null;
}

export enum FieldTypes {
  Invalid = 0, Integer = 1, Text = 2, Note = 3, DateTime = 4, Counter = 5,
  Choice = 6, Lookup = 7, Boolean = 8, Number = 9, Currency = 10, URL = 11,
  Computed = 12, Threading = 13, Guid = 14, MultiChoice = 15, GridChoice = 16,
  Calculated = 17, File = 18, Attachments = 19, User = 20, Recurrence = 21,
  CrossProjectLink = 22, ModStat = 23, Error = 24, ContentTypeId = 25,
  PageSeparator = 26, ThreadIndex = 27, WorkflowStatus = 28, AllDayEvent = 29,
  WorkflowEventType = 30
}

export interface INavNodeInfo {
  AudienceIds: string[] | null;
  Id: number;
  IsDocLib: boolean;
  IsExternal: boolean;
  IsVisible: boolean;
  ListTemplateType: number;
  Title: string;
  Url: string;
}

export interface IInstalledLanguageInfo {
  DisplayName: string;
  LanguageTag: string;
  Lcid: number;
}

export enum ChoiceFieldFormatType {
  Dropdown = 0,
  RadioButtons = 1
}
