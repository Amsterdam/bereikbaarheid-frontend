import { render, screen, waitFor } from '@testing-library/react'

import { withMapContext } from '../../../../../test/utils/prohibitorySigns/withMapContext'
import { withQueryClient } from '../../../../../test/utils/withQueryClient'
import DetailFeature from './DetailFeature'

const parkingSpace = require('./../../../../../test/mocks/parkingSpace-122028486875.json')
const trafficSigns = require('./../../../../../test/mocks/trafficSigns.json')

it('renders the traffic sign info', async () => {
  const mapContextProps = {
    currentTrafficSign: trafficSigns.features[0],
  }

  render(withMapContext(<DetailFeature />, mapContextProps))

  const trafficSignId = screen.getByText(trafficSigns.features[0].properties.id)
  expect(trafficSignId).toBeInTheDocument()
})

it('shows the parking space info of the selected location', async () => {
  const mapContextProps = {
    location: [52.36876459937893, 4.903081749692417] as [number, number],
  }

  const { rerender } = withQueryClient(
    withMapContext(<DetailFeature />, mapContextProps)
  )

  // wait until the info has been fetched from the API
  await waitFor(() => rerender)

  const parkingSpaceId = screen.getByText(parkingSpace.id)
  expect(parkingSpaceId).toBeInTheDocument()
})

it('shows no results message if no parking space is found at the selected location', async () => {
  const mapContextProps = {
    location: [52.37953213655618, 4.893368482589723] as [number, number],
  }

  const { rerender } = withQueryClient(
    withMapContext(<DetailFeature />, mapContextProps)
  )

  // wait until the info has been fetched from the API
  await waitFor(() => rerender)

  const message = screen.getByText(
    /Geen parkeerplaats gevonden op deze locatie/i
  )
  expect(message).toBeInTheDocument()
})

it.skip('info about a selected location takes precedence over a displayed traffic sign', async () => {
  // see issue 414
})
