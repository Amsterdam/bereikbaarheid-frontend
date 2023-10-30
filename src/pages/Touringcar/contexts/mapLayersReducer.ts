export const touringcarParkingSpacesLayerId = 'touringcarParkingSpaces'

export const mapLayersInitialState = {
  [touringcarParkingSpacesLayerId]: true,
}

export const layerIds = [touringcarParkingSpacesLayerId] as const

export type mapLayerActionType = {
  type: 'TOGGLE'
  layerId: (typeof layerIds)[number]
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
