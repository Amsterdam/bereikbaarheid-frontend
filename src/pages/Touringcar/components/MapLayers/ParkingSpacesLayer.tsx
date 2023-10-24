import { useQuery } from '@tanstack/react-query'
import getTouringcarParkingSpaces, {
  TouringcarParkingSpace,
} from 'api/touringcar/parking-spaces'
import { useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { touringcarParkingSpacesLayerId } from 'pages/Touringcar/contexts/mapLayersReducer'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import { TouringcarParkingSpaceMarker } from '../ParkingSpaceMarker/ParkingSpaceMarker'

export const ParkingSpacesLayer = () => {
  const { activeMapLayers } = useTouringcarMapContext()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarParkingSpaces'],
    queryFn: () =>
      getTouringcarParkingSpaces({
        _format: 'geojson',
      }),
  })

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarParkingSpace) => {
      const marker = TouringcarParkingSpaceMarker(item)

      let tooltipText = `<strong>${item.properties?.omschrijving}</strong><br>Plaatsen: ${item.properties?.plaatsen}`

      marker.bindTooltip(tooltipText)

      // marker.on('click', () => findTrafficSign(item.properties.id))

      return marker
    })
  }

  if (isError && error instanceof Error) {
    console.error(error.message)
  }

  if (isLoading || !data) {
    return null
  }

  if (!activeMapLayers[touringcarParkingSpacesLayerId]) return null

  return <MarkerClusterGroup markers={createClusterMarkers()} />
}
