import { useCallback, useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarStops, { TouringcarStop } from 'api/touringcar/stops'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { useTranslation } from 'react-i18next'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import TouringcarMarker from '../Marker/Marker'

export const StopsLayer = () => {
  const { activeMapLayers, setCurrentStop, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { t } = useTranslation()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarStops'],
    queryFn: () =>
      getTouringcarStops({
        _format: 'geojson',
      }),
  })

  const findStop = useCallback(
    (id: number) => {
      console.log('Searching for ID:', id)
      const stop = data?.features.find(item => {
        console.log('Comparing', item.id, 'with', id)
        return item.id === id
      })
      setCurrentStop(stop)
      console.log('Updated currentStop:', stop)
    },
    [data?.features, setCurrentStop]
  )

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarStop) => {
      const marker = TouringcarMarker(item, MapLayerId.touringcarStopsLayerId)

      let tooltipText = `<strong>${item.properties?.omschrijving}</strong><br>${t('_pageTouringcar.places')}: ${
        item.properties?.plaatsen
      }`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.INFO)
        findStop(item.id)
        setPositionFromSnapPoint(mapPanelConstants.SnapPoint.Halfway)
      })

      return marker
    })
  }

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.touringcarStopsLayerId]) return null

  return (
    <div data-testid="markercluster-stops">
      <MarkerClusterGroup markers={createClusterMarkers()} />
    </div>
  )
}
