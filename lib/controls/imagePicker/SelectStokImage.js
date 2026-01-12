/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import { CONTENT_IMAGE_STOCK_URL, CONTENT_URL, } from "./constants/constants";
import { useSpAPI } from "./hooks/useSpAPI";
import { useUtils } from "./hooks/useUtils";
import { useImagePickerStyles } from "./useImagePickerStyles";
/**
 * Renders a component that allows the user to select a stock image.
 *
 * @component
 * @example
 * ```tsx
 * <SelectStockImage
 *   context={context}
 *   onFileSelected={handleFileSelected}
 *   onCancel={handleCancel}
 * />
 * ```
 */
export var SelectStockImage = function (props) {
    var context = props.context, onFileSelected = props.onFileSelected, onCancel = props.onCancel;
    var _a = useUtils(), getFileNameFromUrl = _a.getFileNameFromUrl, getFileNameWithoutExtension = _a.getFileNameWithoutExtension;
    var downloadBingContent = useSpAPI(context).downloadBingContent;
    var styles = useImagePickerStyles();
    var handleSave = function (event) {
        var filePickerResult = null;
        var cdnFileInfo = event.Values && event.Values.length > 0 ? event.Values[0] : null;
        if (cdnFileInfo) {
            filePickerResult = {
                downloadFileContent: function () {
                    return downloadBingContent(cdnFileInfo.sourceUrl, getFileNameFromUrl(getFileNameFromUrl(cdnFileInfo.sourceUrl)));
                },
                fileAbsoluteUrl: cdnFileInfo.sourceUrl,
                fileName: getFileNameFromUrl(cdnFileInfo.sourceUrl),
                fileNameWithoutExtension: getFileNameWithoutExtension(cdnFileInfo.sourceUrl),
                previewDataUrl: cdnFileInfo.sourceUrl,
            };
        }
        onFileSelected(filePickerResult);
    };
    var handleImageIframeEvent = function (event) {
        if (!event || !event.origin || event.origin.indexOf(CONTENT_URL) !== 0) {
            return;
        }
        var eventData = JSON.parse(event.data);
        if (eventData.MessageId === "AddItem") {
            handleSave(eventData);
        }
        else if (eventData.MessageId === "CancelDialog") {
            onCancel();
        }
    };
    React.useLayoutEffect(function () {
        window.addEventListener("message", handleImageIframeEvent);
        return function () {
            window.removeEventListener("message", handleImageIframeEvent);
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.stockImageContainer },
            React.createElement("iframe", { style: { border: "none" }, className: styles.stockImagesPicker, role: "application", id: "stockImagesIFrame", src: CONTENT_IMAGE_STOCK_URL }))));
};
//# sourceMappingURL=SelectStokImage.js.map