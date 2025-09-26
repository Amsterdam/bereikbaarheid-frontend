import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react'

import { TouringcarMessage } from '../../../api/touringcar/messages'
import { TouringcarParkingSpace } from '../../../api/touringcar/parking-spaces'
import { TouringcarStop } from '../../../api/touringcar/stops'
import { format } from 'date-fns'
import { useSearchParams } from 'react-router-dom'
import { DATE_FORMAT_REVERSED } from '../../../shared/utils/dateTime'

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
  const [activeMapLayers, updateActiveMapLayers] = useReducer(mapLayersReducer, mapLayersInitialState)

  const [blockURLParamsMutation, setBlockURLParamsMutation] = useState(false)
  const [queryParams, setQueryParams] = useSearchParams()

  const [messagesDate, setMessagesDate] = useState<Date>(
    queryParams.get('datum') ? new Date(queryParams.get('datum')!) : new Date()
  )

  // Show or hide layers on basis of what parameters are in the URL.
  const updateActiveMapLayersWithSearchParams = useCallback(() => {
    if (blockURLParamsMutation) return

    setBlockURLParamsMutation(true)

    const mapLayerParams: MapLayerParam[] = ([...queryParams.keys()] as MapLayerParam[]).filter(key => {
      return mapLayerParamIds.includes(key as MapLayerParam)
    })

    if (!mapLayerParams.length) return setBlockURLParamsMutation(false)

    mapLayerParamIds.forEach(param => {
      const queryParam = MapLayerParamToMapLayer[param] as unknown as keyof typeof mapLayersInitialState

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

    setBlockURLParamsMutation(true)

    const noLayerIsActive = Object.values(activeMapLayers).every(l => !l)
    const allLayersAreActive = Object.values(activeMapLayers).every(l => l)

    const formattedDate = format(messagesDate, DATE_FORMAT_REVERSED)

    if (allLayersAreActive) {
      setQueryParams({ datum: formattedDate }, { replace: true })
    } else if (noLayerIsActive) {
      setQueryParams({}, { replace: true })
    } else {
      const fromActiveLayersToParams = Object.entries(activeMapLayers).reduce(
        (acc: string, [key, val]: [string, boolean]): string => {
          if (val) {
            return `${acc}&${mapLayerIdToMapLayerParam[key as keyof typeof mapLayerIdToMapLayerParam]}`
          }

          return acc
        },
        ''
      )

      if (fromActiveLayersToParams.includes('berichten')) {
        setQueryParams(`datum=${formattedDate}&${fromActiveLayersToParams}`, {
          replace: true,
        })
      } else {
        setQueryParams(fromActiveLayersToParams, { replace: true })
      }
    }

    setBlockURLParamsMutation(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockURLParamsMutation, queryParams, setQueryParams, activeMapLayers])

  const [currentMessage, doSetCurrentMessage] = useState<TouringcarMessage | undefined>(undefined)
  const setCurrentMessage = useCallback((message?: TouringcarMessage) => {
    doSetCurrentParkingSpace(undefined)
    doSetCurrentStop(undefined)
    doSetCurrentMessage(message)
  }, [])

  const [currentStop, doSetCurrentStop] = useState<TouringcarStop | undefined>(undefined)
  const setCurrentStop = useCallback((stop?: TouringcarStop) => {
    doSetCurrentMessage(undefined)
    doSetCurrentParkingSpace(undefined)
    doSetCurrentStop(stop)
  }, [])

  const [currentParkingSpace, doSetCurrentParkingSpace] = useState<TouringcarParkingSpace | undefined>(undefined)
  const setCurrentParkingSpace = useCallback((parkingSpace?: TouringcarParkingSpace) => {
    doSetCurrentMessage(undefined)
    doSetCurrentStop(undefined)
    doSetCurrentParkingSpace(parkingSpace)
  }, [])

  const unsetDetailsPane = useCallback(() => {
    doSetCurrentMessage(undefined)
    doSetCurrentStop(undefined)
    doSetCurrentParkingSpace(undefined)
  }, [])

  const [activeTab, setActiveTab] = useState<MapPanelTab | undefined>(undefined)

  const [location, setLocation] = useState<[number, number] | undefined>(undefined)

  return (
    <TouringcarMapContext.Provider
      value={{
        activeMapLayers,
        updateActiveMapLayers,
        updateActiveMapLayersWithSearchParams,
        messagesDate,
        setMessagesDate,
        currentMessage,
        setCurrentMessage,
        currentStop,
        setCurrentStop,
        currentParkingSpace,
        setCurrentParkingSpace,
        unsetDetailsPane,
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
