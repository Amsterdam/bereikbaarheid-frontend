import { createContext, Dispatch, useContext } from 'react'

import { DetailFeatureAction, DetailFeatureState } from './detailFeatureReducer'
import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type LoadUnloadMapContextProps = {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  detailFeature: DetailFeatureState
  setDetailFeature: Dispatch<DetailFeatureAction>
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
