import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', ['release']],
  },
}

module.exports = Configuration
