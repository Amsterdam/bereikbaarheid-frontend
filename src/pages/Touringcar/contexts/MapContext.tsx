import { createContext, Dispatch, SetStateAction, useContext } from 'react'

import { TouringcarParkingSpace } from 'api/touringcar/parking-spaces'
import { TouringcarStop } from 'api/touringcar/stops'

import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

enum MapPanelTab {
  MESSAGES = 'messages',
  INFO = 'info',
  DATA = 'data',
}

enum MapLayerId {
  touringcarStopsLayerId = 'touringcarStops',
  touringcarParkingSpacesLayerId = 'touringcarParkingSpaces',
  touringcarVehicleHeightsLayerId = 'touringcarVehicleHeights',
  touringcarRoutesDestinationTrafficLayerId = 'touringcarRoutesDestinationTraffic',
  touringcarRoutesRecommendedLayerId = 'touringcarRoutesRecommended',
  touringcarRoutesMandatoryLayerId = 'touringcarRoutesMandatory',
  touringcarEnvironmentalZoneLayerId = 'touringcarEnvironmentalZone',
}

enum MapLayerParamToMapLayerId {
  'haltes' = MapLayerId.touringcarStopsLayerId,
  'parkeren' = MapLayerId.touringcarParkingSpacesLayerId,
  'doorrijhoogtes' = MapLayerId.touringcarVehicleHeightsLayerId,
  'bestemmingsverkeer' = MapLayerId.touringcarRoutesDestinationTrafficLayerId,
  'aanbevolen-routes' = MapLayerId.touringcarRoutesRecommendedLayerId,
  'verplichte-routes' = MapLayerId.touringcarRoutesMandatoryLayerId,
  'milieuzone' = MapLayerId.touringcarEnvironmentalZoneLayerId,
}

type MapLayerParam = keyof typeof MapLayerParamToMapLayerId

const mapLayerParams: MapLayerParam[] = [
  'haltes',
  'parkeren',
  'doorrijhoogtes',
  'bestemmingsverkeer',
  'aanbevolen-routes',
  'verplichte-routes',
  'milieuzone',
]

const mapLayerIdToMapLayerParam: Record<MapLayerId, MapLayerParam> = {
  [MapLayerId.touringcarStopsLayerId]: 'haltes',
  [MapLayerId.touringcarParkingSpacesLayerId]: 'parkeren',
  [MapLayerId.touringcarVehicleHeightsLayerId]: 'doorrijhoogtes',
  [MapLayerId.touringcarRoutesDestinationTrafficLayerId]: 'bestemmingsverkeer',
  [MapLayerId.touringcarRoutesRecommendedLayerId]: 'aanbevolen-routes',
  [MapLayerId.touringcarRoutesMandatoryLayerId]: 'verplichte-routes',
  [MapLayerId.touringcarEnvironmentalZoneLayerId]: 'milieuzone',
}

const layerFeatureProps = {
  [MapLayerId.touringcarStopsLayerId]: {
    color: '#009dec',
  },
  [MapLayerId.touringcarParkingSpacesLayerId]: {
    color: '#000000',
  },
  [MapLayerId.touringcarVehicleHeightsLayerId]: {
    color: '#ec0000',
  },
  [MapLayerId.touringcarRoutesDestinationTrafficLayerId]: {
    color: '#BED200',
    strokeWidth: 6,
  },
  [MapLayerId.touringcarRoutesRecommendedLayerId]: {
    color: '#ff9100',
    strokeWidth: 6,
  },
  [MapLayerId.touringcarRoutesMandatoryLayerId]: {
    color: '#00a03c',
    strokeWidth: 6,
  },
  [MapLayerId.touringcarEnvironmentalZoneLayerId]: {
    color: '#e50082',
    strokeWidth: 2,
  },
}

interface TouringcarContextProps {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  updateActiveMapLayersWithSearchParams: () => void
  currentStop: TouringcarStop | undefined
  setCurrentStop: Dispatch<SetStateAction<TouringcarStop | undefined>>
  currentParkingSpace: TouringcarParkingSpace | undefined
  setCurrentParkingSpace: Dispatch<SetStateAction<TouringcarParkingSpace | undefined>>
  unsetDetailsPane: () => void
  activeTab: MapPanelTab | undefined
  setActiveTab: Dispatch<SetStateAction<MapPanelTab | undefined>>
  location: [number, number] | undefined
  setLocation: Dispatch<SetStateAction<[number, number] | undefined>>
}

const TouringcarMapContext = createContext<TouringcarContextProps | undefined>(undefined)

function useTouringcarMapContext() {
  const context = useContext(TouringcarMapContext)

  if (context === undefined) {
    throw new Error('useTouringcarMapContext must be within TouringcarMapProvider')
  }

  return context
}

export type { MapLayerParam, TouringcarContextProps }
export {
  MapPanelTab,
  MapLayerId,
  MapLayerParamToMapLayerId,
  mapLayerParams,
  mapLayerIdToMapLayerParam,
  layerFeatureProps,
  TouringcarMapContext,
  useTouringcarMapContext,
}
export default useTouringcarMapContext
