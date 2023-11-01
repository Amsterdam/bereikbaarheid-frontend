import { useCallback, useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarParkingSpaces, {
  TouringcarParkingSpace,
} from 'api/touringcar/parking-spaces'
import {
  MapLayerId,
  MapPanelTab,
  useTouringcarMapContext,
} from 'pages/Touringcar/contexts/MapContext'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import { TouringcarParkingSpaceMarker } from '../ParkingSpaceMarker/ParkingSpaceMarker'

export const ParkingSpacesLayer = () => {
  const { activeMapLayers, setCurrentParkingSpace, setActiveTab } =
    useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

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

      setCurrentParkingSpace(parkingSpace)
    },
    [data?.features, setCurrentParkingSpace]
  )

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarParkingSpace) => {
      const marker = TouringcarParkingSpaceMarker(item)

      let tooltipText = `<strong>${item.properties?.omschrijving}</strong><br>Plaatsen: ${item.properties?.plaatsen}`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.MESSAGES)
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
