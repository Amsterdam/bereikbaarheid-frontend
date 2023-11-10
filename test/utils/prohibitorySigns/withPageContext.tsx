import { ReactNode } from 'react'

import {
  ProhibitorySignsPageContext,
  ProhibitorySignsPageContextProps,
} from 'pages/ProhibitorySigns/contexts/PageContext'
import { Vehicle } from 'pages/ProhibitorySigns/types/vehicle'
import { Address } from 'types/address'

import { withAppContext } from '../withAppContext'

export const initialState: ProhibitorySignsPageContextProps = {
  activeStepWizard: 0,
  setActiveStepWizard: () => {},
  address: {} as Address,
  setAddress: () => {},
  expertMode: false,
  showScenarioWizard: false,
  setShowScenarioWizard: () => {},
  vehicle: {} as Vehicle,
  setVehicle: () => {},
}

export const withPageContext = (component: ReactNode, pageContextProps?: Partial<ProhibitorySignsPageContextProps>) =>
  withAppContext(
    <ProhibitorySignsPageContext.Provider
      value={{
        ...initialState,
        ...pageContextProps,
      }}
    >
      {component}
    </ProhibitorySignsPageContext.Provider>
  )
