/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, } from 'react';
export var useOnClickOutside = function (active, ref, callback) {
    var handleClickOutside = useCallback(function (event) {
        if (ref.current && !ref.current.contains(event.target) && active) {
            callback();
        }
    }, [ref, callback, active]);
    useEffect(function () {
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("wheel", handleClickOutside);
        return function () {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("wheel", handleClickOutside);
        };
    }, [ref]);
};
//# sourceMappingURL=useOnClickOutside.js.map