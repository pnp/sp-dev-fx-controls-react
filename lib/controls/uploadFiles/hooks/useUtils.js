/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { format, parseISO, } from 'date-fns';
export var useUtils = function () {
    var getTruncateText = React.useCallback(function (text, length) {
        if (text.length > length) {
            return text.substring(0, length) + "...";
        }
        return text;
    }, []);
    var getShortText = React.useCallback(function (text, length) {
        if (text.length > length) {
            //  const numberCharsToCut = 6;
            var first = text.substring(0, length / 2);
            var last = text.substring(text.length - length / 2, text.length);
            var newText = first.trim() + "..." + last.trim();
            return newText;
        }
        return text;
    }, []);
    var getFileExtension = React.useCallback(function (fileName) {
        return fileName.split(".").pop();
    }, []);
    var getFileSize = React.useCallback(function (size) {
        if (size < 1024) {
            return size + " bytes";
        }
        else if (size < 1048576) {
            return (size / 1024).toFixed(2) + " KB";
        }
        else if (size < 1073741824) {
            return (size / 1048576).toFixed(2) + " MB";
        }
        else {
            return (size / 1073741824).toFixed(2) + " GB";
        }
    }, []);
    var getTimeFromDate = React.useCallback(function (date) {
        try {
            if (date) {
                return format(parseISO(date), "dd MMM, p");
            }
            return "";
        }
        catch (error) {
            if (DEBUG) {
                console.log(["getTimeFromDate"], error);
            }
            return "";
        }
    }, []);
    return { getFileSize: getFileSize, getTruncateText: getTruncateText, getTimeFromDate: getTimeFromDate, getShortText: getShortText, getFileExtension: getFileExtension };
};
//# sourceMappingURL=useUtils.js.map