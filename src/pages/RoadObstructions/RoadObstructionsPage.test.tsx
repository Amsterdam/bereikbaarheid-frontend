import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { format } from 'date-fns'
import { generatePath } from 'react-router-dom'

import { getPathTo } from '../../routes'
import { withApp } from '../../../test/utils/withApp'

describe('RoadObstructionsPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const roadSections = require('../../../test/mocks/bereikbaarheid/road-obstructions/data.json')
    const page = withApp(pathToPage)
    const today = format(new Date(), 'dd-MM-yyyy')

    // unfortunately both await are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    const pageTitle = screen.getByRole('heading', { level: 1 })
    const links = within(pageTitle).getAllByText(/stremmingen op/i)

    // the first element is the alt tag of the logo, the second one the title
    expect(links[1]).toHaveTextContent(`Stremmingen op ${today}`)

    // the roadsections should be displayed on the map
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionsSvg = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(roadSectionsSvg.length).toBe(roadSections.features.length)
  })

  it('accepts a date URL parameter for presetting the form', async () => {
    const date = '2023-04-05'
    const dateFormatted = format(new Date(date), 'dd-MM-yyyy')
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const page = withApp(`${pathToPage}?date=${date}`)
    const user = userEvent.setup()

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    const filtersDisplay = screen.getByTestId('map-filters')

    // check if date is preset in filters display
    const dateInFiltersDisplay = within(filtersDisplay).getByText(dateFormatted)

    expect(dateInFiltersDisplay).toBeVisible()

    // open filters modal and check if date is preset on the form
    await user.click(screen.getByText('wijzig', { selector: 'button' }))
    const dateInput = screen.getByTestId('date-input')

    expect(dateInput).toBeVisible()
    expect(dateInput).toHaveValue(date)
  })

  it('filters the map on changing the date', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_OBSTRUCTIONS_PAGE'))
    const roadSections = require('../../../test/mocks/bereikbaarheid/road-obstructions/data.json')
    const roadSectionsUpdated = require('../../../test/mocks/bereikbaarheid/road-obstructions/data-2023-06-15.json')
    const page = withApp(pathToPage)
    const user = userEvent.setup()

    // unfortunately both await's are needed, otherwise the road sections fail to load in time
    // wait until road sections are rendered
    await waitFor(() => page.rerender)
    // wait until page is rendered
    await screen.findAllByText(/stremmingen op/i)

    // sanity check - the roadsections should be displayed on the map
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionsSvg = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(roadSectionsSvg.length).toBe(roadSections.features.length)

    // open filters modal
    await user.click(screen.getByText('wijzig', { selector: 'button' }))

    // change date
    const date = '2023-06-15'
    await user.clear(screen.getByTestId('date-input'))
    await user.type(screen.getByTestId('date-input'), date)
    expect(screen.getByTestId('date-input')).toHaveValue(date)

    // close filters modal
    await user.click(screen.getByText('Kaart bekijken', { selector: 'button' }))

    await waitFor(() => page.rerender)

    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    const roadSectionsSvgUpdated = page.container.querySelectorAll(
      '.leaflet-overlay-pane svg path'
    )

    expect(roadSectionsSvgUpdated.length).toBe(
      roadSectionsUpdated.features.length
    )
  })
})
