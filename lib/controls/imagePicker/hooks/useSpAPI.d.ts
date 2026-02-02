import { BaseComponentContext } from '@microsoft/sp-component-base';
interface ISpAPI {
    getADAcesstoken: () => Promise<void>;
    downloadBingContent: (absoluteFileUrl: string, fileName: string) => Promise<File>;
    downLoadSpOrOneDriveContent: (driveId: string, itemId: string, fileName: string) => Promise<File>;
}
export declare const useSpAPI: (context: BaseComponentContext) => ISpAPI;
export {};
//# sourceMappingURL=useSpAPI.d.ts.map