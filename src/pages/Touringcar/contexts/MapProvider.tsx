import { ReactNode, useCallback, useReducer, useState } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { TouringcarStop } from 'api/touringcar/stops'
import { useSearchParams } from 'react-router-dom'

import {
  MapLayerParam,
  MapLayerParamToMapLayer,
  MapPanelTab,
  TouringcarMapContext,
  mapLayerParamIds,
} from './MapContext'
import mapLayersReducer, { mapLayersInitialState } from './mapLayersReducer'

function TouringcarMapProvider({ children }: { children: ReactNode }) {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  const [queryParams] = useSearchParams()
  const updateActiveMapLayersWithSearchParams = useCallback(() => {
    const mapLayerParams: MapLayerParam[] = (
      [...queryParams.keys()] as MapLayerParam[]
    ).filter(key => {
      return mapLayerParamIds.includes(key as MapLayerParam)
    })

    mapLayerParamIds.forEach(param => {
      const queryParam = MapLayerParamToMapLayer[
        param
      ] as unknown as keyof typeof mapLayersInitialState

      if (!mapLayerParams.length) return

      if (mapLayerParams.includes(param)) {
        return updateActiveMapLayers({ type: 'ON', layerId: queryParam })
      } else {
        return updateActiveMapLayers({ type: 'OFF', layerId: queryParam })
      }
    })
  }, [queryParams])

  const [currentStop, setCurrentStop] = useState<TouringcarStop | undefined>(
    undefined
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
        updateActiveMapLayersWithSearchParams,
        currentStop,
        setCurrentStop,
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

export default TouringcarMapProvider
