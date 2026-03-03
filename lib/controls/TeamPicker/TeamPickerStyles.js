import { mergeStyles, mergeStyleSets, } from "@fluentui/react/lib/Styling";
var theme = window.__themeState__.theme;
export var useTeamPickerStyles = function (themeVariant) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
    var renderIconButtonRemoveStyles = {
        root: {
            height: 26,
            lineHeight: 26
        }
    };
    var renderItemStylesMulti = {
        root: {
            height: 26,
            lineHeight: 26,
            paddingLeft: 10,
            marginLeft: 5,
            marginBottom: 5,
            cursor: "default",
            backgroundColor: (_b = (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themeLighterAlt) !== null && _b !== void 0 ? _b : theme.themeLighterAlt,
            ":hover": {
                backgroundColor: theme.themeLighter,
            },
        },
    };
    var renderItemStylesSingle = {
        root: {
            height: 26,
            lineHeight: 26,
            paddingLeft: 10,
            cursor: "default",
            margin: 2,
            backgroundColor: (_d = (_c = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _c === void 0 ? void 0 : _c.themeLighterAlt) !== null && _d !== void 0 ? _d : theme.themeLighterAlt,
            ":hover": {
                backgroundColor: (_f = (_e = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _e === void 0 ? void 0 : _e.themeLighter) !== null && _f !== void 0 ? _f : theme.themeLighter,
            },
        },
    };
    var pickerStylesSingle = {
        root: {
            width: " 100%",
            borderRadius: 0,
            marginTop: 0
        },
        input: {
            width: "100%",
            backgroundColor: (_h = (_g = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _g === void 0 ? void 0 : _g.white) !== null && _h !== void 0 ? _h : theme.white,
        },
        itemsWrapper: {},
        text: {
            borderStyle: "solid",
            width: "100%",
            borderWidth: 1,
            backgroundColor: (_k = (_j = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _j === void 0 ? void 0 : _j.white) !== null && _k !== void 0 ? _k : theme.white,
            borderRadius: 0,
            borderColor: (_m = (_l = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _l === void 0 ? void 0 : _l.neutralQuaternaryAlt) !== null && _m !== void 0 ? _m : theme.neutralQuaternaryAlt,
            ":focus": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_p = (_o = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _o === void 0 ? void 0 : _o.themePrimary) !== null && _p !== void 0 ? _p : theme.themePrimary,
            },
            ":hover": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_r = (_q = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _q === void 0 ? void 0 : _q.themePrimary) !== null && _r !== void 0 ? _r : theme.themePrimary,
            },
            ":after": {
                borderWidth: 0,
                borderRadius: 0,
            },
        },
    };
    var pickerStylesMulti = {
        root: {
            width: " 100%",
            borderRadius: 0,
        },
        input: {
            width: "100%",
            backgroundColor: (_t = (_s = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _s === void 0 ? void 0 : _s.white) !== null && _t !== void 0 ? _t : theme.white,
        },
        itemsWrapper: {
            padding: 3,
        },
        text: {
            borderStyle: "solid",
            width: "100%",
            borderWidth: 1,
            backgroundColor: (_v = (_u = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _u === void 0 ? void 0 : _u.white) !== null && _v !== void 0 ? _v : theme.white,
            borderRadius: 0,
            borderColor: (_x = (_w = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _w === void 0 ? void 0 : _w.neutralQuaternaryAlt) !== null && _x !== void 0 ? _x : theme.neutralQuaternaryAlt,
            ":focus": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_z = (_y = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _y === void 0 ? void 0 : _y.themePrimary) !== null && _z !== void 0 ? _z : theme.themePrimary,
            },
            ":hover": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_1 = (_0 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _0 === void 0 ? void 0 : _0.themePrimary) !== null && _1 !== void 0 ? _1 : theme.themePrimary,
            },
            ":after": {
                borderStyle: "solid",
                borderWidth: 1,
                // borderColor: theme.neutralQuaternaryAlt,
                borderColor: (_3 = (_2 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _2 === void 0 ? void 0 : _2.themePrimary) !== null && _3 !== void 0 ? _3 : theme.themePrimary,
            },
        },
    };
    var componentClasses = mergeStyleSets({
        eventCircleColor: mergeStyles({
            borderRadius: "50%",
            borderWidth: 3,
            borderStyle: "solid",
            padding: 10,
        }),
        separator: mergeStyles({
            marginTop: 25,
            marginLeft: 20,
            marginRight: 20,
            borderBottomWidth: 1,
            borderBottomColor: (_5 = (_4 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _4 === void 0 ? void 0 : _4.neutralQuaternaryAlt) !== null && _5 !== void 0 ? _5 : theme.neutralQuaternaryAlt,
            borderBottomStyle: "solid",
        }),
        filePickerButtonStyles: mergeStyles({
            position: "relative",
            top: -15,
        }),
        iconStyles: {
            paddingLeft: 2,
            fontWeight: 500,
            color: (_7 = (_6 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _6 === void 0 ? void 0 : _6.themePrimary) !== null && _7 !== void 0 ? _7 : theme === null || theme === void 0 ? void 0 : theme.themePrimary,
        },
    });
    return {
        componentClasses: componentClasses,
        pickerStylesMulti: pickerStylesMulti,
        pickerStylesSingle: pickerStylesSingle,
        renderItemStylesSingle: renderItemStylesSingle,
        renderItemStylesMulti: renderItemStylesMulti,
        renderIconButtonRemoveStyles: renderIconButtonRemoveStyles,
    };
};
//# sourceMappingURL=TeamPickerStyles.js.map