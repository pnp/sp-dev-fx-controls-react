import * as React from 'react';

import {
  Button,
  Divider,
  mergeClasses,
} from '@fluentui/react-components';

import fluentEmojiGroups from '../../data/fluentEmojisGroups.json';
import { useReactionPickerStyles } from './useReactionPickerStyle';

export interface IReactionGroupsProps {
  selectedGroup: string;
  groups: string[];
  onSelectedGroup: (group: string) => void;
}

interface IGroup {
  groupName: string;
  emoji: string;
}

export const ReactionGroups: React.FunctionComponent<IReactionGroupsProps> = (
  props: React.PropsWithChildren<IReactionGroupsProps>
) => {
  const {   onSelectedGroup, selectedGroup } = props;
  const styles = useReactionPickerStyles();
  return (
    <>
      <Divider />
      <div className={styles.emojiGroupContainer}>
        {fluentEmojiGroups.map((group:IGroup, index) => {
          const { groupName, emoji } = group;
          return (
            <Button
              className={styles.groupButton}
              key={index}
              onClick={(ev) => {
                ev.preventDefault();
                onSelectedGroup(groupName);
              }}
              appearance="subtle"
              icon={
                <div
                  className={mergeClasses(styles.emojiImageGroup, selectedGroup === groupName ? styles.emojiSelected : "")}
                  title={groupName}
                  style={{
                    WebkitMaskImage: `url(${emoji})`,
                    maskImage: `url(${emoji})`,

                  }}
                />
              }
            />
          );
        })}
      </div>
    </>
  );
};
