/* eslint-disable @rushstack/security/no-unsafe-regexp */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from 'react';

export const DOCICONURL_XLSX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xlsx.png";
export const DOCICONURL_DOCX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/docx.png";
export const DOCICONURL_PPTX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pptx.png";
export const DOCICONURL_MPPX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/mpp.png";
export const DOCICONURL_PHOTO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/photo.png";
export const DOCICONURL_PDF = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pdf.png";
export const DOCICONURL_TXT = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/txt.png";
export const DOCICONURL_EMAIL = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/email.png";
export const DOCICONURL_CSV = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/csv.png";
export const DOCICONURL_ONE = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/one.png";
export const DOCICONURL_VSDX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/vsdx.png";
export const DOCICONURL_VSSX = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/vssx.png";
export const DOCICONURL_PUB = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/pub.png";
export const DOCICONURL_ACCDB = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/accdb.png";
export const DOCICONURL_ZIP = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/zip.png";
export const DOCICONURL_GENERIC =
  "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/genericfile.png";
export const DOCICONURL_CODE = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/code.png";
export const DOCICONURL_HTML = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/html.png";
export const DOCICONURL_XML = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/xml.png";
export const DOCICONURL_SPO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/spo.png";
export const DOCICONURL_VIDEO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/video.png";
export const DOCICONURL_AUDIO = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/audio.png";
export const DOCICONURL_FOLDER = "https://static2.sharepointonline.com/files/fabric/assets/item-types/96/folder.png";

export const useUtils = () => {

  const getFileExtension = React.useCallback((fileName: string): string => {
    if (!fileName) return "";
    const splitedName = fileName.split(".");
    const fileExtension = splitedName[splitedName.length - 1];
    return fileExtension;
  }, []);
  /**
   * GetFileImageUrl
   */
  const GetFileImageUrl = React.useCallback((file: string): string => {
    let _fileImageUrl: string = DOCICONURL_GENERIC;
    const i = file.lastIndexOf(".");
    const _fileTypes = i > -1 ? file.substring(i + 1, file.length) : "";
    const _fileExtension = _fileTypes.toLowerCase();
    if (!_fileExtension) {
      return _fileImageUrl;
    }
    switch (_fileExtension.toLowerCase()) {
      case "xlsx":
        _fileImageUrl = DOCICONURL_XLSX;
        break;
      case "xls":
        _fileImageUrl = DOCICONURL_XLSX;
        break;
      case "docx":
        _fileImageUrl = DOCICONURL_DOCX;
        break;
      case "doc":
        _fileImageUrl = DOCICONURL_DOCX;
        break;
      case "pptx":
        _fileImageUrl = DOCICONURL_PPTX;
        break;
      case "ppt":
        _fileImageUrl = DOCICONURL_PPTX;
        break;
      case "mppx":
        _fileImageUrl = DOCICONURL_MPPX;
        break;
      case "mpp":
        _fileImageUrl = DOCICONURL_MPPX;
        break;
      case "csv":
        _fileImageUrl = DOCICONURL_CSV;
        break;
      case "pdf":
        _fileImageUrl = DOCICONURL_PDF;
        break;
      case "txt":
        _fileImageUrl = DOCICONURL_TXT;
        break;
      case "jpg":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "msg":
        _fileImageUrl = DOCICONURL_EMAIL;
        break;
      case "jpeg":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "png":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "ico":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "gif":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "heic":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "tiff":
        _fileImageUrl = DOCICONURL_PHOTO;
        break;
      case "eml":
        _fileImageUrl = DOCICONURL_EMAIL;
        break;
      case "pub":
        _fileImageUrl = DOCICONURL_PUB;
        break;
      case "accdb":
        _fileImageUrl = DOCICONURL_ACCDB;
        break;
      case "zip":
        _fileImageUrl = DOCICONURL_ZIP;
        break;
      case "7z":
        _fileImageUrl = DOCICONURL_ZIP;
        break;
      case "tar":
        _fileImageUrl = DOCICONURL_ZIP;
        break;
      case "js":
        _fileImageUrl = DOCICONURL_CODE;
        break;
      case "json":
        _fileImageUrl = DOCICONURL_CODE;
        break;
      case "html":
        _fileImageUrl = DOCICONURL_HTML;
        break;
      case "xml":
        _fileImageUrl = DOCICONURL_XML;
        break;
      case "aspx":
        _fileImageUrl = DOCICONURL_SPO;
        break;
      case "mp4":
        _fileImageUrl = DOCICONURL_VIDEO;
        break;
      case "mov":
        _fileImageUrl = DOCICONURL_VIDEO;
        break;
      case "wmv":
        _fileImageUrl = DOCICONURL_VIDEO;
        break;
      case "ogg":
        _fileImageUrl = DOCICONURL_VIDEO;
        break;
      case "webm":
        _fileImageUrl = DOCICONURL_VIDEO;
        break;
      default:
        _fileImageUrl = DOCICONURL_GENERIC;
        break;
    }
    return _fileImageUrl;
  }, []);

  const getShortName = React.useCallback((name: string): string => {
    if (!name) return "";
    const splitedName = name.split(".");
    const displayCreatedFileName = splitedName[0].substring(0, 25);
    const displayCreatedFileNameExt = splitedName[splitedName.length - 1];
    const displayCreatedFile = `${displayCreatedFileName}...${displayCreatedFileNameExt}`;
    return displayCreatedFile;
  }, []);

  const isOndrive = React.useCallback(async (name: string): Promise<boolean> => {
    if (!name) return false;
    return name.indexOf("my.sharepoint.com") > -1;
  }, []);

  const formatFileSize = React.useCallback((bytes: number, decimalPoint: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1000,
      dm = decimalPoint || 2,
      sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
      i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }, []);

  const getFolderIcon = React.useCallback((): string => {
    return DOCICONURL_FOLDER;
  }, []);

  const trimBeginDoubleSlash = React.useCallback((value: string) => {
    if (value.charAt(0) === "/" && value.charAt(1) === "/") {
      return value.substring(1, value.length);
    }
    return value;
  }, []);

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

  const centerElement = React.useCallback((container: HTMLElement, elementToCenter: HTMLElement): {
    left: number;
    top: number;
  } => {
    const elementRect = elementToCenter.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const elementWidth = elementRect.width;
    const elementHeight = elementRect.height;

    const windowWidth = containerRect.width;
    const windowHeight = containerRect.height;

    const elementLeft = (windowWidth - elementWidth) / 2;
    const elementTop = (windowHeight - elementHeight) / 2;

    return { left: elementLeft, top: elementTop };
  }, []);

  const hasValidMentionCharIndex = (
    mentionCharIndex: number,
    text: string,
    isolateChar?: string,
    textPrefix?: string
  ) => {
    if (mentionCharIndex === -1) {
      return false;
    }

    if (!isolateChar) {
      return true;
    }

    const mentionPrefix = mentionCharIndex ? text[mentionCharIndex - 1] : textPrefix;

    return !mentionPrefix || !!mentionPrefix.match(/\s/);
  };

  const hasValidChars = (text: string, allowedChars: any) => {
    return allowedChars.test(text);
  };

  const getMentionCharIndex = (text: string, mentionDenotationChars: any, isolateChar: string) => {
    return mentionDenotationChars.reduce(
      (prev: { mentionChar: any; mentionCharIndex: number }, mentionChar: string | any[]) => {
        let mentionCharIndex;

        if (isolateChar) {
          const regex = new RegExp(`^${mentionChar}|\\s${mentionChar}`, "g");
          const lastMatch = (text.match(regex) || []).pop();

          if (!lastMatch) {
            return {
              mentionChar: prev.mentionChar,
              mentionCharIndex: prev.mentionCharIndex,
            };
          }

          mentionCharIndex =
            lastMatch !== mentionChar ? text.lastIndexOf(lastMatch) + lastMatch.length - mentionChar.length : 0;
        } else {
          mentionCharIndex = text.lastIndexOf(mentionChar as string);
        }

        if (mentionCharIndex > prev.mentionCharIndex) {
          return {
            mentionChar,
            mentionCharIndex,
          };
        }
        return {
          mentionChar: prev.mentionChar,
          mentionCharIndex: prev.mentionCharIndex,
        };
      },
      { mentionChar: null, mentionCharIndex: -1 }
    );
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = (_) => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(blob);
    });
  };

  const getScrollPosition = (_dataListContainerRef: {
    scrollTop: any;
    scrollHeight: any;
    clientHeight: any;
  }): number => {
    const { scrollTop, scrollHeight, clientHeight } = _dataListContainerRef;
    const percentNow = (scrollTop / (scrollHeight - clientHeight)) * 100;
    return percentNow;
  };

  const b64toBlob = async (b64Data: any, contentType: string, sliceSize?: number): Promise<Blob> => {
    contentType = contentType || "image/png";
    sliceSize = sliceSize || 512;

    const byteCharacters: string = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  const getInitials = (name: string): string => {
    if (!name) return "";
    const splitedName = name.split(" ");
    let initials = "";
    if (splitedName.length > 1) {
      initials = splitedName[0].charAt(0) + splitedName[1].charAt(0);
    } else {
      initials = splitedName[0].charAt(0);
    }
    return initials;
  };


  const getBase64Image = (img: any) => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  };

  const parseHtmlString = (htmlString: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML =  htmlString;
    return tmp.textContent || tmp.innerText || "";
  };

  return {
    b64toBlob,
    blobToBase64,
    getMentionCharIndex,
    hasValidChars,
    hasValidMentionCharIndex,
    GetFileImageUrl,
    getShortName,
    isOndrive,
    formatFileSize,
    getFolderIcon,
    trimBeginDoubleSlash,
    checkIfCursorIsInsideContainer,
    centerElement,
    getScrollPosition,
    getInitials,
    getBase64Image,
    parseHtmlString,
    getFileExtension
  };
};
