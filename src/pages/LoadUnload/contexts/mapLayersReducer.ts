import { MapLayerId } from './MapContext'

export const roadSectionsLoadUnloadLayerId = 'roadSectionsLoadUnload'

export const mapLayersInitialState = {
  [MapLayerId.loadUnloadLayerId]: true,
  [MapLayerId.roadSectionsLoadUnloadLayerId]: true,
  [MapLayerId.bollardsLayerId]: false,
}

export type mapLayerActionType = {
  type: 'ON' | 'OFF' | 'TOGGLE'
  layerId: MapLayerId
}

export const mapLayersReducer = (state: typeof mapLayersInitialState, action: mapLayerActionType) => {
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
