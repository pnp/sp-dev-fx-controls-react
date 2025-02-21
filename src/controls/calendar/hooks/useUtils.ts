/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";

import { IEventColors } from "../models/IEventColors";
import { tokens } from "@fluentui/react-components";

export const useUtils = () => {
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
  const generateLightAndHoverColors = React.useCallback(
    (
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
            .padStart(2, "0");
        };
        return `#${f(0)}${f(8)}${f(4)}`;
      };

      // Convert base color to HSL
      const { h, s, l } = hexToHsl(baseColor);

      // Generate light and hover colors by adjusting lightness
      const lightColor = hslToHex(h, s, Math.min(l + lightnessIncrease, 100));
      const hoverColor = hslToHex(h, s, Math.min(l + hoverIncrease, 100));

      return { lightColor, hoverColor };
    },
    []
  );

  const getEventColors = React.useCallback((category: string): IEventColors => {
    // Predefined color map
    const colorMap: Record<string, IEventColors> = {
      meeting: { backgroundColor: "#D9E9FC", hoverColor: "#AAD4F5" },
      appointment: { backgroundColor: "#FFF4CE", hoverColor: "#FFE2A1" },
      task: { backgroundColor: "#DFF6DD", hoverColor: "#C6F0C6" },
      deadline: { backgroundColor: "#FFE4E1", hoverColor: "#FFB6C1" },
      holiday: { backgroundColor: "#F0FFF0", hoverColor: "#C1FFC1" },
      celebration: { backgroundColor: "#FFF0F5", hoverColor: "#FFDAB9" },
      reminder: { backgroundColor: "#E0FFFF", hoverColor: "#AFEEEE" },
      workshop: { backgroundColor: "#F5F5DC", hoverColor: "#EEE8AA" },
      webinar: { backgroundColor: "#F0F8FF", hoverColor: "#B0E0E6" },
      conference: { backgroundColor: "#FAFAD2", hoverColor: "#FFD700" },
    };

    // Default color if category is not found
    const defaultColors: IEventColors = {
      backgroundColor:tokens.colorNeutralBackground3,
      hoverColor: tokens.colorNeutralBackground3Hover
    };

    // Return colors for the category, or default if not found
    return colorMap[category.toLowerCase()] || defaultColors;
  }, []);

  const generateColor = React.useCallback((str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00ffffff).toString(16).toUpperCase();

    return `#${"00000".substring(0, 6 - c.length) + c}`;
  }, []);


  return { getSpanSlots, generateLightAndHoverColors, getEventColors, generateColor };
};
