import { ICultureInfo } from './SPEntities';

/**
 * Key that is used to store loaded fields in sessionStorage
 */
export const LoadedViewFieldsKey: string = 'LBLoadedViewFields';


/**
 * Mapping between current field name and the name of the real field that contains the data
 */
export const FieldNamesMapping = {
    'Title': {
        'storedName': 'Title'
    },
    'LinkTitle': {
        'storedName': 'Title'
    },
    'LinkTitleNoMenu': {
        'storedName': 'Title'
    },
    'LinkFilename': {
        'storedName': 'FileLeafRef'
    },
    'LinkFileNameNoMenu': {
        'storedName': 'FileLeafRef'
    },
    'FileLeafRef': {
        'storedName': 'FileLeafRef'
    },
    'URL': {
        'storedName': 'URL'
    },
    'URLwMenu': {
        'storedName': 'URL'
    }
};

/**
 * Invariant Culture
 */
export const InvariantCulture: ICultureInfo = {
    name: '',
    numberFormat: {
        CurrencyDecimalDigits: 2,
        CurrencyDecimalSeparator: '.',
        IsReadOnly: true,
        CurrencyGroupSizes: [3],
        NumberGroupSizes: [3],
        PercentGroupSizes: [3],
        CurrencyGroupSeparator: ',',
        CurrencySymbol: '¤',
        NaNSymbol: 'NaN',
        CurrencyNegativePattern: 0,
        NumberNegativePattern: 1,
        PercentPositivePattern: 0,
        PercentNegativePattern: 0,
        NegativeInfinitySymbol: '-Infinity',
        NegativeSign: '-',
        NumberDecimalDigits: 2,
        NumberDecimalSeparator: '.',
        NumberGroupSeparator: ',',
        CurrencyPositivePattern: 0,
        PositiveInfinitySymbol: 'Infinity',
        PositiveSign: '+',
        PercentDecimalDigits: 2,
        PercentDecimalSeparator: '.',
        PercentGroupSeparator: ',',
        PercentSymbol: '%',
        PerMilleSymbol: '‰',
        NativeDigits: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        DigitSubstitution: 1
    },
    dateTimeFormat: {
        AMDesignator: 'AM',
        Calendar: {
            MinSupportedDateTime: '@-62135568000000@',
            MaxSupportedDateTime: '@253402300799999@',
            AlgorithmType: 1,
            CalendarType: 1,
            Eras: [1],
            TwoDigitYearMax: 2029,
            IsReadOnly: true
        },
        DateSeparator: '/',
        FirstDayOfWeek: 0,
        CalendarWeekRule: 0,
        FullDateTimePattern: 'dddd, dd MMMM yyyy HH:mm:ss',
        LongDatePattern: 'dddd, dd MMMM yyyy',
        LongTimePattern: 'HH:mm:ss',
        MonthDayPattern: 'MMMM dd',
        PMDesignator: 'PM',
        RFC1123Pattern: 'ddd, dd MMM yyyy HH\':\'mm\':\'ss \'GMT\'',
        ShortDatePattern: 'MM/dd/yyyy',
        ShortTimePattern: 'HH:mm',
        SortableDateTimePattern: 'yyyy\'-\'MM\'-\'dd\'T\'HH\':\'mm\':\'ss',
        TimeSeparator: ':',
        UniversalSortableDateTimePattern: 'yyyy\'-\'MM\'-\'dd HH\':\'mm\':\'ss\'Z\'',
        YearMonthPattern: 'yyyy MMMM',
        AbbreviatedDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], 
        ShortestDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        DayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        AbbreviatedMonthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
        MonthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        IsReadOnly: true,
        NativeCalendarName: 'Gregorian Calendar',
        AbbreviatedMonthGenitiveNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', ''],
        MonthGenitiveNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December', ''],
        eras: [1, 'A.D.', null, 0]
    }
};