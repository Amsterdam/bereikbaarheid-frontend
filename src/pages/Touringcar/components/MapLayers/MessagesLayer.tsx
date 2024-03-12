import { useCallback, useContext, useEffect } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages, { TouringcarMessage } from 'api/touringcar/messages'
import { format } from 'date-fns'
import i18n from 'i18n'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'
import { DATE_FORMAT_REVERSED, DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

import TouringcarMarker from '../Marker/Marker'

type MessageLanguage = 'nl' | 'en' | 'de' | 'es' | 'fr'

function getMessagePartsForLanguage(message: TouringcarMessage) {
  let msgParts = message.properties[(i18n.language || i18n.languages[0]) as MessageLanguage]

  if (!msgParts?.title) {
    msgParts = message.properties.en?.title ? message.properties.en : message.properties.nl
  }

  return msgParts
}

function MessagesLayer() {
  const { activeMapLayers, messagesDate, setCurrentMessage, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const {
    isLoading,
    error,
    isError,
    data: messages,
    refetch,
  } = useQuery({
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
      if (!messages) return

      const message: TouringcarMessage | undefined = messages.features.find(msg => {
        return getMessagePartsForLanguage(msg).title === title
      })

      setCurrentMessage(message)
    },
    [messages, setCurrentMessage]
  )

  const createClusterMarkers = () => {
    // Messages should be available once createClusterMarkers is called.
    return messages!.features.map((message: TouringcarMessage) => {
      const marker = TouringcarMarker(message, MapLayerId.touringcarMessagesLayerId)
      const msgParts = getMessagePartsForLanguage(message)

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
  if (isLoading || !messages) return null
  if (!activeMapLayers[MapLayerId.touringcarMessagesLayerId]) return null

  return (
    <div data-testid="markercluster-messages">
      <MarkerClusterGroup markers={createClusterMarkers()} />
    </div>
  )
}

export type { MessageLanguage }
export { getMessagePartsForLanguage, MessagesLayer }
export default MessagesLayer
