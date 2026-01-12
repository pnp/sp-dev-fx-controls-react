var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Provider } from 'jotai';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { EnhancedThemeProvider } from '../../../enhancedThemeProvider';
import { UploadFilesControl } from './UploadFilesControl';
import { useUploadFilesStyles } from './useUploadFilesStyles';
export var UploadFiles = function (props) {
    var themeVariant = props.themeVariant, title = props.title;
    var _a = useUploadFilesStyles(), mainContainer = _a.mainContainer, titleStyles = _a.titleStyles;
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { styles: mainContainer, tokens: { childrenGap: 20 } },
            React.createElement(Text, { variant: "xLarge", styles: titleStyles }, title),
            React.createElement(EnhancedThemeProvider, { context: props.context, theme: themeVariant },
                React.createElement("section", null,
                    React.createElement(Provider, null,
                        React.createElement(UploadFilesControl, __assign({}, props))))))));
};
//# sourceMappingURL=UploadFiles.js.map