/// <reference types="sinon" />

import * as React from 'react';
import { assert, expect } from 'chai';
import { PaletteGenerator } from '.';
import { ChartPalette } from './ChartControl.types';
import { uniq } from '@microsoft/sp-lodash-subset';

declare const sinon;

describe('PaletteGenerator', () => {
  it('Should repeat palette if array is longer than number of available colors in repeating palette', (done) => {
    let palette: string[] = PaletteGenerator.GetPalette(ChartPalette.OfficeColorful2, 60);
    expect(palette).to.have.length(60);
    done();
  });

  it('Should stretch palette if array is longer than number of available colors in non-repeating palette', (done) => {
    let palette: string[] = PaletteGenerator.GetPalette(ChartPalette.OfficeMonochromatic1, 60);
    expect(palette).to.have.length(60);

    // Array shouldn't repeat, so the unique array should be the same length as the returned array
    expect(uniq(palette)).to.have.length(60);
    done();
  });

  it('Should return the right alpha palette length', (done) => {
    let alphaPalette = PaletteGenerator.alpha(PaletteGenerator.GetPalette(ChartPalette.OfficeColorful1, 60), 0.5);
    expect(alphaPalette).to.have.length(60);
    done();
  });

  it('Should repeat a shorter array of colors', (done) => {
    let desiredPattern: string[] = ["#0000ff", "#00ff00", "#ff0000"];
    let palette: string[] = PaletteGenerator.generateRepeatingPattern(desiredPattern, 60);
    expect(palette).to.have.length(60);

    // Array should repeat the same exact values.
    expect(uniq(palette)).to.have.length(3);
    done();
  });

  it('Should not repeat colors in a gradient', (done) => {
    let gradientExtremes: string[] = ["#0000ff", "#ff0000"];
    let palette: string[] = PaletteGenerator.generateNonRepeatingGradient(gradientExtremes, 60);
    expect(palette).to.have.length(60);

    // Array should not repeat
    expect(uniq(palette)).to.have.length(60);
    done();
  });


  it('Should return an array of alpha value for a given array of colors', (done) => {
    let arrayColors: string[] = ["#00ff00", "#ff0000", "#0000ff"];
    let alphaColors = PaletteGenerator.alpha(arrayColors, 0.5);
    expect(alphaColors).to.be.an('array');
    expect(alphaColors).to.have.length(3);
    done();
  });

  it('Should return a single alpha value for a single color', (done) => {
    let singleColor: string = "#00ff00";
    let alphaColor = PaletteGenerator.alpha(singleColor, 0.5);
    expect(alphaColor).to.be.a('string');
    done();
  });

  it('Should return a single alpha value for any valid type of color value', (done) => {
    expect(PaletteGenerator.alpha('red', 0.5)).to.be.a('string');
    expect(PaletteGenerator.alpha('#ff0000', 0.5)).to.be.a('string');
    expect(PaletteGenerator.alpha('rgb(255,0,0)', 0.5)).to.be.a('string');
    expect(PaletteGenerator.alpha('hsl(120,100%,50%)', 0.5)).to.be.a('string');
    done();
  });
});

