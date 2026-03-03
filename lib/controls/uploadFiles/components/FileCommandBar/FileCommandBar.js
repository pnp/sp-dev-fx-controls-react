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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-use-before-define */
import * as React from 'react';
import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { ActionButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { CommandBar, } from '@fluentui/react/lib/CommandBar';
import { Stack } from '@fluentui/react/lib/Stack';
import { globalState } from '../../jotai/atoms';
import { UploadButton } from '../UploadButton/UploadButton';
import { useFileCommandBarStyles } from './useFileCommandBarStyles';
export var FileCommandBar = function (props) {
    var _a = useFileCommandBarStyles(), stackContainerStyles = _a.stackContainerStyles, commandBarStyles = _a.commandBarStyles, controlStyles = _a.controlStyles, commandbarButtonStyles = _a.commandbarButtonStyles, checkBoxStyles = _a.checkBoxStyles, buttonIconStyles = _a.buttonIconStyles;
    var _b = useAtom(globalState), appGlobalState = _b[0], setGlobalState = _b[1];
    var selectedFiles = appGlobalState.selectedFiles, files = appGlobalState.files;
    var _c = React.useState([]), commandbarItems = _c[0], setCOmmandBarItems = _c[1];
    var _d = React.useState(false), isAllSelected = _d[0], setIsAllSelected = _d[1];
    var onUpload = props.onUpload, onDelete = props.onDelete, onSelectedAll = props.onSelectedAll;
    var commandDeleteButton = React.useCallback(function (props) {
        return (React.createElement(ActionButton, { iconProps: { iconName: "Delete", styles: buttonIconStyles }, styles: commandbarButtonStyles, onClick: function () {
                setIsAllSelected(false);
                onDelete();
            }, text: strings.UpLoadFilesDeleteButtonLabel }));
    }, [selectedFiles, commandbarButtonStyles]);
    React.useEffect(function () {
        if (isAllSelected) {
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { selectedFiles: files });
            });
        }
        else {
            setGlobalState(function (prevState) {
                return __assign(__assign({}, prevState), { selectedFiles: [] });
            });
        }
    }, [isAllSelected, files]);
    var commanbarSelectAllButton = React.useCallback(function (props) {
        var selectedAll = files.length > 0 && files.length === selectedFiles.length;
        return (React.createElement(Stack, { horizontal: true, verticalAlign: "center", horizontalAlign: "start", tokens: { childrenGap: 15 } },
            files.length > 0 ? (React.createElement(Checkbox, { styles: checkBoxStyles, label: strings.UpLoadFilesSelectAllLabel, checked: selectedAll, onChange: function (ev, checked) {
                    setIsAllSelected(checked);
                    onSelectedAll(checked);
                } })) : null,
            selectedFiles.length ? React.createElement("div", { className: controlStyles.separatorVertrical }) : null));
    }, [files.length, selectedFiles.length, checkBoxStyles, controlStyles.separatorVertrical, onSelectedAll]);
    React.useEffect(function () {
        var items = [];
        items.push({
            key: "selectedFiles",
            commandBarButtonAs: commanbarSelectAllButton,
        });
        items.push({
            key: "delete",
            commandBarButtonAs: commandDeleteButton,
        });
        setCOmmandBarItems(items);
    }, [commanbarSelectAllButton, commandDeleteButton]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { horizontal: true, horizontalAlign: "space-between", verticalAlign: "center", styles: stackContainerStyles },
            React.createElement(CommandBar, { items: commandbarItems, styles: commandBarStyles }),
            React.createElement(UploadButton, { text: strings.UploadFilesButtonLabel, onUpload: onUpload, iconName: "Add" })),
        React.createElement("div", { className: controlStyles.separator })));
};
//# sourceMappingURL=FileCommandBar.js.map