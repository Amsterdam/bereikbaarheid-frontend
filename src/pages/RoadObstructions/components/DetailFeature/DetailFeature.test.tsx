import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { withApp } from '../../../../../test/utils/withApp'
import { generatePath } from 'react-router-dom'
import { getPathTo } from '../../../../routes'

describe('DetailFeature', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const page = withApp(pathToPage)

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    // feature info is only visible after clicking on a feature
    expect(
      screen.queryByTestId('detail-feature-road-section')
    ).not.toBeInTheDocument()

    expect(screen.queryByTestId('detail-feature-wior')).not.toBeInTheDocument()
  })

  it('shows road section detail info when clicking on a feature', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    // on click of a road section, the viewport is centered on the feature
    act(() => {
      jest.spyOn(window, 'scrollTo').mockImplementation(() => {})
    })

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    // direct road obstructions are displayed in dark blue (theme.colors.primary.main)
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSections = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path[stroke="#004699"]'
    )

    await act(async () => {
      await user.click(roadSections[0])
    })

    act(() => {
      expect(window.scrollTo).toHaveBeenCalled()
    })

    expect(
      screen.getByTestId('detail-feature-road-section')
    ).toBeInTheDocument()
  })

  it('shows WIOR detail info when clicking on a feature', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    // zoom in 2x - map starts at zoomlevel 14 and wior is visible from 16
    const buttonZoomIn = screen.getByTitle('Inzoomen')
    await user.click(buttonZoomIn)
    await user.click(buttonZoomIn)

    // enable layer
    await user.click(screen.getByLabelText(/wior/i))
    expect(screen.getByLabelText(/wior/i)).toBeEnabled()

    // wior features are loading...
    await waitFor(() => page.rerender)

    // TODO: find a solution for selecting elements; ideally leaflet features get testid's.
    // wior features are displayed in orange (theme.colors.supplement.orange)
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    // const wiorFeatures = page.container.querySelectorAll(
    //   '.leaflet-overlay-pane svg path[stroke="#ff9100"]'
    // )

    // await act(async () => {
    //   await user.click(wiorFeatures[0])
    // })

    // expect(screen.getByTestId('detail-feature-wior')).toBeInTheDocument()
  })
})
