import { ChartPalette } from './ChartControl.types';
/**
 * Generates color palettes matching those you get within Office charts
 */
export declare class PaletteGenerator {
    /**
     * Returns an array of colors generated using one of the
     * pre-defined Office palettes colors
     * @param palette the pre-defined Office palette
     * @param desiredLength the desired resulting array lenght
     */
    static GetPalette(palette: ChartPalette, desiredLength: number): string[];
    /**
     * ChartJs doesn't give cycle through colors if the length of array of colors is smaller than
     * the data length. This function repeats the array as many times as needed to make sure each
     * item has a background color.
     * @param array the array to make bigger
     * @param desiredLength the desired length
     */
    static generateRepeatingPattern(array: string[], desiredLength: number): string[];
    /**
     * Some of the Office color palettes consist of
     * a non-repeating gradient from one color to another,
     * divided by the number of steps (or array elements)
     * @param colorRange the colors to start and end with
     * @param numSteps the number of gradient steps to generate
     */
    static generateNonRepeatingGradient(colorRange: string[], numSteps: number): string[];
    /**
    * Converts a color or array of colors to a semi-opaque version
    * @param colors a single color, or array of colors to convert
    * @param alphaValue a value between 0 and 1 indicating the opacity (alpha)
    */
    static alpha(colors: string | string[], alphaValue: number): string | string[];
    /**
     * Interpolates between two colors
     * @param color1 start color
     * @param color2 end color
     * @param factor interpolation facotor
     */
    private static _interpolateColors;
    /**
     * Converts a hex color to RGB
     * @param hex the hex color string
     */
    private static _hexToRGB;
    /**
     * Converts an RGB colour to a hex string
     * @param rgb The RGC color
     */
    private static _rgbToHex;
}
//# sourceMappingURL=PaletteGenerator.d.ts.map