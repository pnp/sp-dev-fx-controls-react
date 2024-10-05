/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import {
  IEmojiInfo,
  Skintones,
} from '../../models/IFluentEmoji';
import { useReactionPickerStyles } from './useReactionPickerStyle';

export interface IRenderEmojiProps {
  emoji: IEmojiInfo;
  onSelect?: (emoji: string | undefined, emojiInfo?: IEmojiInfo) => void;
  className?: string;
}

export const RenderEmoji: React.FunctionComponent<IRenderEmojiProps> = (
  props: React.PropsWithChildren<IRenderEmojiProps>
) => {
  const { emoji, onSelect, className } = props;
  const styles = useReactionPickerStyles();

  const imageUrl = React.useMemo(() => {
    try {
      const { styles, skintones } = emoji || ({} as IEmojiInfo);
      const { Default } = skintones || ({} as Skintones);
      let image = styles ? styles.Color : undefined;
      if (!image) {
        image = Default ? Default.Color : "";
      }

      return image;
    } catch (error) {
      console.log(error);
    }
  }, [emoji, styles]);

  if (!emoji) {
    return null;
  }

  return (
    <>
      <img
        src={imageUrl}
        alt={emoji.cldr}
        className={className ?? styles.emojiImage}
        onClick={() => {
          if (onSelect) {
            onSelect(emoji.glyph, emoji);
          }
        }}
      />
    </>
  );
};
