require('@rushstack/eslint-config/patch/modern-module-resolution');
  module.exports = {
    extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
    parserOptions: { tsconfigRootDir: __dirname },
    overrides: [
      {
        files: ['*.ts', '*.tsx'], // Your TypeScript files extension

        parserOptions: {
          project: ['./tsconfig.json'], // Specify it only for TypeScript files
        },

        rules: {
          'react-hooks/exhaustive-deps': 'error',
          '@typescript-eslint/no-unused-vars': 'warn',
          '@microsoft/spfx/no-async-await': 'off', // IE is dead, long live IE
          '@typescript-eslint/typedef': 'off', // useless rule thanks for TS type inference
          '@typescript-eslint/no-floating-promises': 'warn',
        },
      },
    ],
  };
