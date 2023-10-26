import { RuleConfigSeverity } from '@commitlint/types'
import type { UserConfig } from '@commitlint/types'

const defaultTypeEnum = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'revert',
  'style',
  'test',
]

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [...defaultTypeEnum, 'release'],
    ],
  },
}

module.exports = Configuration
