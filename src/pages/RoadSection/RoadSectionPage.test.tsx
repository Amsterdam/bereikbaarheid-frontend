import { screen } from '@testing-library/react'
import { generatePath } from 'react-router-dom'
import { getPathTo } from '../../routes'

import { withApp } from '../../../test/utils/withApp'

describe('RoadSectionPage', () => {
  it('renders correctly', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_SECTION_DETAIL_PAGE'), {
      id: 24115,
    })

    withApp(pathToPage)

    // wait until the page is rendered
    await screen.findByText(/Wegvak/)

    // two h1's are rendered: logo & page title
    expect(screen.getAllByRole('heading', { level: 1 })[1]).toHaveTextContent('Wegvak 24115')

    // smoke test map - see if attribution is visible
    expect(screen.getByText(/VMA/)).toBeInTheDocument()
  })

  it('shows the error page when a road section is not found', async () => {
    const pathToPage = generatePath(getPathTo('ROAD_SECTION_DETAIL_PAGE'), {
      id: 404404,
    })

    withApp(pathToPage)

    // on render of the page, the error is logged to the console.
    jest.spyOn(console, 'error').mockImplementation(() => {})

    // wait until the page is rendered
    await screen.findByText(/Wegvak niet gevonden/)

    expect(screen.getByText(/Wegvak niet gevonden/)).toBeInTheDocument()

    expect(console.error).toHaveBeenCalled()
    // @ts-ignore
    console.error.mockRestore()
  })
})
