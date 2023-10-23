import { I18nextProvider } from 'react-i18next'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { withAppContext } from './withAppContext'
import { withQueryClient } from './withQueryClient'

import i18n from '../../src/i18n'
import { ROUTES } from '../../src/routes'

export const withApp = (path: string) => {
  const router = createMemoryRouter(ROUTES, {
    initialEntries: [path],
  })

  i18n.changeLanguage('nl')

  return withQueryClient(
    withAppContext(
      <I18nextProvider i18n={i18n}>
        <RouterProvider router={router} />
      </I18nextProvider>
    )
  )
}
