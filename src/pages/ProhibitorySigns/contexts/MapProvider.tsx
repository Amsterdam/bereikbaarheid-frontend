import { ReactNode, useReducer, useState } from 'react'

import { TrafficSign } from '../../../api/bereikbaarheid/traffic-signs'
import { topoBlackWhite } from '../../../shared/map/mapLayers'

import { mapLayersInitialState, mapLayersReducer } from './mapLayersReducer'
import { ProhibitorySignsMapContext } from './MapContext'

type Props = {
  children: ReactNode
}

const ProhibitorySignsMapProvider = ({ children }: Props) => {
  const [activeBaseLayer, setActiveBaseLayer] = useState(topoBlackWhite.id)
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )
  const [currentTrafficSign, setCurrentTrafficSign] = useState<
    TrafficSign | undefined
  >(undefined)

  const [location, setLocation] = useState<[number, number] | undefined>(
    undefined
  )

  return (
    <ProhibitorySignsMapContext.Provider
      value={{
        activeBaseLayer,
        setActiveBaseLayer,
        activeMapLayers,
        updateActiveMapLayers,
        currentTrafficSign,
        setCurrentTrafficSign,
        location,
        setLocation,
      }}
    >
      {children}
    </ProhibitorySignsMapContext.Provider>
  )
}

export default ProhibitorySignsMapProvider
