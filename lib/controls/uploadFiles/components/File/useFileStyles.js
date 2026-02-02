import * as React from 'react';
import { useAtom } from 'jotai';
import { FontSizes, FontWeights, mergeStyleSets, } from '@fluentui/react/lib/Styling';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalState } from '../../jotai/atoms';
export var useFileStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant;
    var documentImageStyles = React.useMemo(function () {
        return {
            root: {},
        };
    }, []);
    var checkBoxStyles = React.useCallback(function (props) {
        var _a, _b, _c, _d, _e;
        return {
            checkbox: {
                color: "".concat((_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyText, " !important"),
                borderRadius: "50%",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: (_b = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _b === void 0 ? void 0 : _b.neutralQuaternaryAlt,
                ":hover": {
                    borderColor: "".concat((_c = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _c === void 0 ? void 0 : _c.themePrimary, " !important"),
                },
                backgroundColor: !props.checked ? themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.white : themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themeLighter,
            },
            root: {
                ":hover": {
                    borderColor: "".concat((_d = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _d === void 0 ? void 0 : _d.themePrimary, " !important"),
                    color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                    ":hover": {
                        ".ms-Checkbox-checkbox": {
                            backgroundColor: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themeLight, " !important"),
                        }
                    },
                },
            },
            checkmark: {
                color: "".concat((_e = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _e === void 0 ? void 0 : _e.bodyText, " !important"),
            },
        };
    }, [themeVariant]);
    var documentCardStyles = React.useMemo(function () {
        var _a;
        return {
            root: {
                color: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText,
                backgroundColor: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyBackground,
                borderColor: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.neutralLight,
                minWidth: 160,
                minHeight: 180,
                ":hover": {
                    borderColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.neutralQuaternary,
                },
            },
        };
    }, [themeVariant]);
    var documentCardCompactStyles = React.useMemo(function () {
        var _a;
        return {
            root: {
                width: "100%",
                maxWidth: "100%",
                ":hover": {
                    borderColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themeLight,
                },
            },
        };
    }, [themeVariant]);
    var stackCheckboxStyles = React.useMemo(function () {
        return { root: { position: "absolute", top: 0, right: 0, zIndex: 1, padding: 5 } };
    }, []);
    var fileNameStyles = React.useMemo(function () {
        return { root: { fontWeight: FontWeights.semibold,
                color: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText,
            } };
    }, [themeVariant]);
    var nameStyles = React.useMemo(function () {
        return {
            root: {
                textTransform: "uppercase",
                fontSize: FontSizes.size12,
                fontWeight: 600,
                display: "-webkit-box",
                "-webkit-line-clamp": "1",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                textAlign: "start",
                wordBreak: "break-word",
                color: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText,
            },
        };
    }, [themeVariant]);
    var controlStyles = React.useMemo(function () {
        var _a;
        return mergeStyleSets({
            ".ms-Checkbox-text": {
                color: "".concat((_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyText, " !important"),
            },
        });
    }, [themeVariant]);
    return {
        documentCardCompactStyles: documentCardCompactStyles,
        checkBoxStyles: checkBoxStyles,
        documentCardStyles: documentCardStyles,
        stackCheckboxStyles: stackCheckboxStyles,
        fileNameStyles: fileNameStyles,
        nameStyles: nameStyles,
        documentImageStyles: documentImageStyles,
        controlStyles: controlStyles
    };
};
//# sourceMappingURL=useFileStyles.js.map