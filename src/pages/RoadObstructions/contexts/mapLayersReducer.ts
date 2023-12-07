export const roadObstructionsLayerId = 'roadObstructions'
export const wiorLayerId = 'wior'

export const mapLayersInitialState = {
  [roadObstructionsLayerId]: true,
  [wiorLayerId]: false,
}

export const layerIds = ['roadObstructions', 'wior'] as const

export type mapLayerActionType = {
  type: 'TOGGLE'
  layerId: (typeof layerIds)[number]
}

export const mapLayersReducer = (state: typeof mapLayersInitialState, action: mapLayerActionType) => {
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
