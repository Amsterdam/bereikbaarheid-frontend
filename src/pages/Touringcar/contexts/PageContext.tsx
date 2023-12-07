import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import type { FormDateTimeValues } from 'shared/components/FormDateTime'
import { Address } from 'types/address'

export type TouringcarPageContextProps = {
  address: Address
  setAddress: Dispatch<SetStateAction<Address>>
  dateTime: FormDateTimeValues
  setDateTime: Dispatch<SetStateAction<FormDateTimeValues>>
}

export const TouringcarPageContext = createContext<TouringcarPageContextProps | undefined>(undefined)

export function useTouringcarPageContext() {
  const context = useContext(TouringcarPageContext)
  if (context === undefined) {
    throw new Error('useTouringcarPageContext must be within TouringcarPageProvider')
  }

  return context
}
