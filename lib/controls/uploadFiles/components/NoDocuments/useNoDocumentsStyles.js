import * as React from 'react';
import { useAtom } from 'jotai';
import { mergeStyles, mergeStyleSets, } from '@fluentui/react/lib/Styling';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalState } from '../../jotai/atoms';
export var useNoDocumentsStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant;
    var controlStyles = React.useMemo(function () {
        var _a;
        return mergeStyleSets({
            iconStyles: mergeStyles({
                fontSize: 34,
                color: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.themePrimary,
            }),
        });
    }, [themeVariant]);
    var stackContainerStyles = React.useMemo(function () {
        var _a, _b;
        return {
            root: {
                width: "100%",
                height: 450,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: (_a = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _a === void 0 ? void 0 : _a.neutralLighterAlt,
                borderWidth: 1,
                borderStyle: "dashed",
                borderColor: (_b = themeVariant === null || themeVariant === void 0 ? void 0 : themeVariant.palette) === null || _b === void 0 ? void 0 : _b.neutralTertiaryAlt,
            },
        };
    }, [themeVariant,]);
    return { stackContainerStyles: stackContainerStyles, controlStyles: controlStyles };
};
//# sourceMappingURL=useNoDocumentsStyles.js.map