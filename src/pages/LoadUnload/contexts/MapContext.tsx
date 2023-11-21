import { createContext, Dispatch, useContext } from 'react'

import { DetailFeatureAction, DetailFeatureState } from './detailFeatureReducer'
import { mapLayerActionType, mapLayersInitialState } from './mapLayersReducer'

enum MapLayerId {
  loadUnloadLayerId = 'loadUnloadSpaces',
  roadSectionsLoadUnloadLayerId = 'roadSectionsLoadUnload',
  bollardsLayerId = 'bollards',
}

type LoadUnloadMapContextProps = {
  activeMapLayers: typeof mapLayersInitialState
  updateActiveMapLayers: Dispatch<mapLayerActionType>
  detailFeature: DetailFeatureState
  setDetailFeature: Dispatch<DetailFeatureAction>
}

const layerFeatureProps = {
  [MapLayerId.loadUnloadLayerId]: {
    color: '#000',
  },
  [MapLayerId.roadSectionsLoadUnloadLayerId]: {
    color: '#000',
  },
  [MapLayerId.bollardsLayerId]: {
    color: 'rgb(255, 145, 0)',
  },
}

const LoadUnloadMapContext = createContext<LoadUnloadMapContextProps | undefined>(undefined)

function useLoadUnloadMapContext() {
  const context = useContext(LoadUnloadMapContext)

  if (context === undefined) {
    throw new Error('useLoadUnloadMapContext must be within LoadUnloadMapProvider')
  }

  return context
}

export type { LoadUnloadMapContextProps }
export { MapLayerId, layerFeatureProps, LoadUnloadMapContext }
export default useLoadUnloadMapContext
