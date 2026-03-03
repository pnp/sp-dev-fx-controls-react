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
export var useRenderHeaderStyles = makeStyles({
    closeButton: {
        marginLeft: "auto",
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 99999,
    },
    divider: {
        width: "100%",
        height: "1px",
        backgroundColor: tokens.colorNeutralStroke1,
        marginTop: "20px",
    },
    renderHeaderContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        width: "100%",
    },
    renderHeaderHeader: __assign({ minHeight: "50px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }, shorthands.gap("20px")),
    renderHeaderFooter: __assign(__assign({ display: "flex", flexDirection: "row", justifyContent: "flex-start" }, shorthands.padding("20px")), shorthands.gap("20px")),
    renderHeaderBody: __assign(__assign({ display: "flex", flexDirection: "column", justifyContent: "flex-start" }, shorthands.padding("20px")), shorthands.gap("20px")),
    renderHeaderTitleContainer: __assign({ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }, shorthands.gap("0px")),
    renderHeaderTitle: __assign(__assign({ display: "-webkit-box", "-webkit-line-clamp": "1", "-webkit-box-orient": "vertical" }, shorthands.overflow("hidden")), { textAlign: "start", textOverflow: "ellipsis" }),
    renderHeaderDescription: __assign(__assign(__assign(__assign({}, shorthands.overflow("hidden")), { display: "-webkit-box", "-webkit-line-clamp": "4", "-webkit-box-orient": "vertical" }), shorthands.overflow("hidden")), { textAlign: "start", textOverflow: "ellipsis" }),
    dialogTitleAndDescriptionContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "start",
        paddingLeft: "10px",
        paddingRight: "20px",
    },
});
//# sourceMappingURL=useRenderHeaderStyles.js.map