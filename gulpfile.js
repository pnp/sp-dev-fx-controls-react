'use strict';

const gulp = require('gulp');
const _ = require('lodash');
const build = require('@microsoft/sp-build-web');

build.initialize(gulp);

var buildConfig = build.getConfig();
var karmaTask = _.find(buildConfig.uniqueTasks, ['name', 'karma']);
karmaTask.taskConfig.configPath = './config/karma.config.js';
