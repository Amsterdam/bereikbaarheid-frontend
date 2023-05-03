import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

import { withAppContext } from '../../../../test/utils/withAppContext'
import { LoadUnloadHeader, LoadUnloadHeaderProps } from './Header'

describe('LoadUnloadHeader', () => {
  const props: LoadUnloadHeaderProps = {
    setOpenFeedbackModal: jest.fn(),
    title: 'Laden en lossen',
  }

  it('renders correctly', async () => {
    render(
      withAppContext(
        <MemoryRouter>
          <LoadUnloadHeader {...props} />
        </MemoryRouter>
      )
    )

    // wait until component has rendered
    await screen.findByTestId('header')

    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByText('Data')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('provides access to an overview with links to data used on the map', async () => {
    const user = userEvent.setup()

    render(
      withAppContext(
        <MemoryRouter>
          <LoadUnloadHeader {...props} />
        </MemoryRouter>
      )
    )

    await user.click(screen.getByText('Data'))

    expect(
      within(within(screen.getByRole('dialog')).getByRole('list')).getByRole(
        'link',
        { name: 'Laad- en losplekken' }
      )
    ).toBeVisible()

    expect(
      within(within(screen.getByRole('dialog')).getByRole('list')).getByRole(
        'link',
        { name: 'Wegvakken met venstertijden' }
      )
    ).toBeVisible()
  })
})
