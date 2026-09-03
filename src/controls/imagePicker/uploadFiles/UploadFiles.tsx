/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import strings from "ControlStrings";
import { useAtomValue } from "jotai";
import { useDropzone } from "react-dropzone";

import {
  Body1,
  Caption1,
  tokens,
} from "@fluentui/react-components";
import { Icon } from "@iconify/react";

import { contextState } from "../atoms/contextState";
import { EUploadLocations } from "../constants/EUploadLocations";
import { useDeleteFile } from "../hooks/useDeleteFile";
import { IFileExtended } from "../models/IFileExtended";
import { ISearchImagesResult } from "../models/ISearchImagesResult";
import { SelectUploadLocation } from "./SelectUploadLocation";
import { UpLoadFile } from "./UploadFile";
import { useUploadFilesStyles } from "./useUploadFilesStyles";

export interface IUploadFilesProps {
  onSelectedFile: (files: ISearchImagesResult) => void;
}

const validateFileTypes = (file: File): any => {
  const acceptedFiles = ["image/gif", "image/jpeg", "image/png", "image/svg+xml", "image/webp"];
  return acceptedFiles.includes(file.type)
    ? null
    : {
        code: "file-invalid-type",
        message: `file type ${file.type} is not supported`,
      };
};

export const UploadFiles: React.FunctionComponent<IUploadFilesProps> = (
  props: React.PropsWithChildren<IUploadFilesProps>
) => {
  const [files, setFiles] = React.useState<IFileExtended[]>([]);
  const { onSelectedFile } = props;
  const [renderFiles, setRenderFiles] = React.useState<JSX.Element[]>([]);
  const [selectedFileId, setSelectedFileId] = React.useState<string>("");
  const [selectedUploadLocation, setSelectedUploadLocation] = React.useState<string>(EUploadLocations.CurrentSite);
  const appContext = useAtomValue(contextState);
  const [deleteFile] = useDeleteFile(appContext.context);

  const styles = useUploadFilesStyles();

  React.useEffect(() => {
    onSelectedFile(null);
  }, []);

  const onDrop = React.useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file: Blob | MediaSource) => {
      return Object.assign(file, {
        preview: URL.createObjectURL(file),
      });
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

  const onFileSelected = React.useCallback(
    (file: ISearchImagesResult) => {
      setSelectedFileId(file.id);
      onSelectedFile(file);
    },
    [onSelectedFile]
  );

  const onDelete = React.useCallback(
    async (fileName: string, driveId: string, libraryId: string, itemId: string): Promise<boolean> => {
      try {
        if (itemId && driveId && libraryId) {
          await deleteFile(driveId, libraryId, itemId, selectedUploadLocation);
        }
        setFiles((prevFiles) => prevFiles.filter((f) => f.name !== fileName));
        onSelectedFile(null);
        return true;
      } catch {
        return false;
      }
    },
    [onSelectedFile]
  );

  React.useEffect(() => {
    const filesControl: JSX.Element[] = [];
    for (const file of files) {
      filesControl.push(
        <UpLoadFile
          key={file.name}
          file={file}
          onFileSelected={onFileSelected}
          selectedFileId={selectedFileId}
          uploadLocation={selectedUploadLocation}
          onDelete={async (filename, driveId, libraryId, itemId) =>
            await onDelete(filename, driveId, libraryId, itemId)
          }
        />
      );
    }
    setRenderFiles(filesControl);
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files, onFileSelected]);

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
    fileRejections,
  } = useDropzone({
    accept: {
      "image/*": [".gif", ".jpg", ".jpeg", ".png", ".svg", ".webp"],
    },
    onDrop: onDrop,
    maxFiles: 10,
    validator: validateFileTypes,
  });

  const focusedStyle = React.useMemo(() => {
    return { borderColor: tokens.colorNeutralBackground3Pressed };
  }, []);

  const acceptStyle = React.useMemo(() => {
    return { borderColor: tokens.colorNeutralBackground3Pressed };
  }, []);
  const rejectStyle = React.useMemo(() => {
    return {
      borderColor: tokens.colorStatusDangerBackground1,
    };
  }, []);

  const style = React.useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const hasFilesRejection = React.useMemo(() => {
    return fileRejections.length > 0;
  }, [fileRejections]);

  const fileRejectionItems = React.useMemo(() => {
    return fileRejections.map(({ file, errors }) => {
      return (
        <Caption1 key={file.name} style={{ color: tokens.colorStatusDangerForeground1 }}>
          {file.name} - {errors.map((e) => e.message).join(", ")}
        </Caption1>
      );
    });
  }, [fileRejections]);
  return (
    <>
      <div className={styles.containerGlobalMarginTop}>
        <SelectUploadLocation onSelectedLocation={(location) => setSelectedUploadLocation(location)} />
        <div {...getRootProps({ className: styles.baseStyle, style })}>
          <input {...getInputProps()} />
          <div className={styles.dragContainer}>
            <Icon icon="mage:image-upload" className={styles.dragDropIconStyles} />
            {isDragAccept && <Caption1>{strings.ImagePickerDragFilesAccpted}</Caption1>}
            {isDragReject && <Caption1>{strings.ImagePickerDragFilesRejected}</Caption1>}
            {!isDragActive && <Caption1>{strings.ImagePickerDragFilesActive}</Caption1>}
            <Body1>{strings.ImagePickerDragDropText}</Body1>
          </div>
        </div>
        <div className={styles.containerGlobalMarginTop}>{hasFilesRejection && fileRejectionItems}</div>
        <div className={styles.imagesContainer}>{renderFiles}</div>
      </div>
    </>
  );
};
