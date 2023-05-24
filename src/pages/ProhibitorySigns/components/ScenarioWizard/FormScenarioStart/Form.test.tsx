import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReactNode } from 'react'
import { MemoryRouter } from 'react-router-dom'

import { withAppContext } from '../../../../../../test/utils/withAppContext'
import { withQueryClient } from '../../../../../../test/utils/withQueryClient'

import ProhibitorySignsPageProvider from '../../../contexts/PageProvider'
import {
  ProhibitorySignsFormScenarioStart,
  ProhibitorySignsFormScenarioStartProps,
} from './Form'

describe('ProhibitorySignsFormScenarioStart', () => {
  const props: ProhibitorySignsFormScenarioStartProps = {
    addressInputEnabled: true,
    setAddressInputEnabled: jest.fn(),
  }

  const setup = (children: ReactNode) => {
    return {
      user: userEvent.setup(),
      ...withQueryClient(
        withAppContext(
          <MemoryRouter>
            <ProhibitorySignsPageProvider>
              {children}
            </ProhibitorySignsPageProvider>
          </MemoryRouter>
        )
      ),
    }
  }

  it('renders correctly', async () => {
    setup(<ProhibitorySignsFormScenarioStart {...props} />)

    expect(await screen.findByTestId('form-scenario-start')).toBeInTheDocument()
  })

  it('accepts a comma as decimal separator for vehicle height', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'BXLS14')
    await user.type(vehicleHeightInput, '2,65')
    await user.click(screen.getByRole('button'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('accepts a dot as decimal separator for vehicle height', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'BXLS14')
    await user.type(vehicleHeightInput, '2.45')
    await user.click(screen.getByRole('button'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows an error message if license plate belongs to a trailer', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'OT77FJ')
    await user.type(vehicleHeightInput, '2.3')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText('Voer een kenteken in van een trekkend voertuig')
    ).toBeVisible()
  })

  it('shows an error message if license plate has less than 4 characters', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'NFD')
    await user.type(vehicleHeightInput, '1.55')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Voer een kenteken in')).toBeVisible()
  })

  it('shows an error message if license plate is not found', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'NOFOUND')
    await user.type(vehicleHeightInput, '1.55')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'Kenteken niet gevonden bij RDW. Probeer het nog eens met een geldig Nederlands kenteken'
      )
    ).toBeVisible()
  })

  it('shows an error message if vehicle has no maximum allowed weight', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, '65JRDP')
    await user.type(vehicleHeightInput, '1.85')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'RDW kent geen toegestaan maximum gewicht voor dit voertuig waardoor u deze kaart niet kan gebruiken. We werken aan een oplossing.'
      )
    ).toBeVisible()
  })

  it('shows an error message if vehicle height is 0', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'BXLS14')
    await user.type(vehicleHeightInput, '0')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText('Hoogte moet vallen tussen 0 m en 4 m')
    ).toBeVisible()
  })

  it('shows an error message if vehicle height is larger than 4 meter', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

    await user.type(licensePlateInput, 'BXLS14')
    await user.type(vehicleHeightInput, '4.15')
    await user.click(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(
      screen.getByText(
        'Hoogte moet vallen tussen 0 m en 4 m. Neem contact op met het RDW.'
      )
    ).toBeVisible()
  })

  it('shows an error message when the webapp is being rate limited', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

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
    const { user } = setup(<ProhibitorySignsFormScenarioStart {...props} />)

    const licensePlateInput = await screen.findByLabelText('Kenteken')
    const vehicleHeightInput = await screen.findByLabelText(
      'Hoogte van uw voertuig'
    )

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
