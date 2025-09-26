import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { RouteIds } from '../../../routes'
import { getGeneratedPath } from '../../../shared/utils/path'

import { withApp } from '../../../../test/utils/withApp'
import { withAppContext } from '../../../../test/utils/withAppContext'

import Header from '.'

describe('Header', () => {
  jest.setTimeout(15000)

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

    expect(screen.getByText('Title is optional', { selector: 'a' })).toBeInTheDocument()
  })

  it('shows a translated title', async () => {
    const pathToPage = getGeneratedPath(RouteIds.TOURINGCAR_PAGE)
    withApp(pathToPage)

    const user = userEvent.setup()

    let pageTitle = screen.getByRole('heading', { level: 1 })
    expect(pageTitle).toHaveTextContent('Touringcar')

    await act(async () => {
      await user.click(await screen.findByTestId('menuFlyoutLanguageSelect'))
      await user.click(await screen.findByTestId('buttonLanguageEspañol'))
    })

    pageTitle = screen.getByRole('heading', { level: 1 })
    expect(pageTitle).toHaveTextContent('Autocar')
  })
})
