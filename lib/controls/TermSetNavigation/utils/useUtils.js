import * as React from 'react';
export var useUtils = function () {
    var getCacheKey = React.useCallback(function (key, uniqueId) {
        return "".concat(key).concat(uniqueId);
    }, []);
    var getTermSetProperty = React.useCallback(function (termSet, property) {
        var _a, _b;
        if (!termSet && !property) {
            return undefined;
        }
        return (_b = (_a = termSet.properties) === null || _a === void 0 ? void 0 : _a.filter(function (prop) { return prop.key === property; })[0]) === null || _b === void 0 ? void 0 : _b.value;
    }, []);
    var getTermSetLocalizedNames = React.useCallback(function (termSet, language) {
        var _a;
        if (!termSet && !language) {
            return undefined;
        }
        return (_a = termSet.localizedNames) === null || _a === void 0 ? void 0 : _a.filter(function (prop) { return prop.languageTag === language; });
    }, []);
    var getTermProperty = React.useCallback(function (term, property) {
        var _a, _b;
        if (!term && !property) {
            return undefined;
        }
        return (_b = (_a = term.properties) === null || _a === void 0 ? void 0 : _a.filter(function (prop) { return prop.key === property; })[0]) === null || _b === void 0 ? void 0 : _b.value;
    }, []);
    var getTermLabel = React.useCallback(function (term, name) {
        var _a, _b;
        if (!term && !name) {
            return undefined;
        }
        return (_b = (_a = term.labels) === null || _a === void 0 ? void 0 : _a.filter(function (prop) { return prop.name === name; })[0]) === null || _b === void 0 ? void 0 : _b.name;
    }, []);
    var validateUrl = React.useCallback(function (url) {
        if (!url) {
            return false;
        }
        try {
            var urlValid = new URL(url);
            return !!urlValid;
        }
        catch (_a) {
            return false;
        }
    }, []);
    return { getTermSetProperty: getTermSetProperty, getCacheKey: getCacheKey, getTermProperty: getTermProperty, getTermSetLocalizedNames: getTermSetLocalizedNames, getTermLabel: getTermLabel, validateUrl: validateUrl };
};
//# sourceMappingURL=useUtils.js.map