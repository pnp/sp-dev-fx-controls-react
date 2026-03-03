import * as React from 'react';
import { useAtom } from 'jotai';
import { FontIcon, Stack, Text, } from '@fluentui/react';
import { Tag16Regular, TagMultiple16Regular, } from '@fluentui/react-icons';
import { globalState } from './atoms/globalState';
import { NavigationContextMenu } from './NavigationContextMenu';
import { useNavigationStyles } from './useNavigationStyles';
export var RenderLink = function (props) {
    var link = props.link, showContextMenu = props.showContextMenu;
    var _a = useNavigationStyles(), controlStyles = _a.controlStyles, textNavLinkStyles = _a.textNavLinkStyles;
    var appGlobalState = useAtom(globalState)[0];
    var selectedItem = appGlobalState.selectedItem, contextMenuItems = appGlobalState.contextMenuItems;
    var hasChildren = React.useMemo(function () { return link === null || link === void 0 ? void 0 : link.links.length; }, [link]);
    var onClick = React.useCallback(function (ev) {
        ev.preventDefault();
        link.isExpanded = !link.isExpanded;
    }, [link]);
    var showContext = React.useMemo(function () {
        return showContextMenu && (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.key) === link.key && contextMenuItems && contextMenuItems.length;
    }, [showContextMenu, selectedItem, contextMenuItems]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: controlStyles.navlink },
            hasChildren ? (React.createElement(React.Fragment, null,
                React.createElement(FontIcon, { iconName: link.isExpanded ? "ChevronRight" : "ChevronDown", style: { fontSize: 16, }, onClick: onClick }),
                React.createElement(TagMultiple16Regular, null))) : (React.createElement(React.Fragment, null,
                React.createElement("div", { style: { height: 16 } }),
                React.createElement(Tag16Regular, null))),
            React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between", verticalAlign: "center" },
                React.createElement(Text, { variant: "medium", styles: textNavLinkStyles(link) }, link.name),
                showContext && React.createElement(NavigationContextMenu, null)))));
};
//# sourceMappingURL=RenderLink.js.map