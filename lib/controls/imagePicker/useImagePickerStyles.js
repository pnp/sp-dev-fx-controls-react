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
export var useImagePickerStyles = makeStyles({
    root: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
    },
    grid: __assign(__assign({ display: "grid", marginTop: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))" }, shorthands.gap("10px")), { maxHeight: "500px", overflowY: "auto", scrollbarWidth: "thin" }),
    image: {
        height: "100px",
        objectPosition: "0px 0px",
        ":hover": __assign(__assign(__assign({}, shorthands.border("2px", "solid", tokens.colorBrandBackground)), shorthands.padding("3px")), { cursor: "pointer" }),
    },
    toolbarContainer: {
        display: "flex",
        justifyContent: "start",
        alignItems: "stretch",
        paddingTop: "15px",
        gap: "10px",
    },
    buttonContainer: __assign({ display: "flex", justifyContent: "start", alignItems: "stretch", paddingTop: "15px", paddingBottom: "15px" }, shorthands.gap("10px")),
    selectedImage: __assign(__assign({}, shorthands.border("3px", "solid", tokens.colorBrandBackground)), shorthands.padding("3px")),
    stockImagesPicker: __assign(__assign(__assign({ width: "100%", height: "100%", backgroundColor: "transparent" }, shorthands.border("0px none transparent")), shorthands.padding("0px")), { overflow: "hidden" }),
    stockImageContainer: __assign(__assign(__assign({ paddingTop: "10px", borderTopWidth: "0px", borderLeftWidth: "0px", borderRightWidth: "0px", width: "100%" }, shorthands.border("0px none transparent")), { height: "500px" }), shorthands.overflow("hidden")),
    renderImageContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        maxHeight: "200px",
        maxWidth: "350px",
        paddingBottom: "10px",
    },
});
//# sourceMappingURL=useImagePickerStyles.js.map