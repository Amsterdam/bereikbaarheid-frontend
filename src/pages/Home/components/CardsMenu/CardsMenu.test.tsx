import { screen } from '@testing-library/react'
import { withApp } from '../../../../../test/utils/withApp'
import { getGeneratedPath } from '../../../../shared/utils/path'
import { RouteIds } from '../../../../routes'

describe('CardsMenu', () => {
  it('has card with external link to Touringcar', async () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)

    withApp(pathToPage)

    const cardWithExternalLink = screen.getByTestId('card-with-external-link')

    expect(cardWithExternalLink).toHaveTextContent('Touringcar (Tour Buzz)')
  })

  it('has card with src attribute', async () => {
    const pathToPage = getGeneratedPath(RouteIds.HOME)

    withApp(pathToPage)

    const cardWithImage = screen.getAllByTestId('card-with-image')[0]

    expect(cardWithImage).toBeVisible()
  })
})
