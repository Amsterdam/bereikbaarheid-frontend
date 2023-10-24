import { ReactNode, useReducer } from 'react'

import { TouringcarMapContext } from './MapContext'
import { mapLayersReducer, mapLayersInitialState } from './mapLayersReducer'

type Props = {
  children: ReactNode
}

export const TouringcarMapProvider = ({ children }: Props) => {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  return (
    <TouringcarMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
      }}
    >
      {children}
    </TouringcarMapContext.Provider>
  )
}
