import { useCallback, useContext } from 'react'

import { MapPanelContext, mapPanelConstants } from '@amsterdam/arm-core'
import { TouringcarMessage } from 'api/touringcar/messages'
import { MapLayerId, MapPanelTab, useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { MarkerClusterGroup } from 'shared/components/MapLayers/MarkerClusterGroup'

import TouringcarMarker from '../Marker/Marker'
import useMessages, { getMessagePartsForLanguage } from '../Messages/hooks/useMessages'

function MessagesLayer() {
  const { activeMapLayers, setCurrentMessage, setActiveTab } = useTouringcarMapContext()
  const { setPositionFromSnapPoint } = useContext(MapPanelContext)

  const { isLoading, isError, error, sortedMessages } = useMessages()

  const findMessage = useCallback(
    (title: string) => {
      if (!sortedMessages) return

      const message: TouringcarMessage | undefined = sortedMessages.find(msg => {
        return getMessagePartsForLanguage(msg).title === title
      })

      setCurrentMessage(message)
    },
    [sortedMessages, setCurrentMessage]
  )

  const createClusterMarkers = (msgs: TouringcarMessage[]) => {
    return msgs.map((message: TouringcarMessage, index) => {
      const marker = TouringcarMarker(message, MapLayerId.touringcarMessagesLayerId, index + 1)
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
  if (isLoading || !sortedMessages) return null
  if (!activeMapLayers[MapLayerId.touringcarMessagesLayerId]) return null

  return (
    <div data-testid="markercluster-messages">
      <MarkerClusterGroup markers={createClusterMarkers(sortedMessages)} />
    </div>
  )
}

export { MessagesLayer }
export default MessagesLayer
