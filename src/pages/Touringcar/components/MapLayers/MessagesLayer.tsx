import { useCallback, useContext, useEffect } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages, { TouringcarMessage } from 'api/touringcar/messages'
import { format } from 'date-fns'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'
import { DATE_FORMAT_REVERSED, DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

import TouringcarMarker from '../Marker/Marker'

export const MessagesLayer = () => {
  const { activeMapLayers, messagesDate, setCurrentMessage, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { isLoading, error, isError, data, refetch } = useQuery({
    enabled: true,
    queryKey: ['touringcarMessages'],
    queryFn: () =>
      getTouringcarMessages({ datum: format(messagesDate, DATE_FORMAT_REVERSED) as DateHumanReadable_Year_Month_Day }),
  })

  useEffect(() => {
    refetch()
  }, [refetch, messagesDate])

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

      // TODO: i18n
      let tooltipText = `<p><strong>${item.properties.title}</strong></p>
      ${item.properties.body ?? `<p>${item.properties.body}</p>`}
      ${item.properties.advice ?? `<p><strong>Advies:</strong> ${item.properties.advice}</p>`}`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.MESSAGES)
        findMessage(item.properties.title)
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
