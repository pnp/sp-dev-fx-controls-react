import * as React from 'react';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFilePickerResult } from './IFilePickerResult';
export interface IImagePickerProps {
    onFileSelected: (file: IFilePickerResult) => void;
    onDeleteFile: () => void;
    selectedFileUrl: string;
    context: BaseComponentContext;
}
/**
 * Renders an image picker component.
 *
 * @component
 * @example
 * ```tsx
 * <ImagePicker
 *   onFileSelected={handleFileSelected}
 *   onDeleteFile={handleDeleteFile}
 *   selectedFileUrl={selectedImageUrl}
 *   context={appContext}
 * />
 * ```
 */
export declare const ImagePicker: React.FunctionComponent<IImagePickerProps>;
//# sourceMappingURL=ImagePicker.d.ts.map