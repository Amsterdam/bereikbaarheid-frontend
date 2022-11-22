//
// enables the use of the styled-components hook 'useTheme'
// docs: https://styled-components.com/docs/api#create-a-declarations-file
//

import 'styled-components'
import type { Theme } from '@amsterdam/asc-ui'

declare module 'styled-components' {
  export interface DefaultTheme extends Theme.ThemeInterface {}
}
