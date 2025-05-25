import * as React from 'react';
import {
  DialogType,
  FontWeights,
  getTheme,
  IButtonStyles,
  IconButton,
  IIconProps,
  IStackProps,
  mergeStyleSets,
  Modal,
  Persona,
  PersonaSize,
  Stack,
} from '@fluentui/react';
import { AppContext } from '../../common';
import { useListItemCommentsStyles } from './useListItemCommentsStyles';

interface ILikedUserListProps {
  isDialogOpen: boolean;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  likedBy: any;
}

export const LikedUserList = ({
  isDialogOpen,
  setShowDialog,
  likedBy,
}: ILikedUserListProps) => {
  const { iconButtonStyles, contentStyles } = useListItemCommentsStyles();

  const PHOTO_URL = '/_layouts/15/userphoto.aspx?size=M&accountname=';

  return (
    <Modal
      isOpen={isDialogOpen}
      onDismiss={() => setShowDialog(false)}
      styles={{ main: { width: '480px' } }}
    >
      <div className={contentStyles.header}>
        <h2 className={contentStyles.heading}>Liked by</h2>
        <IconButton
          styles={iconButtonStyles}
          iconProps={cancelIcon}
          ariaLabel="Close popup modal"
          onClick={() => setShowDialog(false)}
        />
      </div>
      <Stack
        tokens={{ childrenGap: 12 }}
        style={{
          height: 'auto',
          maxHeight: '450px',
          overflowY: 'auto',
          padding: '0 1.5rem 1.5rem 1.5rem',
        }}
      >
        {likedBy.map((user: any, index: number) => (
          <>
            <Persona
              key={index}
              text={user.name}
              secondaryText={user.email}
              size={PersonaSize.size40}
              imageUrl={`${PHOTO_URL}${user.email}`}
            />
          </>
        ))}
      </Stack>
    </Modal>
  );
};
const cancelIcon: IIconProps = { iconName: 'Cancel' };
