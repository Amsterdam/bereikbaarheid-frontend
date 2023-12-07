import { useQuery } from '@tanstack/react-query'
import getTouringcarStops from 'api/touringcar/stops'

import LocationsList from '.'

function StopsList() {
  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarStops'],
    queryFn: () => getTouringcarStops(),
  })

  if (isError && error instanceof Error) {
    console.error(error.message)
  }

  if (isLoading || !data?.features) {
    return null
  }

  return (
    <div data-testid="stops-list">
      <LocationsList locationItems={data.features} />
    </div>
  )
}

export default StopsList
