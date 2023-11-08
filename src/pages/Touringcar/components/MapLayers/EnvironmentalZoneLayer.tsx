import { useContext } from 'react'

import { GeoJSON, MapPanelContext } from '@amsterdam/arm-core'
import { SnapPoint } from '@amsterdam/arm-core/lib/components/MapPanel/constants'
import { useQuery } from '@tanstack/react-query'
import getTouringcarEnvironmentalZone from 'api/touringcar/environmental-zone'
import { DomEvent } from 'leaflet'
import {
  MapLayerId,
  MapPanelTab,
  layerFeatureProps,
  useTouringcarMapContext,
} from 'pages/Touringcar/contexts/MapContext'

export const EnvironmentalZoneLayer = () => {
  const { unsetDetailsPane, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)
  const { activeMapLayers } = useTouringcarMapContext()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarEnvironmentalZone'],
    queryFn: () =>
      getTouringcarEnvironmentalZone({
        _format: 'geojson',
      }),
  })

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.touringcarEnvironmentalZoneLayerId]) return null

  return (
    <GeoJSON
      args={[data]}
      options={{
        style: {
          color: layerFeatureProps[MapLayerId.touringcarEnvironmentalZoneLayerId].color,
          weight: layerFeatureProps[MapLayerId.touringcarEnvironmentalZoneLayerId].strokeWidth,
        },
        onEachFeature: (_feature, layer: L.GeoJSON) => {
          layer.on('click', e => {
            DomEvent.stopPropagation(e)

            unsetDetailsPane()
            setActiveTab(MapPanelTab.ROUTE_INFO)
            setPositionFromSnapPoint(SnapPoint.Halfway)
          })
        },
      }}
    />
  )
}
