import { useCallback, useContext, useEffect } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages, { TouringcarMessage, TouringcarMessagePart } from 'api/touringcar/messages'
import { format } from 'date-fns'
import i18n from 'i18n'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'
import { DATE_FORMAT_REVERSED, DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

import TouringcarMarker from '../Marker/Marker'

type Language = 'nl' | 'en' | 'de' | 'es' | 'fr'

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
      if (!data) return
      const message: TouringcarMessage | undefined = data.features.find(
        msg => msg?.properties[(i18n.language || 'nl') as Language].title === title
      )
      setCurrentMessage(message)
    },
    [data, setCurrentMessage]
  )

  const createClusterMarkers = () => {
    return data!.features.map((message: TouringcarMessage) => {
      const marker = TouringcarMarker(message, MapLayerId.touringcarMessagesLayerId)

      const msgParts = message.properties[(i18n.language || 'nl') as Language]

      let tooltipText = `<p><strong>${msgParts.title}</strong></p>
      ${msgParts.body ?? `<p>${msgParts.body}</p>`}
      ${msgParts.advice ?? `<p><strong>Advies:</strong> ${msgParts.advice}</p>`}`

      marker.bindTooltip(tooltipText)

      marker.on('click', () => {
        setActiveTab(MapPanelTab.MESSAGES)
        findMessage(msgParts.title)
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
