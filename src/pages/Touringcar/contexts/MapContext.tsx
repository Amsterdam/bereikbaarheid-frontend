import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

export type TouringcarContextProps = {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  currentParkingSpace: TouringcarParkingSpace | undefined
  setCurrentParkingSpace: Dispatch<
    SetStateAction<TouringcarParkingSpace | undefined>
  >
  location: [number, number] | undefined
  setLocation: Dispatch<SetStateAction<[number, number] | undefined>>
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
