import { mergeStyles, mergeStyleSets, } from "@fluentui/react/lib/Styling";
var theme = window.__themeState__.theme;
export var useTeamChannelPickerStyles = function (themeVariant) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23;
    var renderIconButtonRemoveStyles = {
        root: {
            height: 26,
            lineHeight: 26,
        },
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
                backgroundColor: (_d = (_c = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _c === void 0 ? void 0 : _c.themeLighter) !== null && _d !== void 0 ? _d : theme.themeLighter,
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
            backgroundColor: (_f = (_e = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _e === void 0 ? void 0 : _e.themeLighterAlt) !== null && _f !== void 0 ? _f : theme.themeLighterAlt,
            ":hover": {
                backgroundColor: (_h = (_g = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _g === void 0 ? void 0 : _g.themeLighter) !== null && _h !== void 0 ? _h : theme.themeLighter,
            },
        },
    };
    var pickerStylesSingle = {
        root: {
            width: " 100%",
            borderRadius: 0,
        },
        input: {
            width: "100%",
            backgroundColor: (_k = (_j = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _j === void 0 ? void 0 : _j.white) !== null && _k !== void 0 ? _k : theme.white,
        },
        itemsWrapper: {},
        text: {
            borderStyle: "solid",
            width: "100%",
            borderWidth: 1,
            backgroundColor: (_m = (_l = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _l === void 0 ? void 0 : _l.white) !== null && _m !== void 0 ? _m : theme.white,
            borderRadius: 0,
            borderColor: (_p = (_o = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _o === void 0 ? void 0 : _o.neutralQuaternaryAlt) !== null && _p !== void 0 ? _p : theme.neutralQuaternaryAlt,
            ":focus": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_r = (_q = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _q === void 0 ? void 0 : _q.themePrimary) !== null && _r !== void 0 ? _r : theme.themePrimary,
            },
            ":hover": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_t = (_s = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _s === void 0 ? void 0 : _s.themePrimary) !== null && _t !== void 0 ? _t : theme.themePrimary,
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
            backgroundColor: (_v = (_u = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _u === void 0 ? void 0 : _u.white) !== null && _v !== void 0 ? _v : theme.white,
        },
        itemsWrapper: {
            padding: 3,
        },
        text: {
            borderStyle: "solid",
            width: "100%",
            borderWidth: 1,
            backgroundColor: (_x = (_w = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _w === void 0 ? void 0 : _w.white) !== null && _x !== void 0 ? _x : theme.white,
            borderRadius: 0,
            borderColor: (_z = (_y = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _y === void 0 ? void 0 : _y.neutralQuaternaryAlt) !== null && _z !== void 0 ? _z : theme.neutralQuaternaryAlt,
            ":focus": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_1 = (_0 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _0 === void 0 ? void 0 : _0.themePrimary) !== null && _1 !== void 0 ? _1 : theme.themePrimary,
            },
            ":hover": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_3 = (_2 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _2 === void 0 ? void 0 : _2.themePrimary) !== null && _3 !== void 0 ? _3 : theme.themePrimary,
            },
            ":after": {
                borderStyle: "solid",
                borderWidth: 1,
                // borderColor: theme.neutralQuaternaryAlt,
                borderColor: (_5 = (_4 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _4 === void 0 ? void 0 : _4.themePrimary) !== null && _5 !== void 0 ? _5 : theme.themePrimary,
            },
        },
    };
    var pickerStyles = {
        root: {
            width: " 100%",
            borderRadius: 0,
        },
        input: {
            borderTopStyle: "solid",
            width: "100%",
            borderTopWidth: 0,
            backgroundColor: (_7 = (_6 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _6 === void 0 ? void 0 : _6.white) !== null && _7 !== void 0 ? _7 : theme.white,
            borderRadius: 0,
        },
        itemsWrapper: {
            padding: 5,
        },
        text: {
            borderStyle: "solid",
            width: "100%",
            borderWidth: 1,
            backgroundColor: (_9 = (_8 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _8 === void 0 ? void 0 : _8.white) !== null && _9 !== void 0 ? _9 : theme.white,
            borderRadius: 0,
            borderColor: (_11 = (_10 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _10 === void 0 ? void 0 : _10.neutralQuaternaryAlt) !== null && _11 !== void 0 ? _11 : theme.neutralQuaternaryAlt,
            ":focus": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_13 = (_12 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _12 === void 0 ? void 0 : _12.themePrimary) !== null && _13 !== void 0 ? _13 : theme.themePrimary,
            },
            ":hover": {
                borderStyle: "solid",
                borderWidth: 1,
                borderColor: (_15 = (_14 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _14 === void 0 ? void 0 : _14.themePrimary) !== null && _15 !== void 0 ? _15 : theme.themePrimary,
            },
            ":after": {
                borderStyle: "solid",
                borderWidth: 1,
                // borderColor: theme.neutralQuaternaryAlt,
                borderColor: (_17 = (_16 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _16 === void 0 ? void 0 : _16.themePrimary) !== null && _17 !== void 0 ? _17 : theme.themePrimary,
            },
        },
    };
    var componentClasses = mergeStyleSets({
        separator: mergeStyles({
            marginTop: 25,
            marginLeft: 20,
            marginRight: 20,
            borderBottomWidth: 1,
            borderBottomColor: (_19 = (_18 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _18 === void 0 ? void 0 : _18.neutralQuaternaryAlt) !== null && _19 !== void 0 ? _19 : theme === null || theme === void 0 ? void 0 : theme.neutralQuaternaryAlt,
            borderBottomStyle: "solid",
        }),
        iconChannelItemStyles: {
            fontSize: 14,
            color: (_21 = (_20 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _20 === void 0 ? void 0 : _20.themePrimary) !== null && _21 !== void 0 ? _21 : theme.themePrimary
        },
        iconChannelInfoStyles: {
            fontSize: 12,
            color: (_23 = (_22 = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _22 === void 0 ? void 0 : _22.themePrimary) !== null && _23 !== void 0 ? _23 : theme.themePrimary
        },
    });
    return {
        renderIconButtonRemoveStyles: renderIconButtonRemoveStyles,
        pickerStyles: pickerStyles,
        renderItemStylesSingle: renderItemStylesSingle,
        renderItemStylesMulti: renderItemStylesMulti,
        pickerStylesMulti: pickerStylesMulti,
        pickerStylesSingle: pickerStylesSingle,
        componentClasses: componentClasses
    };
};
//# sourceMappingURL=TeamChannelPickerStyles.js.map