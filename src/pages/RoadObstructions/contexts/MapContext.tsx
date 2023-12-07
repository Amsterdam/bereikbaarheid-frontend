import { createContext, Dispatch, useContext } from 'react'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type RoadObstructionsMapContextProps = {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
}

export const RoadObstructionsMapContext = createContext<RoadObstructionsMapContextProps | undefined>(undefined)

export function useRoadObstructionsMapContext() {
  const context = useContext(RoadObstructionsMapContext)
  if (context === undefined) {
    throw new Error('useRoadObstructionsMapContext must be within RoadObstructionsMapProvider')
  }

  return context
}
