import { createMemoryRouter, RouterProvider } from 'react-router-dom'

import { ROUTES } from '../../src/routes'
import { withAppContext } from './withAppContext'
import { withQueryClient } from './withQueryClient'

export const withApp = (path: string) => {
  const router = createMemoryRouter(ROUTES, {
    initialEntries: [path],
  })

  return withQueryClient(withAppContext(<RouterProvider router={router} />))
}
