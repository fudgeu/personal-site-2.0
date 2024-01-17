import stylistic from '@stylistic/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';
import reactJsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import js from '@eslint/js';

export default [
  {
    ...reactRecommended,
    ...reactJsxRuntime,
    ...js.configs.recommended,
    'plugins': { stylistic },
    'languageOptions': {
      'parser': parserTs,
    },
    'files': ['**/*.js', '**/*.ts', '**/*.jsx', '**/*.tsx'],
    'rules': {
      'stylistic/semi': 'error',
      'stylistic/array-bracket-spacing': [
        'error',
        'never',
        { 'singleValue': false, 'objectsInArrays': false, 'arraysInArrays': false },
      ],
      'stylistic/arrow-spacing': 'error',
      'stylistic/block-spacing': 'error',
      'stylistic/comma-spacing': 'error',
      'stylistic/computed-property-spacing': ['error', 'never'],
      'stylistic/function-call-spacing': ['error', 'never'],
      'stylistic/jsx-curly-spacing': [2, 'never'],
      'stylistic/jsx-equals-spacing': [2, 'never'],
      'stylistic/jsx-tag-spacing': 'error',
      'stylistic/key-spacing': 'error',
      'stylistic/keyword-spacing': 'error',
      'stylistic/no-mixed-spaces-and-tabs': 'error',
      'stylistic/no-multi-spaces': 'error',
      'stylistic/no-trailing-spaces': 'error',
      'stylistic/no-whitespace-before-property': 'error',
      'stylistic/rest-spread-spacing': ['error', 'never'],
      'stylistic/semi-spacing': 'error',
      'stylistic/space-before-blocks': 'error',
      'stylistic/space-before-function-paren': [
        'error',
        { 'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always' }
      ],
      'stylistic/space-in-parens': ['error', 'never'],
      'stylistic/space-infix-ops': 'error',
      'stylistic/space-unary-ops': 'error',
      'stylistic/spaced-comment': ['error', 'always'],
      'stylistic/switch-colon-spacing': 'error',
      'stylistic/template-curly-spacing': ['error', 'never'],
      'stylistic/type-annotation-spacing': 'error',
      'stylistic/type-generic-spacing': 'error',
      'stylistic/eol-last': ['error', 'always'],
      'stylistic/function-paren-newline': ['error', 'multiline'],
      'stylistic/implicit-arrow-linebreak': ['error', 'beside'],
      'stylistic/jsx-curly-newline': ['error', 'never'],
      'stylistic/quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
      'stylistic/indent': ['error', 2],
      'stylistic/object-curly-spacing': ['error', 'always'],
      'no-unused-vars': 'warn',
    }
  }
];
