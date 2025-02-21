/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import {
  Button,
  Image,
} from '@fluentui/react-components';
import {
  Delete16Regular,
  Image20Regular,
} from '@fluentui/react-icons';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFilePickerResult } from './IFilePickerResult';
/* import { RenderSpinner } from "./RenderSpninner/RenderSpinner"; */
import { SelectFromSharePoint } from './selectFromSharePoint';
import { contextState } from './atoms/contextState';
import { css } from '@emotion/css';
import strings from 'ControlStrings';
import { useAtom } from 'jotai';
import { useImagePickerStyles } from './useImagePickerStyles';

const maxWidth = 200;
const maxHeight = 200;

const useStyles = () => {
  return {
    image: css({
      minWidth: maxWidth,
      maxWidth: maxWidth,
      height: maxHeight,
      objectPosition: "top center",
    }),
  };
};

export interface IImagePickerProps {
  onFileSelected: (file: IFilePickerResult) => void;
  onDeleteFile: () => void;
  selectedFileUrl: string;
  context: BaseComponentContext;
}

/**
 * Renders the preview image component.
 *
 * @param props - The component props.
 * @param props.selectedImageFileUrl - The URL of the selected image file.
 * @returns The JSX element representing the preview image component.
 */
const RenderPreviewImage = (props: { selectedImageFileUrl: string }): JSX.Element => {
  const { selectedImageFileUrl } = props;

  const maxWidth = 200;
  const maxHeight = 200;
  const styles = useImagePickerStyles();
  const imageStyles = useStyles();

  if (!selectedImageFileUrl) {
    return null;
  }

  return (
    <>
      <div className={styles.renderImageContainer}>
        <Image src={selectedImageFileUrl} fit="cover" className={imageStyles.image} alt="Selected Image" />
      </div>
    </>
  );
};

/**
 * Renders an image picker component.
 *
 * @component
 * @example
 * ```tsx
 * <ImagePicker
 *   onFileSelected={handleFileSelected}
 *   onDeleteFile={handleDeleteFile}
 *   selectedFileUrl={selectedImageUrl}
 *   context={appContext}
 * />
 * ```
 */

export const ImagePicker: React.FunctionComponent<IImagePickerProps> = (
  props: React.PropsWithChildren<IImagePickerProps>
) => {
  const { onFileSelected, onDeleteFile, selectedFileUrl, context } = props;
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const styles = useImagePickerStyles();
  const ref = React.useRef<HTMLDivElement>(null);
  const [appContext, setAppContext] = useAtom(contextState);

  React.useEffect(() => {
    setAppContext({
      ...appContext,
      context: context,
    });
  }, []);

  const [selectedImageFileUrl, setSelectedImageFileUrl] = React.useState<string>(selectedFileUrl);

  const onDismiss = (): void => {
    setIsOpen(false);
  };

  const isFileSelected = React.useMemo(() => {
    return !!selectedImageFileUrl;
  }, [selectedImageFileUrl]);

  const onDeleteFileCLick = React.useCallback(() => {
    setSelectedImageFileUrl(undefined);
    onDeleteFile();
  }, []);

  const styleButtonDelete: React.CSSProperties = { display: !isFileSelected ? "none" : "inline-flex" };

  if (!context) return null;

  return (
    <>
      <div className={styles.root} ref={ref}>
        <div className={styles.buttonContainer}>
          <Button icon={<Image20Regular />} shape="circular" onClick={() => setIsOpen(true)}>
            {strings.ImagePickderSelectLabel}
          </Button>
          <Button
            icon={<Delete16Regular />}
            shape="circular"
            style={styleButtonDelete}
            onClick={() => onDeleteFileCLick()}
          >
            {strings.ImagePickerDeleteImageLabel}
          </Button>
        </div>
        <SelectFromSharePoint
          isOpen={isOpen}
          onDismiss={onDismiss}
          onFileSelected={async (file: IFilePickerResult) => {
            onFileSelected(file);
            setSelectedImageFileUrl(file.previewDataUrl);
            onDismiss();
          }}
        />
        {<RenderPreviewImage selectedImageFileUrl={selectedImageFileUrl} />}
      </div>
    </>
  );
};
