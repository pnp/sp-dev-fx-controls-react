const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  // Only lint the TypeScript program under src. Heft's lint plugin (>=1.3.0) otherwise also lints
  // any other file selected by this config (tests, scripts), which are not part of tsconfig.json.
  {
    ignores: ['**/*', '!src/', '!src/**']
  },
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];