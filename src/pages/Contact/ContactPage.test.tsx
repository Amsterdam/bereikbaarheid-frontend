import { screen, within } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../routes'
import { withApp } from '../../../test/utils/withApp'

describe('ContactPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('CONTACT'))

    withApp(pathToPage)

    // Wait until page is rendered.
    await screen.findAllByText(/contact/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/contact/i)

    // The first element is the alt tag of the logo; the second one the title.
    expect(links[1]).toHaveTextContent('contact')
  })
})
