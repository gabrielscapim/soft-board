/* eslint-disable @typescript-eslint/no-require-imports */
const {
    defineConfig,
    globalIgnores
} = require('eslint/config')

const globals = require('globals')
const tsParser = require('@typescript-eslint/parser')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const js = require('@eslint/js')

const {
    FlatCompat
} = require('@eslint/eslintrc')

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
})

module.exports = defineConfig([{
    languageOptions: {
        globals: {
            ...globals.node
        },

        parser: tsParser
    },

    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended'),

    plugins: {
        '@typescript-eslint': typescriptEslint
    },

    rules: {
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        'semi': ['error', 'never'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-dynamic-delete': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'space-before-function-paren': ['error', 'always'],
        'quotes': ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'comma-dangle': ['error', 'never']
    }
}, globalIgnores(['**/build', '**/.eslintrc.cjs'])])
