import { screen, waitFor } from '@testing-library/react'
import { RouteIds } from 'routes'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../../../test/utils/withApp'

describe('RoutesLayers', () => {
  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })

  it('has only "verplichte-routes" layer checked via search query', async () => {
    const pathToPage = `${getGeneratedPath(
      RouteIds.TOURINGCAR_PAGE
    )}?verplichte-routes`
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)

    const checkboxParkeren = await screen.findByLabelText('Parkeren')
    expect(checkboxParkeren).not.toBeChecked()

    const checkboxRoutesMandatory = await screen.findByLabelText(
      'Verplichte route (> 7,5t)'
    )
    expect(checkboxRoutesMandatory).toBeChecked()
  })

  it('has only "parkeren" and "verplichte-routes" layers checked via search query', async () => {
    const pathToPage = `${getGeneratedPath(
      RouteIds.TOURINGCAR_PAGE
    )}?parkeren&verplichte-routes`
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)

    const checkboxParkeren = await screen.findByLabelText('Parkeren')
    expect(checkboxParkeren).toBeChecked()

    const checkboxRoutesMandatory = await screen.findByLabelText(
      'Verplichte route (> 7,5t)'
    )
    expect(checkboxRoutesMandatory).toBeChecked()
  })
})
