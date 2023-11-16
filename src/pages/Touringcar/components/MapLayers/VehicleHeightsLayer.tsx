import { useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarVehicleHeights, { TouringcarVehicleHeight } from 'api/touringcar/vehicle-heights'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { useTranslation } from 'react-i18next'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import TouringcarMarker from '../Marker/Marker'

export const VehicleHeightsLayer = () => {
  const { activeMapLayers, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { t } = useTranslation()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarVehicleHeights'],
    queryFn: () =>
      getTouringcarVehicleHeights({
        _format: 'geojson',
      }),
  })

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarVehicleHeight) => {
      const marker = TouringcarMarker(item, MapLayerId.touringcarVehicleHeightsLayerId)

      let tooltipText = `<strong>${item.properties?.omschrijving}</strong><br>${t(
        '_pageTouringcar.maxVehicleHeight'
      )}: ${item.properties?.maximaleDoorrijhoogte}`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.INFO)
        setPositionFromSnapPoint(mapPanelConstants.SnapPoint.Halfway)
      })

      return marker
    })
  }

  if (isError && error instanceof Error) {
    console.error(error.message)
  }

  if (isLoading || !data) {
    return null
  }

  if (!activeMapLayers[MapLayerId.touringcarVehicleHeightsLayerId]) return null

  return <MarkerClusterGroup markers={createClusterMarkers()} />
}
