import { classNamesFunction, styled } from '@fluentui/react/lib/Utilities';
import * as React from 'react';
import { getStyles } from './TermItem.styles';
import { IconButton } from '@fluentui/react/lib/Button';
var getClassNames = classNamesFunction();
/**
 * {@docCategory TagPicker}
 */
export var TermItemBase = function (props) {
    var theme = props.theme, styles = props.styles, selected = props.selected, disabled = props.disabled, enableTermFocusInDisabledPicker = props.enableTermFocusInDisabledPicker, children = props.children, className = props.className, index = props.index, onRemoveItem = props.onRemoveItem, removeButtonAriaLabel = props.removeButtonAriaLabel;
    var classNames = getClassNames(styles, {
        theme: theme,
        className: className,
        selected: selected,
        disabled: disabled,
    });
    return (React.createElement("div", { className: classNames.root, role: 'listitem', key: index, "data-selection-index": index, "data-is-focusable": (enableTermFocusInDisabledPicker || !disabled) && true },
        React.createElement("span", { className: classNames.text, "aria-label": children, title: children }, children),
        React.createElement(IconButton, { onClick: onRemoveItem, disabled: disabled, iconProps: { iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }, className: classNames.close, ariaLabel: removeButtonAriaLabel })));
};
export var TermItem = styled(TermItemBase, getStyles, undefined, {
    scope: 'TermItem',
});
//# sourceMappingURL=TermItem.js.map