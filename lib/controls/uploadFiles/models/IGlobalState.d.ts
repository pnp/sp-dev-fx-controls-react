import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IGlobalState {
    files: File[];
    selectedFiles: File[];
    isLoading: boolean;
    themeVariant: IReadonlyTheme;
    onUploadFiles?: (files: File[]) => void;
    containerWidth?: number;
    pageSize?: number;
}
//# sourceMappingURL=IGlobalState.d.ts.map