import { ReactNode, useState } from 'react'

import { format } from 'date-fns'
import type { FormDateTimeValues } from 'shared/components/FormDateTime'
import { DATE_FORMAT_REVERSED } from 'shared/utils/dateTime'
import { Address } from 'types/address'

import { TouringcarPageContext } from './PageContext'

function TouringcarPageProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState({} as Address)

  const initialDate = format(new Date(), DATE_FORMAT_REVERSED)
  const [dateTime, setDateTime] = useState<FormDateTimeValues>({
    date: initialDate,
    timeFrom: '11:00',
    timeTo: '13:00',
  })

  return (
    <TouringcarPageContext.Provider
      value={{
        address,
        setAddress,
        dateTime,
        setDateTime,
      }}
    >
      {children}
    </TouringcarPageContext.Provider>
  )
}

export default TouringcarPageProvider
