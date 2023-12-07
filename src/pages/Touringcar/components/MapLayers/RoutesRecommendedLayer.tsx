import { useContext } from 'react'

import { GeoJSON, MapPanelContext } from '@amsterdam/arm-core'
import { SnapPoint } from '@amsterdam/arm-core/lib/components/MapPanel/constants'
import { useQuery } from '@tanstack/react-query'
import getTouringcarRoutesRecommended from 'api/touringcar/routes-recommended'
import { DomEvent } from 'leaflet'
import {
  MapLayerId,
  MapPanelTab,
  layerFeatureProps,
  useTouringcarMapContext,
} from 'pages/Touringcar/contexts/MapContext'

export const RoutesRecommendedLayer = () => {
  const { unsetDetailsPane, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { activeMapLayers } = useTouringcarMapContext()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarRoutesRecommended'],
    queryFn: () =>
      getTouringcarRoutesRecommended({
        _format: 'geojson',
      }),
  })

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.touringcarRoutesRecommendedLayerId]) return null

  return (
    <GeoJSON
      args={[data]}
      options={{
        style: {
          color: layerFeatureProps[MapLayerId.touringcarRoutesRecommendedLayerId].color,
          weight: layerFeatureProps[MapLayerId.touringcarRoutesRecommendedLayerId].strokeWidth,
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
