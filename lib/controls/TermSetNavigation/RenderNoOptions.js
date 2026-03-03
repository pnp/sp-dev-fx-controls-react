import * as React from 'react';
import * as strings from 'ControlStrings';
import { Image, Stack, Text, } from '@fluentui/react';
export var RenderNoOptions = function (props) {
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { tokens: { childrenGap: 10 }, verticalFill: true, verticalAlign: "start", horizontalAlign: "center" },
            React.createElement(Image, { src: require("./assets/menu-rafiki.svg"), width: 210, height: 210 }),
            React.createElement(Stack, { tokens: { childrenGap: 5 }, horizontalAlign: "center" },
                React.createElement(Text, { variant: "large" }, strings.TermSetNavigationNoTerms)))));
};
//# sourceMappingURL=RenderNoOptions.js.map