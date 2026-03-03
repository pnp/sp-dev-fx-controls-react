/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useReactionPickerStyles } from './useReactionPickerStyle';
export var RenderEmoji = function (props) {
    var emoji = props.emoji, onSelect = props.onSelect, className = props.className;
    var styles = useReactionPickerStyles();
    var imageUrl = React.useMemo(function () {
        try {
            var _a = emoji || {}, styles_1 = _a.styles, skintones = _a.skintones;
            var Default = (skintones || {}).Default;
            var image = styles_1 ? styles_1.Color : undefined;
            if (!image) {
                image = Default ? Default.Color : "";
            }
            return image;
        }
        catch (error) {
            console.log(error);
        }
    }, [emoji, styles]);
    if (!emoji) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("img", { src: imageUrl, alt: emoji.cldr, className: className !== null && className !== void 0 ? className : styles.emojiImage, onClick: function () {
                if (onSelect) {
                    onSelect(emoji.glyph, emoji);
                }
            } })));
};
//# sourceMappingURL=RenderEmoji.js.map