import { createContext, Dispatch, useContext } from 'react'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type LoadUnloadMapContextProps = {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
}

export const LoadUnloadMapContext = createContext<
  LoadUnloadMapContextProps | undefined
>(undefined)

export function useLoadUnloadMapContext() {
  const context = useContext(LoadUnloadMapContext)
  if (context === undefined) {
    throw new Error(
      'useLoadUnloadMapContext must be within LoadUnloadMapProvider'
    )
  }

  return context
}
