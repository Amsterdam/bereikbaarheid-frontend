import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../../../routes'
import { withApp } from '../../../../../test/utils/withApp'

describe('ProhibitorySignsWideRoads', () => {
  /*
  jest.setTimeout(10000)

  it('enables the wide roads map layer for large and/or heavy vehicles', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))
    const user = userEvent.setup()

    const { container } = withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid amsterdam op kenteken/i)

    // fill out the first form
    // choose a vehicle which should trigger the wide roads requirements:
    // - needs a heavy goods vehicle permit (zone zwaar verkeer ontheffing)
    // - and vehicle length > 10 m or vehicle weight > 30000 kg
    await user.type(await screen.findByLabelText('Kenteken'), '85BPF2')
    await user.type(
      await screen.findByLabelText('Hoogte van uw voertuig'),
      '3.25'
    )

    // uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens')
    ).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    await user.click(await screen.findByLabelText('Breed opgezette wegen'))

    // the wide roads layer should be enabled
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wideRoadsMapTiles = container.querySelectorAll(
      '.leaflet-tile[src*="breed_opgezette_wegen"]'
    )

    expect(wideRoadsMapTiles.length).toBeGreaterThanOrEqual(1)

    // the map legend should indicate the layer is enabled
    expect(screen.getByLabelText(/breed opgezette wegen/i)).toBeEnabled()
  })
  */
})
