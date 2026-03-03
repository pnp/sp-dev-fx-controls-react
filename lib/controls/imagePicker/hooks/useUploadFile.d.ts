import { BaseComponentContext } from "@microsoft/sp-component-base";
import { IUploadFileResult } from "../models/IUploadFileResult";
export declare const useUploadFile: (context: BaseComponentContext) => readonly [(file: File, folderName: string, siteId: string, libraryId: string, uploadLocation: string) => Promise<IUploadFileResult>, boolean, number, any, boolean, Error];
//# sourceMappingURL=useUploadFile.d.ts.map