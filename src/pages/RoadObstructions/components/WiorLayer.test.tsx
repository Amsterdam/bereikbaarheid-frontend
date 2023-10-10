import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../../routes'
import { withApp } from '../../../../test/utils/withApp'

describe('WiorLayer', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const page = withApp(pathToPage)

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    // wior features are displayed in orange (theme.colors.supplement.orange)
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wiorFeatures = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path[stroke="#ff9100"]'
    )

    // wior layer is disabled on initial render due to zoom level restriction
    expect(screen.getByLabelText(/wior/i)).toBeDisabled()
    expect(wiorFeatures.length).toBe(0)
  })

  /*it('displays the layer after zooming in', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    // zoom in 2x - map starts at zoomlevel 13 and wior is visible from 15
    const buttonZoomIn = screen.getByTitle('Inzoomen')
    await user.click(buttonZoomIn)
    await user.click(buttonZoomIn)

    // enable layer
    await user.click(screen.getByLabelText(/wior/i))
    expect(screen.getByLabelText(/wior/i)).toBeEnabled()

    // wior features are loading...
    await waitFor(() => page.rerender)

    // wior features are displayed in orange (theme.colors.supplement.orange)
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const wiorFeatures = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path[stroke="#ff9100"]'
    )

    expect(wiorFeatures.length).toBe(6)
  })*/
})
