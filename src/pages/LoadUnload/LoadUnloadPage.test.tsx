import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'
import { getPathTo } from 'routes'

import { withApp } from '../../../test/utils/withApp'

describe('LoadUnloadPage', () => {
  const loadUnloadData = require('../../../test/mocks/bereikbaarheid/road-sections/load-unload/data.json')

  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)

    // unfortunately both await are needed, otherwise the road sections fail to load
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/laden en lossen/i)

    // the first element is the alt tag of the logo, the second one the title
    expect(links[1]).toHaveTextContent('Laden en lossen')

    // the roadsections should be displayed on the map
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const loadUnloadFeatures = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(loadUnloadFeatures.length).toBe(loadUnloadData.features.length)
  })

  it('re-categorizes the map on changing the date and time', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    // sanity check - the roadsections should be displayed on the map
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionsSvg = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(roadSectionsSvg.length).toBe(loadUnloadData.features.length)

    // open date and time modal
    await user.click(screen.getByTestId('change-date-time'))

    // change date and time
    const date = '2023-04-30'
    const startTime = '02:00'
    const endTime = '05:00'

    await user.clear(screen.getByTestId('date-input'))
    await user.type(screen.getByTestId('date-input'), date)
    expect(screen.getByTestId('date-input')).toHaveValue(date)

    await user.clear(screen.getByTestId('time-from-input'))
    await user.type(screen.getByTestId('time-from-input'), startTime)
    expect(screen.getByTestId('time-from-input')).toHaveValue(startTime)

    await user.clear(screen.getByTestId('time-to-input'))
    await user.type(screen.getByTestId('time-to-input'), endTime)
    expect(screen.getByTestId('time-to-input')).toHaveValue(endTime)

    // close date and time modal
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    await waitFor(() => page.rerender)

    // road sections with fully available regimes are displayed in
    // theme.colors.supplement.darkgreen
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const categorizedAsFullyAvailable = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path[stroke="#00a03c"]'
    )

    expect(categorizedAsFullyAvailable.length).toBe(5)
  })

  it('can display an address on the map', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const user = userEvent.setup()

    withApp(pathToPage)

    // wait until page is rendered
    await screen.findAllByText(/laden en lossen/i)

    // by default no address is set
    expect(screen.getByTestId('map-settings')).toHaveTextContent(
      /geen adres ingesteld/i
    )

    expect(screen.queryByAltText('Marker')).not.toBeInTheDocument()

    // open address modal
    await user.click(screen.getByTestId('change-address'))

    // search for (part of) an address
    await user.type(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      }),
      'Groenb'
    )

    // wait for search results
    await within(screen.getByTestId('address-form')).findByRole('list')

    // select an address
    await user.click(
      within(screen.getByTestId('address-form')).getByRole('link', {
        name: /groenburgwal 1/i,
      })
    )

    expect(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      })
    ).toHaveValue('Groenburgwal 1')

    // close address modal
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    expect(screen.getByTestId('map-settings')).toHaveTextContent(
      'Groenburgwal 1'
    )

    expect(await screen.findByAltText('Marker')).toBeVisible()
  })
})
