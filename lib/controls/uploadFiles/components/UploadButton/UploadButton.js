import * as React from 'react';
import { PrimaryButton, } from '@fluentui/react/lib/Button';
export var UploadButton = function (props) {
    var onUpload = props.onUpload, text = props.text, styles = props.styles, iconName = props.iconName;
    var onClick = React.useCallback(function (ev) {
        var input = document.createElement("input");
        input.type = "file";
        input.onchange = function (e) {
            var file = e.target.files[0];
            onUpload(file);
        };
        input.click();
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement(PrimaryButton, { styles: styles !== null && styles !== void 0 ? styles : undefined, iconProps: { iconName: iconName !== null && iconName !== void 0 ? iconName : "upload" }, onClick: onClick }, text)));
};
//# sourceMappingURL=UploadButton.js.map