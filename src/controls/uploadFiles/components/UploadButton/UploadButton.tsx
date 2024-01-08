import * as React from 'react';

import {
  IButtonStyles,
  PrimaryButton,
} from '@fluentui/react/lib/Button';

export interface IUploadButtonProps {
  onUpload: (file: File) => void;
  text: string;
  styles?: IButtonStyles;
  iconName?: string;
}

export const UploadButton: React.FunctionComponent<IUploadButtonProps> = (
  props: React.PropsWithChildren<IUploadButtonProps>
) => {
  const { onUpload, text, styles, iconName } = props;
  const onClick = React.useCallback((ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files[0];
      onUpload(file);
    };
    input.click();
  }, []);
  return (
    <>
      <PrimaryButton styles={styles ?? undefined} iconProps={{ iconName: iconName ?? "upload" }} onClick={onClick}>
        {text}
      </PrimaryButton>
    </>
  );
};
