import * as React from "react";

import {
  Caption1,
  makeStyles,
  ProgressBar,
  shorthands,
} from "@fluentui/react-components";

export interface IFileProgressProps {
  percentageCompleted: number;
  isShow: boolean;
}

const useStyles = makeStyles({
  root: {
    paddingTop: "15px",
    display: "flex",
    ...shorthands.gap("5px"),
    alignItems: "center",
  },
});

export const FileProgress: React.FunctionComponent<IFileProgressProps> = (
  props: React.PropsWithChildren<IFileProgressProps>
) => {
  const { percentageCompleted, isShow } = props;

  const percentage = percentageCompleted * 100;

  const styles = useStyles();

  if (!isShow) {
    return null;
  }
  return (
    <>
      <div className={styles.root}>
        <ProgressBar thickness="medium" max={100} value={percentage} />
        <Caption1> {percentage.toFixed(0)}%</Caption1>
      </div>
    </>
  );
};
