import * as React from "react";
interface IUseUtils {
    getCacheKey: (key: string, uniqueId: string) => string;
    isValidUrl: (url: string) => boolean;
    checkUrlParameter: (name: string) => string;
    checkIfCursorIsInsideContainer: (event: React.MouseEvent<HTMLDivElement>, containerRef: HTMLDivElement) => boolean;
    trimBeginDoubleSlash: (value: string) => string;
    getSPSiteAbsoluteUrl: (absolutefileUrl: string) => string;
    getFileServerRelativeUrlFromAbsoluteUrl: (absoluteFileUrl: string) => string;
    encodeRestUrl: (query: string) => string;
    getImageBase64: (pictureUrl: string, customWidth?: number, customHeight?: number) => Promise<string>;
    getBase64ImageFromDOMImg: (imgElementId: string) => string | undefined;
    getFileFromBlob: (blob: Blob, fileName: string) => File;
    formatBytes: (bytes: number, decimals: number) => string;
    getFileNameFromUrl: (itemUrl: string) => string;
    getFileExtension: (fileName: string) => string;
    isImage: (fileName: string) => boolean;
    getEncodedChar: (c: string) => string;
    getFileNameWithoutExtension: (itemUrl: string) => string;
    resizeImageTo: (imageUrl: string, targetWidth: number) => string;
    getScrollPosition: (dataListContainerRef: {
        scrollTop: any;
        scrollHeight: any;
        clientHeight: any;
    }) => number;
}
export declare const useUtils: () => IUseUtils;
export {};
//# sourceMappingURL=useUtils.d.ts.map