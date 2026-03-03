/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from 'react';
import { useAtom } from 'jotai';
import { Field, Input, } from '@fluentui/react-components';
import { globalState } from './atoms/globalState';
import { PopUpMenu } from './PopUpMenu';
import { User } from './User';
import { useUserPickerPositioning } from './useUserPickerPositioning';
import { useUserPickerStyles } from './useUserPickerStyles';
export var UserPickerControl = function (props) {
    var userSelectionLimit = props.userSelectionLimit, label = props.label, required = props.required, validationMessage = props.validationMessage, messageType = props.messageType, onSelectedUsers = props.onSelectedUsers, onRemoveSelectedUser = props.onRemoveSelectedUser, defaultSelectdUsers = props.defaultSelectdUsers, placeholder = props.placeholder, secondaryTextPropertyName = props.secondaryTextPropertyName;
    var buttonRef = React.useRef(null);
    var positioningRef = React.useRef(null);
    var _a = React.useState(false), open = _a[0], setOpen = _a[1];
    var _b = useAtom(globalState), appGlobalState = _b[0], setAppGlobalState = _b[1];
    var selectedUsers = appGlobalState.selectedUsers;
    var _c = React.useState(''), searchUser = _c[0], setSearchUser = _c[1];
    /*  const forceUpdate = React.useReducer(() => ({}), {})[1] as () => void; */
    var _d = useUserPickerPositioning(props), userPickerPopupRef = _d[0], userPickerTargetRef = _d[1];
    var styles = useUserPickerStyles();
    React.useEffect(function () {
        setAppGlobalState(__assign(__assign({}, appGlobalState), props));
    }, [props]);
    React.useEffect(function () {
        var _a;
        if (buttonRef.current) {
            (_a = positioningRef.current) === null || _a === void 0 ? void 0 : _a.setTarget(buttonRef.current);
        }
    }, [buttonRef, positioningRef]);
    React.useEffect(function () {
        if (defaultSelectdUsers) {
            setAppGlobalState(__assign(__assign({}, appGlobalState), { selectedUsers: defaultSelectdUsers }));
        }
    }, []);
    var hasSelectedUsers = React.useMemo(function () {
        if (selectedUsers.length > 0) {
            if (onSelectedUsers)
                onSelectedUsers(selectedUsers);
            return true;
        }
    }, [selectedUsers]);
    var showInput = React.useMemo(function () {
        return userSelectionLimit
            ? selectedUsers.length < userSelectionLimit
            : true;
    }, [selectedUsers, userSelectionLimit]);
    var onRemove = React.useCallback(function (userId) {
        var newUsers = selectedUsers.filter(function (user) { return user.mail !== userId; });
        var removedUser = selectedUsers.filter(function (user) { return user.mail === userId; });
        setAppGlobalState(__assign(__assign({}, appGlobalState), { selectedUsers: newUsers }));
        if (onRemoveSelectedUser) {
            onRemoveSelectedUser(removedUser[0]);
        }
    }, [selectedUsers]);
    var RenderSelectedUsers = React.useCallback(function () {
        return (React.createElement(React.Fragment, null, selectedUsers.map(function (user) {
            var _a;
            return (React.createElement(React.Fragment, null,
                React.createElement("div", { className: styles.userItem, key: user.mail },
                    React.createElement(User, { userId: (_a = user.mail) !== null && _a !== void 0 ? _a : '', onRemove: onRemove, secondaryTextPropertyName: secondaryTextPropertyName }))));
        })));
    }, [selectedUsers]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { width: '100%' }, ref: userPickerTargetRef },
            React.createElement(Field, { label: label, required: required !== null && required !== void 0 ? required : false, validationMessage: validationMessage !== null && validationMessage !== void 0 ? validationMessage : undefined, validationState: messageType },
                React.createElement("div", { className: styles.selectUserMainContainer },
                    hasSelectedUsers ? (React.createElement("div", { className: styles.selectedUserContainer },
                        React.createElement(RenderSelectedUsers, null))) : null,
                    showInput ? (React.createElement("div", { className: styles.inputContainer },
                        React.createElement(Input, { value: searchUser, appearance: "underline", style: { borderWidth: 0, width: '100%' }, type: "text", placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : 'Search User', onChange: function (event, data) {
                                setSearchUser(data.value);
                                if (data.value.length === 0) {
                                    setSearchUser('');
                                    setOpen(false);
                                }
                                else {
                                    if (data.value.length >= 2) {
                                        setOpen(true);
                                    }
                                    else {
                                        setOpen(false);
                                    }
                                }
                            } }),
                        open ? (React.createElement(PopUpMenu, { secondaryTextPropertyName: secondaryTextPropertyName, containerRef: userPickerPopupRef, searchValue: searchUser, isOpen: open, onDismiss: function (open) {
                                setOpen(false);
                                setSearchUser('');
                            } })) : null)) : null)))));
};
//# sourceMappingURL=UserPickerControl.js.map