


/**
 * Represents SP  ContentType Id
 */
 export interface ISPContentTypeId {
    StringValue: string;
}
/**
 * Represents SP List ContentType
 */
export interface ISPListContentType {
    Id: ISPContentTypeId;
}
/**
 * Represents SP List
 */
export interface ISPList {
    Id: string;
    Title: string;
    BaseTemplate: string;
    ContentTypes? :ISPListContentType[];
}

/**
 * Replica of the returned value from the REST api
 */
export interface ISPLists {
    value: ISPList[];
}

/**
 * Represents SP Field
 */
export interface ISPField {
    Id: string;
    Format?: string;
    RichText?: boolean;
    SchemaXml?: string;
    LookupDisplayUrl?: string;
    TypeAsString?: string;
    ResultType?: string;
}

/**
 * Represents value of Lookup Field (single lookup)
 */
export interface ISPFieldLookupValue {
    lookupId: string;
    lookupValue: string;
}

/**
 * Represents Term from Taxonomy Field value
 */
export interface ITerm {
    Label: string;
    TermID: string;
}

/**
 * Represents a principal value as it is stored in People and Groups field
 */
export interface IPrincipal {
    id: string;
    email: string;
    department: string;
    jobTitle: string;
    sip: string;
    title: string;
    value: string;
    picture: string;
}

/**
 * Custom interface to store user profile properties
 */
export interface IUserProfileProperties {
    displayName?: string;
    jobTitle?: string;
    email?: string;
    workPhone?: string;
    cellPhone?: string;
    department?: string;
    pictureUrl?: string;
    sip?: string;
    userUrl?: string;
}

/**
 * KeyValuePair returned by SP REST API
 */
export interface IODataKeyValuePair {
    Key: string;
    Value: string;
    ValueType: string;
}

/**
 * Replica of Microsoft's Calendar definition for CultureInfo object
 */
export interface ICultureCalendar {
    AlgorithmType: number;
    CalendarType: number;
    Eras: number[];
    IsReadOnly: boolean;
    MaxSupportedDateTime: string;
    MinSupportedDateTime: string;
    TwoDigitYearMax: number;
}

/**
 * Replica of Microsoft's DateTimeFormat definition for CultureInfo object
 */
export interface ICultureDateTimeFormat {
    AMDesignator: string;
    AbbreviatedDayNames: string[];
    AbbreviatedMonthGenitiveNames: string[];
    AbbreviatedMonthNames: string[];
    Calendar: ICultureCalendar;
    CalendarWeekRule: number;
    DateSeparator: string;
    DayNames: string[];
    FirstDayOfWeek: number;
    FullDateTimePattern: string;
    IsReadOnly: boolean;
    LongDatePattern: string;
    LongTimePattern: string;
    MonthDayPattern: string;
    MonthGenitiveNames: string[];
    MonthNames: string[];
    NativeCalendarName: string;
    PMDesignator: string;
    RFC1123Pattern: string;
    ShortDatePattern: string;
    ShortTimePattern: string;
    ShortestDayNames: string[];
    SortableDateTimePattern: string;
    TimeSeparator: string;
    UniversalSortableDateTimePattern: string;
    YearMonthPattern: string;
    eras: any[];
}

/**
 * Replica of Microsoft's NumberFormat definition for CultureInfo object
 */
export interface ICultureNumberFormat {
    CurrencyDecimalDigits: number;
    CurrencyDecimalSeparator: string;
    CurrencyGroupSeparator: string;
    CurrencyGroupSizes: number[];
    CurrencyNegativePattern: number;
    CurrencyPositivePattern: number;
    CurrencySymbol: string;
    DigitSubstitution: number;
    IsReadOnly: boolean;
    NaNSymbol: string;
    NativeDigits: string[];
    NegativeInfinitySymbol: string;
    NegativeSign: string;
    NumberDecimalDigits: number;
    NumberDecimalSeparator: string;
    NumberGroupSeparator: string;
    NumberGroupSizes: number[];
    NumberNegativePattern: number;
    PerMilleSymbol: string;
    PercentDecimalDigits: number;
    PercentDecimalSeparator: string;
    PercentGroupSeparator: string;
    PercentGroupSizes: number[];
    PercentNegativePattern: number;
    PercentPositivePattern: number;
    PercentSymbol: string;
    PositiveInfinitySymbol: string;
    PositiveSign: string;
}

/**
 * Replica of Microsoft's CultureInfo definition
 */
export interface ICultureInfo {
    name: string;
    dateTimeFormat: ICultureDateTimeFormat;
    numberFormat: ICultureNumberFormat;
}

export interface IUploadImageResult {
  Name: string;
  ServerRelativeUrl: string;
  UniqueId: string;
}
