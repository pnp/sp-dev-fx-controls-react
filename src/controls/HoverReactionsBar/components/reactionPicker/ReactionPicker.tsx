/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
import * as React from 'react';

import strings from 'ControlStrings';

import { Card, Input, tokens } from '@fluentui/react-components';
import { Icon } from '@iconify/react';

import emojiList from '../../data/fluentEmojis.json';
import { useFluentEmojis } from '../../hooks/useFluentEmojis';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { IEmojiInfo } from '../../models/IFluentEmoji';
import { ReactionGroups } from './ReactionGroups';
import { RenderEmoji } from './RenderEmoji';
import { useReactionPickerStyles } from './useReactionPickerStyle';

const PICKER_WIDTH = 350;
const PICKER_HEIGHT = 420;

export interface IReactionProps {
  onSelect: (emoji: string | undefined, emojiInfo?: IEmojiInfo) => void;
  isOpen: boolean;
  onDismiss: () => void;
  returnType?: 'emoji' | 'image';
  target?: HTMLDivElement;
}

const DEFAULT_GROUP = 'Smileys & Emotion';

export const ReactionPicker: React.FunctionComponent<IReactionProps> = (
  props: React.PropsWithChildren<IReactionProps>
) => {
  const { onSelect, isOpen, onDismiss, returnType, target } = props;
  const pickerRef = React.useRef<HTMLDivElement>(null);
  const styles = useReactionPickerStyles();
  const [renderEmoji, setRenderEmoji] = React.useState<JSX.Element[]>([]);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [groups, setGroups] = React.useState<any>();
  const [selectedGroup, setSelectedGroup] =
    React.useState<string>(DEFAULT_GROUP);
  const groupsRef = React.useRef<any>();
  const [pickerStyles, setStyles] = React.useState<React.CSSProperties>();
  const isSearchingRef = React.useRef<boolean>(false);
  const { getFluentEmojisByGroup, getFluentEmojis } = useFluentEmojis();

  const onClose = React.useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  useOnClickOutside(true, pickerRef, onClose);

  const loadEmoji = React.useCallback(
    (selectedGroup) => {
      isSearchingRef.current = false;
      setSearchValue('');
      if (!groupsRef?.current) {
        return;
      }
      const emojiList = selectedGroup
        ? groupsRef.current[selectedGroup]
        : groups[DEFAULT_GROUP];
      setRenderEmoji([]);
      for (let index = 0; index < emojiList.length; index++) {
        const emojiInfo = emojiList[index];

        if (emojiInfo) {
          setRenderEmoji((emojis) => {
            return [
              ...emojis,
              <RenderEmoji
                key={index}
                emoji={emojiInfo}
                onSelect={(emoji) => {
                  document.body.style.pointerEvents = '';
                  onSelect(emoji, emojiInfo);
                  onDismiss();
                }}
              />,
            ];
          });
        }
      }
    },
    [emojiList, onSelect, onDismiss, groups, returnType]
  );

  React.useEffect(() => {
    const countainerBounds = target?.getBoundingClientRect() as DOMRect;
    let pickerTopPosition = 0;
    let pickerLeftPosition = 0;

    if (countainerBounds?.top + PICKER_HEIGHT > window.innerHeight) {
      pickerTopPosition = countainerBounds.top - PICKER_HEIGHT - 10;
      if (pickerTopPosition < 0) {
        pickerTopPosition = 0;
      }
    } else {
      pickerTopPosition = countainerBounds?.bottom + 10;
      if (pickerTopPosition < 0) {
        pickerTopPosition = 0;
      }
    }

    if (countainerBounds?.left + PICKER_WIDTH > window.innerWidth) {
      pickerLeftPosition = countainerBounds?.left - PICKER_WIDTH;
    } else {
      pickerLeftPosition = countainerBounds?.left;
    }

    setStyles({
      top: `${pickerTopPosition}px`,
      left: `${pickerLeftPosition}px`,
      zIndex: '1000000',
      display: isOpen ? 'block' : 'none',
    });
  }, [target, isOpen, pickerRef]);

  React.useEffect(() => {
    const listByGroup = getFluentEmojisByGroup();
    groupsRef.current = listByGroup;
    setGroups(listByGroup);
  }, []);

  React.useEffect(() => {
    setRenderEmoji([]);
    setSearchValue('');
    loadEmoji(DEFAULT_GROUP);
  }, [isOpen]);

  const searchEmoji = React.useCallback(
    (searchText: string) => {
      isSearchingRef.current = true;
      const mewlist = getFluentEmojis().filter((emojiInfo: IEmojiInfo) => {
        if (emojiInfo) {
          return emojiInfo.keywords?.some((keyword) =>
            keyword.includes(searchText)
          );
        }
        return false;
      });
      setRenderEmoji([]);
      for (let index = 0; index < mewlist.length; index++) {
        const emojiInfo = mewlist[index];
        if (emojiInfo) {
          setRenderEmoji((emojis) => {
            return [
              ...emojis,
              <RenderEmoji
                key={index}
                emoji={emojiInfo}
                onSelect={(emoji) => {
                  onSelect(emoji, emojiInfo);
                  onDismiss();
                }}
              />,
            ];
          });
        }
      }
    },
    [onSelect, onDismiss, groups, returnType]
  );

  return (
    <>
      <Card className={styles.card} style={pickerStyles} ref={pickerRef}>
        <div className={styles.cardContent}>
          <Input
            value={searchValue}
            placeholder={strings.HoverReactionBarSearchEmojiPlaceholder}
            onChange={(ev, data) => {
              setSearchValue(data?.value || '');
              if (!ev.currentTarget?.value) {
                loadEmoji(selectedGroup);
              } else {
                searchEmoji(ev.currentTarget.value);
              }
            }}
            type="search"
            className={styles.searchBox}
            contentBefore={
              <Icon
                icon="fluent:search-20-regular"
                color={tokens.colorBrandForeground1}
              />
            }
            onKeyDown={(ev: React.KeyboardEvent<HTMLInputElement>) => {
              if (ev.key === 'Enter') {
                searchEmoji(ev.currentTarget.value);
              }
            }}
          />
          <div className={styles.emojiList}>{renderEmoji}</div>
          {isSearchingRef.current ? null : (
            <ReactionGroups
              selectedGroup={selectedGroup}
              groups={groups}
              onSelectedGroup={(groupName: string) => {
                setSelectedGroup(groupName);
                loadEmoji(groupName);
              }}
            />
          )}
        </div>
      </Card>
    </>
  );
};
