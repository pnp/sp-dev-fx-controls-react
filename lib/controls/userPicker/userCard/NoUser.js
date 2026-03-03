import * as React from 'react';
import { Body1 } from '@fluentui/react-text';
import { Icon } from '@iconify/react';
import { useUserCardStyles } from './useUserCardStyles';
export var NoUser = function (props) {
    var styles = useUserCardStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.root, style: { padding: 10 } },
            React.createElement(Icon, { icon: "fluent:people-error-20-filled", width: "28", height: "28" }),
            React.createElement(Body1, null, "No user found"))));
};
//# sourceMappingURL=NoUser.js.map