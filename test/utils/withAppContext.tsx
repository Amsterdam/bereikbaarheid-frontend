import type { ReactElement } from 'react'

import { ThemeProvider } from '@amsterdam/asc-ui'
import { I18nextProvider } from 'react-i18next'

import i18n from '../../src/i18n'

export const withAppContext = (component: ReactElement) => {
  i18n.changeLanguage('nl')

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>{component}</ThemeProvider>
    </I18nextProvider>
  )
}
