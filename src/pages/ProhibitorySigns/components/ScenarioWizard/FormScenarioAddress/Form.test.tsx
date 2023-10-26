import { ReactNode } from 'react'

import { act, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'

import { withAppContext } from '../../../../../../test/utils/withAppContext'
import { withQueryClient } from '../../../../../../test/utils/withQueryClient'
import ProhibitorySignsPageProvider from '../../../contexts/PageProvider'

import { ProhibitorySignsFormScenarioAddress } from './Form'

describe('ProhibitorySignsFormScenarioAddress', () => {
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
    setup(<ProhibitorySignsFormScenarioAddress />)

    expect(
      await screen.findByLabelText('Adres van uw bestemming')
    ).toBeInTheDocument()
  })

  it('renders a list of address options', async () => {
    await act(async () => {
      const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

      // search for (part of) an address
      await user.type(
        screen.getByRole('textbox', {
          name: /adres van uw bestemming/i,
        }),
        'Groenb'
      )
    })

    // wait for search results
    await screen.findByRole('list')

    expect(within(screen.getByRole('list')).getAllByRole('link')).toHaveLength(
      11
    )
  })

  it('shows an error message if no address is selected', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    await act(async () => {
      // search for (part of) an address
      await user.type(
        screen.getByRole('textbox', {
          name: /adres van uw bestemming/i,
        }),
        'Groenb'
      )
    })

    // wait for search results
    await screen.findByRole('list')

    await act(async () => {
      // try to submit the form
      await user.click(screen.getByText('Volgende', { selector: 'button' }))
    })

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Selecteer een adres uit de lijst')).toBeVisible()
  })

  it('shows an error message if the search input contains less than 4 characters', async () => {
    const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

    await act(async () => {
      // search for (part of) an address
      await user.type(
        screen.getByRole('textbox', {
          name: /adres van uw bestemming/i,
        }),
        'Gro'
      )
    })

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Voer tenminste 4 letters in')).toBeVisible()

    // type the 4th character - the input now contains 'Groe'
    await act(async () => {
      await user.type(
        screen.getByRole('textbox', {
          name: /adres van uw bestemming/i,
        }),
        'e'
      )
    })

    // a list with search results should be visible
    expect(await screen.findByRole('list')).toBeVisible()
  })

  it('shows an error message if an address is not found', async () => {
    await act(async () => {
      const { user } = setup(<ProhibitorySignsFormScenarioAddress />)

      // search for (part of) an address
      await user.type(
        screen.getByRole('textbox', {
          name: /adres van uw bestemming/i,
        }),
        'Noresults'
      )
    })

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(screen.getByText('Geen adres gevonden')).toBeVisible()
  })
})
