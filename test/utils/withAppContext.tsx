import type { ReactElement } from 'react'

import { ThemeProvider } from '@amsterdam/asc-ui'

export const withAppContext = (component: ReactElement) => (
  <ThemeProvider>{component}</ThemeProvider>
)
