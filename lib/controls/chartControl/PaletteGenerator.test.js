/// <reference types="sinon" />
import { expect } from 'chai';
import { PaletteGenerator } from './PaletteGenerator';
import { ChartPalette } from './ChartControl.types';
import { uniq } from '@microsoft/sp-lodash-subset';
describe('PaletteGenerator', function () {
    it('Should repeat palette if array is longer than number of available colors in repeating palette', function (done) {
        var palette = PaletteGenerator.GetPalette(ChartPalette.OfficeColorful2, 60);
        expect(palette).to.have.length(60);
        done();
    });
    it('Should stretch palette if array is longer than number of available colors in non-repeating palette', function (done) {
        var palette = PaletteGenerator.GetPalette(ChartPalette.OfficeMonochromatic1, 60);
        expect(palette).to.have.length(60);
        // Array shouldn't repeat, so the unique array should be the same length as the returned array
        expect(uniq(palette)).to.have.length(60);
        done();
    });
    it('Should return the right alpha palette length', function (done) {
        var alphaPalette = PaletteGenerator.alpha(PaletteGenerator.GetPalette(ChartPalette.OfficeColorful1, 60), 0.5);
        expect(alphaPalette).to.have.length(60);
        done();
    });
    it('Should repeat a shorter array of colors', function (done) {
        var desiredPattern = ["#0000ff", "#00ff00", "#ff0000"];
        var palette = PaletteGenerator.generateRepeatingPattern(desiredPattern, 60);
        expect(palette).to.have.length(60);
        // Array should repeat the same exact values.
        expect(uniq(palette)).to.have.length(3);
        done();
    });
    it('Should not repeat colors in a gradient', function (done) {
        var gradientExtremes = ["#0000ff", "#ff0000"];
        var palette = PaletteGenerator.generateNonRepeatingGradient(gradientExtremes, 60);
        expect(palette).to.have.length(60);
        // Array should not repeat
        expect(uniq(palette)).to.have.length(60);
        done();
    });
    it('Should return an array of alpha value for a given array of colors', function (done) {
        var arrayColors = ["#00ff00", "#ff0000", "#0000ff"];
        var alphaColors = PaletteGenerator.alpha(arrayColors, 0.5);
        expect(alphaColors).to.be.an('array');
        expect(alphaColors).to.have.length(3);
        done();
    });
    it('Should return a single alpha value for a single color', function (done) {
        var singleColor = "#00ff00";
        var alphaColor = PaletteGenerator.alpha(singleColor, 0.5);
        expect(alphaColor).to.be.a('string');
        done();
    });
    it('Should return a single alpha value for any valid type of color value', function (done) {
        expect(PaletteGenerator.alpha('red', 0.5)).to.be.a('string');
        expect(PaletteGenerator.alpha('#ff0000', 0.5)).to.be.a('string');
        expect(PaletteGenerator.alpha('rgb(255,0,0)', 0.5)).to.be.a('string');
        expect(PaletteGenerator.alpha('hsl(120,100%,50%)', 0.5)).to.be.a('string');
        done();
    });
});
//# sourceMappingURL=PaletteGenerator.test.js.map