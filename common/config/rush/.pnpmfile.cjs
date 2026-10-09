'use strict';

/**
 * When using the PNPM package manager, you can use pnpmfile.js to workaround
 * dependencies that have mistakes in their package.json file.  (This feature is
 * functionally similar to Yarn's "resolutions".)
 *
 * For details, see the PNPM documentation:
 * https://pnpm.io/pnpmfile#hooks
 *
 * IMPORTANT: SINCE THIS FILE CONTAINS EXECUTABLE CODE, MODIFYING IT IS LIKELY TO INVALIDATE
 * ANY CACHED DEPENDENCY ANALYSIS.  After any modification to pnpmfile.js, it's recommended to run
 * "rush update --full" so that PNPM will recalculate all version selections.
 */
module.exports = {
  hooks: {
    readPackage,
    afterAllResolved
  }
};

/**
 * This hook is invoked during installation before a package's dependencies
 * are selected.
 * The `packageJson` parameter is the deserialized package.json
 * contents for the package that is about to be installed.
 * The `context` parameter provides a log() function.
 * The return value is the updated object.
 */
function readPackage(packageJson, context) {

  // // The karma types have a missing dependency on typings from the log4js package.
  // if (packageJson.name === '@types/karma') {
  //  context.log('Fixed up dependencies for @types/karma');
  //  packageJson.dependencies['log4js'] = '0.6.38';
  // }

  return packageJson;
}

function afterAllResolved(lockfile) {
  for (const [key, packageInfo] of Object.entries(lockfile.packages || {})) {
    const resolution = packageInfo.resolution;
    if (!resolution || !resolution.integrity || !resolution.tarball) continue;

    const packageId = key.replace(/^\//, '').split('(')[0];
    const atSeparator = packageId.lastIndexOf('@');
    const versionSeparator = atSeparator > 0 ? atSeparator : packageId.lastIndexOf('/');
    if (versionSeparator < 1) continue;
    const packageName = packageId.slice(0, versionSeparator);
    const version = packageId.slice(versionSeparator + 1);
    const archiveName = packageName.split('/').pop();
    const expectedPath = `/${packageName}/-/${archiveName}-${version}.tgz`;

    // Standard registry packages should use the installer's registry, not a mirror-specific URL.
    if (new URL(resolution.tarball).pathname.endsWith(expectedPath)) {
      delete resolution.tarball;
    }
  }
  return lockfile;
}
