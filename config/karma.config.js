"use strict";
var existingKarmaConfig = require('@microsoft/sp-build-web/lib/karma/karma.config');
var gulp_core_build = require("@microsoft/gulp-core-build");
var htmlReporter = require('karma-html-reporter');
var path = require('path');

var remapCoverageReporter = require('karma-remap-coverage');

module.exports = function (config) {
  existingKarmaConfig(config);
  // Add the HTML reporter
  config.reporters.push('html');
  config.htmlReporter = {
    outputDir: path.join(gulp_core_build.getConfig().tempFolder, 'karma-html-report'), // where to put the reports
    templatePath: null, // set if you moved jasmine_template.html
    focusOnFailures: true, // reports show failures on start
    namedFiles: true, // name files instead of creating sub-directories
    pageTitle: 'sp-dev-fx-controls-react unit-tests report', // page title for reports; browser info by default
    urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
    reportName: 'sp-dev-fx-controls-react-report', // report summary filename; browser info by default
  };
  config.plugins.push(htmlReporter);

  // Add the remap-coverage - code coverage for the original files
  config.reporters.push('remap-coverage');
  config.coverageReporter = {
    type: 'in-memory'
  }
  config.remapCoverageReporter = {
    'text-summary': null,
    html: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/html'),
    cobertura: path.join(gulp_core_build.getConfig().tempFolder, 'coverage/cobertura.xml')
  };
  config.plugins.push(remapCoverageReporter);
};
