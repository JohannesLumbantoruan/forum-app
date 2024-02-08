module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'quotes': [2, 'single'],
    'object-curly-spacing': [2, 'always'],
    'indent': 0,
    'linebreak-style': 0,
    'react/jsx-indent': 0,
    'eol-last': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/button-has-type': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'comma-dangle': 0,
    'no-alert': 0,
    'max-len': 125
  },
}
