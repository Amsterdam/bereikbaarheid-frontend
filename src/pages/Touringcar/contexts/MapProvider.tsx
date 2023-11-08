import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { TouringcarStop } from 'api/touringcar/stops'
import { useSearchParams } from 'react-router-dom'

import {
  MapLayerParam,
  MapLayerParamToMapLayerId as MapLayerParamToMapLayer,
  MapPanelTab,
  TouringcarMapContext,
  mapLayerIdToMapLayerParam,
  mapLayerParams as mapLayerParamIds,
} from './MapContext'
import mapLayersReducer, { mapLayersInitialState } from './mapLayersReducer'

function TouringcarMapProvider({ children }: { children: ReactNode }) {
  const [activeMapLayers, updateActiveMapLayers] = useReducer(
    mapLayersReducer,
    mapLayersInitialState
  )

  const [blockURLParamsMutation, setBlockURLParamsMutation] = useState(false)
  const [queryParams, setQueryParams] = useSearchParams()
  const updateActiveMapLayersWithSearchParams = useCallback(() => {
    if (blockURLParamsMutation) return

    setBlockURLParamsMutation(true)

    const mapLayerParams: MapLayerParam[] = (
      [...queryParams.keys()] as MapLayerParam[]
    ).filter(key => {
      return mapLayerParamIds.includes(key as MapLayerParam)
    })

    if (!mapLayerParams.length) return setBlockURLParamsMutation(false)

    mapLayerParamIds.forEach(param => {
      const queryParam = MapLayerParamToMapLayer[
        param
      ] as unknown as keyof typeof mapLayersInitialState

      if (mapLayerParams.includes(param)) {
        return updateActiveMapLayers({ type: 'ON', layerId: queryParam })
      } else {
        return updateActiveMapLayers({ type: 'OFF', layerId: queryParam })
      }
    })

    setBlockURLParamsMutation(false)
  }, [blockURLParamsMutation, queryParams])

  // Add URL parameters when some, but not all, legend items are checked.
  useEffect(() => {
    if (blockURLParamsMutation) return

    const noLayerIsActive = Object.values(activeMapLayers).every(l => !l)
    const allLayersAreActive = Object.values(activeMapLayers).every(l => l)

    if (noLayerIsActive || allLayersAreActive) {
      setQueryParams({}, { replace: true })
    } else {
      const fromActiveLayersToParams = Object.entries(activeMapLayers).reduce(
        (acc: string, [key, val]: [string, boolean]): string => {
          if (val) {
            return `${acc}&${
              mapLayerIdToMapLayerParam[
                key as keyof typeof mapLayerIdToMapLayerParam
              ]
            }`
          }

          return acc
        },
        ''
      )

      setQueryParams(fromActiveLayersToParams, { replace: true })
    }
  }, [blockURLParamsMutation, queryParams, setQueryParams, activeMapLayers])

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
