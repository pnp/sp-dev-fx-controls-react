import * as React from "react";
import strings from "ControlStrings";
import { Button, Tooltip, } from "@fluentui/react-components";
import { bundleIcon, Delete16Filled, Delete16Regular, } from "@fluentui/react-icons";
import { useUploadFilesStyles } from "./useUploadFilesStyles";
export var DeleteFile = function (props) {
    var Delete = bundleIcon(Delete16Filled, Delete16Regular);
    var styles = useUploadFilesStyles();
    var isWhow = props.isWhow, onDeleteFile = props.onDeleteFile;
    if (!isWhow) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(Tooltip, { content: strings.ImagePickerDeleteLabel, relationship: "label" },
            React.createElement("div", { "aria-label": strings.ImagePickerDeleteLabel },
                React.createElement(Button, { icon: React.createElement(Delete, { className: styles.deleteStyle }), size: "small", appearance: "transparent", onClick: function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        onDeleteFile();
                    } })))));
};
//# sourceMappingURL=DeleteFile.js.map