import { format } from 'date-fns'
import { ReactNode, useState } from 'react'

import type { FormDateTimeValues } from '../../../shared/components/FormDateTime'
import { Address } from '../../../types/address'

import { LoadUnloadPageContext } from './PageContext'

type Props = {
  children: ReactNode
}

export const LoadUnloadPageProvider = ({ children }: Props) => {
  const [address, setAddress] = useState({} as Address)
  const [dateTime, setDateTime] = useState<FormDateTimeValues>({
    date: format(new Date(), 'yyyy-MM-dd'),
    timeFrom: '00:00',
    timeTo: '23:59',
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
