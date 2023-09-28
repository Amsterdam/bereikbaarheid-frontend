import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../../../routes'
import { withApp } from '../../../../../test/utils/withApp'

describe('DetailFeature', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)

    // unfortunately both await are needed, otherwise the road sections fail to load
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    // feature info is only visible after clicking on a feature
    expect(
      screen.queryByTestId('detail-feature-road-section')
    ).not.toBeInTheDocument()

    expect(
      screen.queryByTestId('detail-feature-load-unload-space')
    ).not.toBeInTheDocument()
  })

  it('shows road section detail info when clicking on a feature', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    jest.spyOn(window, 'scrollTo').mockImplementation(() => { })

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSections = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    await user.click(roadSections[0])

    expect(
      screen.getByTestId('detail-feature-road-section')
    ).toBeInTheDocument()
  })

  it('shows road section detail pane with forbidden to stop sign when clicking on a feature', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    jest.spyOn(window, 'scrollTo').mockImplementation(() => { })

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSections = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    // TODO: this may fail when the API data changes. We need to attach traffic sign data on the leaflet elements that have them.
    await user.click(roadSections[0])

    expect(
      screen.getByTestId('detail-feature-road-section-sign')
    ).toBeInTheDocument()
  })
})
