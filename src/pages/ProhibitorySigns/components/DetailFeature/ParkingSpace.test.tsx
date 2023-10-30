import { screen, waitFor } from '@testing-library/react'

import { withQueryClient } from '../../../../../test/utils/withQueryClient'

import ParkingSpace from './ParkingSpace'

it('renders the parking space info', async () => {
  const parkingSpaceId = '122028486875'
  const { rerender } = withQueryClient(<ParkingSpace id={parkingSpaceId} />)

  // wait until the info has been fetched from the API
  await waitFor(() => rerender)

  const linkElement = await screen.findByText(parkingSpaceId)
  expect(linkElement).toBeInTheDocument()
})
