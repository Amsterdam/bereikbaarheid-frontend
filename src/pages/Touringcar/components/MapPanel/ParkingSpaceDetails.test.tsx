import { screen, waitFor } from '@testing-library/react'
import { generatePath } from 'react-router-dom'
import { RouteIds, getPathTo } from 'routes'
import delay from 'shared/utils/delay'

import { withApp } from '../../../../../test/utils/withApp'

describe('ParkingSpaceDetails', () => {
  jest.setTimeout(15000)

  it('renders correctly', async () => {
    await delay(1500)

    const pathToPage = generatePath(getPathTo(RouteIds.TOURINGCAR_PAGE), {
      legenda: ['haltes-parkeerplaatsen'],
    })
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)
    await screen.findByText('Leaflet')

    expect(page).toMatchSnapshot()
  })
})
