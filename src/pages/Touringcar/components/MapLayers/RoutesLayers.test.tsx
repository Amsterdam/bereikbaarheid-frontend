import { screen, waitFor } from '@testing-library/react'
import { generatePath } from 'react-router-dom'
import { RouteIds, getPathTo } from 'routes'

import { withApp } from '../../../../../test/utils/withApp'

describe('RoutesLayers', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo(RouteIds.TOURINGCAR_PAGE), {
      legenda: ['routes'],
    })
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)
    await screen.findByLabelText('Verplichte routes (> 7,5t)')

    expect(page).toMatchSnapshot()
  })
})
