import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IUploadFilesProps {
    title: string;
    themeVariant?: IReadonlyTheme | undefined;
    context: WebPartContext;
    pageSize?: number;
    onUploadFiles: (files: File[]) => void;
}
//# sourceMappingURL=IUploadFilesProps.d.ts.map