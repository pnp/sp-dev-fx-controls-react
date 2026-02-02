/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import addSeconds from 'date-fns/addSeconds';
import isAfter from 'date-fns/isAfter';
var DEFAULT_EXPIRED_IN_SECONDS = 15 * 60; // 1 hour
export var useSessionStorage = function () {
    var setStorageValue = React.useCallback(function (key, newValue, expiredInSeconds) {
        var expires = addSeconds(new Date(), expiredInSeconds !== null && expiredInSeconds !== void 0 ? expiredInSeconds : DEFAULT_EXPIRED_IN_SECONDS);
        sessionStorage.setItem(key, JSON.stringify({ value: newValue, expires: expires }));
    }, []);
    var getStorageValue = React.useCallback(function (key) {
        var storage = JSON.parse(sessionStorage.getItem(key) || "{}");
        // getting stored value
        var _a = storage || {}, value = _a.value, expires = _a.expires;
        if (isAfter(new Date(expires), new Date())) {
            return value;
        }
        return undefined;
    }, []);
    var removeStorageValue = React.useCallback(function (key) {
        sessionStorage.removeItem(key);
    }, []);
    return [getStorageValue, setStorageValue, removeStorageValue];
};
//# sourceMappingURL=useSessionStorage.js.map