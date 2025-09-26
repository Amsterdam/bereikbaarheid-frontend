import { Marker } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getBollards, { Bollard } from '../../../../api/bereikbaarheid/bollards'
import L, { LatLngExpression, LatLngTuple } from 'leaflet'
import { DetailFeatureActionType } from '../../../../pages/LoadUnload/contexts/detailFeatureReducer'

import useLoadUnloadMapContext, { MapLayerId, layerFeatureProps } from '../../contexts/MapContext'

const BOLLARDS_ZOOM_LEVEL = 16

function BollardsLayer() {
  const { activeMapLayers, setDetailFeature, setCurrentBollard } = useLoadUnloadMapContext()

  const { isLoading, isError, data } = useQuery({
    enabled: true,
    queryKey: ['bollards'],
    queryFn: () => getBollards(),
  })

  if (isLoading || isError || !data) return null
  if (!activeMapLayers[MapLayerId.bollardsLayerId]) return null

  return (
    <>
      {data.features.map((bollard: Bollard, index) => {
        const latLng: LatLngExpression = [
          bollard.geometry.coordinates[1],
          bollard.geometry.coordinates[0],
        ] as LatLngTuple

        return (
          <Marker
            key={index}
            latLng={latLng}
            options={{
              icon: L.divIcon({
                html: `<div style="
                  border: 1px solid white;
                  border-radius: 50%;
                  background-color: ${layerFeatureProps[MapLayerId.bollardsLayerId].color};
                  width: 100%;
                  height: 100%;
                " />`,
                iconSize: [12, 12],
              }),
            }}
            events={{
              click: () => {
                setDetailFeature({ type: DetailFeatureActionType.RESET })
                setCurrentBollard(bollard)
              },
            }}
          />
        )
      })}
    </>
  )
}

export { BOLLARDS_ZOOM_LEVEL }
export default BollardsLayer
