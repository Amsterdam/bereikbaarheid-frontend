import { ReactNode, useState } from 'react'

import { format } from 'date-fns'
import type { FormDateTimeValues } from '../../../shared/components/FormDateTime'
import { Address } from 'types/address'

import { LoadUnloadPageContext } from './PageContext'

function LoadUnloadPageProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState({} as Address)

  const initialDate = format(new Date(), 'yyyy-MM-dd')
  const [dateTime, setDateTime] = useState<FormDateTimeValues>({
    date: initialDate,
    timeFrom: '11:00',
    timeTo: '13:00',
  })

  return (
    <LoadUnloadPageContext.Provider
      value={{
        address,
        setAddress,
        dateTime,
        setDateTime,
      }}
    >
      {children}
    </LoadUnloadPageContext.Provider>
  )
}

export default LoadUnloadPageProvider
