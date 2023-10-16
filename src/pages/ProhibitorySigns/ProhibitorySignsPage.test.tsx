import { act, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouteIds } from 'routes'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../test/utils/withApp'

describe('ProhibitorySignsPage', () => {
  jest.setTimeout(10000)

  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.LICENCE_PLATE_PAGE)

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid op kenteken/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/bereikbaarheid op kenteken/i)

    // the first element is the alt tag of the logo, the second one the title
    expect(links[1]).toHaveTextContent('Bereikbaarheid op kenteken')

    // the scenario wizard should be visible
    const scenarioWizardModal = screen.getByRole('dialog')
    expect(
      within(scenarioWizardModal).getByRole('heading', {
        name: /invoer gegevens/i,
      })
    ).toBeVisible()
  })

  it('renders the map when the wizard is completed', async () => {
    const pathToPage = getGeneratedPath(RouteIds.LICENCE_PLATE_PAGE)
    const page = withApp(pathToPage)

    const user = userEvent.setup()
    const prohibitoryRoadSectionsData = require('../../../test/mocks/bereikbaarheid/roads/prohibitory/data.json')

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid op kenteken/i)

    await act(async () => {
      // fill out the first form
      await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
      await user.type(
        await screen.findByLabelText('Hoogte van uw voertuig'),
        '2.78'
      )

      // ... but uncheck the address option
      await user.click(
        await screen.findByLabelText('Ik wil een adres invoeren')
      )

      await user.click(screen.getByText('Volgende', { selector: 'button' }))
    })

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens')
    ).toBeVisible()

    await act(async () => {
      // complete the wizard
      await user.click(
        screen.getByText('Kaart bekijken', { selector: 'button' })
      )
    })

    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    // heavy goods vehicle zone (zone zwaar verkeer) applies to the vehicle
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const zoneZzvMapTiles = page.container.querySelectorAll(
      '.leaflet-tile[src*="zzv"]'
    )

    expect(zoneZzvMapTiles.length).toBeGreaterThanOrEqual(1)

    // eslint-disable-next-line testing-library/no-node-access
    const prohibitoryRoadSections = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(prohibitoryRoadSections.length).toBe(
      prohibitoryRoadSectionsData.features.length
    )
  })

  // the expert mode of the page provides additional functionality for
  // checking the content of the page (e.g network, traffic signs, etc)
  // it can be activated by adding the URL parameter expertMode=true
  it('provides extra functionality when using the page in expert mode', async () => {
    const pathToPage = getGeneratedPath(RouteIds.LICENCE_PLATE_PAGE)
    const user = userEvent.setup()

    withApp(`${pathToPage}?expertMode=true`)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid op kenteken/i)

    await act(async () => {
      // fill out the first form
      // in expert mode a number of vehicles can be selected from a dropdown
      await user.selectOptions(screen.getByTestId('vehicle-select-list'), [
        'Vuilniswagen',
      ])
    })

    expect(screen.getByLabelText('Kenteken')).toHaveValue('BXLS14')

    await act(async () => {
      // ... but uncheck the address option
      await user.click(
        await screen.findByLabelText('Ik wil een adres invoeren')
      )

      await user.click(screen.getByText('Volgende', { selector: 'button' }))
    })

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens')
    ).toBeVisible()

    await act(async () => {
      // complete the wizard
      await user.click(
        screen.getByText('Kaart bekijken', { selector: 'button' })
      )
    })

    // wait for the map to load
    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    // an extra baselayer - topography with color style - is available
    expect(screen.getByLabelText(/topografie kleur/i)).toBeVisible()
  })
})
