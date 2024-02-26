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
      // @ts-ignore
      const message = data?.features.find(item => message.properties[i18n.language || 'nl'].title === title)
      setCurrentMessage(message)
    },
    [data?.features, setCurrentMessage]
  )

  const createClusterMarkers = () => {
    return data!.features.map((item: TouringcarMessage) => {
      const marker = TouringcarMarker(item, MapLayerId.touringcarMessagesLayerId)

      // @ts-ignore
      const msgParts = message.properties[i18n.language || 'nl']

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
