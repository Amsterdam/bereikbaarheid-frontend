import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default defineConfig([
  globalIgnores(['build/', 'node_modules/', 'coverage/', 'public/', '**/__snapshots__/']),
  ...compat.config({
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:jest-dom/recommended',
      'plugin:jsx-a11y/recommended',
      'plugin:prettier/recommended',
    ],
    overrides: [
      {
        files: ['**/*.test.*'],
        env: {
          jest: true,
          commonjs: true,
        },
      },
    ],
    plugins: ['import', 'jest-dom', 'jsx-a11y', 'prettier', 'react', 'react-hooks', '@typescript-eslint'],
    rules: {
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unused-modules': 'error',
      'import/order': [
        'error',
        {
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          warnOnUnassignedImports: true,
        },
      ],
      'nonblock-statement-body-position': 'error',
    },
  }),
])
