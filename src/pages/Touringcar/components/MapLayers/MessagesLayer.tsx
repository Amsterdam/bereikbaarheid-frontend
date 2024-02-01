import { useCallback, useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages, { TouringcarMessage } from 'api/touringcar/messages'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import TouringcarMarker from '../Marker/Marker'

export const MessagesLayer = () => {
  const { activeMapLayers, setCurrentMessage, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { isLoading, error, isError, data } = useQuery({
    enabled: true,
    queryKey: ['touringcarMessages'],
    queryFn: () =>
      getTouringcarMessages({
        datum: '2024-02-14',
      }),
  })

  const findMessage = useCallback(
    (title: string) => {
      const message = data?.features.find(item => item.properties?.title === title)
      setCurrentMessage(message)
    },
    [data?.features, setCurrentMessage]
  )

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarMessage) => {
      const marker = TouringcarMarker(item, MapLayerId.touringcarMessagesLayerId)

      let tooltipText = `<p><strong>${item.properties?.title}</strong></p>
<p>${item.properties?.body}</p>
Advies: <p>${item.properties?.advice}</p>`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.MESSAGES)
        findMessage(item.properties?.title)
        setPositionFromSnapPoint(mapPanelConstants.SnapPoint.Halfway)
      })

      return marker
    })
  }

  if (isError && error instanceof Error) console.error(error.message)
  if (isLoading || !data) return null
  if (!activeMapLayers[MapLayerId.touringcarMessagesLayerId]) return null

  return (
    <div data-testid="markercluster-messages">
      <MarkerClusterGroup markers={createClusterMarkers()} />
    </div>
  )
}
