import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { withAppContext } from './withAppContext'
import { withQueryClient } from './withQueryClient'

import { ROUTES } from '../../src/routes'

export const withApp = (path: string) => {
  const router = createMemoryRouter(ROUTES, {
    initialEntries: [path],
  })

  return withQueryClient(withAppContext(<RouterProvider router={router} />))
}
