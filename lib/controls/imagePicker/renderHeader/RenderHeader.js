import * as React from 'react';
import { Button, Caption1, Subtitle1, } from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { Icon } from '@iconify/react';
import { useRenderHeaderStyles } from './useRenderHeaderStyles';
export var RenderHeader = function (props) {
    var onDismiss = props.onDismiss, title = props.title, description = props.description, icon = props.icon;
    var styles = useRenderHeaderStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.renderHeaderContent },
            React.createElement("div", { className: styles.renderHeaderHeader },
                React.createElement(Button, { appearance: "subtle", className: styles.closeButton, onClick: function () { return onDismiss(false); }, icon: React.createElement(Dismiss24Regular, null) }),
                React.createElement("div", { className: styles.renderHeaderTitleContainer },
                    React.isValidElement(icon) ? icon : React.createElement(Icon, { icon: icon, width: 24, height: 24 }),
                    React.createElement("div", { className: styles.dialogTitleAndDescriptionContainer },
                        React.isValidElement(title) ? (title) : (React.createElement(Subtitle1, { className: styles.renderHeaderTitle }, title)),
                        React.isValidElement(description) ? (description) : (React.createElement(Caption1, { className: styles.renderHeaderDescription }, description))))))));
};
//# sourceMappingURL=RenderHeader.js.map