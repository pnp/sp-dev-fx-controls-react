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
import { makeStyles, shorthands, tokens, } from '@fluentui/react-components';
export var useUserCardStyles = makeStyles({
    container: __assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center" }, shorthands.gap("20px")), { ":hover": {
            cursor: "pointer",
            backgroundColor: tokens.colorNeutralBackground3,
        } }),
    root: __assign({ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", width: "fit-content" }, shorthands.gap("10px")),
    personLine1Container: __assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "center", width: "100%", maxWidth: "100%" }, shorthands.overflow("hidden")), { paddingBottom: "0px" }),
    personLine1: __assign(__assign({ width: "100%", maxWidth: "100%" }, shorthands.overflow("hidden")), { display: "-webkit-box", "-webkit-line-clamp": "1", "-webkit-box-orient": "vertical", paddingBottom: "0px", textAlign: "start" }),
    personline1Styles: {
        paddingRight: "5px",
        color: tokens.colorNeutralForeground2
    },
});
//# sourceMappingURL=useUserCardStyles.js.map