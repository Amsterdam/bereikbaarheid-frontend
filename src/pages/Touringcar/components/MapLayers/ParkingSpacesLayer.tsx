import { useCallback, useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarParkingSpaces, { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { useTranslation } from 'react-i18next'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import TouringcarMarker from '../Marker/Marker'

export const ParkingSpacesLayer = () => {
  const { activeMapLayers, setCurrentParkingSpace, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { t } = useTranslation()

  const { isLoading, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarParkingSpaces'],
    queryFn: () =>
      getTouringcarParkingSpaces({
        _format: 'geojson',
      }),
  })

  const findParkingSpace = useCallback(
    (id: number) => {
      const parkingSpace = data?.features.find(item => item.properties?.id === id)
      setCurrentParkingSpace(parkingSpace)
    },
    [data?.features, setCurrentParkingSpace]
  )

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarParkingSpace) => {
      const marker = TouringcarMarker(item, MapLayerId.touringcarParkingSpacesLayerId)

      let tooltipText = `<strong>${item.properties?.omschrijving}</strong><br>${t('_pageTouringcar.places')}: ${
        item.properties?.plaatsen
      }`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.INFO)
        findParkingSpace(item.properties?.id)
        setPositionFromSnapPoint(mapPanelConstants.SnapPoint.Halfway)
      })

      return marker
    })
  }

  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.touringcarParkingSpacesLayerId]) return null

  return (
    <div data-testid="markercluster-parking-spaces">
      <MarkerClusterGroup markers={createClusterMarkers()} />
    </div>
  )
}
