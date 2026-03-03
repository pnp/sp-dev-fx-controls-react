/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { useAtom } from 'jotai';
import { mergeStyles, mergeStyleSets, } from '@fluentui/react';
import { DEFAULT_PAGE_SIZE } from '../../constants/constants';
import { globalState } from '../../jotai/atoms';
/* eslint-disable @typescript-eslint/no-empty-function */
export var useDocumentListStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant, containerWidth = appGlobalState.containerWidth, pageSize = appGlobalState.pageSize, files = appGlobalState.files;
    var containerHeight = React.useMemo(function () {
        return containerWidth && files.length
            ? (Math.ceil(pageSize !== null && pageSize !== void 0 ? pageSize : DEFAULT_PAGE_SIZE) / Math.ceil(containerWidth / 180)) * 180
            : 0;
    }, [containerWidth, pageSize, files]);
    var bootomContainerStyles = React.useMemo(function () {
        return {
            root: {
                paddingLeft: 20,
                paddingRight: 20,
                paddingBottom: 20,
            }
        };
    }, []);
    var scollableContainerStyles = React.useMemo(function () {
        return {
            root: {
                position: "relative",
                height: containerHeight,
                minHeight: 500,
                overflowY: "auto",
                overflowX: "hidden",
            },
            contentContainer: {
                "::-webkit-scrollbar-thumb": {
                    backgroundColor: themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette.themeLight,
                },
                "::-webkit-scrollbar": {
                    height: 10,
                    width: 7,
                },
                "scrollbar-color": themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.semanticColors.bodyFrameBackground,
                "scrollbar-width": "thin",
            },
        };
    }, [themeVariant, containerHeight]);
    var documentListStyles = React.useMemo(function () {
        var _a;
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
            controlWrapper: mergeStyles({
                display: "flex",
                flexWrap: "wrap",
            }),
            selectionDetails: mergeStyles({
                marginBottom: "20px",
            }),
            filesContainerGrid: mergeStyles({
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))",
                columnGap: "15px",
                rowGap: 15,
            }),
            noDataFoundStyles: {
                width: "300px",
                height: "300px",
            },
            separator: mergeStyles({
                height: "1px",
                backgroundColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.neutralLight,
                opacity: (themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.isInverted) ? "0.2" : "1",
                width: "100%",
            }),
            documentList: mergeStyles({
                width: "100%",
            }),
        });
    }, [themeVariant]);
    return { bootomContainerStyles: bootomContainerStyles, documentListStyles: documentListStyles, scollableContainerStyles: scollableContainerStyles };
};
//# sourceMappingURL=useDocumentListStyles.js.map