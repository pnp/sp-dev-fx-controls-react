import * as React from 'react';

import { Button } from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';

import { UserCard } from '../userCard/UserCard';
import { useSelectUserStyles } from './useSelectuserStyles';

export interface IUserProps {
  userId: string;
  onRemove?: (userId: string) => void;
}

export const User: React.FunctionComponent<IUserProps> = (props: React.PropsWithChildren<IUserProps>) => {
  const { userId, onRemove } = props;
  const styles = useSelectUserStyles();

  const onClick = React.useCallback(() => {
    if (onRemove) onRemove(userId);
  }, [userId]);

  return (
    <>
      <div className={styles.userItem}>
        <UserCard userId={userId} showOverCard={true} />
        <Button
          shape="circular"
          className={styles.userItemCloseButton}
          appearance="transparent"
          icon={<Dismiss16Regular />}
          onClick={onClick}
        />
      </div>
    </>
  );
};
