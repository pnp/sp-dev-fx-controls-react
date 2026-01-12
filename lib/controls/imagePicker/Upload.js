import * as React from "react";
import { UploadFiles } from "./uploadFiles/UploadFiles";
/**
 * Renders a component for uploading image files.
 *
 * @component
 * @param {IUploadImageFilesProps} props - The props for the component.
 * @returns {JSX.Element} The rendered UploadImageFiles component.
 */
export var UploadImageFiles = function (props) {
    var onSelectedFile = props.onSelectedFile;
    return (React.createElement(React.Fragment, null,
        React.createElement(UploadFiles, { onSelectedFile: onSelectedFile })));
};
//# sourceMappingURL=Upload.js.map