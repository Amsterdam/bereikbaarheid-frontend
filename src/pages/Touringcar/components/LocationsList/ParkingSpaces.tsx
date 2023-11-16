import { useQuery } from '@tanstack/react-query'
import { getTouringcarParkingSpaces } from 'api/touringcar/parking-spaces'

import LocationsList from '.'

function ParkingSpacesList() {
  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarParkingSpaces'],
    queryFn: () => getTouringcarParkingSpaces(),
  })

  if (isError && error instanceof Error) {
    console.error(error.message)
  }

  if (isLoading || !data?.features) {
    return null
  }

  return <LocationsList locationItems={data.features} />
}

export default ParkingSpacesList
