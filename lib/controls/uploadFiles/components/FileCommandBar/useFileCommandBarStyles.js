import * as React from 'react';
import { useAtom } from 'jotai';
import { mergeStyles, mergeStyleSets, } from '@fluentui/react/lib/Styling';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalState } from '../../jotai/atoms';
export var useFileCommandBarStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant, selectedFiles = appGlobalState.selectedFiles;
    var checkBoxStyles = React.useCallback(function (props) {
        var _a, _b, _c, _d;
        return {
            checkbox: {
                borderRadius: "50%",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "".concat((_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themePrimary, " !important"),
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                backgroundColor: !props.checked ? themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.white : themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themeLighter,
            },
            root: {
                alignItems: "center",
                borderColor: "".concat((_b = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _b === void 0 ? void 0 : _b.themePrimary, " !important"),
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                ":hover": {
                    ".ms-Checkbox-checkbox": {
                        backgroundColor: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themeLight, " !important"),
                    },
                },
            },
            checkmark: {
                color: "".concat((_c = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _c === void 0 ? void 0 : _c.bodyText, " !important"),
            },
            text: {
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                ":hover": {
                    color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                },
            },
            label: {
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                ":hover": {
                    borderColor: "".concat((_d = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _d === void 0 ? void 0 : _d.themePrimary, " !important"),
                    color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
                },
            },
        };
    }, [themeVariant]);
    var buttonIconStyles = React.useMemo(function () {
        return {
            root: {
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
            },
        };
    }, [themeVariant]);
    var controlStyles = React.useMemo(function () {
        var _a, _b;
        return mergeStyleSets({
            fileIconHeaderIcon: {
                padding: 0,
                fontSize: "16px",
            },
            fileIconCell: mergeStyles({
                textAlign: "center",
                selectors: {
                    "&:before": {
                        content: ".",
                        display: "inline-block",
                        verticalAlign: "middle",
                        height: "100%",
                        width: "0px",
                        visibility: "hidden",
                    },
                },
            }),
            fileIconImg: mergeStyles({
                verticalAlign: "middle",
                maxHeight: "16px",
                maxWidth: "16px",
            }),
            separator: mergeStyles({
                margin: 20,
                height: "1px",
                backgroundColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.neutralLight,
                opacity: (themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.isInverted) ? "0.2" : "1",
            }),
            separatorVertrical: mergeStyles({
                height: 25,
                width: "1px",
                borderLeftStyle: "solid",
                borderLeftWidth: "1px",
                borderLeftColor: (_b = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _b === void 0 ? void 0 : _b.themePrimary,
            }),
        });
    }, [themeVariant]);
    var commandBarStyles = React.useMemo(function () {
        return {
            root: {
                paddingLeft: 0,
                backgroundColor: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyBackground,
            },
        };
    }, [themeVariant]);
    var commandbarButtonStyles = React.useMemo(function () {
        return {
            rootHovered: {
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
            },
            labelHovered: {
                color: "".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText, " !important"),
            },
            root: {
                paddingLeft: 15,
                display: selectedFiles.length ? "block" : "none",
                color: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText,
            },
        };
    }, [selectedFiles]);
    var stackContainerStyles = React.useMemo(function () {
        return {
            root: {
                width: "100%",
                padding: "0 20px",
            },
        };
    }, [themeVariant]);
    return {
        buttonIconStyles: buttonIconStyles,
        checkBoxStyles: checkBoxStyles,
        stackContainerStyles: stackContainerStyles,
        controlStyles: controlStyles,
        commandBarStyles: commandBarStyles,
        commandbarButtonStyles: commandbarButtonStyles,
    };
};
//# sourceMappingURL=useFileCommandBarStyles.js.map