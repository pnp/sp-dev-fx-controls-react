import * as React from 'react';

import { AvatarNamedColor, tokens } from '@fluentui/react-components';
import { format, parseISO } from 'date-fns';

import { IEventColors } from './../models/IEventColors';

export interface IUtils {
  getSpanSlots: (start: Date, end: Date) => { spanSlots: number; startSlot: number; endSlot: number };
  generateLightAndHoverColors: (
    baseColor: string,
    lightnessIncrease?: number,
    hoverIncrease?: number
  ) => { lightColor: string; hoverColor: string };
  getEventColors: (category: string) => IEventColors;
  generateColor: (str: string) => string;
  getCalendarColors: (colorName: AvatarNamedColor) => IEventColors;
  formatDate: (dateISO: string, dateFormat: string) => string;
}

export const useUtils = (): IUtils => {
  const getSpanSlots = React.useCallback((start: Date, end: Date) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Calculate the start and end slots based on event times
    const startHour = startDate.getHours();
    const startMinute = startDate.getMinutes();
    const startSlot = startHour * 2 + (startMinute >= 1 ? 1 : 0); // Adjust for 30-minute slots
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();
    const endSlot = endHour * 2 + (endMinute >= 1 ? 2 : 0); // Adjust for 30-minute slots
    const spanSlots = endSlot - startSlot;
    return { spanSlots, startSlot, endSlot };
  }, []);
  const generateLightAndHoverColors = React.useCallback((
    baseColor: string,
    lightnessIncrease: number = 20, // Increase in lightness for light variant
    hoverIncrease: number = 10 // Increase in lightness for hover variant
  ): { lightColor: string; hoverColor: string } => {
    // Function to convert hex to HSL
    const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const delta = max - min;

      let h = 0;
      let s = 0;
      const l = (max + min) / 2;

      if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
        switch (max) {
          case r:
            h = (g - b) / delta + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / delta + 2;
            break;
          case b:
            h = (r - g) / delta + 4;
            break;
        }
        h /= 6;
      }

      return { h: h * 360, s: s * 100, l: l * 100 };
    };
    // Function to convert HSL to hex
    const hslToHex = (h: number, s: number, l: number): string => {
      const a = (s * Math.min(l, 100 - l)) / 100;
      const f = (n: number): string => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color)
          .toString(16)
          .padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    };
    // Convert base color to HSL
    const { h, s, l } = hexToHsl(baseColor);
    // Generate light and hover colors by adjusting lightness
    const lightColor = hslToHex(h, s, Math.min(l + lightnessIncrease, 100));
    const hoverColor = hslToHex(h, s, Math.min(l + hoverIncrease, 100));

    return { lightColor, hoverColor };
  }, []);
  const getEventColors = React.useCallback((category: string): IEventColors => {
    // Define a color map using Fluent UI 9 tokens
    const colorMap: Record<string, IEventColors> = {
      meeting: {
        backgroundColor: tokens.colorPaletteBlueBackground2,
        hoverColor: tokens.colorPaletteBlueBorderActive,
      },
      appointment: {
        backgroundColor: tokens.colorPaletteGreenBackground2,
        hoverColor: tokens.colorPaletteGreenBorderActive,
      },
      task: {
        backgroundColor: tokens.colorPaletteRedBackground2,
        hoverColor: tokens.colorPaletteRedBorderActive,
      },
      deadline: {
        backgroundColor: tokens.colorPaletteYellowBackground2,
        hoverColor: tokens.colorPaletteYellowBorderActive,
      },
      holiday: {
        backgroundColor: tokens.colorPalettePurpleBackground2,
        hoverColor: tokens.colorPalettePurpleBorderActive,
      },
      celebration: {
        backgroundColor: tokens.colorPaletteDarkOrangeBackground2,
        hoverColor: tokens.colorPaletteDarkOrangeBorderActive,
      },
      reminder: {
        backgroundColor: tokens.colorPaletteTealBackground2,
        hoverColor: tokens.colorPaletteTealBorderActive,
      },
      workshop: {
        backgroundColor: tokens.colorPaletteTealBackground2,
        hoverColor: tokens.colorPaletteTealBorderActive,
      },
      webinar: {
        backgroundColor: tokens.colorPaletteMagentaBackground2,
        hoverColor: tokens.colorPaletteMagentaBorderActive,
      },
      conference: {
        backgroundColor: tokens.colorPaletteBrownBackground2,
        hoverColor: tokens.colorPaletteBrownBorderActive,
      },
    };

    // Default colors if the category is not recognized
    const defaultColors: IEventColors = {
      backgroundColor: tokens.colorNeutralBackground3,
      hoverColor: tokens.colorNeutralBackground3Hover,
    };

    // Return the corresponding colors or fallback to the default
    return colorMap[category.toLowerCase()] || defaultColors;
  }, []);
  const generateColor = React.useCallback((str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();

    return `#${'00000'.substring(0, 6 - c.length) + c}`;
  }, []);
  const getCalendarColors = React.useCallback(
    (colorName: AvatarNamedColor): IEventColors => {
      const calendarColorMap: Record<AvatarNamedColor, IEventColors> = {
        beige: {
          backgroundColor: tokens.colorPaletteBeigeBackground2,
          hoverColor: tokens.colorPaletteBeigeBorderActive,
        },
        blue: {
          backgroundColor: tokens.colorPaletteBlueBackground2,
          hoverColor: tokens.colorPaletteBlueBorderActive,
        },
        brown: {
          backgroundColor: tokens.colorPaletteBrownBackground2,
          hoverColor: tokens.colorPaletteBrownBorderActive,
        },
        gold: {
          backgroundColor: tokens.colorPaletteGoldBackground2,
          hoverColor: tokens.colorPaletteGoldBorderActive,
        },
        lavender: {
          backgroundColor: tokens.colorPaletteLavenderBackground2,
          hoverColor: tokens.colorPaletteLavenderBorderActive,
        },
        magenta: {
          backgroundColor: tokens.colorPaletteMagentaBackground2,
          hoverColor: tokens.colorPaletteMagentaBorderActive,
        },
        navy: {
          backgroundColor: tokens.colorPaletteNavyBackground2,
          hoverColor: tokens.colorPaletteNavyBorderActive,
        },
        pink: {
          backgroundColor: tokens.colorPalettePinkBackground2,
          hoverColor: tokens.colorPalettePinkBorderActive,
        },
        plum: {
          backgroundColor: tokens.colorPalettePlumBackground2,
          hoverColor: tokens.colorPalettePlumBorderActive,
        },
        purple: {
          backgroundColor: tokens.colorPalettePurpleBackground2,
          hoverColor: tokens.colorPalettePurpleBorderActive,
        },
        red: {
          backgroundColor: tokens.colorPaletteRedBackground2,
          hoverColor: tokens.colorPaletteRedBorderActive,
        },
        teal: {
          backgroundColor: tokens.colorPaletteTealBackground2,
          hoverColor: tokens.colorPaletteTealBorderActive,
        },
        anchor: {
          backgroundColor: tokens.colorPaletteAnchorBackground2,
          hoverColor: tokens.colorPaletteAnchorBorderActive,
        },
        'dark-red': {
          backgroundColor: tokens.colorPaletteDarkRedBackground2,
          hoverColor: tokens.colorPaletteDarkRedBorderActive,
        },
        cranberry: {
          backgroundColor: tokens.colorPaletteCranberryBackground2,
          hoverColor: tokens.colorPaletteCranberryBorderActive,
        },
        pumpkin: {
          backgroundColor: tokens.colorPalettePumpkinBackground2,
          hoverColor: tokens.colorPalettePumpkinBorderActive,
        },
        peach: {
          backgroundColor: tokens.colorPalettePeachBackground2,
          hoverColor: tokens.colorPalettePeachBorderActive,
        },
        marigold: {
          backgroundColor: tokens.colorPaletteMarigoldBackground2,
          hoverColor: tokens.colorPaletteMarigoldBorderActive,
        },
        brass: {
          backgroundColor: tokens.colorPaletteBrassBackground2,
          hoverColor: tokens.colorPaletteBrassBorderActive,
        },
        forest: {
          backgroundColor: tokens.colorPaletteForestBackground2,
          hoverColor: tokens.colorPaletteForestBorderActive,
        },
        seafoam: {
          backgroundColor: tokens.colorPaletteSeafoamBackground2,
          hoverColor: tokens.colorPaletteSeafoamBorderActive,
        },
        'dark-green': {
          backgroundColor: tokens.colorPaletteDarkGreenBackground2,
          hoverColor: tokens.colorPaletteDarkGreenBorderActive,
        },
        'light-teal': {
          backgroundColor: tokens.colorPaletteLightTealBackground2,
          hoverColor: tokens.colorPaletteLightTealBorderActive,
        },
        steel: {
          backgroundColor: tokens.colorPaletteSteelBackground2,
          hoverColor: tokens.colorPaletteSteelBorderActive,
        },
        'royal-blue': {
          backgroundColor: tokens.colorPaletteRoyalBlueBackground2,
          hoverColor: tokens.colorPaletteRoyalBlueBorderActive,
        },
        cornflower: {
          backgroundColor: tokens.colorPaletteCornflowerBackground2,
          hoverColor: tokens.colorPaletteCornflowerBorderActive,
        },
        grape: {
          backgroundColor: tokens.colorPaletteGrapeBackground2,
          hoverColor: tokens.colorPaletteGrapeBorderActive,
        },
        lilac: {
          backgroundColor: tokens.colorPaletteLilacBackground2,
          hoverColor: tokens.colorPaletteLilacBorderActive,
        },
        mink: {
          backgroundColor: tokens.colorPaletteMinkBackground2,
          hoverColor: tokens.colorPaletteMinkBorderActive,
        },
        platinum: {
          backgroundColor: tokens.colorPalettePlatinumBackground2,
          hoverColor: tokens.colorPalettePlatinumBorderActive,
        },
      };

      // Fallback to royal-blue if the provided color isn't mapped
      const defaultColor: IEventColors = calendarColorMap['royal-blue'];
      return calendarColorMap[colorName] || defaultColor;
    },
    []
  );
  const formatDate = React.useCallback((dateISO: string, dateFormat: string): string => {
    const date = parseISO(dateISO);
    return format(date, dateFormat);
  }, []);

  return {
    getSpanSlots,
    generateLightAndHoverColors,
    getEventColors,
    generateColor,
    getCalendarColors,
    formatDate,
  };
}
