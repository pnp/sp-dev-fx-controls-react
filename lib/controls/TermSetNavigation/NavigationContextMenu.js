import * as React from 'react';
import { useAtom } from 'jotai';
import { IconButton } from '@fluentui/react/lib/Button';
import { globalState } from './atoms/globalState';
export var NavigationContextMenu = function (props) {
    var moreVerticaliIcon = { iconName: "MoreVertical" };
    var appGlobalState = useAtom(globalState)[0];
    var contextMenuItems = appGlobalState.contextMenuItems, onSelectedTermAction = appGlobalState.onSelectedTermAction, selectedItem = appGlobalState.selectedItem;
    var menuProps = React.useMemo(function () {
        return {
            items: contextMenuItems.length ? contextMenuItems : [],
            directionalHintFixed: true,
            onItemClick: function (ev, item) {
                ev.preventDefault();
                onSelectedTermAction(selectedItem.data, item.text);
            },
        };
    }, [contextMenuItems]);
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { menuProps: menuProps, iconProps: moreVerticaliIcon, ariaLabel: "Menu", styles: { menuIcon: { display: "none" } } })));
};
//# sourceMappingURL=NavigationContextMenu.js.map