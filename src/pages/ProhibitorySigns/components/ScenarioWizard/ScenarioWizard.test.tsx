import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../../../routes'
import { withApp } from '../../../../../test/utils/withApp'

describe('ScenarioWizard', () => {
  it('an address it not required to complete the wizard', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid amsterdam op kenteken/i)

    // fill out the first form...
    await user.type(await screen.findByLabelText('Kenteken'), 'BXLS14')
    await user.type(
      await screen.findByLabelText('Hoogte van uw voertuig'),
      '2,65'
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

    // The result in the left panel should show, but
    // with a warning that no address was provided
    expect(await screen.findByTestId('result-no-address-found')).toBeVisible()
  })

  it('adjusts the RDW form when choosing the vehicle + trailer option', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))
    const user = userEvent.setup()
    const vehicle = require('./../../../../../test/mocks/rdw/vehicle/24bjl7.json')

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid amsterdam op kenteken/i)

    // fill out the first form...
    await user.type(await screen.findByLabelText('Kenteken'), '24BJL7')
    await user.type(
      await screen.findByLabelText('Hoogte van uw voertuig'),
      '2.85'
    )

    // ... but uncheck the address option
    await user.click(await screen.findByLabelText('Ik wil een adres invoeren'))
    // and check the 'vehicle has a trailer' option
    await user.click(
      await screen.findByLabelText('Ik heb een oplegger en/of aanhanger')
    )

    await user.click(screen.getByText('Volgende', { selector: 'button' }))

    // the next step should be the form with RDW information
    const modal = await screen.findByRole('dialog')

    // the vehicle + trailer option unlocks the following:

    // the form intro text mentions that the displayed values
    // concern vehicle + trailer combined
    expect(
      await within(modal).findByText(
        /.*De hieronder getoonde waarden gelden voor voertuig inclusief oplegger en\/of aanhanger, tenzij anders aangegeven./i
      )
    ).toBeVisible()

    // the vehicle total weight is the total of vehicle + trailer
    // instead of only vehicle
    expect(
      within(modal).getByTestId('rdw-form-vehicle-total-weight')
    ).toHaveValue(vehicle[0].maximum_massa_samenstelling)

    // Form inputs are preset differently:
    // - axle weight is set to the legal maximum weight
    // - vehicle length and width are empty
    expect(
      within(modal).getByTestId('rdw-form-vehicle-axle-weight')
    ).toHaveValue('10000')

    expect(
      within(modal).getByTestId('rdw-form-vehicle-length')
    ).not.toHaveValue()

    expect(
      within(modal).getByTestId('rdw-form-vehicle-width')
    ).not.toHaveValue()

    // try to complete the wizard, which should fail
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    // axle weight is validated against legal maximum - instead of
    // vehicle maximum - axle weight, so the input should be valid
    expect(
      screen.queryByText('Voer maximale aslast van combinatie in')
    ).not.toBeInTheDocument()

    // the length and width should display an error message which mentions
    // the inputs concern vehicle and trailer combined
    expect(await screen.findAllByRole('alert')).toHaveLength(2)

    expect(screen.getByText('Voer lengte van combinatie in')).toBeVisible()

    expect(
      screen.getByText('Voer maximale breedte van combinatie in')
    ).toBeVisible()
  })
})
