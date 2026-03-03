import * as React from 'react';
export interface IFileInfoProps {
    fileInfo: File;
    onSelected?: (isSelected: boolean, file: File) => void;
    isSelected: boolean;
}
export declare const FileInfo: React.FunctionComponent<IFileInfoProps>;
//# sourceMappingURL=FileInfo.d.ts.map