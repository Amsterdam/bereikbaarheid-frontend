//
// enables the use of the styled-components hook 'useTheme'
// docs: https://styled-components.com/docs/api#create-a-declarations-file
//

import type { Theme } from '@amsterdam/asc-ui'
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme.ThemeInterface {}
}
