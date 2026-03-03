import * as React from 'react';
import { useAtom } from 'jotai';
import { globalState } from '../atoms/globalState';
export var useErrorMessageStyles = function () {
    var appGlobalState = useAtom(globalState)[0];
    var themeVariant = appGlobalState.themeVariant;
    var messageErrorContainerStyles = React.useMemo(function () {
        return {
            root: {
                width: '100%',
            },
        };
    }, [themeVariant]);
    return { messageErrorContainerStyles: messageErrorContainerStyles };
};
//# sourceMappingURL=useErrorMessageStyles.js.map