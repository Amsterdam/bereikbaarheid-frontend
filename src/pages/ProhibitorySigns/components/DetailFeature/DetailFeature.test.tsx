import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { withMapContext } from '../../../../../test/utils/prohibitorySigns/withMapContext'
import { withQueryClient } from '../../../../../test/utils/withQueryClient'
import ProhibitorySignsPageProvider from '../../contexts/PageProvider'

import DetailFeature from './DetailFeature'

const trafficSigns = require('./../../../../../test/mocks/bereikbaarheid/traffic-signs/data.json')
const parkingSpace = require('./../../../../../test/mocks/parkingSpace-122028486875.json')

describe('ProhibitorySignsDetailFeature', () => {
  it('renders the traffic sign info', async () => {
    const mapContextProps = {
      currentTrafficSign: trafficSigns.features[0],
    }

    render(withMapContext(<DetailFeature />, mapContextProps))

    expect(
      screen.getByText(trafficSigns.features[0].properties.id)
    ).toBeVisible()
  })

  it('renders additional traffic sign info when in expert mode', async () => {
    const mapContextProps = {
      currentTrafficSign: trafficSigns.features[0],
    }

    render(
      withMapContext(
        <MemoryRouter initialEntries={['/?expertMode=true']}>
          <ProhibitorySignsPageProvider>
            <DetailFeature />
          </ProhibitorySignsPageProvider>
        </MemoryRouter>,
        mapContextProps
      )
    )

    expect(screen.getByText('Link nummer')).toBeVisible()
    expect(screen.getByText('Bekijk foto')).toBeVisible()
  })

  it('shows the parking space info of the selected location', async () => {
    const mapContextProps = {
      location: [52.36876459937893, 4.903081749692417] as [number, number],
    }

    withQueryClient(withMapContext(<DetailFeature />, mapContextProps))

    // wait until the info has been fetched from the API
    await screen.findByText(parkingSpace.id)

    expect(screen.getByText(parkingSpace.id)).toBeVisible()
  })

  it('shows no results message if no parking space is found at the selected location', async () => {
    const mapContextProps = {
      location: [52.37953213655618, 4.893368482589723] as [number, number],
    }

    withQueryClient(withMapContext(<DetailFeature />, mapContextProps))

    await screen.findByText(/parkeerplaats/)

    expect(
      screen.getByText(/Geen parkeerplaats gevonden op deze locatie/i)
    ).toBeVisible()
  })

  it('info about a selected location takes precedence over a displayed traffic sign', async () => {
    const { rerender } = withQueryClient(
      withMapContext(<DetailFeature />, {
        currentTrafficSign: trafficSigns.features[0],
      })
    )

    expect(
      screen.getByText(trafficSigns.features[0].properties.id)
    ).toBeVisible()

    rerender(
      withMapContext(<DetailFeature />, {
        location: [52.36876459937893, 4.903081749692417] as [number, number],
      })
    )

    await screen.findByText(parkingSpace.id)

    expect(screen.getByText(parkingSpace.id)).toBeVisible()
    expect(
      screen.queryByText(trafficSigns.features[0].properties.id)
    ).not.toBeInTheDocument()
  })
})
