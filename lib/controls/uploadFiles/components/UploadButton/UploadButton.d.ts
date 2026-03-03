import * as React from 'react';
import { IButtonStyles } from '@fluentui/react/lib/Button';
export interface IUploadButtonProps {
    onUpload: (file: File) => void;
    text: string;
    styles?: IButtonStyles;
    iconName?: string;
}
export declare const UploadButton: React.FunctionComponent<IUploadButtonProps>;
//# sourceMappingURL=UploadButton.d.ts.map