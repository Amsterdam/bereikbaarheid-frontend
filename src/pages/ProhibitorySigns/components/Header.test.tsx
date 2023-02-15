import { screen, waitFor } from '@testing-library/react'

import { withPageContext } from '../../../../test/utils/prohibitorySigns/withPageContext'
import { withQueryClient } from '../../../../test/utils/withQueryClient'

import ProhibitorySignsHeader, { ProhibitorySignsHeaderProps } from './Header'

describe('ProhibitorySignsHeader', () => {
  const props: ProhibitorySignsHeaderProps = {
    setOpenFeedbackModal: jest.fn(),
  }

  it('renders correctly', async () => {
    const { rerender } = withQueryClient(
      withPageContext(<ProhibitorySignsHeader {...props} />, {
        showScenarioWizard: true,
      })
    )

    // wait until the info has been fetched from the API
    await waitFor(() => rerender)

    expect(screen.getByTestId('header')).toBeInTheDocument()

    // the data modal contains links with parameters specific to a vehicle
    // which are unknown at the time of initial render
    expect(screen.queryByText('Data')).not.toBeInTheDocument()

    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
