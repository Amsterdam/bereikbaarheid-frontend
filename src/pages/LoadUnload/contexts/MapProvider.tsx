import { ReactNode, useReducer } from 'react'

import {
  detailFeatureReducer,
  detailFeatureInitialState,
} from './detailFeatureReducer'
import { mapLayersReducer, mapLayersInitialState } from './mapLayersReducer'
import { LoadUnloadMapContext } from './MapContext'

type Props = {
  children: ReactNode
}

export const LoadUnloadMapProvider = ({ children }: Props) => {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  const [detailFeature, setDetailFeature] = useReducer(
    detailFeatureReducer,
    detailFeatureInitialState
  )

  return (
    <LoadUnloadMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
        detailFeature,
        setDetailFeature,
      }}
    >
      {children}
    </LoadUnloadMapContext.Provider>
  )
}
