export declare const getScrollPosition: (_dataListContainerRef: any) => number;
export declare const b64toBlob: (b64Data: string, contentType: string, sliceSize?: number) => Promise<Blob>;
export declare const blobToBase64: (blob: Blob) => Promise<string>;
export declare const getImageBase64: (pictureUrl: string) => Promise<string>;
/**
 * Load SPFx component by id, SPComponentLoader is used to load the SPFx components
 * @param componentId - componentId, guid of the component library
 */
export declare const loadSPComponentById: (componentId: string) => Promise<unknown>;
/**
 * Get MD5Hash for the image url to verify whether user has default image or custom image
 * @param url
 */
export declare const getMd5HashForUrl: (url: string) => Promise<string>;
/**
 * Gets user photo
 * @param userId
 * @returns user photo
 */
export declare const getUserPhoto: (userId: any) => Promise<string>;
//# sourceMappingURL=utils.d.ts.map