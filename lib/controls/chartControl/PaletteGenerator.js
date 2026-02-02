import { ChartPalette } from './ChartControl.types';
import { OFFICE_COLORFUL1, OFFICE_COLORFUL2, OFFICE_COLORFUL3, OFFICE_COLORFUL4, OFFICE_MONOCHROMATIC1, OFFICE_MONOCHROMATIC2, OFFICE_MONOCHROMATIC3, OFFICE_MONOCHROMATIC4, OFFICE_MONOCHROMATIC5, OFFICE_MONOCHROMATIC6, OFFICE_MONOCHROMATIC7, OFFICE_MONOCHROMATIC8, OFFICE_MONOCHROMATIC9, OFFICE_MONOCHROMATIC10, OFFICE_MONOCHROMATIC11, OFFICE_MONOCHROMATIC12, OFFICE_MONOCHROMATIC13 } from './ChartColorPalettes';
import * as Color from 'color';
/**
 * Generates color palettes matching those you get within Office charts
 */
var PaletteGenerator = /** @class */ (function () {
    function PaletteGenerator() {
    }
    /**
     * Returns an array of colors generated using one of the
     * pre-defined Office palettes colors
     * @param palette the pre-defined Office palette
     * @param desiredLength the desired resulting array lenght
     */
    PaletteGenerator.GetPalette = function (palette, desiredLength) {
        // Add default color scheme if it wasn't provided
        var paletteColors = [];
        switch (palette) {
            case ChartPalette.OfficeColorful4:
                paletteColors = this.generateRepeatingPattern(OFFICE_COLORFUL4, desiredLength);
                break;
            case ChartPalette.OfficeColorful3:
                paletteColors = this.generateRepeatingPattern(OFFICE_COLORFUL3, desiredLength);
                break;
            case ChartPalette.OfficeColorful2:
                paletteColors = this.generateRepeatingPattern(OFFICE_COLORFUL2, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic1:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC1, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic2:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC2, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic3:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC3, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic4:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC4, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic5:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC5, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic6:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC6, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic7:
                paletteColors = this.generateRepeatingPattern(OFFICE_MONOCHROMATIC7, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic8:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC8, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic9:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC9, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic10:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC10, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic11:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC11, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic12:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC12, desiredLength);
                break;
            case ChartPalette.OfficeMonochromatic13:
                paletteColors = this.generateNonRepeatingGradient(OFFICE_MONOCHROMATIC13, desiredLength);
                break;
            default:
                paletteColors = this.generateRepeatingPattern(OFFICE_COLORFUL1, desiredLength);
                break;
        }
        return paletteColors;
    };
    /**
     * ChartJs doesn't give cycle through colors if the length of array of colors is smaller than
     * the data length. This function repeats the array as many times as needed to make sure each
     * item has a background color.
     * @param array the array to make bigger
     * @param desiredLength the desired length
     */
    PaletteGenerator.generateRepeatingPattern = function (array, desiredLength) {
        if (desiredLength === 0) {
            return [];
        }
        var a = array;
        while (a.length * 2 <= desiredLength) {
            a = a.concat(a);
        }
        if (a.length < desiredLength) {
            a = a.concat(a.slice(0, desiredLength - a.length));
        }
        return a;
    };
    /**
     * Some of the Office color palettes consist of
     * a non-repeating gradient from one color to another,
     * divided by the number of steps (or array elements)
     * @param colorRange the colors to start and end with
     * @param numSteps the number of gradient steps to generate
     */
    PaletteGenerator.generateNonRepeatingGradient = function (colorRange, numSteps) {
        var startHex = colorRange[0];
        var endHex = colorRange[colorRange.length - 1];
        var startRGB = this._hexToRGB(startHex);
        var endRGB = this._hexToRGB(endHex);
        var colors = [];
        var factorStep = 1 / (numSteps - 1);
        for (var index = 0; index < numSteps; index++) {
            var interpolatedColor = this._interpolateColors(startRGB, endRGB, factorStep * index);
            var hexColor = this._rgbToHex(interpolatedColor);
            colors.push(hexColor);
        }
        return colors;
    };
    /**
    * Converts a color or array of colors to a semi-opaque version
    * @param colors a single color, or array of colors to convert
    * @param alphaValue a value between 0 and 1 indicating the opacity (alpha)
    */
    PaletteGenerator.alpha = function (colors, alphaValue) {
        if (colors instanceof Array) {
            return colors.map(function (color) {
                return Color(color).alpha(alphaValue).toString();
            });
        }
        else {
            return Color(colors).alpha(alphaValue).toString();
        }
    };
    /**
     * Interpolates between two colors
     * @param color1 start color
     * @param color2 end color
     * @param factor interpolation facotor
     */
    PaletteGenerator._interpolateColors = function (color1, color2, factor) {
        if (arguments.length < 3) {
            factor = 0.5;
        }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    };
    /**
     * Converts a hex color to RGB
     * @param hex the hex color string
     */
    PaletteGenerator._hexToRGB = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        // tslint:disable-next-line:no-bitwise
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : undefined;
    };
    /**
     * Converts an RGB colour to a hex string
     * @param rgb The RGC color
     */
    PaletteGenerator._rgbToHex = function (rgb) {
        // tslint:disable-next-line:no-bitwise
        return '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    };
    return PaletteGenerator;
}());
export { PaletteGenerator };
//# sourceMappingURL=PaletteGenerator.js.map