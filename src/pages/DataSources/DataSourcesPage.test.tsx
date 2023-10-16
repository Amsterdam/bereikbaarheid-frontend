import { screen, within } from '@testing-library/react'
import { RouteIds } from 'routes'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../test/utils/withApp'

describe('DataSourcesPage', () => {
  it('renders correctly', async () => {
    const pathToPage = getGeneratedPath(RouteIds.DATA)

    withApp(pathToPage)

    // Wait until page is rendered.
    await screen.findAllByText(/databronnen/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/databronnen/i)

    // The first element is the alt tag of the logo; the second one the title.
    expect(links[1]).toHaveTextContent('Databronnen')
  })
})
