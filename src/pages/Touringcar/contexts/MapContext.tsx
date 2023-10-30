import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

enum MapPanelTab {
  MESSAGES = 'messages',
  ROUTE_INFO = 'routeInfo',
  DATA = 'data',
}

interface TouringcarContextProps {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  currentParkingSpace: TouringcarParkingSpace | undefined
  setCurrentParkingSpace: Dispatch<
    SetStateAction<TouringcarParkingSpace | undefined>
  >
  activeTab: MapPanelTab | undefined
  setActiveTab: Dispatch<SetStateAction<MapPanelTab | undefined>>
  location: [number, number] | undefined
  setLocation: Dispatch<SetStateAction<[number, number] | undefined>>
}

const TouringcarMapContext = createContext<TouringcarContextProps | undefined>(
  undefined
)

function useTouringcarMapContext() {
  const context = useContext(TouringcarMapContext)

  if (context === undefined) {
    throw new Error(
      'useTouringcarMapContext must be within TouringcarMapProvider'
    )
  }

  return context
}

export type { TouringcarContextProps }
export { MapPanelTab, TouringcarMapContext, useTouringcarMapContext }
export default useTouringcarMapContext
