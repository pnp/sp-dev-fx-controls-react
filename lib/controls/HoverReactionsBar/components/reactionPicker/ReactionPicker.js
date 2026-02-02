var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import * as React from 'react';
import strings from 'ControlStrings';
import { Card, Input, tokens } from '@fluentui/react-components';
import { Icon } from '@iconify/react';
import emojiList from '../../data/fluentEmojis.json';
import { useFluentEmojis } from '../../hooks/useFluentEmojis';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { ReactionGroups } from './ReactionGroups';
import { RenderEmoji } from './RenderEmoji';
import { useReactionPickerStyles } from './useReactionPickerStyle';
var PICKER_WIDTH = 350;
var PICKER_HEIGHT = 420;
var DEFAULT_GROUP = 'Smileys & Emotion';
export var ReactionPicker = function (props) {
    var onSelect = props.onSelect, isOpen = props.isOpen, onDismiss = props.onDismiss, returnType = props.returnType, target = props.target;
    var pickerRef = React.useRef(null);
    var styles = useReactionPickerStyles();
    var _a = React.useState([]), renderEmoji = _a[0], setRenderEmoji = _a[1];
    var _b = React.useState(''), searchValue = _b[0], setSearchValue = _b[1];
    var _c = React.useState(), groups = _c[0], setGroups = _c[1];
    var _d = React.useState(DEFAULT_GROUP), selectedGroup = _d[0], setSelectedGroup = _d[1];
    var groupsRef = React.useRef();
    var _e = React.useState(), pickerStyles = _e[0], setStyles = _e[1];
    var isSearchingRef = React.useRef(false);
    var _f = useFluentEmojis(), getFluentEmojisByGroup = _f.getFluentEmojisByGroup, getFluentEmojis = _f.getFluentEmojis;
    var onClose = React.useCallback(function () {
        onDismiss();
    }, [onDismiss]);
    useOnClickOutside(true, pickerRef, onClose);
    var loadEmoji = React.useCallback(function (selectedGroup) {
        isSearchingRef.current = false;
        setSearchValue('');
        if (!(groupsRef === null || groupsRef === void 0 ? void 0 : groupsRef.current)) {
            return;
        }
        var emojiList = selectedGroup
            ? groupsRef.current[selectedGroup]
            : groups[DEFAULT_GROUP];
        setRenderEmoji([]);
        var _loop_1 = function (index) {
            var emojiInfo = emojiList[index];
            if (emojiInfo) {
                setRenderEmoji(function (emojis) {
                    return __spreadArray(__spreadArray([], emojis, true), [
                        React.createElement(RenderEmoji, { key: index, emoji: emojiInfo, onSelect: function (emoji) {
                                document.body.style.pointerEvents = '';
                                onSelect(emoji, emojiInfo);
                                onDismiss();
                            } }),
                    ], false);
                });
            }
        };
        for (var index = 0; index < emojiList.length; index++) {
            _loop_1(index);
        }
    }, [emojiList, onSelect, onDismiss, groups, returnType]);
    React.useEffect(function () {
        var countainerBounds = target === null || target === void 0 ? void 0 : target.getBoundingClientRect();
        var pickerTopPosition = 0;
        var pickerLeftPosition = 0;
        if ((countainerBounds === null || countainerBounds === void 0 ? void 0 : countainerBounds.top) + PICKER_HEIGHT > window.innerHeight) {
            pickerTopPosition = countainerBounds.top - PICKER_HEIGHT - 10;
            if (pickerTopPosition < 0) {
                pickerTopPosition = 0;
            }
        }
        else {
            pickerTopPosition = (countainerBounds === null || countainerBounds === void 0 ? void 0 : countainerBounds.bottom) + 10;
            if (pickerTopPosition < 0) {
                pickerTopPosition = 0;
            }
        }
        if ((countainerBounds === null || countainerBounds === void 0 ? void 0 : countainerBounds.left) + PICKER_WIDTH > window.innerWidth) {
            pickerLeftPosition = (countainerBounds === null || countainerBounds === void 0 ? void 0 : countainerBounds.left) - PICKER_WIDTH;
        }
        else {
            pickerLeftPosition = countainerBounds === null || countainerBounds === void 0 ? void 0 : countainerBounds.left;
        }
        setStyles({
            top: "".concat(pickerTopPosition, "px"),
            left: "".concat(pickerLeftPosition, "px"),
            zIndex: '1000000',
            display: isOpen ? 'block' : 'none',
        });
    }, [target, isOpen, pickerRef]);
    React.useEffect(function () {
        var listByGroup = getFluentEmojisByGroup();
        groupsRef.current = listByGroup;
        setGroups(listByGroup);
    }, []);
    React.useEffect(function () {
        setRenderEmoji([]);
        setSearchValue('');
        loadEmoji(DEFAULT_GROUP);
    }, [isOpen]);
    var searchEmoji = React.useCallback(function (searchText) {
        isSearchingRef.current = true;
        var mewlist = getFluentEmojis().filter(function (emojiInfo) {
            var _a;
            if (emojiInfo) {
                return (_a = emojiInfo.keywords) === null || _a === void 0 ? void 0 : _a.some(function (keyword) {
                    return keyword.includes(searchText);
                });
            }
            return false;
        });
        setRenderEmoji([]);
        var _loop_2 = function (index) {
            var emojiInfo = mewlist[index];
            if (emojiInfo) {
                setRenderEmoji(function (emojis) {
                    return __spreadArray(__spreadArray([], emojis, true), [
                        React.createElement(RenderEmoji, { key: index, emoji: emojiInfo, onSelect: function (emoji) {
                                onSelect(emoji, emojiInfo);
                                onDismiss();
                            } }),
                    ], false);
                });
            }
        };
        for (var index = 0; index < mewlist.length; index++) {
            _loop_2(index);
        }
    }, [onSelect, onDismiss, groups, returnType]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { className: styles.card, style: pickerStyles, ref: pickerRef },
            React.createElement("div", { className: styles.cardContent },
                React.createElement(Input, { value: searchValue, placeholder: strings.HoverReactionBarSearchEmojiPlaceholder, onChange: function (ev, data) {
                        var _a;
                        setSearchValue((data === null || data === void 0 ? void 0 : data.value) || '');
                        if (!((_a = ev.currentTarget) === null || _a === void 0 ? void 0 : _a.value)) {
                            loadEmoji(selectedGroup);
                        }
                        else {
                            searchEmoji(ev.currentTarget.value);
                        }
                    }, type: "search", className: styles.searchBox, contentBefore: React.createElement(Icon, { icon: "fluent:search-20-regular", color: tokens.colorBrandForeground1 }), onKeyDown: function (ev) {
                        if (ev.key === 'Enter') {
                            searchEmoji(ev.currentTarget.value);
                        }
                    } }),
                React.createElement("div", { className: styles.emojiList }, renderEmoji),
                isSearchingRef.current ? null : (React.createElement(ReactionGroups, { selectedGroup: selectedGroup, groups: groups, onSelectedGroup: function (groupName) {
                        setSelectedGroup(groupName);
                        loadEmoji(groupName);
                    } }))))));
};
//# sourceMappingURL=ReactionPicker.js.map