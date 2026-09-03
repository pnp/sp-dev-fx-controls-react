import * as React from "react";

import {
  Caption1Strong,
  makeStyles,
  shorthands,
  tokens,
} from "@fluentui/react-components";
import { ErrorCircleRegular } from "@fluentui/react-icons";

export interface IFileErrorProps {
  error: string;
  isShow: boolean;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
    ...shorthands.gap("5px"),
    paddingTop: "10px",
  },
  iconErrorStyle: {
    width: "18px",
    height: "18px",
    color: tokens.colorStatusWarningForeground1,
  },

  errorTextStyles: {
    color: tokens.colorStatusWarningForeground1,
    paddingLeft: "5px",
  },
});

export const FileError: React.FunctionComponent<IFileErrorProps> = (
  props: React.PropsWithChildren<IFileErrorProps>
) => {
  const { isShow , error} = props;
  if (!isShow) {
    return null;
  }
  const styles = useStyles();

  return (
    <>
      <div className={styles.root}>
        <ErrorCircleRegular className={styles.iconErrorStyle} />
        <Caption1Strong className={styles.errorTextStyles}>{error}</Caption1Strong>
      </div>
    </>
  );
};
