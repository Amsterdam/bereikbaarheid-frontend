import { ThemeProvider } from '@amsterdam/asc-ui'
import type { ReactElement } from 'react'

export const withAppContext = (component: ReactElement) => (
  <ThemeProvider>{component}</ThemeProvider>
)
