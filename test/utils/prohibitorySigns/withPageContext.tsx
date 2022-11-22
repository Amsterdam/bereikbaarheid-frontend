import { ReactNode } from 'react'

import {
  ProhibitorySignsPageContext,
  ProhibitorySignsPageContextProps,
} from '../../../src/pages/ProhibitorySigns/contexts/PageContext'
import { Address } from '../../../src/pages/ProhibitorySigns/types/address'
import { Vehicle } from '../../../src/pages/ProhibitorySigns/types/vehicle'

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

export const withPageContext = (
  component: ReactNode,
  pageContextProps?: Partial<ProhibitorySignsPageContextProps>
) => (
  <ProhibitorySignsPageContext.Provider
    value={{
      ...initialState,
      ...pageContextProps,
    }}
  >
    {component}
  </ProhibitorySignsPageContext.Provider>
)
