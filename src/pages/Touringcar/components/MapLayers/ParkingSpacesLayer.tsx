import { useCallback, useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarParkingSpaces, {
  TouringcarParkingSpace,
} from 'api/touringcar/parking-spaces'
import {
  MapLayerId,
  // MapPanelTab,
  useTouringcarMapContext,
} from 'pages/Touringcar/contexts/MapContext'
import { useTranslation } from 'react-i18next'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import TouringcarMarker from '../Marker/Marker'

export const ParkingSpacesLayer = () => {
  const {
    activeMapLayers,
    setCurrentStop,
    setCurrentParkingSpace,
    // setActiveTab,
  } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { t } = useTranslation()

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarParkingSpaces'],
    queryFn: () =>
      getTouringcarParkingSpaces({
        _format: 'geojson',
      }),
  })

  const findParkingSpace = useCallback(
    (id: number) => {
      let parkingSpace = data?.features.find(item => item.properties?.id === id)

      setCurrentStop(undefined)
      setCurrentParkingSpace(parkingSpace)
    },
    [data?.features, setCurrentStop, setCurrentParkingSpace]
  )

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarParkingSpace) => {
      const marker = TouringcarMarker(
        item,
        MapLayerId.touringcarParkingSpacesLayerId
      )

      let tooltipText = `<strong>${
        item.properties?.omschrijving
      }</strong><br>${t('_pageTouringcar.places')}: ${
        item.properties?.plaatsen
      }`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        // TODO: activate once messages feature is implemented.
        // setActiveTab(MapPanelTab.MESSAGES)
        findParkingSpace(item.properties?.id)
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

  if (!activeMapLayers[MapLayerId.touringcarParkingSpacesLayerId]) return null

  return <MarkerClusterGroup markers={createClusterMarkers()} />
}
