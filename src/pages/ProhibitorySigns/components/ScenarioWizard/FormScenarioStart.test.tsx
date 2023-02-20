import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { withAppContext } from '../../../../../test/utils/withAppContext'
import { withQueryClient } from '../../../../../test/utils/withQueryClient'
import { withPageContext } from '../../../../../test/utils/prohibitorySigns/withPageContext'

import ProhibitorySignsFormScenarioStart, {
  ProhibitorySignsFormScenarioStartProps,
} from './FormScenarioStart'

describe('ProhibitorySignsFormScenarioStart', () => {
  const props: ProhibitorySignsFormScenarioStartProps = {
    addressInputEnabled: true,
    setAddressInputEnabled: jest.fn(),
  }

  it('renders correctly', async () => {
    const { rerender } = withQueryClient(
      withAppContext(
        withPageContext(<ProhibitorySignsFormScenarioStart {...props} />, {
          showScenarioWizard: true,
        })
      )
    )

    await waitFor(() => rerender)

    expect(screen.getByTestId('form-scenario-start')).toBeInTheDocument()
  })

  it('trailer license plates are not allowed as input', async () => {
    const user = userEvent.setup()
    const { rerender } = withQueryClient(
      withAppContext(
        withPageContext(<ProhibitorySignsFormScenarioStart {...props} />, {
          showScenarioWizard: true,
        })
      )
    )

    await waitFor(() => rerender)

    const licensePlateInput = screen.getByLabelText('Kenteken')
    const vehicleHeightInput = screen.getByLabelText('Hoogte van uw voertuig')

    await user.type(licensePlateInput, 'OT77FJ')
    await user.type(vehicleHeightInput, '2.3')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText('Voer een kenteken in van een trekkend voertuig')
    ).toBeVisible()
  })

  it('shows an error message when the webapp is being rate limited', async () => {
    const user = userEvent.setup()
    const { rerender } = withQueryClient(
      withAppContext(
        withPageContext(<ProhibitorySignsFormScenarioStart {...props} />, {
          showScenarioWizard: true,
        })
      )
    )

    await waitFor(() => rerender)

    const licensePlateInput = screen.getByLabelText('Kenteken')
    const vehicleHeightInput = screen.getByLabelText('Hoogte van uw voertuig')

    // https://dev.socrata.com/docs/response-codes.html
    await user.type(licensePlateInput, 'API429')
    await user.type(vehicleHeightInput, '1.50')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'De RDW API is momenteel niet beschikbaar. Probeer het later nog een keer.'
      )
    ).toBeVisible()
  })

  it('shows an error message when the RDW API is not available', async () => {
    const user = userEvent.setup()
    const { rerender } = withQueryClient(
      withAppContext(
        withPageContext(<ProhibitorySignsFormScenarioStart {...props} />, {
          showScenarioWizard: true,
        })
      )
    )

    await waitFor(() => rerender)

    const licensePlateInput = screen.getByLabelText('Kenteken')
    const vehicleHeightInput = screen.getByLabelText('Hoogte van uw voertuig')

    await user.type(licensePlateInput, 'API500')
    await user.type(vehicleHeightInput, '1.50')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'De RDW API is momenteel niet beschikbaar. Probeer het later nog een keer.'
      )
    ).toBeVisible()
  })
})
