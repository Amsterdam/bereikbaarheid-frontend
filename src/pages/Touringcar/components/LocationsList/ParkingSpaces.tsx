import { useQuery } from '@tanstack/react-query'
import { getTouringcarParkingSpaces } from 'api/touringcar/parking-spaces'

import LocationsList from '.'

function ParkingSpacesList() {
  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarParkingSpaces'],
    queryFn: () => getTouringcarParkingSpaces(),
  })

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data?.features) return null

  return (
    <div data-testid="parking-spaces-list">
      <LocationsList locationItems={data.features} />
    </div>
  )
}

export default ParkingSpacesList
