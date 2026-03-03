var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles, shorthands, tokens, } from '@fluentui/react-components';
export var useShowMessageStyles = makeStyles({
    root: __assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }, shorthands.padding("10px")), shorthands.gap("10px")),
    iconClass: {
        width: "32px",
        height: "32px",
    },
    errorContainer: __assign(__assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center" }, shorthands.gap("10px")), shorthands.padding("10px")), { backgroundColor: tokens.colorStatusDangerBackground1 }),
    errorIcon: {
        width: "60px",
        height: "100%",
    },
});
//# sourceMappingURL=useShowMessageStyles.js.map