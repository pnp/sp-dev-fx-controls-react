import '../extensions/String.extensions';

import * as strings from 'ControlStrings';

export const IMG_SUPPORTED_EXTENSIONS = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg";

/**
 * Helper with general methods to simplify some routines
 */
export class GeneralHelper {
    /**
     * Trims slash at the end of URL if needed
     * @param url URL
     */
    public static trimSlash(url: string): string {
        if (url.lastIndexOf('/') === url.length - 1)
            return url.slice(0, -1);
        return url;
    }

    /**
     * Encodes text
     * @param text text to encode
     */
    public static encodeText(text: string): string {
        const n = /[<>&'"\\]/g;
        return text ? text.replace(n, this._getEncodedChar) : '';
    }

    /**
     * Copy of Microsoft's GetRelativeDateTimeString from SP.dateTimeUtil
     */
    public static getRelativeDateTimeString(format: string): string {
        const formatParts: string[] = format.split('|');
        let result: string = null;
        let placeholdersString: string = null;

        if (formatParts[0] === '0')
            return format.substring(2);
        const isFuture: boolean = formatParts[1] === '1';
        const formatType: string = formatParts[2];
        const timeString: string = formatParts.length >= 4 ? formatParts[3] : null;
        const dayString: string = formatParts.length >= 5 ? formatParts[4] : null;

        switch (formatType) {
            case '1':
                result = isFuture ? strings.DateTime.L_RelativeDateTime_AFewSecondsFuture : strings.DateTime.L_RelativeDateTime_AFewSeconds;
                break;
            case '2':
                result = isFuture ? strings.DateTime.L_RelativeDateTime_AboutAMinuteFuture : strings.DateTime.L_RelativeDateTime_AboutAMinute;
                break;
            case '3':
                placeholdersString = this.getLocalizedCountValue(
                  isFuture ? strings.DateTime.L_RelativeDateTime_XMinutesFuture : strings.DateTime.L_RelativeDateTime_XMinutes,
                  isFuture ? strings.DateTime.L_RelativeDateTime_XMinutesFutureIntervals : strings.DateTime.L_RelativeDateTime_XMinutesIntervals, Number(timeString));
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
                placeholdersString = this.getLocalizedCountValue(
                    isFuture ? strings.DateTime.L_RelativeDateTime_XHoursFuture : strings.DateTime.L_RelativeDateTime_XHours,
                    isFuture ? strings.DateTime.L_RelativeDateTime_XHoursFutureIntervals : strings.DateTime.L_RelativeDateTime_XHoursIntervals,
                    Number(timeString));
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
                placeholdersString = this.getLocalizedCountValue(
                    isFuture ? strings.DateTime.L_RelativeDateTime_XDaysFuture : strings.DateTime.L_RelativeDateTime_XDays,
                    isFuture ? strings.DateTime.L_RelativeDateTime_XDaysFutureIntervals : strings.DateTime.L_RelativeDateTime_XDaysIntervals,
                    Number(timeString));
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
    }

    /**
     * Copy of Microsoft's GetLocalizedCountValue from SP.dateTimeUtil.
     * I've tried to rename all the vars to have meaningful names... but some were too unclear
     */
    public static getLocalizedCountValue(format: string, first: string, second: number): string {
        if (format === undefined || first === undefined || second === undefined)
            return null;
        let result: string = '';
        let a = -1;
        const firstOperandOptions: string[] = first.split('||');

        for (let firstOperandOptionsIdx = 0, firstOperandOptionsLen = firstOperandOptions.length; firstOperandOptionsIdx < firstOperandOptionsLen; firstOperandOptionsIdx++) {
            const firstOperandOption: string = firstOperandOptions[firstOperandOptionsIdx];

            if (firstOperandOption === null || firstOperandOption === '')
                continue;
            const optionParts: string[] = firstOperandOption.split(',');

            for (let optionPartsIdx = 0, optionPartsLen = optionParts.length; optionPartsIdx < optionPartsLen; optionPartsIdx++) {
                const optionPart: string = optionParts[optionPartsIdx];

                if (optionPart === null || optionPart === '')
                    continue;
                if (isNaN(optionPart.parseNumberInvariant())) {
                    const dashParts: string[] = optionPart.split('-');

                    if (dashParts === null || dashParts.length !== 2)
                        continue;
                    let j: number, n: number;

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
                    const p = parseInt(optionPart);

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
            const e: string[] = format.split('||');

            if (e !== null && e[a] !== null && e[a] !== '')
                result = e[a];
        }
        return result;
    }

    /**
     * Extracts text from HTML strings without creating HTML elements
     * @param html HTML string
     */
    public static getTextFromHTML(html: string): string {
        let result: string = html;
        let oldResult: string = result;
        const tagBody: string = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

        const tagOrComment: RegExp = new RegExp(
            '<(?:'
            // Comment body.
            + '!--(?:(?:-*[^->])*--+|-?)'
            // Special "raw text" elements whose content should be elided.
            + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
            + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
            // Regular name
            + '|/?[a-z]'
            + tagBody
            + ')>',
            'gi');

        do {
            oldResult = result;
            result = result.replace(tagOrComment, '');
        } while (result !== oldResult);

        return result;
    }

    /**
     * Checks if value is defined (not null and not undefined)
     * @param value value
     */
    public static isDefined(value: any): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
        return value !== null;
    }

    /**
     * Creates Document element based on Xml string
     * @param xmlString XML string to parse
     */
    public static parseXml(xmlString: string): Document {
        const parser: DOMParser = new DOMParser();
        const xml: Document = parser.parseFromString(xmlString, 'text/xml');
        return xml;
    }

    /**
     * Returns absoulute domain URL.
     * @param url
     */
    public static getAbsoluteDomainUrl(url: string): string  {
      if (url !== undefined) {
        const myURL = new URL(url.toLowerCase());
        return myURL.protocol + "//" + myURL.host;
      } else {
        return undefined;
      }
    }

    public static getDomain(url: string, includeProtocol?: boolean): string {
      if (url !== undefined) {
        const myURL = new URL(url.toLowerCase());
        if (includeProtocol) {
          return `${myURL.protocol}//${myURL.hostname}`;
        }
        return myURL.hostname;
      }

      return '';
    }

    /**
     * To support IE11 that has no support for File constructor
     * @param blob
     */
    public static getFileFromBlob(blob :Blob, fileName: string) : File {
      let result : any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
      // IE 11 foesn't support File API, create a workaround to return Blob with fileName assigned.
      try {
        result = new File([blob], fileName);
      }
      catch {
        result = blob;
        result.fileName = fileName;
      }

      return result;
    }

    public static formatBytes(bytes, decimals): string {
      if (bytes === 0) {
        return strings.EmptyFileSize;
      }

      const k: number = 1024;
      const dm = decimals <= 0 ? 0 : decimals || 2;
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + strings.SizeUnit[i];
    }

    /**
     * Returns file name without extension.
     */
    public static getFileNameWithoutExtension(itemUrl : string): string {
      const fileNameWithExtension = GeneralHelper.getFileNameFromUrl(itemUrl);
      const fileName = fileNameWithExtension.substr(0, fileNameWithExtension.lastIndexOf('.'));
      return fileName;
    }

    /**
     * Returns file name with the extension
     */
    public static getFileNameFromUrl(itemUrl : string): string {
      const urlTokens = itemUrl.split("?");
      const url = urlTokens[0];
      const tokens = url.split("/");
      const fileNameWithExtension = tokens[tokens.length - 1];

      return fileNameWithExtension;
    }

    public static isImage(fileName: string): boolean {
      const acceptableExtensions: string[] = IMG_SUPPORTED_EXTENSIONS.split(",");
      // const IMG_SUPPORTED_EXTENSIONS = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg"

      const thisExtension: string = GeneralHelper.getFileExtension(fileName);
      return acceptableExtensions.indexOf(thisExtension) > -1;
    }

    /**
     * Returns extension of the file
     */
    public static getFileExtension(fileName): string {

      // Split the URL on the dots
      const splitFileName = fileName.toLowerCase().split('.');

      // Take the last value
      let extensionValue = splitFileName.pop();

      // Check if there are query string params in place
      if (extensionValue.indexOf('?') !== -1) {
        // Split the string on the question mark and return the first part
        const querySplit = extensionValue.split('?');
        extensionValue = querySplit[0];
      }

      return `.${extensionValue}`;
    }

    private static _getEncodedChar(c): string {
        const o = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            "\\": "&#92;"
        };
        return o[c];
    }
}

export function urlCombine(urlStart: string, urlFinish: string, escapeFinish: boolean = true): string {
  let url = urlStart;
  if (url.lastIndexOf('/') === url.length - 1) {
    url = url.slice(0, -1);
  }
  if (urlFinish) {
    if (escapeFinish) {
      const escapeFunc = (str: string): string => {
        return encodeURIComponent(unescape(str))
          .replace(/[!'()*]/g, escape)
          .replace(/\./g, '%2E');
      };

      urlFinish = urlFinish.split('/').map(escapeFunc).join('/');
    }

    if (urlFinish.indexOf('/') !== 0) {
      urlFinish = `/${urlFinish}`;
    }

    url += urlFinish;
  }

  return url;
}

export const toRelativeUrl = (absoluteUrl: string): string => {

  if (!absoluteUrl) {
    return '';
  }
  const relativeUrl: string = new URL(absoluteUrl).pathname;
  return relativeUrl;
};

export function sortString(a: string, b: string, isDesc: boolean): number {
  const aProp = (a || '').toLowerCase();
  const bProp = (b || '').toLowerCase();

  if (aProp < bProp) {
    return isDesc ? 1 : -1;
  }
  else if (aProp > bProp) {
    return isDesc ? -1 : 1;
  }

  return 0;
}

export function sortDate(a: string | number | Date, b: string | number | Date, isDesc: boolean): number {
  const aTime = dateToNumber(a);
  const bTime = dateToNumber(b);

  return isDesc ? bTime - aTime : aTime - bTime;
}

export function dateToNumber(date: string | number | Date): number {
  if (typeof date === 'number') {
    return date;
  }

  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  }
  else {
    dateObj = date;
  }

  return dateObj.getTime();
}
