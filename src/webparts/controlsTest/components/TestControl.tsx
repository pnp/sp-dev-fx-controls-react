import * as React from 'react';

import { css } from '@emotion/css';
import {
  FluentProvider,
  IdPrefixProvider,
  Theme,
  Title3,
} from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { ImagePicker } from '../../../controls/imagePicker';
import {
  IFilePickerResult,
} from '../../../controls/imagePicker/IFilePickerResult';

const useStyles = () => {
  return {
    root: css({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      marginLeft: "50%",
      marginRight: "50%",
      height: "fit-content",
      width: "fit-content",
    }),
    image: css({
      width: "20px",
      height: "20px",
      overflow: "hidden",
    }),
    title: css({
      marginBottom: "30px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }),
  };
};

export interface ITestControlProps {
  context: WebPartContext;
  themeVariant: any;
}

export const TestControl: React.FunctionComponent<ITestControlProps> = (
  props: React.PropsWithChildren<ITestControlProps>
) => {
  const { themeVariant, context } = props;

  const styles = useStyles();

  const setTheme = React.useCallback((): Partial<Theme> => {
    return createV9Theme(themeVariant);
  }, [themeVariant]);

  return (
    <>
      <IdPrefixProvider value="test-control">
        <FluentProvider theme={setTheme()}>
          <div className={styles.title}>
            <Title3>Test Control - ImagePicker</Title3>
          </div>

          <ImagePicker
            onFileSelected={(file: IFilePickerResult) => {
              console.log(file);
            }}
            onDeleteFile={() => {
              console.log("onDeleted");
            }}
            selectedFileUrl=""
            context={context}
          />
        </FluentProvider>
      </IdPrefixProvider>
    </>
  );
};
