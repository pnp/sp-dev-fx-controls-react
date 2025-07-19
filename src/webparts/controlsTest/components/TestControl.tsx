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
import { UserPicker } from '../../../controls/userPicker';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import WorldMap from '../../../controls/worldMap/WorldMap';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

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
      <FluentProvider theme={setTheme()}>
        <div className={styles.title}>
          <Title3>Test Control - WorldMap</Title3>
        </div>
        <WorldMap
          theme={setTheme() as Theme}
          description={''}
          isDarkTheme={false}
          hasTeamsContext={false}
          title={'Test Control - World Map'}
          styles={{ width: '100%', height: '600vh' }}
        />
      </FluentProvider>
      </IdPrefixProvider>
    </>
  );
};
