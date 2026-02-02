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
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import * as React from 'react';
export var ShowMessage = function (props) {
    if (props.isShow) {
        return (React.createElement(React.Fragment, null,
            React.createElement(MessageBar, __assign({}, props), props.message)));
    }
    // nullRender
    return null;
};
//# sourceMappingURL=ShowMessage.js.map