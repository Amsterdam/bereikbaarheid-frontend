import { screen, within } from '@testing-library/react'
import { withApp } from '../../../test/utils/withApp'
import { getGeneratedPath } from '../../shared/utils/path'
import { RouteIds } from '../../routes'

describe('ContactPage', () => {
  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.CONTACT)

    withApp(pathToPage)

    // Wait until page is rendered.
    await screen.findAllByText(/overige vragen/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/contact en uitleg/i)

    // The first element is the alt tag of the logo; the second one the title.
    expect(links[1]).toHaveTextContent('Contact en uitleg')
  })
})
