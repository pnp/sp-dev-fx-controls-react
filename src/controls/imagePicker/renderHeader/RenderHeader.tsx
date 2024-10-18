import * as React from 'react';

import {
  Button,
  Caption1,
  Subtitle1,
} from '@fluentui/react-components';
import { Dismiss24Regular } from '@fluentui/react-icons';
import { Icon } from '@iconify/react';

import { useRenderHeaderStyles } from './useRenderHeaderStyles';

export interface IRenderHeaderProps {
  onDismiss: (open?: boolean) => void;
  icon?: string | JSX.Element;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
}

export const RenderHeader: React.FunctionComponent<IRenderHeaderProps> = (
  props: React.PropsWithChildren<IRenderHeaderProps>
) => {
  const { onDismiss, title, description, icon } = props;
  const styles = useRenderHeaderStyles();

  return (
    <>
    <div className={styles.renderHeaderContent}>
      <div
        className={styles.renderHeaderHeader}
      >
        <Button
          appearance="subtle"
          className={styles.closeButton}
          onClick={() => onDismiss(false)}
          icon={<Dismiss24Regular />}
        />

        <div className={styles.renderHeaderTitleContainer}>
          {React.isValidElement(icon) ? icon : <Icon icon={icon as string} width={24} height={24}/>}
          <div className={styles.dialogTitleAndDescriptionContainer}>
            {React.isValidElement(title) ? (
              title
            ) : (
              <Subtitle1 className={styles.renderHeaderTitle}>{title}</Subtitle1>
            )}
            {React.isValidElement(description) ? (
              description
            ) : (
              <Caption1 className={styles.renderHeaderDescription}>{description}</Caption1>
            )}
          </div>
        </div>
      </div>
    </div>
  </>
  );
};
