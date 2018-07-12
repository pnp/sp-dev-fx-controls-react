'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const fs = require('fs');

// Update the version number in the version.ts file
gulp.task('versionUpdater', (done) => {
  const pkgContents = require('./package.json');
  const filePath = './src/common/telemetry/version.ts';
  const fileContents = `export const version: string = "{versionPlaceholder}";`;
  const newContents = fileContents.replace("{versionPlaceholder}", pkgContents.version);
  console.log(`Updating version number to: ${pkgContents.version}`);
  fs.writeFileSync(filePath, newContents, { encoding: "utf8" });
  done();
});

build.initialize(gulp);

const karmaTask = build.karma;
if (karmaTask) {
  karmaTask.taskConfig.configPath = './config/karma.config.js';
}
