import React from 'react';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useAtom } from 'jotai';
import { FontWeights } from '@fluentui/react/lib/Styling';
import { globalState } from '../../jotai/atoms/globalState';
export var useUploadFilesStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant;
    var titleStyles = React.useMemo(function () {
        return {
            root: {
                paddingRight: 20,
                paddingLeft: 20,
                fontWeight: FontWeights.semibold,
            },
        };
    }, [themeVariant]);
    var mainContainer = React.useMemo(function () {
        return {
            root: {
                height: "100%",
                width: "100%",
                overflow: "hidden",
            },
        };
    }, [themeVariant]);
    return { titleStyles: titleStyles, mainContainer: mainContainer };
};
//# sourceMappingURL=useUploadFilesStyles.js.map