import * as React from "react";
import strings from "ControlStrings";
import { Button, Tooltip, } from "@fluentui/react-components";
import { ArrowClockwiseFilled, ArrowClockwiseRegular, bundleIcon, } from "@fluentui/react-icons";
import { useUploadFilesStyles } from "./useUploadFilesStyles";
export var RetryUpload = function (props) {
    var isShow = props.isShow;
    var Retry = bundleIcon(ArrowClockwiseFilled, ArrowClockwiseRegular);
    var styles = useUploadFilesStyles();
    if (!isShow) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { content: strings.ImagePickerRetryButtonLabel, relationship: "label" },
            React.createElement("div", { "aria-label": strings.ImagePickerRetryButtonLabel },
                React.createElement(Button, { icon: React.createElement(Retry, { className: styles.iconRefreshStyle }), size: "small", appearance: "transparent", onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        props.onRetry();
                    } })))));
};
//# sourceMappingURL=RetryUpload.js.map