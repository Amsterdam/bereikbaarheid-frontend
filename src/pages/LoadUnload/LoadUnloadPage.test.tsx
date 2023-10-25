import { act, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { generatePath } from 'react-router-dom'
import { getPathTo } from 'routes'

import { withApp } from '../../../test/utils/withApp'

describe('LoadUnloadPage', () => {
  jest.setSystemTime(new Date('2023-10-20T10:58:17.683Z'))

  const loadUnloadData = require('../../../test/mocks/bereikbaarheid/road-sections/load-unload/data.json')

  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = await withApp(pathToPage)

    expect(page).toMatchSnapshot()
  })

  it('re-categorizes the map on changing the date and time', async () => {
    const pathToPage = generatePath(getPathTo('LOAD_UNLOAD_PAGE'))
    const page = await withApp(pathToPage)
    const user = userEvent.setup()

    // Unfortunately both await's are needed, otherwise the road sections fail to load in time.
    await waitFor(() => page.rerender)
    await screen.findAllByText(/laden en lossen/i)

    // sanity check - the roadsections should be displayed on the map
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionsSvg = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(roadSectionsSvg.length).toBe(loadUnloadData.features.length)

    // Change date and time.
    const date = '2023-04-30'
    const startTime = '02:00'
    const endTime = '05:00'

    await act(async () => {
      // Open date and time modal.
      await user.click(screen.getByTestId('change-date-time'))

      await user.clear(screen.getByTestId('date-input'))
      await user.type(screen.getByTestId('date-input'), date)
    })

    expect(screen.getByTestId('date-input')).toHaveValue(date)

    await act(async () => {
      await user.clear(screen.getByTestId('time-from-input'))
      await user.type(screen.getByTestId('time-from-input'), startTime)
    })

    expect(screen.getByTestId('time-from-input')).toHaveValue(startTime)

    await act(async () => {
      await user.clear(screen.getByTestId('time-to-input'))
      await user.type(screen.getByTestId('time-to-input'), endTime)
    })

    expect(screen.getByTestId('time-to-input')).toHaveValue(endTime)

    await act(async () => {
      // Close date and time modal.
      await user.click(
        screen.getByText('Kaart bekijken', { selector: 'button' })
      )
    })

    await waitFor(() => page.rerender)

    // Road sections with fully available regimes are displayed in
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

    await withApp(pathToPage)

    // By default no address is set.
    expect(screen.getByTestId('map-settings')).toHaveTextContent(
      /geen adres ingesteld/i
    )

    expect(screen.queryByAltText('Marker')).not.toBeInTheDocument()

    await act(async () => {
      // Open address modal.
      await user.click(screen.getByTestId('change-address'))

      // Search for (part of) an address.
      await user.type(
        screen.getByRole('textbox', {
          name: /adres van uw bestemming/i,
        }),
        'Groenb'
      )
    })

    // Wait for search results.
    await within(screen.getByTestId('address-form')).findByRole('list')

    await act(async () => {
      // Select an address.
      await user.click(
        within(screen.getByTestId('address-form')).getByRole('link', {
          name: /groenburgwal 1/i,
        })
      )
    })

    expect(
      screen.getByRole('textbox', {
        name: /adres van uw bestemming/i,
      })
    ).toHaveValue('Groenburgwal 1')

    await act(async () => {
      // Close address modal.
      await user.click(
        screen.getByText('Kaart bekijken', { selector: 'button' })
      )
    })

    expect(screen.getByTestId('map-settings')).toHaveTextContent(
      'Groenburgwal 1'
    )

    expect(await screen.findByAltText('Marker')).toBeVisible()
  })
})
