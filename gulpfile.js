'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');

build.initialize(gulp);

const karmaTask = build.karma;
if (karmaTask) {
  karmaTask.taskConfig.configPath = './config/karma.config.js';
}
