import { Marker } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getBollards, { Bollard } from 'api/bereikbaarheid/bollards'
import L, { LatLngExpression, LatLngTuple } from 'leaflet'

import useLoadUnloadMapContext, { MapLayerId, layerFeatureProps } from '../../contexts/MapContext'

const BOLLARDS_ZOOM_LEVEL = 16

function BollardsLayer() {
  const { activeMapLayers } = useLoadUnloadMapContext()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['bollards'],
    queryFn: () => getBollards(),
  })

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.bollardsLayerId]) return null

  return (
    <>
      {data.features.map((item: Bollard, index) => {
        const latLng: LatLngExpression = [item.geometry.coordinates[1], item.geometry.coordinates[0]] as LatLngTuple
        return (
          <Marker
            key={index}
            latLng={latLng}
            options={{
              icon: L.divIcon({
                html: `<div style="
                  border-radius: 50%;
                  background-color: ${layerFeatureProps[MapLayerId.bollardsLayerId].color};
                  width: 100%;
                  height: 100%;
                " />`,
                iconSize: [6, 6],
              }),
            }}
          />
        )
      })}
    </>
  )
}

export { BOLLARDS_ZOOM_LEVEL }
export default BollardsLayer
