import { loadUnloadSpaces } from '../../../shared/map/mapLayers'

export const roadSectionsLoadUnloadLayerId = 'roadSectionsLoadUnload'

export const mapLayersInitialState = {
  [loadUnloadSpaces.id]: true,
  [roadSectionsLoadUnloadLayerId]: true,
}

export const layerIds = ['loadUnloadSpaces', 'roadSectionsLoadUnload'] as const

export type mapLayerActionType = {
  type: 'TOGGLE'
  layerId: typeof layerIds[number]
}

export const mapLayersReducer = (
  state: typeof mapLayersInitialState,
  action: mapLayerActionType
) => {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        [action.layerId]: !state[action.layerId],
      }
    default:
      return state
  }
}
