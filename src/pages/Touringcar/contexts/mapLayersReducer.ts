enum LayerId {
  touringcarParkingSpacesLayerId = 'touringcarParkingSpaces',
  touringcarRoutesMandatoryLayerId = 'touringcarRoutesMandatory',
}

type mapLayerActionType = {
  type: 'TOGGLE'
  layerId: LayerId
}

const layerFeatureProps = {
  [LayerId.touringcarParkingSpacesLayerId]: {
    color: '#000000',
  },
  [LayerId.touringcarRoutesMandatoryLayerId]: {
    color: '#00a03c',
    strokeWidth: 6,
  },
}

const mapLayersInitialState = {
  [LayerId.touringcarParkingSpacesLayerId]: true,
  [LayerId.touringcarRoutesMandatoryLayerId]: true,
}

function mapLayersReducer(
  state: typeof mapLayersInitialState,
  action: mapLayerActionType
) {
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

export { LayerId as layerIds, layerFeatureProps, mapLayersInitialState }
export type { mapLayerActionType }
export default mapLayersReducer
