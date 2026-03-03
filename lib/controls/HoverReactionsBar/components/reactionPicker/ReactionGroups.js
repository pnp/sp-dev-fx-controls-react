import * as React from 'react';
import { Button, Divider, mergeClasses, } from '@fluentui/react-components';
import fluentEmojiGroups from '../../data/fluentEmojisGroups.json';
import { useReactionPickerStyles } from './useReactionPickerStyle';
export var ReactionGroups = function (props) {
    var onSelectedGroup = props.onSelectedGroup, selectedGroup = props.selectedGroup;
    var styles = useReactionPickerStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement(Divider, null),
        React.createElement("div", { className: styles.emojiGroupContainer }, fluentEmojiGroups.map(function (group, index) {
            var groupName = group.groupName, emoji = group.emoji;
            return (React.createElement(Button, { className: styles.groupButton, key: index, onClick: function (ev) {
                    ev.preventDefault();
                    onSelectedGroup(groupName);
                }, appearance: "subtle", icon: React.createElement("div", { className: mergeClasses(styles.emojiImageGroup, selectedGroup === groupName ? styles.emojiSelected : ""), title: groupName, style: {
                        WebkitMaskImage: "url(".concat(emoji, ")"),
                        maskImage: "url(".concat(emoji, ")"),
                    } }) }));
        }))));
};
//# sourceMappingURL=ReactionGroups.js.map