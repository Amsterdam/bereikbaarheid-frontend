import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'
import { getPathTo } from 'routes'

import { withApp } from '../../../../../test/utils/withApp'

describe('MapLegend', () => {
  jest.setTimeout(60000)

  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('LICENCE_PLATE_PAGE'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid op kenteken/i)

    // fill out the first form
    await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
    await user.type(await screen.findByLabelText('Hoogte van uw voertuig'), '2.78')

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(await within(screen.getByRole('dialog')).findByText('RDW gegevens')).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    expect(screen.getByLabelText(/breed opgezette wegen/i)).toBeEnabled()

    // loadUnloadSpaces layer is disabled on initial render due to zoom level restriction
    expect(screen.getByLabelText(/laad- en losplekken/i)).toBeDisabled()

    expect(screen.getByLabelText(/benodigde ontheffingen/i)).toBeChecked()
    expect(screen.getByLabelText(/verbodsborden/i)).toBeChecked()
  })

  // jsdom does not provide any visual output, which makes it hard to properly
  // test if the actual map layer is visible. Therefore this test acts as a
  // canary in a coal mine, because both the enabling/disabling of the legend
  // item and the loading & enabling of the map layer makes use of
  // the same - mapInstance based - mechanism.
  it('enables the load/unload spaces layer when zooming in', async () => {
    const pathToPage = generatePath(getPathTo('LICENCE_PLATE_PAGE'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid op kenteken/i)

    // fill out the first form
    await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
    await user.type(await screen.findByLabelText('Hoogte van uw voertuig'), '2.78')

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(await within(screen.getByRole('dialog')).findByText('RDW gegevens')).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    // zoom in 3x - map starts at zoomlevel 13 and layer is visible from 16
    const buttonZoomIn = screen.getByTitle('Inzoomen')
    await user.click(buttonZoomIn)
    await user.click(buttonZoomIn)
    await user.click(buttonZoomIn)

    expect(screen.getByLabelText(/laad- en losplekken/i)).toBeEnabled()
  })
})
