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
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
export var useReactionPickerStyles = makeStyles({
    emojiList: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 30px), 1fr))",
        columnGap: "15px",
        rowGap: "0.5em",
        overflowY: "auto",
        overflowX: "hidden",
        marginTop: "20px",
        maxHeight: "280px",
        width: "100%",
        "scrollbar-color": tokens.colorNeutralBackground1,
        "scrollbar-width": "thin",
        "::-webkit-scrollbar-thumb": __assign(__assign({ backgroundColor: tokens === null || tokens === void 0 ? void 0 : tokens.colorNeutralBackground3 }, shorthands.borderRadius("10px")), shorthands.borderWidth("1px")),
        "::-webkit-scrollbar": {
            width: "7px",
        },
    },
    card: __assign(__assign(__assign({ backgroundColor: tokens.colorNeutralBackground2 }, shorthands.borderRadius("8px")), { width: "350px", height: "420px", position: "fixed", bottom: "10px", zIndex: 9000 }), shorthands.padding("20px")),
    cardContent: __assign({ display: "flex", width: "100%", flexDirection: "column", justifyContent: "center", alignItems: "center" }, shorthands.gap("10px")),
    searchBox: {
        width: "100%",
    },
    emojiRoot: {
        height: "fit-content",
        /*   ...shorthands.margin("10px"), */
        cursor: "pointer",
    },
    emoji: {
        fontSize: "30px",
    },
    emojiImage: {
        width: "30px",
        height: "30px",
        cursor: "pointer",
    },
    emojiGroupContainer: {
        position: "absolute",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 30px), 1fr))",
        width: "90%",
        bottom: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
    },
    emojiImageGroup: {
        width: "20px",
        height: "20px",
        display: "inline-block",
        WebkitMaskSize: "20px",
        WebkitMaskPositionY: "0%",
        backgroundColor: tokens.colorNeutralForeground3,
        "&:hover": {
            backgroundColor: tokens.colorBrandBackground,
            WebkitMaskPositionY: "100%",
        },
    },
    emojiSelected: {
        backgroundColor: tokens.colorBrandBackground,
        WebkitMaskPositionY: "100%",
    },
    groupButton: {
        paddingLeft: "10px",
        paddingRight: "10px",
    },
});
//# sourceMappingURL=useReactionPickerStyle.js.map