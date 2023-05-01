import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import { getUrl } from '../../../api/bereikbaarheid/road-obstructions'
import { withAppContext } from '../../../../test/utils/withAppContext'
import RoadObstructionsHeader, { RoadObstructionsHeaderProps } from './Header'

describe('RoadObstructionsHeader', () => {
  const props: RoadObstructionsHeaderProps = {
    mapFilters: {
      date: '2023-04-11',
      timeFrom: '00:00',
      timeTo: '23:59',
    },
    setOpenFeedbackModal: jest.fn(),
  }

  it('renders correctly', async () => {
    render(
      withAppContext(
        <MemoryRouter>
          <RoadObstructionsHeader {...props} />
        </MemoryRouter>
      )
    )

    // wait until component has rendered
    await screen.findByTestId('header')

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('updates the link to road obstructions data on updating the date filter', async () => {
    const user = userEvent.setup()

    render(
      withAppContext(
        <MemoryRouter>
          <RoadObstructionsHeader {...props} />
        </MemoryRouter>
      )
    )

    // sanity check: open Data modal and check link
    await user.click(screen.getByText('Data'))

    expect(
      within(within(screen.getByRole('dialog')).getByRole('list'))
        .getByRole('link', {
          name: 'Stremmingen',
        })
        .getAttribute('href')
    ).toBe(getUrl(props.mapFilters))

    // close Data modal, change the date and check the link again
    await user.click(within(screen.getByRole('dialog')).getByRole('button'))

    props.mapFilters.date = '2023-05-02'

    await user.click(screen.getByText('Data'))

    expect(
      within(within(screen.getByRole('dialog')).getByRole('list'))
        .getByRole('link', {
          name: 'Stremmingen',
        })
        .getAttribute('href')
    ).toBe(getUrl(props.mapFilters))
  })
})
