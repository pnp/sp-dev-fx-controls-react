import * as React from 'react';
import { IFilePickerResult } from './IFilePickerResult';
export interface ISelectFromSharePointProps {
    onFileSelected: (file: IFilePickerResult) => void;
    isOpen: boolean;
    onDismiss: (refresh: boolean) => void;
}
export declare const SelectFromSharePoint: React.FunctionComponent<ISelectFromSharePointProps>;
//# sourceMappingURL=selectFromSharePoint.d.ts.map