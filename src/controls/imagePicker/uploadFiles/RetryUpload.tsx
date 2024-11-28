import * as React from "react";

import strings from "ControlStrings";

import {
  Button,
  Tooltip,
} from "@fluentui/react-components";
import {
  ArrowClockwiseFilled,
  ArrowClockwiseRegular,
  bundleIcon,
} from "@fluentui/react-icons";

import { useUploadFilesStyles } from "./useUploadFilesStyles";

export interface IRetryUplaodProps {
  isShow: boolean;
  onRetry: () => void;
}

export const RetryUpload: React.FunctionComponent<IRetryUplaodProps> = (
  props: React.PropsWithChildren<IRetryUplaodProps>
) => {
  const { isShow } = props;

  const Retry = bundleIcon(ArrowClockwiseFilled, ArrowClockwiseRegular);
  const styles = useUploadFilesStyles();

  if (!isShow) {
    return null;
  }
  return (
    <>
      <Tooltip content={strings.ImagePickerRetryButtonLabel} relationship={"label"}>
        <div aria-label={strings.ImagePickerRetryButtonLabel}>
          <Button
            icon={<Retry className={styles.iconRefreshStyle} />}
            size="small"
            appearance="transparent"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              props.onRetry();
            }}
          />
        </div>
      </Tooltip>
    </>
  );
};
