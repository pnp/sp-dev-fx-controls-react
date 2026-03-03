import * as React from "react";
import { BaseComponentContext } from "@microsoft/sp-component-base";
import { ISearchImagesResult } from "./models/ISearchImagesResult";
export interface IUploadImageFilesProps {
    context: BaseComponentContext;
    onSelectedFile: (files: ISearchImagesResult) => void;
}
/**
 * Renders a component for uploading image files.
 *
 * @component
 * @param {IUploadImageFilesProps} props - The props for the component.
 * @returns {JSX.Element} The rendered UploadImageFiles component.
 */
export declare const UploadImageFiles: React.FunctionComponent<IUploadImageFilesProps>;
//# sourceMappingURL=Upload.d.ts.map