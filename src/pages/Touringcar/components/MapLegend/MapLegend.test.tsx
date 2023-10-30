import { screen, waitFor } from '@testing-library/react'
import { generatePath } from 'react-router-dom'
import { RouteIds, getPathTo } from 'routes'

import { withApp } from '../../../../../test/utils/withApp'

describe('MapLegend', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo(RouteIds.TOURINGCAR_PAGE))
    const page = withApp(pathToPage)

    await waitFor(() => page.rerender)
    await screen.findByText(/legenda/i)

    expect(screen.getByLabelText(/parkeren/i)).toBeEnabled()
  })
})
