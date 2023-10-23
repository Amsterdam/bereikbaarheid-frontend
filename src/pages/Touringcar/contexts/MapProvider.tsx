import { ReactNode, useReducer } from 'react'

import { LoadUnloadMapContext } from './MapContext'
import { mapLayersReducer, mapLayersInitialState } from './mapLayersReducer'

type Props = {
  children: ReactNode
}

export const LoadUnloadMapProvider = ({ children }: Props) => {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  return (
    <LoadUnloadMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
      }}
    >
      {children}
    </LoadUnloadMapContext.Provider>
  )
}
