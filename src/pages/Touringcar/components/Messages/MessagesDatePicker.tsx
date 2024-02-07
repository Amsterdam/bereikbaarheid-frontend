import { Input, Label, Paragraph } from '@amsterdam/asc-ui'
import { useTouringcarMapContext } from 'pages/Touringcar/contexts/MapContext'
import { DateHumanReadable_Year_Month_Day } from 'shared/utils/dateTime'

function MessagesDatePicker() {
  const { messagesDate, setMessagesDate } = useTouringcarMapContext()

  return (
    <Paragraph>
      <Label htmlFor="touringcarMessagesDatePicker" label={<strong>Datum</strong>} />
      <Input
        id="touringcarMessagesDatePicker"
        type="date"
        value={messagesDate}
        onChange={({ target }) => setMessagesDate(target.value as DateHumanReadable_Year_Month_Day)}
      />
    </Paragraph>
  )
}

export default MessagesDatePicker
