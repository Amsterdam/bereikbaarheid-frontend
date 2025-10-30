import { useContext } from 'react'

import { GeoJSON, MapPanelContext } from '@amsterdam/arm-core'
import { SnapPoint } from '@amsterdam/arm-core/lib/components/MapPanel/constants'
import { useQuery } from '@tanstack/react-query'
import getTouringcarRoutesMandatory from '../../../../api/touringcar/routes-mandatory'
import { DomEvent } from 'leaflet'
import {
  MapLayerId,
  MapPanelTab,
  layerFeatureProps,
  useTouringcarMapContext,
} from '../../../../pages/Touringcar/contexts/MapContext'

export const RoutesMandatoryLayer = () => {
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { activeMapLayers, unsetDetailsPane, setActiveTab } = useTouringcarMapContext()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarRoutesMandatory'],
    queryFn: () =>
      getTouringcarRoutesMandatory({
        _format: 'geojson',
      }),
  })

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.touringcarRoutesMandatoryLayerId]) return null

  return (
    <GeoJSON
      args={[data]}
      options={{
        style: {
          color: layerFeatureProps[MapLayerId.touringcarRoutesMandatoryLayerId].color,
          weight: layerFeatureProps[MapLayerId.touringcarRoutesMandatoryLayerId].strokeWidth,
        },
        onEachFeature: (_feature, layer: L.GeoJSON) => {
          layer.on('click', e => {
            DomEvent.stopPropagation(e)

            unsetDetailsPane()
            setActiveTab(MapPanelTab.INFO)
            setPositionFromSnapPoint(SnapPoint.Halfway)
          })
        },
      }}
    />
  )
}
