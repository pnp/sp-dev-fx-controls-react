export { };

import { ICultureInfo, ICultureNumberFormat } from '../SPEntities';
import { InvariantCulture } from '../Constants';

declare global {
    interface String {
        parseNumberInvariant(): number;
        _parseNumber(culture: ICultureInfo): number;
        _parseNumberNegativePattern(numberFormat: ICultureNumberFormat, pattern: number): string[];
    }
}

declare var window: any;

/**
 * Parses number in invariant culture
 */
String.prototype.parseNumberInvariant = function (): number {
    return this._parseNumber((window.Sys && window.Sys.CultureInfo && window.Sys.CultureInfo.InvariantCulture) || InvariantCulture);
};

/**
 * Parses number in provided culture
 */
String.prototype._parseNumber = function (culture: ICultureInfo): number {
    let str: string = '' + this;
    str = str.trim();
    if (str.match(/^[+-]?infinity$/i)) {
        return parseFloat(str);
    }
    if (str.match(/^0x[a-f0-9]+$/i)) {
        return parseInt(str);
    }
    const numberFormat: ICultureNumberFormat = culture.numberFormat;
    let patternParsed: string[] = str._parseNumberNegativePattern(numberFormat, numberFormat.NumberNegativePattern);
    let symbol: string = patternParsed[0];
    let digit: string = patternParsed[1];
    if (symbol === '' && numberFormat.NumberNegativePattern !== 1) {
        patternParsed = str._parseNumberNegativePattern(numberFormat, 1);
        symbol = patternParsed[0];
        digit = patternParsed[1];
    }
    if (symbol === '') {
        symbol = '+';
    }
    let exponent: string;
    let base: string;
    let scientificSymbolIndex: number = digit.indexOf('e');
    if (scientificSymbolIndex < 0) {
        scientificSymbolIndex = digit.indexOf('E');
    }
    if (scientificSymbolIndex < 0) {
        base = digit;
        exponent = null;
    }
    else {
        base = digit.substr(0, scientificSymbolIndex);
        exponent = digit.substr(scientificSymbolIndex + 1);
    }
    let intPart: string;
    let fractionalPart: string;
    let decimalSeparatorIdx: number = base.indexOf(numberFormat.NumberDecimalSeparator);
    if (decimalSeparatorIdx < 0) {
        intPart = base;
        fractionalPart = null;
    }
    else {
        intPart = base.substr(0, decimalSeparatorIdx);
        fractionalPart = base.substr(decimalSeparatorIdx + numberFormat.NumberDecimalSeparator.length);
    }
    intPart = intPart.split(numberFormat.NumberGroupSeparator).join('');
    var n = numberFormat.NumberGroupSeparator.replace(/\u00A0/g, ' ');
    if (numberFormat.NumberGroupSeparator !== n) {
        intPart = intPart.split(n).join('');
    }
    var result: string = symbol + intPart;
    if (fractionalPart !== null) {
        result += '.' + fractionalPart;
    }
    if (exponent !== null) {
        const exponentParsed: string[] = exponent._parseNumberNegativePattern(numberFormat, 1);
        if (exponentParsed[0] === '') {
            exponentParsed[0] = '+';
        }
        result += 'e' + exponentParsed[0] + exponentParsed[1];
    }
    if (result.match(/^[+-]?\d*\.?\d*(e[+-]?\d+)?$/)) {
        return parseFloat(result);
    }
    return Number.NaN;
};

/**
 * Internal method, Microsoft's replica to parse FriendlyFormat of date or digit
 */
String.prototype._parseNumberNegativePattern = function (numberFormat: ICultureNumberFormat, pattern: number): string[] {
    let negativeSign: string = numberFormat.NegativeSign;
    let positiveSign: string = numberFormat.PositiveSign;
    switch (pattern) {
        case 4:
            negativeSign = ' ' + negativeSign;
            positiveSign = ' ' + positiveSign;
            break;
        case 3:
            if (this.endsWith(negativeSign)) {
                return ['-', this.substr(0, this.length - negativeSign.length)];
            }
            else if (this.endsWith(positiveSign)) {
                return ['+', this.substr(0, this.length - positiveSign.length)];
            }
            break;
        case 2:
            negativeSign += ' ';
            positiveSign += ' ';
            break;
        case 1: if (this.startsWith(negativeSign)) {
            return ['-', this.substr(negativeSign.length)];
        }
        else if (this.startsWith(positiveSign)) {
            return ['+', this.substr(positiveSign.length)];
        }
            break;
        case 0:
            if (this.startsWith('(') && this.endsWith(')')) {
                return ['-', this.substr(1, this.length - 2)];
            }
    }
    return ['', this];
};
