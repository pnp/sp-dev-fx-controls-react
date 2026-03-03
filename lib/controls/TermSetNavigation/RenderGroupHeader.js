import * as React from 'react';
import { FontIcon, Text, } from '@fluentui/react';
import { useNavigationStyles } from './useNavigationStyles';
export var RenderGroupHeader = function (group) {
    var textGroupLinkStyles = useNavigationStyles().textGroupLinkStyles;
    return (React.createElement(React.Fragment, null,
        React.createElement(FontIcon, { iconName: group.isExpanded ? "ChevronRight" : "ChevronDown", style: { fontSize: 16 }, onClick: function (ev) {
                ev.preventDefault();
                group.onHeaderClick(ev);
            } }),
        React.createElement(FontIcon, { iconName: "CustomList", style: { fontSize: 16 } }),
        React.createElement(Text, { styles: textGroupLinkStyles(group.groupData.termSet), variant: "large" }, group.name)));
};
//# sourceMappingURL=RenderGroupHeader.js.map