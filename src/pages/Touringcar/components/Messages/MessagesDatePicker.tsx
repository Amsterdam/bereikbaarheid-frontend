import { useMemo } from 'react'

import { Input, Label, Paragraph } from '@amsterdam/asc-ui'
import { format, parse } from 'date-fns'
import { t } from 'i18next'
import { useTouringcarMapContext } from '../../../../pages/Touringcar/contexts/MapContext'
import { useSearchParams } from 'react-router-dom'
import { DATE_FORMAT_REVERSED } from '../../../../shared/utils/dateTime'

import useMessages from './hooks/useMessages'

function MessagesDatePicker() {
  const [queryParams, setQueryParams] = useSearchParams()
  const { refetch } = useMessages()
  const { messagesDate, setMessagesDate } = useTouringcarMapContext()

  const formattedDate = useMemo(() => format(messagesDate, DATE_FORMAT_REVERSED), [messagesDate])

  return (
    <Paragraph>
      <Label htmlFor="touringcarMessagesDatePicker" label={<strong>{t('_generic.date')}</strong>} />
      <Input
        id="touringcarMessagesDatePicker"
        type="date"
        defaultValue={formattedDate}
        onChange={({ target }) => {
          setMessagesDate(parse(target.value, DATE_FORMAT_REVERSED, new Date()))
          setQueryParams(
            {
              ...queryParams,
              date: target.value,
            },
            { replace: true }
          )
          refetch()
        }}
      />
    </Paragraph>
  )
}

export default MessagesDatePicker
