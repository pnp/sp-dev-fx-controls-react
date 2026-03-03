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
import * as React from "react";
import strings from "ControlStrings";
import { Body1, Field, makeStyles, Radio, RadioGroup, shorthands, tokens, } from "@fluentui/react-components";
import { WebAssetRegular } from "@fluentui/react-icons";
import { EUploadLocations } from "../constants/EUploadLocations";
var useStyles = makeStyles({
    root: __assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start" }, shorthands.gap("5px")),
    iconStyles: {
        width: "18px",
        height: "18px",
        color: tokens.colorBrandForeground1,
    },
});
var RenderLabel = function () {
    var styles = useStyles();
    return (React.createElement("div", { className: styles.root },
        React.createElement(WebAssetRegular, { className: styles.iconStyles }),
        React.createElement(Body1, null, strings.ImagePickerUploadLocationLabel)));
};
export var SelectUploadLocation = function (props) {
    var _a = React.useState(EUploadLocations.CurrentSite), value = _a[0], setValue = _a[1];
    var onSelectedLocation = props.onSelectedLocation;
    var onChange = React.useCallback(function (data) {
        setValue(data.value);
        if (onSelectedLocation) {
            onSelectedLocation(data.value);
        }
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(Field, { label: React.createElement(RenderLabel, null), style: { paddingBottom: 10 } },
            React.createElement(RadioGroup, { value: value, onChange: function (_, data) { return onChange(data); }, layout: "horizontal" },
                React.createElement(Radio, { value: EUploadLocations.OneDrive, label: strings.ImagePickerUploadLocationOndriveLabel }),
                React.createElement(Radio, { value: EUploadLocations.CurrentSite, label: strings.ImagePickerUploadLocationSharePointLabel })))));
};
//# sourceMappingURL=SelectUploadLocation.js.map