/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";

import { useAtomValue } from "jotai";

import {
  Body1Strong,
  Caption1,
  Card,
  CardPreview,
  Image,
} from "@fluentui/react-components";

import { contextState } from "../atoms/contextState";
import { UPLOAD_FOLDER_NAME } from "../constants/constants";
import { useGraphAPI } from "../hooks/useGrapAPI";
import { useUploadFile } from "../hooks/useUploadFile";
import { useUtils } from "../hooks/useUtils";
import { IFileExtended } from "../models/IFileExtended";
import { ISearchImagesResult } from "../models/ISearchImagesResult";
import { IUploadFileResult } from "../models/IUploadFileResult";
import { DeleteFile } from "./DeleteFile";
import { FileError } from "./FileError";
import { FileProgress } from "./FileProgress";
import { RetryUpload } from "./RetryUpload";
import { useUploadFilesStyles } from "./useUploadFilesStyles";

export interface IUpLoadFileProps {
  file: IFileExtended;
  onFileSelected: (file: ISearchImagesResult) => void;
  selectedFileId: string;
  uploadLocation: string;
  onDelete: (fileName: string, driveId: string, libraryId: string, itemId: string) => Promise<boolean>;
}

interface IError {
  origemFunction: string;
  error: string;
}

export const UpLoadFile: React.FunctionComponent<IUpLoadFileProps> = (
  props: React.PropsWithChildren<IUpLoadFileProps>
) => {
  const { file, onFileSelected, selectedFileId, uploadLocation, onDelete } = props;
  const { name, size, preview } = file;
  const styles = useUploadFilesStyles();
  const appGlobalState = useAtomValue(contextState);
  const { context } = appGlobalState;
  const { getSiteAssetsLibrary } = useGraphAPI(context);
  const [errorInfo, setErrorInfo] = React.useState<IError>(null);
  const [uploadFile, showProgressBar, percentComplete, , isUploadFinished] = useUploadFile(context);
  const [fileSearchResult, setFileSearchResult] = React.useState<ISearchImagesResult>({} as ISearchImagesResult);

  const hasErrorOnUpload = React.useMemo(() => {
    if (errorInfo && errorInfo.origemFunction === "uploadFile") {
      return true;
    }
    return false;
  }, [errorInfo]);

  const hasErrorOnDelete = React.useMemo(() => {
    if (errorInfo && errorInfo.origemFunction === "deleteFile") {
      return true;
    }
    return false;
  }, [errorInfo]);

  const [retryUpload, setRetryUpload] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      try {
        const assetLibraryInfo = await getSiteAssetsLibrary(appGlobalState.context.pageContext.site.absoluteUrl);
        const { id: libraryId, parentReference } = assetLibraryInfo;
        const { siteId } = parentReference;
        const rs: IUploadFileResult = await uploadFile(file, UPLOAD_FOLDER_NAME, siteId, libraryId, uploadLocation);

        const fileSearchResult: ISearchImagesResult = {
          driveId: rs.parentReference.driveId,
          title: rs.name,
          path: rs.parentReference.path,
          filename: rs.name,
          siteID: rs.parentReference.siteId,
          fileType: rs.file.mimeType,
          spWebUrl: rs.webUrl,
          id: rs.id,
          modifiedBy: rs.lastModifiedBy.user.email,
          lastModifiedTime: rs.lastModifiedDateTime,
          fileExtension: rs.name.split(".").pop(),
          created: "",
          author: "",
          editorOwsUser: "",
          siteTitle: "",
          parentLink: "",
          listID: "",
          listItemID: "",
          spSiteURL: "",
          webId: "",
          uniqueID: "",
          defaultEncodingURL: rs.webUrl,
        };

        setFileSearchResult(fileSearchResult);
        setRetryUpload(false);
      } catch (error) {
        setErrorInfo({ origemFunction: "uploadFile", error: "Uploaderror" });
        setFileSearchResult({} as ISearchImagesResult);
        setRetryUpload(false);
        console.error("[UploadFIle, File Upload Error]", error);
      }
    })();
    return () => {
      URL.revokeObjectURL(preview);
    };
  }, [uploadFile, preview, retryUpload, uploadLocation, appGlobalState.context.pageContext.site.absoluteUrl]);

  const opacity = React.useMemo(() => (!isUploadFinished || hasErrorOnUpload ? 0.5 : 1), [
    isUploadFinished,
    hasErrorOnUpload,
  ]);

  const showDelete = React.useMemo(() => isUploadFinished, [isUploadFinished]);

  const showRetry = React.useMemo(() => hasErrorOnUpload, [hasErrorOnUpload]);

  const { formatBytes } = useUtils();

  const selected = React.useMemo(() => selectedFileId === fileSearchResult.id, [fileSearchResult, selectedFileId]);

  const onDeleteFile = React.useCallback(async (): Promise<boolean> => {
    const { driveId, siteID, id } = fileSearchResult || ({} as ISearchImagesResult);
    const { name } = file;
    const isDeleted = await onDelete(name, driveId, siteID, id);
    return isDeleted;
  }, [fileSearchResult, onDelete]);

  const onRetry = React.useCallback(() => {
    setRetryUpload(true);
  }, [fileSearchResult]);

  return (
    <>
      <Card
        className={styles.card}
        selected={selected}
        onClick={(e) => {
          e.stopPropagation();
          if (fileSearchResult?.id) {
            onFileSelected(fileSearchResult);
          }
        }}
      >
        <CardPreview>
          <Image
            style={{ height: 120, opacity: opacity, objectPosition: "0px 0px" }}
            fit="cover"
            src={preview}
            alt="image "
          />
        </CardPreview>

        <div className={styles.itemBody}>
          <Body1Strong className={styles.headerTitle}>{name}</Body1Strong>
          <Caption1>{formatBytes(size as number, 2)} </Caption1>
          <FileProgress isShow={showProgressBar} percentageCompleted={percentComplete} />
          <FileError isShow={hasErrorOnUpload || hasErrorOnDelete} error={errorInfo?.error} />
        </div>
        <div className={styles.bottomContainer}>
          <DeleteFile
            isWhow={showDelete}
            onDeleteFile={async () => {
              const isDeleted = await onDeleteFile();
              if (!isDeleted) {
                setErrorInfo({ origemFunction: "deleteFile", error: "Delete Error" });
              } else {
                setErrorInfo(null);
              }
            }}
          />
          <RetryUpload isShow={showRetry} onRetry={onRetry} />
        </div>
      </Card>
    </>
  );
};
