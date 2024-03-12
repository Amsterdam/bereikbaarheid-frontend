import { useEffect, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import getTouringcarMessages, { TouringcarMessage } from 'api/touringcar/messages'
import { format } from 'date-fns'
import i18n from 'i18n'
import useTouringcarMapContext from 'pages/Touringcar/contexts/MapContext'
import { DATE_FORMAT_REVERSED, DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

type MessageLanguage = 'nl' | 'en' | 'de' | 'es' | 'fr'

function getMessagePartsForLanguage(message: TouringcarMessage) {
  let msgParts = message.properties[(i18n.language || i18n.languages[0]) as MessageLanguage]

  if (!msgParts?.title) {
    msgParts = message.properties.en?.title ? message.properties.en : message.properties.nl
  }

  return msgParts
}

function useMessages() {
  const { messagesDate } = useTouringcarMapContext()

  const {
    isLoading,
    isError,
    error,
    data: messages,
    refetch,
  } = useQuery({
    enabled: true,
    queryKey: ['touringcarMessages'],
    queryFn: () => {
      return getTouringcarMessages({
        datum: format(messagesDate, DATE_FORMAT_REVERSED) as DateHumanReadable_Year_Month_Day,
      })
    },
  })

  const sortedMessages = useMemo(() => {
    return messages?.features.sort((a, b) => Number(a.properties.important) + Number(b.properties.important))
  }, [messages?.features])

  useEffect(() => {
    refetch()
  }, [refetch, messagesDate])

  return {
    isLoading,
    isError,
    error,
    sortedMessages,
  }
}

export type { MessageLanguage }
export { getMessagePartsForLanguage }
export default useMessages
