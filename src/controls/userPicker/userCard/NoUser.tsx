import * as React from 'react';

import { Body1 } from '@fluentui/react-text';
import { Icon } from '@iconify/react';

import { useUserCardStyles } from './useUserCardStyles';

export interface INoUserProps {}

export const NoUser: React.FunctionComponent<INoUserProps> = (props: React.PropsWithChildren<INoUserProps>) => {
  const styles = useUserCardStyles();
  return (
    <>
      <div className={styles.root} style={{padding:10}}>
      <Icon icon="fluent:people-error-20-filled" width="28" height="28" />
        <Body1>No user found</Body1>
      </div>
    </>
  );
};
