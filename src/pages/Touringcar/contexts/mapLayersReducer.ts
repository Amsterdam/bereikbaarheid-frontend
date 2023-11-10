import { MapLayerId } from './MapContext'

type mapLayerActionType = {
  type: 'ON' | 'OFF' | 'TOGGLE'
  layerId: keyof typeof mapLayersInitialState
}

const mapLayersInitialState = {
  [MapLayerId.touringcarStopsLayerId]: true,
  [MapLayerId.touringcarParkingSpacesLayerId]: true,
  [MapLayerId.touringcarRoutesDestinationTrafficLayerId]: true,
  [MapLayerId.touringcarRoutesRecommendedLayerId]: true,
  [MapLayerId.touringcarRoutesMandatoryLayerId]: true,
}

function mapLayersReducer(state: typeof mapLayersInitialState, action: mapLayerActionType) {
  switch (action.type) {
    case 'ON':
      return {
        ...state,
        [action.layerId]: true,
      }
    case 'OFF':
      return {
        ...state,
        [action.layerId]: false,
      }
    case 'TOGGLE':
      return {
        ...state,
        [action.layerId]: !state[action.layerId],
      }
    default:
      return state
  }
}

export { mapLayersInitialState }
export type { mapLayerActionType }
export default mapLayersReducer
