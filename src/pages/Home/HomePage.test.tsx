import { screen, within } from '@testing-library/react'
import { withApp } from '../../../test/utils/withApp'
import { getGeneratedPath } from '../../shared/utils/path'
import { RouteIds } from '../../routes'

describe('HomePage', () => {
  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)

    withApp(pathToPage)

    // Wait until page is rendered.
    await screen.findAllByText(/bereikbaarheid/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/bereikbaarheid/i)

    // The first element is the alt tag of the logo; the second one the title.
    expect(links[1]).toHaveTextContent('Bereikbaarheid')
  })
})
