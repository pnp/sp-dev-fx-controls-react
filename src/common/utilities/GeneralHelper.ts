import { IContext } from '../Interfaces';
import { SPHelper } from './SPHelper';
import '../extensions/String.extensions';

import * as _ from '@microsoft/sp-lodash-subset';

import * as strings from 'ControlStrings';

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

        if (formatParts[0] == '0')
            return format.substring(2);
        const isFuture: boolean = formatParts[1] === '1';
        const formatType: string = formatParts[2];
        const timeString: string = formatParts.length >= 4 ? formatParts[3] : null;
        const dayString: string = formatParts.length >= 5 ? formatParts[4] : null;

        switch (formatType) {
            case '1':
                result = isFuture ? strings.DateTime['L_RelativeDateTime_AFewSecondsFuture'] : strings.DateTime['L_RelativeDateTime_AFewSeconds'];
                break;
            case '2':
                result = isFuture ? strings.DateTime['L_RelativeDateTime_AboutAMinuteFuture'] : strings.DateTime['L_RelativeDateTime_AboutAMinute'];
                break;
            case '3':
                placeholdersString = this.getLocalizedCountValue(isFuture ? strings.DateTime['L_RelativeDateTime_XMinutesFuture'] : strings.DateTime['L_RelativeDateTime_XMinutes'], isFuture ? strings.DateTime['L_RelativeDateTime_XMinutesFutureIntervals'] : strings.DateTime['L_RelativeDateTime_XMinutesIntervals'], Number(timeString));
                break;
            case '4':
                result = isFuture ? strings.DateTime['L_RelativeDateTime_AboutAnHourFuture'] : strings.DateTime['L_RelativeDateTime_AboutAnHour'];
                break;
            case '5':
                if (timeString == null) {
                    result = isFuture ? strings.DateTime['L_RelativeDateTime_Tomorrow'] : strings.DateTime['L_RelativeDateTime_Yesterday'];
                }
                else {
                    placeholdersString = isFuture ? strings.DateTime['L_RelativeDateTime_TomorrowAndTime'] : strings.DateTime['L_RelativeDateTime_YesterdayAndTime'];
                }
                break;
            case '6':
                placeholdersString = this.getLocalizedCountValue(
                    isFuture ? strings.DateTime['L_RelativeDateTime_XHoursFuture'] : strings.DateTime['L_RelativeDateTime_XHours'],
                    isFuture ? strings.DateTime['L_RelativeDateTime_XHoursFutureIntervals'] : strings.DateTime['L_RelativeDateTime_XHoursIntervals'],
                    Number(timeString));
                break;
            case '7':
                if (dayString == null) {
                    result = timeString;
                }
                else {
                    placeholdersString = strings.DateTime['L_RelativeDateTime_DayAndTime'];
                }
                break;
            case '8':
                placeholdersString = this.getLocalizedCountValue(
                    isFuture ? strings.DateTime['L_RelativeDateTime_XDaysFuture'] : strings.DateTime['L_RelativeDateTime_XDays'],
                    isFuture ? strings.DateTime['L_RelativeDateTime_XDaysFutureIntervals'] : strings.DateTime['L_RelativeDateTime_XDaysIntervals'],
                    Number(timeString));
                break;
            case '9':
                result = strings.DateTime['L_RelativeDateTime_Today'];
        }
        if (placeholdersString != null) {
            result = placeholdersString.replace("{0}", timeString);
            if (dayString != null) {
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
        if (format == undefined || first == undefined || second == undefined)
            return null;
        let result: string = '';
        let a = -1;
        let firstOperandOptions: string[] = first.split('||');

        for (let firstOperandOptionsIdx = 0, firstOperandOptionsLen = firstOperandOptions.length; firstOperandOptionsIdx < firstOperandOptionsLen; firstOperandOptionsIdx++) {
            const firstOperandOption: string = firstOperandOptions[firstOperandOptionsIdx];

            if (firstOperandOption == null || firstOperandOption === '')
                continue;
            let optionParts: string[] = firstOperandOption.split(',');

            for (var optionPartsIdx = 0, optionPartsLen = optionParts.length; optionPartsIdx < optionPartsLen; optionPartsIdx++) {
                const optionPart: string = optionParts[optionPartsIdx];

                if (optionPart == null || optionPart === '')
                    continue;
                if (isNaN(optionPart.parseNumberInvariant())) {
                    const dashParts: string[] = optionPart.split('-');

                    if (dashParts == null || dashParts.length !== 2)
                        continue;
                    var j, n;

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

            if (e != null && e[a] != null && e[a] != '')
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
        const tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';

        const tagOrComment = new RegExp(
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
        } while (result !== result);

        return result;
    }

    /**
     * Checks if value is defined (not null and not undefined)
     * @param value value
     */
    public static isDefined(value): boolean {
        return value != null;
    }

    /**
     * Creates Document element based on Xml string
     * @param xmlString XML string to parse
     */
    public static parseXml(xmlString): Document {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'text/xml');
        return xml;
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