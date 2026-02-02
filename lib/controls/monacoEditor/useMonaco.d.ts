import { Monaco } from "@monaco-editor/loader";
export declare enum EStatus {
    LOADING = 0,
    LOADED = 1,
    ERROR = 2
}
export declare const useMonaco: () => {
    monaco: Monaco;
    status: EStatus;
    error: Error;
};
//# sourceMappingURL=useMonaco.d.ts.map