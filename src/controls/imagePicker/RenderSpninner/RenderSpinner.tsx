import * as React from 'react';

import {
  makeStyles,
  mergeClasses,
  Spinner,
} from '@fluentui/react-components';

const useStyles = makeStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      height: "100%",
      width: "100%",
    },
    spinner: {
      width: "100px",
      height: "100px",
    },
  });

export interface IRenderSpinnerProps {
  size: "medium" | "small" | "extra-tiny" | "tiny" | "extra-small" | "large" | "extra-large" | "huge";
  label?: string;
  labelPosition?: "above" | "below" | "before" | "after";
  style?: React.CSSProperties;
  className?: string;
}

export const RenderSpinner: React.FunctionComponent<IRenderSpinnerProps> = (
  props: React.PropsWithChildren<IRenderSpinnerProps>
) => {
  const { size, label, labelPosition, style, className } = props;

  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Spinner
        style={style}
        className={mergeClasses(styles.spinner, className)}
        size={size}
        label={label}
        labelPosition={labelPosition}
      />
    </div>
  );
};
