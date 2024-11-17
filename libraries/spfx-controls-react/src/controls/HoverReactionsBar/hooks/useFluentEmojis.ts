/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { find } from 'lodash';

import { groupBy } from '@microsoft/sp-lodash-subset';

import emojiList from '../data/fluentEmojis.json';
import { IEmojiInfo } from '../models/IFluentEmoji';

export interface IUseFluentEmojis {
  getEmojis: () => Promise<IEmojiInfo[]>;
  getFluentEmojis: () => any;
  getFluentEmojisByGroup: () => any;
  getFluentEmojiByglyph: (glyph: string) => any;
  getFluentEmojiByName: (name: string) => any;
  getFluentEmoji: (glyph: string) => any;
}

export const useFluentEmojis = (): IUseFluentEmojis => {
  const base64FromSVGUrl = React.useCallback(async (url: string): Promise<string> => {
    const svg = await fetch(url).then((response) => response.text());
    const svg64 = btoa(svg);
    const b64Start = "data:image/svg+xml;base64,";
    const image64 = b64Start + svg64;
    return image64;

}, []);

  const getEmojis = React.useCallback(async () => {
    const newEmojiList: IEmojiInfo[] = [];
    for (const emoji in emojiList) {
      if (Object.prototype.hasOwnProperty.call(emojiList, emoji)) {
        const emojiInfo: IEmojiInfo = emojiList[emoji as keyof typeof emojiList] as IEmojiInfo;
        const { styles, skintones } = emojiInfo || ({} as IEmojiInfo);
        if (styles) {
          newEmojiList.push({
            ...emojiInfo,
            styles: {
              Color: await base64FromSVGUrl(styles.Color),
              "3D": styles["3D"],
              Flat: await base64FromSVGUrl(styles.Flat),
              HighContrast: await base64FromSVGUrl(styles.HighContrast),
            },
          });
        }
        if (skintones) {
          newEmojiList.push({
            ...emojiInfo,
            skintones: {
              Dark: {
                Color: await base64FromSVGUrl(skintones.Dark.Color),
                "3D": skintones.Dark["3D"],
                Flat: await base64FromSVGUrl(skintones.Dark.Flat),
                HighContrast: await base64FromSVGUrl(skintones.Dark.HighContrast),
              },

              Default: {
                Color: await base64FromSVGUrl(skintones.Default.Color),
                "3D": skintones.Default["3D"],
                Flat: await base64FromSVGUrl(skintones.Default.Flat),
                HighContrast: await base64FromSVGUrl(skintones.Default.HighContrast),
              },
              Light: {
                Color: await base64FromSVGUrl(skintones.Light.Color),
                "3D": skintones.Light["3D"],
                Flat: await base64FromSVGUrl(skintones.Light.Flat),
                HighContrast: await base64FromSVGUrl(skintones.Light.HighContrast),
              },
              Medium: {
                Color: await base64FromSVGUrl(skintones.Medium.Color),
                "3D": skintones.Medium["3D"],
                Flat: skintones.Medium.Flat,
                HighContrast: await base64FromSVGUrl(skintones.Medium.HighContrast),
              },
              MediumDark: {
                Color: await base64FromSVGUrl(skintones.MediumDark.Color),
                "3D": skintones.MediumDark["3D"],
                Flat: await base64FromSVGUrl(skintones.MediumDark.Flat),
                HighContrast: await base64FromSVGUrl(skintones.MediumDark.HighContrast),
              },
              MediumLight: {
                Color: await base64FromSVGUrl(skintones.MediumLight.Color),
                "3D": skintones.MediumLight["3D"],
                Flat: await base64FromSVGUrl(skintones.MediumLight.Flat),
                HighContrast: await base64FromSVGUrl(skintones.MediumLight.HighContrast),
              },
            },
          });
        }
      }
    }
    return newEmojiList;
  }, []);

  const getFluentEmojis = React.useCallback(() => {
    return Object.values(emojiList) ?? undefined;
  }, []);

  const getFluentEmojisByGroup = React.useCallback(() => {
    const fluentEmojisByGroup = groupBy(emojiList, "group");
    return fluentEmojisByGroup ?? undefined;
  }, []);

  const getFluentEmojiByglyph = React.useCallback((glyph: string) => {
    const fluentEmoji = find(Object.values(emojiList), (o: IEmojiInfo) => {
      return o.glyph === glyph;
    });
    return fluentEmoji ?? undefined;
  }, []);

  const getFluentEmojiByName = React.useCallback((name: string) => {
    const fluentEmoji =
      find(Object.values(emojiList), (o: IEmojiInfo) => {
        return o.cldr.toLowerCase() === name.toLowerCase();
      }) ?? ({} as IEmojiInfo);
    return fluentEmoji ?? ({} as IEmojiInfo);
  }, []);

  const getFluentEmoji = React.useCallback((glyph: string): any => {
    const mapDefaultEmoji = new Map();
    mapDefaultEmoji.set("like", "Thumbs up");
    mapDefaultEmoji.set("heart", "Red heart");
    mapDefaultEmoji.set("laugh", "Grinning face");
    mapDefaultEmoji.set("surprised", "Face with open mouth");

    const mapValue = mapDefaultEmoji.get(glyph);
    if (mapValue) {
      return getFluentEmojiByName(mapValue);
    } else {
      return getFluentEmojiByglyph(glyph);
    }

    return undefined;
  }, []);

  return {
    getEmojis,
    getFluentEmojis,
    getFluentEmojisByGroup,
    getFluentEmojiByglyph,
    getFluentEmojiByName,
    getFluentEmoji,
  };
};
