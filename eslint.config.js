import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import eslintConfigPrettier from 'eslint-config-prettier'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'

export default [
  {
    // Применяем настройки ко всем JavaScript и TypeScript файлам
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

    // Настройки парсера и языка
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // Настройки плагинов
    plugins: {
      '@typescript-eslint': typescriptPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      prettier:
        prettierPluginRecommended.plugins?.prettier ||
        require('eslint-plugin-prettier'),
    },

    // Настройки для React
    settings: {
      react: {
        version: 'detect', // Автоматически определяет версию React
      },
    },

    // Правила ESLint
    rules: {
      // Настройки для React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Настройки для React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Настройки для React Refresh
      'react-refresh/only-export-components': 'warn',

      // Настройки для TypeScript
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: true,
          jsxSingleQuote: false,
          bracketSpacing: true,
          trailingComma: 'all',
          printWidth: 80,
          tabWidth: 2,
          useTabs: false,
          arrowParens: 'avoid',
          endOfLine: 'lf',
        },
      ],
    },
  },
  prettierPluginRecommended,
  eslintConfigPrettier,
]
