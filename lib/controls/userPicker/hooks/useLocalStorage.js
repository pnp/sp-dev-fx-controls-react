/* eslint-disable @typescript-eslint/no-explicit-any */
import addSeconds from 'date-fns/addSeconds';
import isAfter from 'date-fns/isAfter';
var DEFAULT_EXPIRED_IN_SECONDS = 60 * 30; // 30 min
export var useCache = function (cacheType) {
    var setCacheValue = function (key, newValue, expiredInSeconds) {
        var expires = addSeconds(new Date(), expiredInSeconds !== null && expiredInSeconds !== void 0 ? expiredInSeconds : DEFAULT_EXPIRED_IN_SECONDS);
        if (cacheType === "session") {
            sessionStorage.setItem(key, JSON.stringify({ value: newValue, expires: expires.getTime() }));
        }
        else {
            localStorage.setItem(key, JSON.stringify({ value: newValue, expires: expires.getTime() }));
        }
    };
    var getCacheValue = function (key) {
        var storage = {};
        if (cacheType === "session") {
            storage = JSON.parse(sessionStorage.getItem(key) || "{}");
        }
        else {
            storage = JSON.parse(localStorage.getItem(key) || "{}");
        }
        // getting stored value
        var _a = storage || {}, value = _a.value, expires = _a.expires;
        if (expires && isAfter(new Date(expires), new Date())) {
            return value;
        }
        return undefined;
    };
    return { getCacheValue: getCacheValue, setCacheValue: setCacheValue };
};
//# sourceMappingURL=useLocalStorage.js.map