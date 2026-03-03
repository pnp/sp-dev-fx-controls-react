import { InvariantCulture } from '../Constants';
/* eslint-disable no-extend-native */
/**
 * Parses number in invariant culture
 */
String.prototype.parseNumberInvariant = function () {
    return this._parseNumber((window.Sys && window.Sys.CultureInfo && window.Sys.CultureInfo.InvariantCulture) || InvariantCulture);
};
/**
 * Parses number in provided culture
 */
String.prototype._parseNumber = function (culture) {
    var str = '' + this;
    str = str.trim();
    if (str.match(/^[+-]?infinity$/i)) {
        return parseFloat(str);
    }
    if (str.match(/^0x[a-f0-9]+$/i)) {
        return parseInt(str);
    }
    var numberFormat = culture.numberFormat;
    var patternParsed = str._parseNumberNegativePattern(numberFormat, numberFormat.NumberNegativePattern);
    var symbol = patternParsed[0];
    var digit = patternParsed[1];
    if (symbol === '' && numberFormat.NumberNegativePattern !== 1) {
        patternParsed = str._parseNumberNegativePattern(numberFormat, 1);
        symbol = patternParsed[0];
        digit = patternParsed[1];
    }
    if (symbol === '') {
        symbol = '+';
    }
    var exponent;
    var base;
    var scientificSymbolIndex = digit.indexOf('e');
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
    var intPart;
    var fractionalPart;
    var decimalSeparatorIdx = base.indexOf(numberFormat.NumberDecimalSeparator);
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
    var result = symbol + intPart;
    if (fractionalPart !== null) {
        result += '.' + fractionalPart;
    }
    if (exponent !== null) {
        var exponentParsed = exponent._parseNumberNegativePattern(numberFormat, 1);
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
String.prototype._parseNumberNegativePattern = function (numberFormat, pattern) {
    var negativeSign = numberFormat.NegativeSign;
    var positiveSign = numberFormat.PositiveSign;
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
        case 1:
            if (this.startsWith(negativeSign)) {
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
/* eslint-enable no-extend-native */
//# sourceMappingURL=String.extensions.js.map