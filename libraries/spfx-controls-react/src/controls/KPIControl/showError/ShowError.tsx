import { Body1, Card, Title3 } from "@fluentui/react-components";

import { ErrorCircleRegular } from "@fluentui/react-icons";
import { IErrorDisplayProps } from "./IErrorDisplayProps";
import React from "react";
import { Stack } from "../stack";
import { useShowErrorStyles } from "./useShowErrorStyles";

export const ShowError: React.FC<IErrorDisplayProps> = ({ title, message }) => {
  const styles = useShowErrorStyles();
  return (
    <Card className={styles.container}>
      <Stack gap="l" alignItems="center">
        <ErrorCircleRegular className={styles.icon} />

        <Stack gap="s" alignItems="center">
          <Title3 className={styles.title}>{title}</Title3>
          <Body1 className={styles.message}>{message}</Body1>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ShowError;
