/* eslint-disable no-unused-expressions */
/* eslint-disable @rushstack/no-new-null */
import * as React from 'react';

import { Card } from '@fluentui/react-components';
import { Icon } from '@iconify/react';

import { useFluentEmojis } from '../../hooks/useFluentEmojis';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { IHoverReactionsBarProps } from '../../IHoverReactionsBarProps';
import { IEmojiInfo } from '../../models/IFluentEmoji';
import { ReactionPicker } from '../reactionPicker/ReactionPicker';
import { RenderEmoji } from '../reactionPicker/RenderEmoji';
import { useHoverReactionsStyles } from './useHoverReactionsStyles';

export const HoverReactionsBarControl: React.FunctionComponent<IHoverReactionsBarProps> = (
  props: React.PropsWithChildren<IHoverReactionsBarProps>
) => {
  const { onSelect, isOpen, onDismiss, top4Reactions, target} = props;
  const [showEmojiPicker, setShowEmojiPicker] = React.useState<boolean>(false);
  const { getFluentEmojiByName } = useFluentEmojis();
  const styles = useHoverReactionsStyles();
  const [renderEmoji, setRenderEmoji] = React.useState<JSX.Element[]>([]);
  const defaultTop4Reactions = ["Thumbs up", "Red heart", "grinning face with big eyes", "Face with open mouth"];
  const toolbarRef = React.useRef<HTMLDivElement>(null);

  const onClose = React.useCallback(() => {
    onDismiss();
  }, [onDismiss]);

  useOnClickOutside(true, toolbarRef, onClose);

  const loadEmoji = React.useCallback(() => {
    const topReaction = top4Reactions && top4Reactions?.length > 0 ? top4Reactions : defaultTop4Reactions;
    const renderEmoji: JSX.Element[] = [];
    for (const emojii of topReaction) {
      const emojiInfo = getFluentEmojiByName(emojii) as IEmojiInfo;
      if (emojiInfo) {
        renderEmoji.push(
          <RenderEmoji
            key={emojii}
            className={styles.emojiImage}
            emoji={emojiInfo}
            onSelect={(emoji, emojiInfo) => {
              onSelect(emoji, emojiInfo);
            }}
          />
        );
      }
    }
    renderEmoji.push(
      <Icon
        key={"add"}
        className={styles.emojiImage}
        icon="fluent:emoji-add-16-regular"
        width={30}
        height={30}
        onClick={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          setShowEmojiPicker(true);
        }}
      />
    );
    setRenderEmoji(renderEmoji);
  }, [getFluentEmojiByName, onSelect, onDismiss, top4Reactions, defaultTop4Reactions]);

  React.useEffect(() => {
    setRenderEmoji([]);
    loadEmoji();
  }, [isOpen]);

  return (
    <>
      <Card
        className={styles.card}
        style={{
          display: isOpen ? "block" : "none",
          top: target?.offsetTop - 55,
          left: target?.offsetLeft,
        }}
        ref={toolbarRef}
      >
        <div className={styles.cardContent}>
          <div className={styles.emojiList}>{renderEmoji}</div>
        </div>
        {showEmojiPicker && (
          <ReactionPicker
            returnType="image"
            isOpen={showEmojiPicker}
            onDismiss={() => {
              setShowEmojiPicker(false);
            }}
            onSelect={onSelect}
            target={toolbarRef?.current as HTMLDivElement}
          />
        )}
      </Card>
    </>
  );
};
