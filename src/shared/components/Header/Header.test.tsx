import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

import { withAppContext } from '../../../../test/utils/withAppContext'

import Header from '.'

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

    expect(screen.getByText('Stremmingen')).toBeInTheDocument()
    expect(screen.getByText('Laden en lossen')).toBeInTheDocument()
  })
})
