import { ReactNode, useEffect, useReducer, useState } from 'react'

import { Bollard } from 'api/bereikbaarheid/bollards'

import { detailFeatureReducer, detailFeatureInitialState } from './detailFeatureReducer'
import { LoadUnloadMapContext } from './MapContext'
import { mapLayersReducer, mapLayersInitialState } from './mapLayersReducer'

export const LoadUnloadMapProvider = ({ children }: { children: ReactNode }) => {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(mapLayersReducer, mapLayersInitialState)
  const [detailFeature, setDetailFeature] = useReducer(detailFeatureReducer, detailFeatureInitialState)
  const [currentBollard, setCurrentBollard] = useState<Bollard | undefined>(undefined)

  useEffect(() => {
    if ((detailFeature.feature || detailFeature.location) && currentBollard) {
      setCurrentBollard(undefined)
    }
  }, [currentBollard, detailFeature?.feature, detailFeature?.location])

  return (
    <LoadUnloadMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
        detailFeature,
        setDetailFeature,
        currentBollard,
        setCurrentBollard,
      }}
    >
      {children}
    </LoadUnloadMapContext.Provider>
  )
}
