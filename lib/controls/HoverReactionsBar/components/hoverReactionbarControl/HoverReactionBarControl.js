/* eslint-disable no-unused-expressions */
/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';
import { Card } from '@fluentui/react-components';
import { Icon } from '@iconify/react';
import { useFluentEmojis } from '../../hooks/useFluentEmojis';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ReactionPicker } from '../reactionPicker/ReactionPicker';
import { RenderEmoji } from '../reactionPicker/RenderEmoji';
import { useHoverReactionsStyles } from './useHoverReactionsStyles';
export var HoverReactionsBarControl = function (props) {
    var onSelect = props.onSelect, isOpen = props.isOpen, onDismiss = props.onDismiss, top4Reactions = props.top4Reactions, target = props.target;
    var _a = React.useState(false), showEmojiPicker = _a[0], setShowEmojiPicker = _a[1];
    var getFluentEmojiByName = useFluentEmojis().getFluentEmojiByName;
    var styles = useHoverReactionsStyles();
    var _b = React.useState([]), renderEmoji = _b[0], setRenderEmoji = _b[1];
    var defaultTop4Reactions = ["Thumbs up", "Red heart", "grinning face with big eyes", "Face with open mouth"];
    var toolbarRef = React.useRef(null);
    var onClose = React.useCallback(function () {
        onDismiss();
    }, [onDismiss]);
    useOnClickOutside(true, toolbarRef, onClose);
    var loadEmoji = React.useCallback(function () {
        var topReaction = top4Reactions && (top4Reactions === null || top4Reactions === void 0 ? void 0 : top4Reactions.length) > 0 ? top4Reactions : defaultTop4Reactions;
        var renderEmoji = [];
        for (var _i = 0, topReaction_1 = topReaction; _i < topReaction_1.length; _i++) {
            var emojii = topReaction_1[_i];
            var emojiInfo = getFluentEmojiByName(emojii);
            if (emojiInfo) {
                renderEmoji.push(React.createElement(RenderEmoji, { key: emojii, className: styles.emojiImage, emoji: emojiInfo, onSelect: function (emoji, emojiInfo) {
                        onSelect(emoji, emojiInfo);
                    } }));
            }
        }
        renderEmoji.push(React.createElement(Icon, { key: "add", className: styles.emojiImage, icon: "fluent:emoji-add-16-regular", width: 30, height: 30, onClick: function (ev) {
                ev.preventDefault();
                ev.stopPropagation();
                setShowEmojiPicker(true);
            } }));
        setRenderEmoji(renderEmoji);
    }, [getFluentEmojiByName, onSelect, onDismiss, top4Reactions, defaultTop4Reactions]);
    React.useEffect(function () {
        setRenderEmoji([]);
        loadEmoji();
    }, [isOpen]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { className: styles.card, style: {
                display: isOpen ? "block" : "none",
                top: (target === null || target === void 0 ? void 0 : target.offsetTop) - 55,
                left: target === null || target === void 0 ? void 0 : target.offsetLeft,
            }, ref: toolbarRef },
            React.createElement("div", { className: styles.cardContent },
                React.createElement("div", { className: styles.emojiList }, renderEmoji)),
            showEmojiPicker && (React.createElement(ReactionPicker, { returnType: "image", isOpen: showEmojiPicker, onDismiss: function () {
                    setShowEmojiPicker(false);
                }, onSelect: onSelect, target: toolbarRef === null || toolbarRef === void 0 ? void 0 : toolbarRef.current })))));
};
//# sourceMappingURL=HoverReactionBarControl.js.map