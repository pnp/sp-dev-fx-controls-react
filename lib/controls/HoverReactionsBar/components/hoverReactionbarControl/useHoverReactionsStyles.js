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
import { makeStyles, shorthands, } from '@fluentui/react-components';
export var useHoverReactionsStyles = makeStyles({
    emojiList: __assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", height: "30px" }, shorthands.gap("10px")), { width: "100%" }),
    card: __assign(__assign(__assign({ position: "absolute" }, shorthands.borderRadius("4px")), { width: "160px" }), shorthands.padding("5px")),
    cardContent: __assign(__assign(__assign({ display: "flex", width: "100%" }, shorthands.flex("1")), { flexDirection: "column", justifyContent: "center", alignItems: "center" }), shorthands.gap("10px")),
    searchBox: {
        width: "100%",
    },
    emojiRoot: {
        /*   ...shorthands.margin("10px"), */
        cursor: "pointer",
    },
    emoji: {
        fontSize: "30px",
    },
    emojiImage: {
        with: "20px",
        height: "20px",
        cursor: "pointer",
        '&:hover': {
            transform: "scale(1.2)",
            with: "25px",
            height: "25px",
        },
    }
});
//# sourceMappingURL=useHoverReactionsStyles.js.map