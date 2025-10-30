import { RouteIds } from '../../routes'

import { getGeneratedPath } from './path'

test('correctly formatted react-router path with search query', () => {
  expect(
    getGeneratedPath(RouteIds.TOURINGCAR_PAGE, {
      parkeren: '',
      'verplichte-routes': '',
    })
  ).toBe('/touringcar:parkeren/verplichte-routes')
})
