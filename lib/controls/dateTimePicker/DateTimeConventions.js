export var TimeConvention;
(function (TimeConvention) {
    /**
     * The 12-hour clock is a time convention in which the 24 hours of the day are
     * divided into two periods: a.m. and p.m.
     */
    TimeConvention[TimeConvention["Hours12"] = 1] = "Hours12";
    /**
     * The 24-hour clock is the convention of time keeping in which the day runs from midnight to
     * midnight and is divided into 24 hours, indicated by the hours passed since midnight, from 0 to 23
     */
    TimeConvention[TimeConvention["Hours24"] = 2] = "Hours24";
})(TimeConvention || (TimeConvention = {}));
/**
  * Time convention
  */
export var DateConvention;
(function (DateConvention) {
    DateConvention[DateConvention["DateTime"] = 1] = "DateTime";
    DateConvention[DateConvention["Date"] = 2] = "Date";
})(DateConvention || (DateConvention = {}));
//# sourceMappingURL=DateTimeConventions.js.map