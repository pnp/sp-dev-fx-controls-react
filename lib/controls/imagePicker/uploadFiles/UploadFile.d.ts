import * as React from "react";
import { IFileExtended } from "../models/IFileExtended";
import { ISearchImagesResult } from "../models/ISearchImagesResult";
export interface IUpLoadFileProps {
    file: IFileExtended;
    onFileSelected: (file: ISearchImagesResult) => void;
    selectedFileId: string;
    uploadLocation: string;
    onDelete: (fileName: string, driveId: string, libraryId: string, itemId: string) => Promise<boolean>;
}
export declare const UpLoadFile: React.FunctionComponent<IUpLoadFileProps>;
//# sourceMappingURL=UploadFile.d.ts.map