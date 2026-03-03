import * as React from 'react';
import { tokens } from '@fluentui/react-components';
import { format, parseISO } from 'date-fns';
export var useUtils = function () {
    var getSpanSlots = React.useCallback(function (start, end) {
        var startDate = new Date(start);
        var endDate = new Date(end);
        // Calculate the start and end slots based on event times
        var startHour = startDate.getHours();
        var startMinute = startDate.getMinutes();
        var startSlot = startHour * 2 + (startMinute >= 1 ? 1 : 0); // Adjust for 30-minute slots
        var endHour = endDate.getHours();
        var endMinute = endDate.getMinutes();
        var endSlot = endHour * 2 + (endMinute >= 1 ? 2 : 0); // Adjust for 30-minute slots
        var spanSlots = endSlot - startSlot;
        return { spanSlots: spanSlots, startSlot: startSlot, endSlot: endSlot };
    }, []);
    var generateLightAndHoverColors = React.useCallback(function (baseColor, lightnessIncrease, // Increase in lightness for light variant
    hoverIncrease // Increase in lightness for hover variant
    ) {
        if (lightnessIncrease === void 0) { lightnessIncrease = 20; }
        if (hoverIncrease === void 0) { hoverIncrease = 10; }
        // Function to convert hex to HSL
        var hexToHsl = function (hex) {
            var r = parseInt(hex.slice(1, 3), 16) / 255;
            var g = parseInt(hex.slice(3, 5), 16) / 255;
            var b = parseInt(hex.slice(5, 7), 16) / 255;
            var max = Math.max(r, g, b);
            var min = Math.min(r, g, b);
            var delta = max - min;
            var h = 0;
            var s = 0;
            var l = (max + min) / 2;
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
        var hslToHex = function (h, s, l) {
            var a = (s * Math.min(l, 100 - l)) / 100;
            var f = function (n) {
                var k = (n + h / 30) % 12;
                var color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
                return Math.round(255 * color)
                    .toString(16)
                    .padStart(2, '0');
            };
            return "#".concat(f(0)).concat(f(8)).concat(f(4));
        };
        // Convert base color to HSL
        var _a = hexToHsl(baseColor), h = _a.h, s = _a.s, l = _a.l;
        // Generate light and hover colors by adjusting lightness
        var lightColor = hslToHex(h, s, Math.min(l + lightnessIncrease, 100));
        var hoverColor = hslToHex(h, s, Math.min(l + hoverIncrease, 100));
        return { lightColor: lightColor, hoverColor: hoverColor };
    }, []);
    var getEventColors = React.useCallback(function (category) {
        // Define a color map using Fluent UI 9 tokens
        var colorMap = {
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
        var defaultColors = {
            backgroundColor: tokens.colorNeutralBackground3,
            hoverColor: tokens.colorNeutralBackground3Hover,
        };
        // Return the corresponding colors or fallback to the default
        return colorMap[category.toLowerCase()] || defaultColors;
    }, []);
    var generateColor = React.useCallback(function (str) {
        var hash = 0;
        for (var i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        var c = (hash & 0x00ffffff).toString(16).toUpperCase();
        return "#".concat('00000'.substring(0, 6 - c.length) + c);
    }, []);
    var getCalendarColors = React.useCallback(function (colorName) {
        var calendarColorMap = {
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
        var defaultColor = calendarColorMap['royal-blue'];
        return calendarColorMap[colorName] || defaultColor;
    }, []);
    var formatDate = React.useCallback(function (dateISO, dateFormat) {
        var date = parseISO(dateISO);
        return format(date, dateFormat);
    }, []);
    return {
        getSpanSlots: getSpanSlots,
        generateLightAndHoverColors: generateLightAndHoverColors,
        getEventColors: getEventColors,
        generateColor: generateColor,
        getCalendarColors: getCalendarColors,
        formatDate: formatDate,
    };
};
//# sourceMappingURL=useUtils.js.map