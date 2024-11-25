/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { IMG_SUPPORTED_EXTENSIONS } from "../constants/constants";

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
  getScrollPosition: (dataListContainerRef: { scrollTop: any; scrollHeight: any; clientHeight: any }) => number;
}

export const useUtils = (): IUseUtils => {
  const getCacheKey = React.useCallback((key: string, uniqueId: string) => {
    return `${key}${uniqueId}`;
  }, []);

  const isValidUrl = React.useCallback((url: string): boolean => {
    if (!url) {
      return false;
    }
    try {
      const urlValid = new URL(url);
      return !!urlValid;
    } catch {
      return false;
    }
  }, []);

  const checkUrlParameter = (name: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };

  const checkIfCursorIsInsideContainer = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement>, containerRef: HTMLDivElement): boolean => {
      const containerRect = containerRef?.getBoundingClientRect();
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      if (containerRect) {
        const isCursorInsideContainer =
          mouseX >= containerRect.left &&
          mouseX <= containerRect.right &&
          mouseY >= containerRect.top &&
          mouseY <= containerRect.bottom;

        if (isCursorInsideContainer) {
          // Do something when the cursor is inside the container
          return true;
        } else {
          return false;
          // Do something when the cursor is outside the container
        }
      }
      return false;
    },
    []
  );

  const trimBeginDoubleSlash = (value: string):string => {
    if (value.charAt(0) === "/" && value.charAt(1) === "/") {
      return value.substring(1, value.length);
    }
    return value;
  };

  const getSPSiteAbsoluteUrl = React.useCallback((absolutefileUrl: string): string => {
    const hostname = window.location.hostname;
    const rootSiteUrl = `https://${hostname}`;
    if (
      absolutefileUrl.indexOf(`${rootSiteUrl}/sites/`) > -1 ||
      absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1
    ) {
      const fileServerRelativeUrl = absolutefileUrl.split(hostname)[1];
      // Split server relative URL by '/' to obtain web name
      const webName = fileServerRelativeUrl.split("/")[2];

      let webAbsoluteUrl = `https://${hostname}/sites/${webName}`;
      if (absolutefileUrl.indexOf(`${rootSiteUrl}/teams/`) > -1) {
        webAbsoluteUrl = `https://${hostname}/teams/${webName}`;
      }
      return webAbsoluteUrl;
    }
    return rootSiteUrl;
  }, []);

  const getFileServerRelativeUrlFromAbsoluteUrl = React.useCallback((absoluteFileUrl: string): string => {
    let fileServerRelativeUrl = absoluteFileUrl.split(window.location.hostname)[1];
    fileServerRelativeUrl = trimBeginDoubleSlash(fileServerRelativeUrl);
    return fileServerRelativeUrl;
  }, []);

  const encodeRestUrl = React.useCallback((query: string) => {
    return encodeURIComponent(query.replace(/[%]/g, "%25"))
      .replace(/[']/g, "%27%27")
      .replace(/[&]/g, "%26")
      .replace(/[#]/g, "%23")
      .replace(/[?]/g, "%3F")
      .replace(/[/]/g, "%2F")
      .replace(/[+]/g, "%2B");
  }, []);

  const getImageBase64 = React.useCallback(
    async (pictureUrl: string, customWidth?: number, customHeight?: number): Promise<string> => {
      return new Promise((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.addEventListener("load", () => {
          const tempCanvas = document.createElement("canvas");
          tempCanvas.width = customWidth ?? image.width;
          tempCanvas.height = customHeight ?? image.height;
          tempCanvas
            ?.getContext("2d")
            ?.drawImage(image, 0, 0, customWidth ?? image.width, customHeight ?? image.height);
          let base64Str;
          try {
            base64Str = tempCanvas.toDataURL("image/png", 1);
          } catch (err) {
            if (DEBUG) {
              console.error(`[ImageService.getBase64Image]: Err='${err.message}'`);
            }
            return "";
          }
          resolve(base64Str);
        });
        image.src = pictureUrl;
      });
    },
    []
  );

  const getBase64ImageFromDOMImg = React.useCallback((imgElementId: string): string | undefined => {
    try {
      const imgElement = document.getElementById(imgElementId) as any;
      const canvas = document.createElement("canvas");
      canvas.width = imgElement.width;
      canvas.height = imgElement.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(imgElement, 0, 0);
      const dataURL = canvas.toDataURL("image/png");

      return dataURL;
    } catch (err) {
      if (DEBUG) {
        console.error(`[getBase64ImageFromDOMImg]: Err='${err.message}'`);
      }
      return undefined;
    }
  }, []);

  const getFileFromBlob = React.useCallback((blob: Blob, fileName: string): File => {
    let result: any = null; // eslint-disable-line @typescript-eslint/no-explicit-any
    // IE 11 foesn't support File API, create a workaround to return Blob with fileName assigned.
    try {
      result = new File([blob], fileName);
    } catch {
      result = blob;
      result.fileName = fileName;
    }

    return result;
  }, []);

  const formatBytes = React.useCallback((bytes, decimals): string => {
    if (bytes === 0) {
      return "0 Bytes";
    }

    const k: number = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) +
      " " +
      ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][i]
    );
  }, []);

  const getFileNameFromUrl = React.useCallback((itemUrl: string): string => {
    const urlTokens = itemUrl.split("?");
    const url = urlTokens[0];
    const tokens = url.split("/");
    const fileNameWithExtension = tokens[tokens.length - 1];

    return fileNameWithExtension;
  }, []);

  const getFileExtension = React.useCallback((fileName): string => {
    // Split the URL on the dots
    const splitFileName = fileName.toLowerCase().split(".");

    // Take the last value
    let extensionValue = splitFileName.pop();

    // Check if there are query string params in place
    if (extensionValue.indexOf("?") !== -1) {
      // Split the string on the question mark and return the first part
      const querySplit = extensionValue.split("?");
      extensionValue = querySplit[0];
    }

    return `.${extensionValue}`;
  }, []);

  const isImage = React.useCallback((fileName: string): boolean => {
    const acceptableExtensions: string[] = IMG_SUPPORTED_EXTENSIONS.split(",");
    // const IMG_SUPPORTED_EXTENSIONS = ".gif,.jpg,.jpeg,.bmp,.dib,.tif,.tiff,.ico,.png,.jxr,.svg"

    const thisExtension: string = getFileExtension(fileName);
    return acceptableExtensions.indexOf(thisExtension) > -1;
  }, []);

  const getEncodedChar = React.useCallback((c: string): string => {
    const o: any = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
      "'": "&#39;",
      "\\": "&#92;",
    };
    return o[c];
  }, []);

  const getFileNameWithoutExtension = React.useCallback(
    (itemUrl: string): string => {
      const fileNameWithExtension = getFileNameFromUrl(itemUrl);
      const fileName = fileNameWithExtension.slice(0, fileNameWithExtension.lastIndexOf("."));
      return fileName;
    },
    [getFileNameFromUrl]
  );

  const resizeImageTo = (imageUrl: string, targetWidth: number): string => {
    const image = window.document.createElement("img");
    image.src = imageUrl;
    const originalWidth = image.width;
    const originalHeight = image.height;

    // Calculate the new height while maintaining the aspect ratio
    const targetHeight = (originalHeight / originalWidth) * targetWidth;

    // Create a canvas to draw the resized image
    const canvas = window.document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // Draw the image on the canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, targetWidth, targetHeight);

    // Create a new image element with the resized image

    return canvas.toDataURL();
  };

  const getScrollPosition = React.useCallback(
    (dataListContainerRef: { scrollTop: any; scrollHeight: any; clientHeight: any }): number => {
      const { scrollTop, scrollHeight, clientHeight } = dataListContainerRef;
      const percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
      return percentNow;
    },
    []
  );

  return {
    getCacheKey,
    isValidUrl,
    checkUrlParameter,
    checkIfCursorIsInsideContainer,
    getSPSiteAbsoluteUrl,
    getFileServerRelativeUrlFromAbsoluteUrl,
    trimBeginDoubleSlash,
    encodeRestUrl,
    getImageBase64,
    getBase64ImageFromDOMImg,
    getFileFromBlob,
    formatBytes,
    getFileNameFromUrl,
    isImage,
    getFileExtension,
    getEncodedChar,
    getFileNameWithoutExtension,
    resizeImageTo,
    getScrollPosition,
  };
}; // ... }
