import { ReactNode, useState } from 'react'

import { format } from 'date-fns'
import type { FormDateTimeValues } from 'shared/components/FormDateTime'
import { Address } from 'types/address'

import { TouringcarPageContext } from './PageContext'

type Props = {
  children: ReactNode
}

export const TouringcarPageProvider = ({ children }: Props) => {
  const [address, setAddress] = useState({} as Address)
  const [dateTime, setDateTime] = useState<FormDateTimeValues>({
    date: format(new Date(), 'yyyy-MM-dd'),
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
