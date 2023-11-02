import { MapLayerId } from './MapContext'

type mapLayerActionType = {
  type: 'ON' | 'OFF' | 'TOGGLE'
  layerId: keyof typeof mapLayersInitialState
}

const layerFeatureProps = {
  [MapLayerId.touringcarParkingSpacesLayerId]: {
    color: '#000000',
  },
  [MapLayerId.touringcarRoutesMandatoryLayerId]: {
    color: '#00a03c',
    strokeWidth: 6,
  },
}

const mapLayersInitialState = {
  [MapLayerId.touringcarParkingSpacesLayerId]: true,
  [MapLayerId.touringcarRoutesMandatoryLayerId]: true,
}

function mapLayersReducer(
  state: typeof mapLayersInitialState,
  action: mapLayerActionType
) {
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

export { layerFeatureProps, mapLayersInitialState }
export type { mapLayerActionType }
export default mapLayersReducer
