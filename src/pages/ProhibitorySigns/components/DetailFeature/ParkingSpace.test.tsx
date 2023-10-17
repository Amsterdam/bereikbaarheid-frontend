import { screen, waitFor } from '@testing-library/react'

import ParkingSpace from './ParkingSpace'

import { withQueryClient } from '../../../../../test/utils/withQueryClient'

it('renders the parking space info', async () => {
  const parkingSpaceId = '122028486875'
  const { rerender } = withQueryClient(<ParkingSpace id={parkingSpaceId} />)

  // wait until the info has been fetched from the API
  await waitFor(() => rerender)

  const linkElement = await screen.findByText(parkingSpaceId)
  expect(linkElement).toBeInTheDocument()
})
