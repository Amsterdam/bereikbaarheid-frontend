import { screen } from '@testing-library/react'
import { RouteIds } from 'routes'
import { getGeneratedPath } from 'shared/utils/path'

import { withApp } from '../../../../../test/utils/withApp'

describe('CardsMenu', () => {
  it('has card with external link to Touringcars', async () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)

    withApp(pathToPage)

    const cardWithExternalLink = screen.getByTestId('card-with-external-link')

    expect(cardWithExternalLink).toHaveTextContent('Touringcars (Tour Buzz)')
  })

  it('has card with src attribute', async () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)

    withApp(pathToPage)

    const cardWithImage = screen.getAllByTestId('card-with-image')[0]

    expect(cardWithImage).toBeVisible()
  })
})
