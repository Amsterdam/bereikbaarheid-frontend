import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { generatePath } from 'react-router-dom'
import { getPathTo } from '../../../../routes'

import { withApp } from '../../../../../test/utils/withApp'

describe('MapLegend', () => {
  jest.setTimeout(15000)

  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)

    // unfortunately both await are needed, otherwise the road sections fail to load
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    // loadUnloadSpaces layer is disabled on initial render due to zoom level restriction
    expect(screen.getByLabelText(/laad- en losplekken/i)).toBeDisabled()

    expect(screen.getByLabelText(/wegvakken/i)).toBeEnabled()
  })

  // jsdom does not provide any visual output, which makes it hard to properly
  // test if the actual map layer is visible. Therefore this test acts as a
  // canary in a coal mine, because both the enabling/disabling of the legend
  // item and the loading & enabling of the map layer makes use of
  // the same - mapInstance based - mechanism.
  it('enables the load/unload spaces layer when zooming in', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    // unfortunately both await are needed, otherwise the road sections fail to load
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    const buttonZoomIn = screen.getByTitle('Inzoomen')
    await act(async () => {
      // zoom in 3x - map starts at zoomlevel 13 and layer is visible from 16
      await user.click(buttonZoomIn)
      await user.click(buttonZoomIn)
      await user.click(buttonZoomIn)
    })

    expect(screen.getByLabelText(/laad- en losplekken/i)).toBeEnabled()
  })
})
