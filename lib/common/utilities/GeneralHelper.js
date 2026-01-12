import '../extensions/String.extensions';
import * as strings from 'ControlStrings';
export var IMG_SUPPORTED_EXTENSIONS = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg";
/**
 * Helper with general methods to simplify some routines
 */
var GeneralHelper = /** @class */ (function () {
    function GeneralHelper() {
    }
    /**
     * Trims slash at the end of URL if needed
     * @param url URL
     */
    GeneralHelper.trimSlash = function (url) {
        if (url.lastIndexOf('/') === url.length - 1)
            return url.slice(0, -1);
        return url;
    };
    /**
     * Encodes text
     * @param text text to encode
     */
    GeneralHelper.encodeText = function (text) {
        var n = /[<>&'"\\]/g;
        return text ? text.replace(n, this._getEncodedChar) : '';
    };
    /**
     * Copy of Microsoft's GetRelativeDateTimeString from SP.dateTimeUtil
     */
    GeneralHelper.getRelativeDateTimeString = function (format) {
        var formatParts = format.split('|');
        var result = null;
        var placeholdersString = null;
        if (formatParts[0] === '0')
            return format.substring(2);
        var isFuture = formatParts[1] === '1';
        var formatType = formatParts[2];
        var timeString = formatParts.length >= 4 ? formatParts[3] : null;
        var dayString = formatParts.length >= 5 ? formatParts[4] : null;
        switch (formatType) {
            case '1':
                result = isFuture ? strings.DateTime.L_RelativeDateTime_AFewSecondsFuture : strings.DateTime.L_RelativeDateTime_AFewSeconds;
                break;
            case '2':
                result = isFuture ? strings.DateTime.L_RelativeDateTime_AboutAMinuteFuture : strings.DateTime.L_RelativeDateTime_AboutAMinute;
                break;
            case '3':
                placeholdersString = this.getLocalizedCountValue(isFuture ? strings.DateTime.L_RelativeDateTime_XMinutesFuture : strings.DateTime.L_RelativeDateTime_XMinutes, isFuture ? strings.DateTime.L_RelativeDateTime_XMinutesFutureIntervals : strings.DateTime.L_RelativeDateTime_XMinutesIntervals, Number(timeString));
                break;
            case '4':
                result = isFuture ? strings.DateTime.L_RelativeDateTime_AboutAnHourFuture : strings.DateTime.L_RelativeDateTime_AboutAnHour;
                break;
            case '5':
                if (timeString === null) {
                    result = isFuture ? strings.DateTime.L_RelativeDateTime_Tomorrow : strings.DateTime.L_RelativeDateTime_Yesterday;
                }
                else {
                    placeholdersString = isFuture ? strings.DateTime.L_RelativeDateTime_TomorrowAndTime : strings.DateTime.L_RelativeDateTime_YesterdayAndTime;
                }
                break;
            case '6':
                placeholdersString = this.getLocalizedCountValue(isFuture ? strings.DateTime.L_RelativeDateTime_XHoursFuture : strings.DateTime.L_RelativeDateTime_XHours, isFuture ? strings.DateTime.L_RelativeDateTime_XHoursFutureIntervals : strings.DateTime.L_RelativeDateTime_XHoursIntervals, Number(timeString));
                break;
            case '7':
                if (dayString === null) {
                    result = timeString;
                }
                else {
                    placeholdersString = strings.DateTime.L_RelativeDateTime_DayAndTime;
                }
                break;
            case '8':
                placeholdersString = this.getLocalizedCountValue(isFuture ? strings.DateTime.L_RelativeDateTime_XDaysFuture : strings.DateTime.L_RelativeDateTime_XDays, isFuture ? strings.DateTime.L_RelativeDateTime_XDaysFutureIntervals : strings.DateTime.L_RelativeDateTime_XDaysIntervals, Number(timeString));
                break;
            case '9':
                result = strings.DateTime.L_RelativeDateTime_Today;
        }
        if (placeholdersString !== null) {
            result = placeholdersString.replace("{0}", timeString);
            if (dayString !== null) {
                result = result.replace("{1}", dayString);
            }
        }
        return result;
    };
    /**
     * Copy of Microsoft's GetLocalizedCountValue from SP.dateTimeUtil.
     * I've tried to rename all the vars to have meaningful names... but some were too unclear
     */
    GeneralHelper.getLocalizedCountValue = function (format, first, second) {
        if (format === undefined || first === undefined || second === undefined)
            return null;
        var result = '';
        var a = -1;
        var firstOperandOptions = first.split('||');
        for (var firstOperandOptionsIdx = 0, firstOperandOptionsLen = firstOperandOptions.length; firstOperandOptionsIdx < firstOperandOptionsLen; firstOperandOptionsIdx++) {
            var firstOperandOption = firstOperandOptions[firstOperandOptionsIdx];
            if (firstOperandOption === null || firstOperandOption === '')
                continue;
            var optionParts = firstOperandOption.split(',');
            for (var optionPartsIdx = 0, optionPartsLen = optionParts.length; optionPartsIdx < optionPartsLen; optionPartsIdx++) {
                var optionPart = optionParts[optionPartsIdx];
                if (optionPart === null || optionPart === '')
                    continue;
                if (isNaN(optionPart.parseNumberInvariant())) {
                    var dashParts = optionPart.split('-');
                    if (dashParts === null || dashParts.length !== 2)
                        continue;
                    var j = void 0, n = void 0;
                    if (dashParts[0] === '')
                        j = 0;
                    else if (isNaN(dashParts[0].parseNumberInvariant()))
                        continue;
                    else
                        j = parseInt(dashParts[0]);
                    if (second >= j) {
                        if (dashParts[1] === '') {
                            a = firstOperandOptionsIdx;
                            break;
                        }
                        else if (isNaN(dashParts[1].parseNumberInvariant()))
                            continue;
                        else
                            n = parseInt(dashParts[1]);
                        if (second <= n) {
                            a = firstOperandOptionsIdx;
                            break;
                        }
                    }
                }
                else {
                    var p = parseInt(optionPart);
                    if (second === p) {
                        a = firstOperandOptionsIdx;
                        break;
                    }
                }
            }
            if (a !== -1)
                break;
        }
        if (a !== -1) {
            var e = format.split('||');
            if (e !== null && e[a] !== null && e[a] !== '')
                result = e[a];
        }
        return result;
    };
    /**
     * Extracts text from HTML strings without creating HTML elements
     * @param html HTML string
     */
    GeneralHelper.getTextFromHTML = function (html) {
        var result = html;
        var oldResult = result;
        var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
        var tagOrComment = new RegExp('<(?:'
            // Comment body.
            + '!--(?:(?:-*[^->])*--+|-?)'
            // Special "raw text" elements whose content should be elided.
            + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
            + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
            // Regular name
            + '|/?[a-z]'
            + tagBody
            + ')>', 'gi');
        do {
            oldResult = result;
            result = result.replace(tagOrComment, '');
        } while (result !== oldResult);
        return result;
    };
    /**
     * Checks if value is defined (not null and not undefined)
     * @param value value
     */
    GeneralHelper.isDefined = function (value) {
        return value !== null;
    };
    /**
     * Creates Document element based on Xml string
     * @param xmlString XML string to parse
     */
    GeneralHelper.parseXml = function (xmlString) {
        var parser = new DOMParser();
        var xml = parser.parseFromString(xmlString, 'text/xml');
        return xml;
    };
    /**
     * Returns absoulute domain URL.
     * @param url
     */
    GeneralHelper.getAbsoluteDomainUrl = function (url) {
        if (url !== undefined) {
            var myURL = new URL(url.toLowerCase());
            return myURL.protocol + "//" + myURL.host;
        }
        else {
            return undefined;
        }
    };
    GeneralHelper.getDomain = function (url, includeProtocol) {
        if (url !== undefined) {
            var myURL = new URL(url.toLowerCase());
            if (includeProtocol) {
                return "".concat(myURL.protocol, "//").concat(myURL.hostname);
            }
            return myURL.hostname;
        }
        return '';
    };
    /**
     * To support IE11 that has no support for File constructor
     * @param blob
     */
    GeneralHelper.getFileFromBlob = function (blob, fileName) {
        var result = null; // eslint-disable-line @typescript-eslint/no-explicit-any
        // IE 11 foesn't support File API, create a workaround to return Blob with fileName assigned.
        try {
            result = new File([blob], fileName);
        }
        catch (_a) {
            result = blob;
            result.fileName = fileName;
        }
        return result;
    };
    GeneralHelper.formatBytes = function (bytes, decimals) {
        if (bytes === 0) {
            return strings.EmptyFileSize;
        }
        var k = 1024;
        var dm = decimals <= 0 ? 0 : decimals || 2;
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + strings.SizeUnit[i];
    };
    /**
     * Returns file name without extension.
     */
    GeneralHelper.getFileNameWithoutExtension = function (itemUrl) {
        var fileNameWithExtension = GeneralHelper.getFileNameFromUrl(itemUrl);
        var fileName = fileNameWithExtension.substr(0, fileNameWithExtension.lastIndexOf('.'));
        return fileName;
    };
    /**
     * Returns file name with the extension
     */
    GeneralHelper.getFileNameFromUrl = function (itemUrl) {
        var urlTokens = itemUrl.split("?");
        var url = urlTokens[0];
        var tokens = url.split("/");
        var fileNameWithExtension = tokens[tokens.length - 1];
        return fileNameWithExtension;
    };
    GeneralHelper.isImage = function (fileName) {
        var acceptableExtensions = IMG_SUPPORTED_EXTENSIONS.split(",");
        // const IMG_SUPPORTED_EXTENSIONS = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg"
        var thisExtension = GeneralHelper.getFileExtension(fileName);
        return acceptableExtensions.indexOf(thisExtension) > -1;
    };
    /**
     * Returns extension of the file
     */
    GeneralHelper.getFileExtension = function (fileName) {
        // Split the URL on the dots
        var splitFileName = fileName.toLowerCase().split('.');
        // Take the last value
        var extensionValue = splitFileName.pop();
        // Check if there are query string params in place
        if (extensionValue.indexOf('?') !== -1) {
            // Split the string on the question mark and return the first part
            var querySplit = extensionValue.split('?');
            extensionValue = querySplit[0];
        }
        return ".".concat(extensionValue);
    };
    GeneralHelper._getEncodedChar = function (c) {
        var o = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            "\\": "&#92;"
        };
        return o[c];
    };
    return GeneralHelper;
}());
export { GeneralHelper };
export function urlCombine(urlStart, urlFinish, escapeFinish) {
    if (escapeFinish === void 0) { escapeFinish = true; }
    var url = urlStart;
    if (url.lastIndexOf('/') === url.length - 1) {
        url = url.slice(0, -1);
    }
    if (urlFinish) {
        if (escapeFinish) {
            var escapeFunc = function (str) {
                return encodeURIComponent(unescape(str))
                    .replace(/[!'()*]/g, escape)
                    .replace(/\./g, '%2E');
            };
            urlFinish = urlFinish.split('/').map(escapeFunc).join('/');
        }
        if (urlFinish.indexOf('/') !== 0) {
            urlFinish = "/".concat(urlFinish);
        }
        url += urlFinish;
    }
    return url;
}
export var toRelativeUrl = function (absoluteUrl) {
    if (!absoluteUrl) {
        return '';
    }
    var relativeUrl = new URL(absoluteUrl).pathname;
    return relativeUrl;
};
export function sortString(a, b, isDesc) {
    var aProp = (a || '').toLowerCase();
    var bProp = (b || '').toLowerCase();
    if (aProp < bProp) {
        return isDesc ? 1 : -1;
    }
    else if (aProp > bProp) {
        return isDesc ? -1 : 1;
    }
    return 0;
}
export function sortDate(a, b, isDesc) {
    var aTime = dateToNumber(a);
    var bTime = dateToNumber(b);
    return isDesc ? bTime - aTime : aTime - bTime;
}
export function dateToNumber(date) {
    if (typeof date === 'number') {
        return date;
    }
    var dateObj;
    if (typeof date === 'string') {
        dateObj = new Date(date);
    }
    else {
        dateObj = date;
    }
    return dateObj.getTime();
}
//# sourceMappingURL=GeneralHelper.js.map