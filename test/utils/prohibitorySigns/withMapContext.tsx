import { ReactNode } from 'react'

import { mapPanelConstants, MapPanelProvider } from '@amsterdam/arm-core'
import {
  ProhibitorySignsMapContext,
  ProhibitorySignsMapContextProps,
} from 'pages/ProhibitorySigns/contexts/MapContext'
import { mapLayersInitialState } from 'pages/ProhibitorySigns/contexts/mapLayersReducer'

import { withPageContext } from './withPageContext'

const { SnapPoint } = mapPanelConstants

export const initialState: ProhibitorySignsMapContextProps = {
  activeBaseLayer: '',
  setActiveBaseLayer: () => {},
  activeMapLayers: mapLayersInitialState,
  updateActiveMapLayers: () => {},
  currentTrafficSign: undefined,
  setCurrentTrafficSign: () => {},
  location: undefined,
  setLocation: () => {},
}

export const withMapContext = (
  component: ReactNode,
  mapContextProps?: Partial<ProhibitorySignsMapContextProps>
) =>
  withPageContext(
    <ProhibitorySignsMapContext.Provider
      value={{
        ...initialState,
        ...mapContextProps,
      }}
    >
      <MapPanelProvider initialPosition={SnapPoint.Closed} variant="panel">
        {component}
      </MapPanelProvider>
    </ProhibitorySignsMapContext.Provider>
  )
