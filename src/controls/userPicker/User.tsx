import * as React from 'react';

import { Button } from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';

import { UserCard } from './userCard/UserCard';
import { useUserPickerStyles } from './useUserPickerStyles';

export interface IUserProps {
  userId: string;
  onRemove?: (userId: string) => void;
  secondaryTextPropertyName?: "jobTitle" | "department" | "mail" | "officeLocation" | "mobilePhone" | "businessPhones" | "userPrincipalName"  ;
}

export const User: React.FunctionComponent<IUserProps> = (props: React.PropsWithChildren<IUserProps>) => {
  const { userId, onRemove, secondaryTextPropertyName } = props;
  const styles = useUserPickerStyles();

  const onClick = React.useCallback(() => {
    if (onRemove) onRemove(userId);
  }, [userId]);

  return (
    <>
      <div className={styles.userItem}>
        <UserCard userId={userId} showOverCard={true} secondaryTextPropertyName={secondaryTextPropertyName}/>
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
