import * as React from 'react';

import {
  FluentProvider,
  IdPrefixProvider,
  Theme,
  Title3,
  makeStyles,
  shorthands,
} from '@fluentui/react-components';

import { IUserInfo } from '../../../controls/userPicker/models/IUserInfo';

import { WebPartContext } from '@microsoft/sp-webpart-base';

import { createV9Theme } from '@fluentui/react-migration-v8-v9';
import { Kpis } from '../../../controls/KPIControl';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.gap('10px'),
    marginLeft: '50%',
    marginRight: '50%',
    height: 'fit-content',
    width: 'fit-content',
  },
  image: {
    width: '20px',
    height: '20px',
  },
  title: {
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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

  const onSelectedUsers = (users: IUserInfo[]) => {
    console.log('selected users', users);
  };

  return (
    <>
    <IdPrefixProvider value="test-control-">
      <FluentProvider theme={setTheme()} applyStylesToPortals={true}>
        <div className={styles.title}>
          <Title3>KPIS Control Test</Title3>
        </div>
        <Kpis />
      </FluentProvider>
      </IdPrefixProvider>
    </>
  );
};
