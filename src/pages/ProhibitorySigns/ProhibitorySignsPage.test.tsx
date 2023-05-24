import { screen, within } from '@testing-library/react'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../routes'
import { withApp } from '../../../test/utils/withApp'

describe('ProhibitorySignsPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('HOME'))

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/bereikbaarheid amsterdam op kenteken/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(
      /bereikbaarheid amsterdam op kenteken/i
    )

    // the first element is the alt tag of the logo, the second one the title
    expect(links[1]).toHaveTextContent('Bereikbaarheid Amsterdam op Kenteken')

    // the scenario wizard should be visible
    const scenarioWizardModal = screen.getByRole('dialog')
    expect(
      within(scenarioWizardModal).getByRole('heading', {
        name: /invoer gegevens/i,
      })
    ).toBeVisible()
  })
})
