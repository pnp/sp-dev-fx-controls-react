import * as React from "react";

import strings from "ControlStrings";

import {
  Button,
  Tooltip,
} from "@fluentui/react-components";
import {
  bundleIcon,
  Delete16Filled,
  Delete16Regular,
} from "@fluentui/react-icons";

import { useUploadFilesStyles } from "./useUploadFilesStyles";

export interface IDeleteFileProps {
  isWhow: boolean;
  onDeleteFile: () => void;
}

export const DeleteFile: React.FunctionComponent<IDeleteFileProps> = (

  props: React.PropsWithChildren<IDeleteFileProps>
) => {
  const Delete = bundleIcon(Delete16Filled, Delete16Regular);
  const styles = useUploadFilesStyles();
  const { isWhow , onDeleteFile} = props;
  if (!isWhow) {
    return null;
  }
  return (
    <>
      <Tooltip content={strings.ImagePickerDeleteLabel} relationship={"label"}>
        <div aria-label={strings.ImagePickerDeleteLabel}>
          <Button
            icon={<Delete className={styles.deleteStyle} />}
            size="small"
            appearance="transparent"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDeleteFile();
            }}
          />

        </div>
      </Tooltip>
    </>
  );
};
