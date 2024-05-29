import * as React from "react";

import strings from "ControlStrings";

import {
  Body1,
  Field,
  makeStyles,
  Radio,
  RadioGroup,
  RadioGroupOnChangeData,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { WebAssetRegular } from "@fluentui/react-icons";

import { EUploadLocations } from "../constants/EUploadLocations";

export interface ISelectUploadLocationProps {
  onSelectedLocation: (location: string) => void;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    ...shorthands.gap("5px"),
  },
  iconStyles: {
    width: "18px",
    height: "18px",
    color: tokens.colorBrandForeground1,
  },
});

const RenderLabel = (): JSX.Element => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <WebAssetRegular className={styles.iconStyles} />
      <Body1>{strings.ImagePickerUploadLocationLabel}</Body1>
    </div>
  );
};

export const SelectUploadLocation: React.FunctionComponent<ISelectUploadLocationProps> = (
  props: React.PropsWithChildren<ISelectUploadLocationProps>
) => {
  const [value, setValue] = React.useState<string>(EUploadLocations.CurrentSite);

  const { onSelectedLocation } = props;

  const onChange = React.useCallback((data: RadioGroupOnChangeData) => {
    setValue(data.value);
    if (onSelectedLocation) {
      onSelectedLocation(data.value);
    }
  }, []);
  return (
    <>
      <Field label={<RenderLabel />} style={{ paddingBottom: 10 }}>
        <RadioGroup value={value} onChange={(_, data) => onChange(data)} layout="horizontal">
          <Radio value={EUploadLocations.OneDrive} label={strings.ImagePickerUploadLocationOndriveLabel} />
          <Radio value={EUploadLocations.CurrentSite} label={strings.ImagePickerUploadLocationSharePointLabel} />
        </RadioGroup>
      </Field>
    </>
  );
};
