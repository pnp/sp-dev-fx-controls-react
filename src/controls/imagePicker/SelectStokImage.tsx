/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";

import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { BaseComponentContext } from "@microsoft/sp-component-base";

import {
  CONTENT_IMAGE_STOCK_URL,
  CONTENT_URL,
} from "./constants/constants";
import { useSpAPI } from "./hooks/useSpAPI";
import { useUtils } from "./hooks/useUtils";
import { IFilePickerResult } from "./IFilePickerResult";
import {
  StockImagesEvent,
  SubmitValue,
} from "./StockImagesModel";
import { useImagePickerStyles } from "./useImagePickerStyles";

export interface ISelectStockImageProps {
  onFileSelected: (file: any) => void;
  onCancel: () => void;
  context: ApplicationCustomizerContext | BaseComponentContext | undefined;
}

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

export const SelectStockImage: React.FunctionComponent<ISelectStockImageProps> = (
  props: React.PropsWithChildren<ISelectStockImageProps>
) => {
  const { context, onFileSelected, onCancel } = props;

  const { getFileNameFromUrl, getFileNameWithoutExtension } = useUtils();
  const { downloadBingContent } = useSpAPI(context);
  const styles = useImagePickerStyles();

  const handleSave = (event: StockImagesEvent): void => {
    let filePickerResult: IFilePickerResult = null;
    const cdnFileInfo: SubmitValue =
      event.Values && (event.Values as SubmitValue[]).length > 0 ? (event.Values as SubmitValue[])[0] : null;
    if (cdnFileInfo) {
      filePickerResult = {
        downloadFileContent: () => {
          return downloadBingContent(
            cdnFileInfo.sourceUrl,
            getFileNameFromUrl(getFileNameFromUrl(cdnFileInfo.sourceUrl))
          );
        },
        fileAbsoluteUrl: cdnFileInfo.sourceUrl,
        fileName: getFileNameFromUrl(cdnFileInfo.sourceUrl),
        fileNameWithoutExtension: getFileNameWithoutExtension(cdnFileInfo.sourceUrl),
        previewDataUrl: cdnFileInfo.sourceUrl,
      };
    }
    onFileSelected(filePickerResult);
  };

  const handleImageIframeEvent = (event: MessageEvent) => {
    if (!event || !event.origin || event.origin.indexOf(CONTENT_URL) !== 0) {
      return;
    }

    const eventData: StockImagesEvent = JSON.parse(event.data);

    if (eventData.MessageId === "AddItem") {
      handleSave(eventData);
    } else if (eventData.MessageId === "CancelDialog") {
      onCancel();
    }
  };

  React.useLayoutEffect(() => {
    window.addEventListener("message", handleImageIframeEvent);
    return () => {
      window.removeEventListener("message", handleImageIframeEvent);
    };
  }, []);

  return (
    <>
      <div className={styles.stockImageContainer}>
        <iframe
          style={{ border: "none" }}
          className={styles.stockImagesPicker}
          role={"application"}
          id={"stockImagesIFrame"}
          src={CONTENT_IMAGE_STOCK_URL}
        />
      </div>
    </>
  );
};
