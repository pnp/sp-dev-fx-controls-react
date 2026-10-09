const assert = require('node:assert/strict');
const { test } = require('node:test');
const { afterAllResolved } = require('../config/rush/.pnpmfile.cjs').hooks;

test('standard registry archives are portable across mirrors and retain integrity', () => {
  for (const key of ['/package@1.2.3', '/package/1.2.3']) {
    const lockfile = {
      packages: {
        [key]: {
          resolution: {
            integrity: 'sha512-test',
            tarball: 'https://mirror.example/registry/package/-/package-1.2.3.tgz'
          }
        }
      }
    };
    assert.equal(afterAllResolved(lockfile), lockfile);
    assert.deepEqual(lockfile.packages[key].resolution, { integrity: 'sha512-test' });
  }
});

test('scoped packages and peer-qualified package keys are normalized', () => {
  for (const key of ['/@scope/package@1.2.3(react@17.0.1)', '/@scope/package/1.2.3']) {
    const lockfile = {
      packages: {
        [key]: {
          resolution: {
            integrity: 'sha512-scoped',
            tarball: 'https://mirror.example/registry/@scope/package/-/package-1.2.3.tgz'
          }
        }
      }
    };
    afterAllResolved(lockfile);
    assert.deepEqual(lockfile.packages[key].resolution, { integrity: 'sha512-scoped' });
  }
});

test('custom archives and archives without integrity are not rewritten', () => {
  const packages = {
    '/custom@1.0.0': {
      resolution: { integrity: 'sha512-custom', tarball: 'https://example.com/custom-build.tgz' }
    },
    '/package@1.2.3': {
      resolution: { tarball: 'https://mirror.example/package/-/package-1.2.3.tgz' }
    }
  };
  const expected = structuredClone(packages);
  afterAllResolved({ packages });
  assert.deepEqual(packages, expected);
});

test('empty lockfiles and packages without archive resolutions are supported', () => {
  const lockfile = { packages: { '/package@1.2.3': { resolution: { integrity: 'sha512-test' } } } };
  assert.deepEqual(afterAllResolved({}), {});
  assert.deepEqual(afterAllResolved(structuredClone(lockfile)), lockfile);
});
