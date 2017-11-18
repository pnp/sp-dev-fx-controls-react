"use strict";
const existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
const gulp_core_build = require("@microsoft/gulp-core-build");
const htmlReporter = require('karma-html-reporter');
const remapCoverageReporter = require('karma-remap-coverage');
const path = require('path');

module.exports = function (config) {
  existingKarmaConfig(config);
  // Add the HTML reporter
  config.reporters.push('html');
  config.htmlReporter = {
    outputDir: path.join(gulp_core_build.getConfig().tempFolder, 'karma-html-report'),
    templatePath: null,
    focusOnFailures: true,
    namedFiles: true,
    pageTitle: 'sp-dev-fx-controls-react unit-tests report',
    urlFriendlyName: false,
    reportName: 'sp-dev-fx-controls-react-report',
  };
  config.plugins.push(htmlReporter);

  // Add the remap-coverage - code coverage for the original files
  config.reporters.push('remap-coverage');
  config.coverageReporter = {
    type: 'in-memory'
  }
  config.remapCoverageReporter = {
    'text-summary': path.join(gulp_core_build.getConfig().tempFolder, 'coverage/coverage.txt'),
    html: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/html'),
    cobertura: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/cobertura.xml'),
    lcovonly: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/coverage.info')
  };
  config.plugins.push(remapCoverageReporter);
};
