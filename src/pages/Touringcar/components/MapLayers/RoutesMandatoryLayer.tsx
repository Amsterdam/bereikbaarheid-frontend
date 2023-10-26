import { GeoJSON } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarRoutesMandatory from 'api/touringcar/routes-mandatory'
import { useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import {
  layerFeatureProps,
  layerIds,
} from 'pages/Touringcar/contexts/mapLayersReducer'

export const RoutesMandatoryLayer = () => {
  const { activeMapLayers } = useTouringcarMapContext()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarRoutesMandatory'],
    queryFn: () =>
      getTouringcarRoutesMandatory({
        _format: 'geojson',
      }),
  })

  if (isError && error instanceof Error) {
    console.error(error.message)
  }

  if (isLoading || !data) {
    return null
  }

  if (!activeMapLayers[layerIds.touringcarRoutesMandatoryLayerId]) return null

  return (
    <GeoJSON
      args={[data]}
      options={{
        style: {
          color:
            layerFeatureProps[layerIds.touringcarRoutesMandatoryLayerId].color,
          weight:
            layerFeatureProps[layerIds.touringcarRoutesMandatoryLayerId]
              .strokeWidth,
        },
      }}
    />
  )
}
