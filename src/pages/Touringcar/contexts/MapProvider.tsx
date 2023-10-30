import { ReactNode, useReducer, useState } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'

import { MapPanelTab, TouringcarMapContext } from './MapContext'
import mapLayersReducer, { mapLayersInitialState } from './mapLayersReducer'

type Props = {
  children: ReactNode
}

export const TouringcarMapProvider = ({ children }: Props) => {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  const [currentParkingSpace, setCurrentParkingSpace] = useState<
    TouringcarParkingSpace | undefined
  >(undefined)

  const [activeTab, setActiveTab] = useState<MapPanelTab | undefined>(undefined)

  const [location, setLocation] = useState<[number, number] | undefined>(
    undefined
  )

  return (
    <TouringcarMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
        currentParkingSpace,
        setCurrentParkingSpace,
        activeTab,
        setActiveTab,
        location,
        setLocation,
      }}
    >
      {children}
    </TouringcarMapContext.Provider>
  )
}
