import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { withApp } from '../../../../../test/utils/withApp'
import { getPathTo } from '../../../../routes'

describe('ScenarioDisplay', () => {
  jest.setTimeout(10000)

  it('displays the result after finishing the scenario wizard', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid amsterdam op kenteken/i)

    // fill out the first form
    await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
    await user.type(
      await screen.findByLabelText('Hoogte van uw voertuig'),
      '2.88'
    )

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens')
    ).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    // wait for render of the results
    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    const scenarioDisplay = screen.getByTestId('scenario-display')

    expect(within(scenarioDisplay).getByText('BXLS14')).toBeVisible()
    expect(within(scenarioDisplay).getByText('2.88 meter')).toBeVisible() // vehicle height
    expect(within(scenarioDisplay).getByText('8.23 m')).toBeVisible() // vehicle length
  })

  it('updates the result when input is changed after finishing the initial scenario wizard', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid amsterdam op kenteken/i)

    // fill out the first form
    await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
    await user.type(
      await screen.findByLabelText('Hoogte van uw voertuig'),
      '2.88'
    )

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    expect(
      await within(screen.getByRole('dialog')).findByText('RDW gegevens')
    ).toBeVisible()

    // complete the wizard
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    // wait for render of the results
    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    expect(
      within(screen.getByTestId('scenario-display')).getByText('8.23 m')
    ).toBeVisible() // vehicle length

    // open RDW info form
    await user.click(screen.getByTestId('change-rdw-info'))

    // change vehicle length
    await user.clear(await screen.findByLabelText('Lengte'))
    await user.type(await screen.findByLabelText('Lengte'), '10,56')

    // submit form
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    // wait for render of the results
    await waitFor(() =>
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelectorAll('.leaflet-overlay-pane svg path')
    )

    // and check if vehicle length has changed
    expect(
      within(screen.getByTestId('scenario-display')).getByText('10.56 m')
    ).toBeVisible() // vehicle length
  })
})
