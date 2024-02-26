import { screen, waitFor } from '@testing-library/react'
import { RouteIds } from 'routes'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../../../test/utils/withApp'

describe('RoutesLayers', () => {
  it('has only "verplichte-routes" layer checked via search query', async () => {
    const pathToPage = `${getGeneratedPath(RouteIds.TOURINGCAR_PAGE)}?verplichte-routes`
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)

    const checkboxParking = await screen.findByLabelText('Parkeren')
    expect(checkboxParking).not.toBeChecked()

    const checkboxRoutesMandatory = screen.getByLabelText(/mét ontheffing/i)
    expect(checkboxRoutesMandatory).toBeChecked()
  })

  it('has only "parkeren" and "verplichte-routes" layers checked via search query', async () => {
    const pathToPage = `${getGeneratedPath(RouteIds.TOURINGCAR_PAGE)}?parkeren&verplichte-routes`
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)

    const checkboxParking = await screen.findByLabelText('Parkeren')
    expect(checkboxParking).toBeChecked()

    const checkboxMaxVehicleHeight = await screen.findByLabelText('Maximale doorrijhoogtes')
    expect(checkboxMaxVehicleHeight).not.toBeChecked()

    const checkboxRoutesMandatory = screen.getByLabelText(/mét ontheffing/i)
    expect(checkboxRoutesMandatory).toBeChecked()
  })

  it('has "haltes" layer checked and the layer and the list are visible', async () => {
    const pathToPage = `${getGeneratedPath(RouteIds.TOURINGCAR_PAGE)}?haltes&parkeren`
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)

    expect(await screen.findByLabelText('Parkeren')).toBeChecked()

    expect(await screen.findByLabelText('Haltes')).toBeChecked()
    expect(await screen.findByTestId('markercluster-stops')).toBeVisible()
  })
})
