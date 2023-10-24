import { createContext, Dispatch, useContext } from 'react'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type TouringcarContextProps = {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
}

export const TouringcarMapContext = createContext<
  TouringcarContextProps | undefined
>(undefined)

export function useTouringcarMapContext() {
  const context = useContext(TouringcarMapContext)
  if (context === undefined) {
    throw new Error(
      'useTouringcarMapContext must be within TouringcarMapProvider'
    )
  }

  return context
}
