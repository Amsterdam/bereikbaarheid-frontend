import { ReactNode, useReducer } from 'react'

import { mapLayersInitialState, mapLayersReducer } from './mapLayersReducer'
import { RoadObstructionsMapContext } from './MapContext'

type Props = {
  children: ReactNode
}

const RoadObstructionsMapProvider = ({ children }: Props) => {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  return (
    <RoadObstructionsMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
      }}
    >
      {children}
    </RoadObstructionsMapContext.Provider>
  )
}

export default RoadObstructionsMapProvider
