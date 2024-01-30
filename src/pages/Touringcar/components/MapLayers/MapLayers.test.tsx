import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouteIds } from 'routes'
import delay from 'shared/utils/delay'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../../../test/utils/withApp'

describe('RoutesLayers', () => {
  jest.setTimeout(15000)

  it('renders correctly', async () => {
    await delay(1500)

    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    const page = withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })

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
    const user = userEvent.setup()

    await waitFor(() => page.rerender)

    expect(await screen.findByLabelText('Parkeren')).toBeChecked()

    expect(await screen.findByLabelText('Haltes')).toBeChecked()
    expect(await screen.findByTestId('markercluster-stops')).toBeVisible()

    await act(async () => {
      await user.click(await screen.findByLabelText('Haltes'))
      await delay(500)
      await user.click(await screen.findByLabelText('Haltes'))
    })

    expect(await screen.findByTestId('stops-list')).toBeVisible()
  })
})
