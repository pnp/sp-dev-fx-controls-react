/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import {
  format,
  parseISO,
} from 'date-fns';

export const useUtils = () => {
  const getTruncateText = React.useCallback((text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  }, []);

  const getShortText = React.useCallback((text: string, length: number) => {
    if (text.length > length) {
      //  const numberCharsToCut = 6;
      const first = text.substring(0, length / 2);
      const last = text.substring(text.length - length / 2, text.length);

      const newText = first.trim() + "..." + last.trim();
      return newText;
    }
    return text;
  }, []);

  const getFileExtension = React.useCallback((fileName: string): string => {
    return fileName.split(".").pop();
  }, []);

  const getFileSize = React.useCallback((size: number): string => {
    if (size < 1024) {
      return size + " bytes";
    } else if (size < 1048576) {
      return (size / 1024).toFixed(2) + " KB";
    } else if (size < 1073741824) {
      return (size / 1048576).toFixed(2) + " MB";
    } else {
      return (size / 1073741824).toFixed(2) + " GB";
    }
  }, []);

  const getTimeFromDate = React.useCallback((date: string): string => {
    try {
      if (date) {
        return format(parseISO(date), "dd MMM, p");
      }
      return "";
    } catch (error) {
      if (DEBUG) {
        console.log(["getTimeFromDate"], error);
      }
      return "";
    }
  }, []);

  return { getFileSize, getTruncateText, getTimeFromDate, getShortText, getFileExtension };
};
