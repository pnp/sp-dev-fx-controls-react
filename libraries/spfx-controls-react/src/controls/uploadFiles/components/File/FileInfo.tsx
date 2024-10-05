import * as React from 'react';

import { format } from 'date-fns';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import {
  DocumentCard,
  DocumentCardDetails,
  DocumentCardImage,
} from '@fluentui/react/lib/DocumentCard';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { ImageFit } from '@fluentui/react/lib/Image';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';

import {
  getFileTypeIconProps,
  initializeFileTypeIcons,
} from '@fluentui/react-file-type-icons';

import { useUtils } from '../../hooks/useUtils';
import { useFileStyles } from './useFileStyles';

initializeFileTypeIcons();
export interface IFileInfoProps {
  fileInfo: File;
  onSelected?: (isSelected: boolean, file: File) => void;
  isSelected: boolean;
}

export const FileInfo: React.FunctionComponent<IFileInfoProps> = (props: React.PropsWithChildren<IFileInfoProps>) => {
  const { fileInfo, onSelected, isSelected } = props;
  const { name, size, lastModified } = fileInfo;

  const {
    checkBoxStyles,
    documentCardStyles,
    stackCheckboxStyles,
    fileNameStyles,
    documentImageStyles,
  } = useFileStyles();
  const { getShortText, getFileExtension, getFileSize } = useUtils();
  const fileSize = getFileSize(size);
  const fileExtension = getFileExtension(name);
  const fileModified = format(new Date(lastModified), "dd, MMM yyyy");
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const fileIcon: IIconProps = React.useMemo(() => {
    return {
      ...getFileTypeIconProps({ extension: fileExtension, size: 48, imageFileType: "svg" }),
      styles: { root: { fontSize: 0 } }
    };
  }, [fileExtension]);

  const onCheckboxChange = React.useCallback(
    (ev: React.FormEvent<HTMLElement>, checked: boolean) => {
      setIsChecked(checked);
      if (onSelected) {
        onSelected(checked, fileInfo);
      }
    },
    [fileInfo, onSelected]
  );

  React.useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);

  const renderNormalCard = React.useCallback(() => {
    return (
      <>
        <Stack>
          <DocumentCard styles={documentCardStyles} title={name}>
            <DocumentCardImage
              height={100}
              imageFit={ImageFit.cover}
              iconProps={fileIcon}
              styles={documentImageStyles}
            />
            <Stack
              horizontal
              horizontalAlign="end"
              tokens={{ childrenGap: 5, padding: 7 }}
              styles={stackCheckboxStyles}
            >
              <Checkbox styles={checkBoxStyles} checked={isChecked} onChange={onCheckboxChange} />
            </Stack>

            <DocumentCardDetails>
              <Stack tokens={{ padding: 10, childrenGap: 5 }} horizontalAlign="center" verticalAlign="center">
                <Text title={name} styles={fileNameStyles} variant="medium">
                  {getShortText(name, 15)}
                </Text>
                <Text variant="small">{fileSize}</Text>
                <Text block nowrap variant="small">
                  {fileModified}
                </Text>
              </Stack>
            </DocumentCardDetails>
          </DocumentCard>
        </Stack>
      </>
    );
  }, [
    documentCardStyles,
    name,
    fileIcon,
    documentImageStyles,
    stackCheckboxStyles,
    checkBoxStyles,
    isChecked,
    onCheckboxChange,
    fileNameStyles,
    getShortText,
    fileSize,
    fileModified,
  ]);

  return <>{renderNormalCard()}</>;
};
