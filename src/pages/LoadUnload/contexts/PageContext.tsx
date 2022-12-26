import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { Address } from '../../../types/address'

export type LoadUnloadPageContextProps = {
  address: Address
  setAddress: Dispatch<SetStateAction<Address>>
}

export const LoadUnloadPageContext = createContext<
  LoadUnloadPageContextProps | undefined
>(undefined)

export function useLoadUnloadPageContext() {
  const context = useContext(LoadUnloadPageContext)
  if (context === undefined) {
    throw new Error(
      'useLoadUnloadPageContext must be within LoadUnloadPageProvider'
    )
  }

  return context
}
