import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { TouringcarStop } from 'api/touringcar/stops'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

enum MapPanelTab {
  MESSAGES = 'messages',
  ROUTE_INFO = 'routeInfo',
  DATA = 'data',
}

enum MapLayerId {
  touringcarStopsLayerId = 'touringcarStops',
  touringcarParkingSpacesLayerId = 'touringcarParkingSpaces',
  touringcarRoutesRecommendedLayerId = 'touringcarRoutesRecommended',
  touringcarRoutesMandatoryLayerId = 'touringcarRoutesMandatory',
}

enum MapLayerParamToMapLayer {
  'haltes' = MapLayerId.touringcarStopsLayerId,
  'parkeren' = MapLayerId.touringcarParkingSpacesLayerId,
  'aanbevolen-routes' = MapLayerId.touringcarRoutesRecommendedLayerId,
  'verplichte-routes' = MapLayerId.touringcarRoutesMandatoryLayerId,
}

type MapLayerParam = keyof typeof MapLayerParamToMapLayer

const mapLayerParamIds: (keyof typeof MapLayerParamToMapLayer)[] = [
  'haltes',
  'parkeren',
  'aanbevolen-routes',
  'verplichte-routes',
]

const layerFeatureProps = {
  [MapLayerId.touringcarStopsLayerId]: {
    color: '#009dec',
  },
  [MapLayerId.touringcarParkingSpacesLayerId]: {
    color: '#000000',
  },
  [MapLayerId.touringcarRoutesRecommendedLayerId]: {
    color: '#BED200',
    strokeWidth: 6,
  },
  [MapLayerId.touringcarRoutesMandatoryLayerId]: {
    color: '#00a03c',
    strokeWidth: 6,
  },
}

interface TouringcarContextProps {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  updateActiveMapLayersWithSearchParams: () => void
  currentStop: TouringcarStop | undefined
  setCurrentStop: Dispatch<SetStateAction<TouringcarStop | undefined>>
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

export type { MapLayerParam, TouringcarContextProps }
export {
  MapPanelTab,
  MapLayerId,
  MapLayerParamToMapLayer,
  mapLayerParamIds,
  layerFeatureProps,
  TouringcarMapContext,
  useTouringcarMapContext,
}
export default useTouringcarMapContext
