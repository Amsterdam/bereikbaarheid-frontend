import { Link, MenuButton, MenuItem } from '@amsterdam/asc-ui'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { Header } from './Header'

import { withAppContext } from '../../../../test/utils/withAppContext'

describe('Header', () => {
  it('renders correctly', () => {
    render(
      withAppContext(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      )
    )

    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders an optional title', () => {
    render(
      withAppContext(
        <BrowserRouter>
          <Header title="Title is optional" />
        </BrowserRouter>
      )
    )

    expect(
      screen.getByText('Title is optional', { selector: 'a' })
    ).toBeInTheDocument()
  })

  it('contains the default menu items', () => {
    render(
      withAppContext(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      )
    )

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Stremmingen')).toBeInTheDocument()
    expect(screen.getByText('Laden en lossen')).toBeInTheDocument()
  })

  it('contains any additional menu items', () => {
    const additionalMenuItem = (
      <MenuItem>
        <MenuButton as={Link}>Additional item</MenuButton>
      </MenuItem>
    )

    render(
      withAppContext(
        <BrowserRouter>
          <Header additionalMenuItems={additionalMenuItem} />
        </BrowserRouter>
      )
    )

    expect(screen.getByText('Additional item')).toBeInTheDocument()
  })
})
