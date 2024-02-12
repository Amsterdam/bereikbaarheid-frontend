import { useEffect, useMemo } from 'react'

import { Input, Label, Paragraph } from '@amsterdam/asc-ui'
import { format, parse } from 'date-fns'
import { useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { useSearchParams } from 'react-router-dom'
import { DATE_FORMAT_REVERSED } from 'shared/utils/dateTime'

function MessagesDatePicker() {
  const [queryParams, setQueryParams] = useSearchParams()
  const { messagesDate, setMessagesDate } = useTouringcarMapContext()

  const queryParamDate = queryParams.get('datum')
  useEffect(() => {
    if (!queryParamDate) return
    setMessagesDate(parse(queryParamDate, DATE_FORMAT_REVERSED, new Date()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const formattedDate = useMemo(() => format(messagesDate, DATE_FORMAT_REVERSED), [messagesDate])

  return (
    <Paragraph>
      {/* TODO: i18n */}
      <Label htmlFor="touringcarMessagesDatePicker" label={<strong>Datum</strong>} />
      <Input
        id="touringcarMessagesDatePicker"
        type="date"
        value={formattedDate}
        onChange={({ target }) => {
          setMessagesDate(parse(target.value, DATE_FORMAT_REVERSED, new Date()))
          setQueryParams({
            ...queryParams,
            date: formattedDate,
          })
        }}
      />
    </Paragraph>
  )
}

export default MessagesDatePicker
