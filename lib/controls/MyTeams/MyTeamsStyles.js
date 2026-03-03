import { mergeStyles, mergeStyleSets, } from "@fluentui/react/lib/Styling";
var currentTheme = window.__themeState__.theme;
export var getMyTeamsStyles = function (themeVariant) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
    var commentTextStyles = {
        root: {
            marginBottom: 15,
            padding: "0px 25px 25px 25px",
        },
    };
    var showHideButtonStyles = {
        labelHovered: {
            textDecoration: "underline",
        },
    };
    var titleStyles = {
        root: {
            marginBottom: 20,
        },
    };
    var stackStyles = {
        root: mergeStyles({
            padding: 0,
        }),
    };
    var stackTokens = {
        childrenGap: 0,
    };
    var styleClasses = mergeStyleSets({
        webPartTitle: {
            marginBottom: 20,
        },
        separator: mergeStyles({
            borderBottomStyle: "solid",
            borderWidth: 1,
            borderBottomColor: (_b = (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themeLighter) !== null && _b !== void 0 ? _b : currentTheme.themeLighter,
        }),
        styleIcon: mergeStyles({
            maxWidth: 44,
            minWidth: 44,
            minHeight: 30,
            height: 30,
            borderColor: (_d = (_c = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _c === void 0 ? void 0 : _c.themePrimary) !== null && _d !== void 0 ? _d : currentTheme.themePrimary,
            borderRightWidth: 0,
            borderRightStyle: "none",
            borderLeftWidth: 1,
            borderLeftStyle: "solid",
            borderTopWidth: 1,
            borderTopStyle: "solid",
            borderBottomWidth: 1,
            borderBottomStyle: "solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }),
        teamsContainer: mergeStyles({
            // backgroundColor: themeVariant?.palette?.neutralLighterAlt,
            padding: 7,
            maxHeight: "75vh",
            overflowY: "auto",
            display: "grid",
            gridTemplateColumns: "auto-fill, minmax(min(100%, 65px), 1fr)",
            // gridGap:  "6px",
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: themeVariant
                    ? (_e = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _e === void 0 ? void 0 : _e.neutralQuaternaryAlt
                    : currentTheme.neutralQuaternaryAlt,
            },
            "&::-webkit-scrollbar": {
                height: 5,
                width: 10,
            },
        }),
        teamContainer: mergeStyles({
            maxWidth: "100%",
            overflow: "auto",
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: (_g = (_f = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _f === void 0 ? void 0 : _f.neutralQuaternaryAlt) !== null && _g !== void 0 ? _g : currentTheme.neutralQuaternaryAlt,
            borderLeftStyle: "solid",
            borderLeftWidth: 3,
            borderLeftColor: (_j = (_h = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _h === void 0 ? void 0 : _h.themePrimary) !== null && _j !== void 0 ? _j : currentTheme.themePrimary,
            margin: 3,
            backgroundColor: (_l = (_k = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _k === void 0 ? void 0 : _k.white) !== null && _l !== void 0 ? _l : currentTheme.white,
            boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
            ":hover": {
                borderStyle: "solid",
                borderWidth: 1,
                borderLeftStyle: "solid",
                borderLeftWidth: 3,
                borderColor: (_o = (_m = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _m === void 0 ? void 0 : _m.themePrimary) !== null && _o !== void 0 ? _o : currentTheme.themePrimary,
            },
        }),
    });
    return {
        titleStyles: titleStyles,
        stackStyles: stackStyles,
        stackTokens: stackTokens,
        styleClasses: styleClasses,
        commentTextStyles: commentTextStyles,
        showHideButtonStyles: showHideButtonStyles,
    };
};
//# sourceMappingURL=MyTeamsStyles.js.map