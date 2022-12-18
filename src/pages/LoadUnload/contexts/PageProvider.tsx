import { ReactNode, useState } from 'react'

import { Address } from '../../../types/address'

import { LoadUnloadPageContext } from './PageContext'

type Props = {
  children: ReactNode
}

export const LoadUnloadPageProvider = ({ children }: Props) => {
  const [address, setAddress] = useState({} as Address)

  return (
    <LoadUnloadPageContext.Provider
      value={{
        address,
        setAddress,
      }}
    >
      {children}
    </LoadUnloadPageContext.Provider>
  )
}
