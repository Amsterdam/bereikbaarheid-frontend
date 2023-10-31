import { screen, waitFor } from '@testing-library/react'
import { generatePath } from 'react-router-dom'
import { RouteIds, getPathTo } from 'routes'

import { withApp } from '../../../../../test/utils/withApp'

describe('ParkingSpaceDetails', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo(RouteIds.TOURINGCAR_PAGE), {
      legenda: ['haltes-parkeerplaatsen'],
    })
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)
    await screen.findByText('Leaflet')

    expect(page).toMatchSnapshot()
  })
})