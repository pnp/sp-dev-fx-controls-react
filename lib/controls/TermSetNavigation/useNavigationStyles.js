/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useAtom } from 'jotai';
import { mergeStyles, mergeStyleSets, } from '@fluentui/react';
import { globalState } from './atoms/globalState';
export var useNavigationStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant, selectedItem = appGlobalState.selectedItem, termSetId = appGlobalState.termSetId;
    var stackSelctedItemStyles = React.useCallback(function (isSelected) {
        var _a;
        return {
            root: {
                backgroundColor: isSelected ? (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyBackgroundChecked : "",
                borderLeft: isSelected ? "2px solid ".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themePrimary) : "",
            },
        };
    }, [themeVariant]);
    var navStyles = React.useCallback(function () {
        return {
            root: {
                overflowX: "hidden",
                overflowY: "auto",
            },
            chevronButton: { display: "none" },
            chevronIcon: { display: "none" },
        };
    }, [themeVariant]);
    var stackGroupHeaderStyles = React.useCallback(function (item) {
        var _a, _b;
        return {
            root: {
                backgroundColor: termSetId === (item === null || item === void 0 ? void 0 : item.id) ? (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyBackgroundChecked : "",
                borderLeft: termSetId === (item === null || item === void 0 ? void 0 : item.id) ? "2px solid ".concat(themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themePrimary) : "",
                ":hover": {
                    backgroundColor: (_b = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _b === void 0 ? void 0 : _b.bodyBackgroundHovered,
                },
            },
        };
    }, [themeVariant, termSetId]);
    var textNavLinkStyles = React.useCallback(function (item) {
        var _a;
        return {
            root: {
                color: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyText,
                display: "-webkit-box",
                "-webkit-line-clamp": "1",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                textAlign: "start",
                textOverflow: "ellipsis",
                cursor: "pointer",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                fontWeight: selectedItem === item ? "bold" : "normal",
            },
        };
    }, [themeVariant, selectedItem]);
    var textGroupLinkStyles = React.useCallback(function (item) {
        var _a;
        return {
            root: {
                color: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyText,
                display: "-webkit-box",
                "-webkit-line-clamp": "1",
                "-webkit-box-orient": "vertical",
                overflow: "hidden",
                textAlign: "start",
                textOverflow: "ellipsis",
                cursor: "pointer",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                wordBreak: "break-word",
                fontWeight: termSetId === (item === null || item === void 0 ? void 0 : item.id) ? "bold" : "normal",
            },
        };
    }, [themeVariant, termSetId]);
    var stackNavigationContainerStyles = React.useMemo(function () {
        var _a;
        return {
            root: {
                border: "1px solid ".concat((_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors) === null || _a === void 0 ? void 0 : _a.bodyDivider),
                minHeight: "600px",
                color: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyText,
                paddingTop: 15,
                paddingBottom: 15,
            },
        };
    }, [themeVariant]);
    var controlStyles = React.useMemo(function () {
        var _a;
        return mergeStyleSets({
            layout: mergeStyles({
                display: "grid",
                gridGap: "20px",
                gridTemplateColumns: "1fr 4fr",
                gridTemplateAreas: "\n        \"sidebar  content\"\n\n      \"sidebar  footer\"",
                width: "100%",
                height: "100%",
                gridTemplateRows: "1fr 50px",
            }),
            navlink: mergeStyles({
                display: "grid",
                gridColumnGap: "10px",
                gridTemplateColumns: "20px 20px 1fr",
                alignItems: "center",
                width: "100%",
            }),
            separator: mergeStyles({
                height: "1px",
                backgroundColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themeLight,
                opacity: (themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.isInverted) ? "0.2" : "1",
                width: "100%",
            }),
        });
    }, [themeVariant]);
    return {
        textNavLinkStyles: textNavLinkStyles,
        textGroupLinkStyles: textGroupLinkStyles,
        stackGroupHeaderStyles: stackGroupHeaderStyles,
        stackNavigationContainerStyles: stackNavigationContainerStyles,
        controlStyles: controlStyles,
        navStyles: navStyles,
        stackSelctedItemStyles: stackSelctedItemStyles,
    };
};
//# sourceMappingURL=useNavigationStyles.js.map