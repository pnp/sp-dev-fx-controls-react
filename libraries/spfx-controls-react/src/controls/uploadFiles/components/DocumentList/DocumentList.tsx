/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import {
  isEqual,
  pullAllWith,
} from 'lodash';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { Stack } from '@fluentui/react/lib/Stack';
import {
  ScrollablePane,
  ScrollbarVisibility,
} from '@fluentui/react/lib/ScrollablePane';

import { DragDropFiles } from '../../../dragDropFiles';
import { globalState } from '../../jotai/atoms';
import { FileInfo } from '../File/FileInfo';
import { FileCommandBar } from '../FileCommandBar/FileCommandBar';
import { NoDocuments } from '../NoDocuments/NoDocuments';
import { IDocumentListProps } from './IDocumentListProps';
import { useDocumentListStyles } from './useDocumentListStyles';

export const DocumentList: React.FunctionComponent<IDocumentListProps> = (
  props: React.PropsWithChildren<IDocumentListProps>
) => {
  const { documentListStyles, scollableContainerStyles, bootomContainerStyles } = useDocumentListStyles();
  const [appGlobalState, setGlobalState] = useAtom(globalState);
  const [renderFiles, setRenderFiles] = React.useState<React.ReactNode[]>([]);
  const { selectedFiles, files, containerWidth } = appGlobalState;
  const currentPage = React.useRef<number>(0);
  const currentFiles = React.useRef<File[]>([]);
  const { onUploadFiles } = props;
  const currentDivWidth = React.useRef<number>(0);
  const divRef = React.useRef<HTMLDivElement>();

  const isSelected = React.useCallback(
    (file: File): boolean => {
      return selectedFiles.some((selectedFile) => isEqual(selectedFile, file));
    },
    [selectedFiles]
  );

  const onFileSelected = React.useCallback(
    (isChecked: boolean, file: File) => {
      const copySelectedFiles = selectedFiles.slice();
      if (!isChecked) {
        const newFiles = pullAllWith(copySelectedFiles, [file], isEqual);
        setGlobalState((prevState) => {
          return {
            ...prevState,
            selectedFiles: newFiles,
          };
        });
      } else {
        setGlobalState((prevState) => {
          return {
            ...prevState,
            selectedFiles: [...copySelectedFiles, file],
          };
        });
      }
    },
    [setGlobalState, selectedFiles]
  );

  const renderFilesPerPage = React.useCallback(() => {
    const renderfiles: JSX.Element[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      renderfiles.push(
        <FileInfo key={`${file.name}-${i}`} fileInfo={file} onSelected={onFileSelected} isSelected={isSelected(file)} />
      );
    }
    setRenderFiles(renderfiles);
  }, [files, onFileSelected, isSelected]);

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const copyFiles = files.slice();
      const newsFiles = [...copyFiles, ...acceptedFiles];
      currentFiles.current = newsFiles;
      setGlobalState((prevState) => {
        return { ...prevState, files: newsFiles };
      });
    },
    [files, setGlobalState]
  );

  const onDelete = React.useCallback(() => {
    currentPage.current = 0;
    const newFiles = pullAllWith(files, selectedFiles, isEqual);
    setGlobalState((prevState) => {
      return { ...prevState, files: newFiles, selectedFiles: [] };
    });
  }, [files, selectedFiles, setGlobalState]);

  const onUpload = React.useCallback(
    (file: File) => {
      const newFiles = [...currentFiles.current, file];
      setGlobalState((prevState) => {
        return { ...prevState, files: newFiles };
      });
    },
    [setGlobalState]
  );

  const onSelectAll = React.useCallback(
    (isAllSelected) => {
      if (isAllSelected) {
        setGlobalState((prevState) => {
          return {
            ...prevState,
            selectedFiles: files,
          };
        });
      } else {
        setGlobalState((prevState) => {
          return {
            ...prevState,
            selectedFiles: [],
          };
        });
      }
    },
    [files, setGlobalState]
  );

  const getContainerWidth = React.useCallback(() => {
    if (currentDivWidth.current !== divRef.current?.offsetWidth && divRef.current?.offsetWidth !== undefined) {
      currentDivWidth.current = divRef.current?.offsetWidth ?? 0;
      setGlobalState((prevState) => {
        return {
          ...prevState,
          containerWidth: currentDivWidth.current,
        };
      });
    }
  }, [setGlobalState]);

  React.useEffect(() => {
    renderFilesPerPage();
    document.addEventListener("change", () => {
      getContainerWidth();
    });
    window.addEventListener("resize", () => {
      getContainerWidth();
    });
  }, [files, selectedFiles, containerWidth, renderFilesPerPage, getContainerWidth]);

  getContainerWidth();

  return (
    <>
      <div ref={divRef}>
        <FileCommandBar onDelete={onDelete} onSelectedAll={onSelectAll} onUpload={onUpload} />
        <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} styles={scollableContainerStyles}>
          <div className={documentListStyles.documentList}>
            <DragDropFiles   enable={true} onDrop={onDrop}>
              <Stack tokens={{ padding: 20 }}>
                {renderFiles.length ? (
                  <div className={documentListStyles.filesContainerGrid}>{renderFiles}</div>
                ) : (
                  <NoDocuments />
                )}
              </Stack>
            </DragDropFiles>
          </div>
        </ScrollablePane>
        <Stack styles={bootomContainerStyles} horizontalAlign="end" tokens={{ childrenGap: 20 }}>
          <div className={documentListStyles.separator} />

            <>
              <PrimaryButton
              disabled={!selectedFiles.length }
                iconProps={{ iconName: "upload" }}
                text={strings.UploadFilesUploadButtonLabel}
                onClick={() => onUploadFiles(selectedFiles)}
              />
            </>

        </Stack>
      </div>
    </>
  );
};
