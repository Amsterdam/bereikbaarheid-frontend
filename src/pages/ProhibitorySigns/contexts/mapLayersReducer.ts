import {
  loadUnloadSpaces,
  roadNetworkHeavyGoodsVehicleZone,
  roadNetworkLowEmissionZone,
  roadNetworkHeavyGoodsVehicleAndLowEmissionZone,
  roadNetworkNoRestrictions,
  wideRoads,
} from '../../../shared/map/mapLayers'

export const prohibitoryRoadsLayerId = 'prohibitoryRoads'
export const trafficSignsLayerId = 'trafficSigns'

export const mapLayersInitialState = {
  [loadUnloadSpaces.id]: true,
  [roadNetworkHeavyGoodsVehicleZone.id]: false,
  [roadNetworkLowEmissionZone.id]: false,
  [roadNetworkHeavyGoodsVehicleAndLowEmissionZone.id]: false,
  [roadNetworkNoRestrictions.id]: false,
  [prohibitoryRoadsLayerId]: false,
  [trafficSignsLayerId]: false,
  [wideRoads.id]: false,
}

// layer ids are equal to layer id in shared/map/mapLayers
export const layerIds = [
  'loadUnloadSpaces',
  'roadNetworkHeavyGoodsVehicleZone',
  'roadNetworkLowEmissionZone',
  'roadNetworkHeavyGoodsVehicleAndLowEmissionZone',
  'roadNetworkNoRestrictions',
  'prohibitoryRoads',
  'trafficSigns',
  'wideRoads',
] as const

export type mapLayerActionType =
  | { type: 'ACTIVE_ROAD_NETWORK'; layerId: (typeof layerIds)[number] }
  | { type: 'TOGGLE'; layerId: (typeof layerIds)[number] }
  | { type: 'UPDATE'; layerId: (typeof layerIds)[number]; enabled: boolean }

export const mapLayersReducer = (
  state: typeof mapLayersInitialState,
  action: mapLayerActionType
) => {
  switch (action.type) {
    case 'ACTIVE_ROAD_NETWORK':
      return {
        ...state,
        // reset
        [roadNetworkHeavyGoodsVehicleZone.id]: false,
        [roadNetworkLowEmissionZone.id]: false,
        [roadNetworkHeavyGoodsVehicleAndLowEmissionZone.id]: false,
        [roadNetworkNoRestrictions.id]: false,
        // activate requested layer
        [action.layerId]: true,
      }
    case 'TOGGLE':
      return {
        ...state,
        [action.layerId]: !state[action.layerId],
      }
    case 'UPDATE':
      return {
        ...state,
        [action.layerId]: action.enabled,
      }
    default:
      return state
  }
}
