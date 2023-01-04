import { ReactNode, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Address } from '../../../types/address'
import { Vehicle } from '../types/vehicle'

import { ProhibitorySignsPageContext } from './PageContext'

type Props = {
  children: ReactNode
}

const ProhibitorySignsPageProvider = ({ children }: Props) => {
  const [activeStepWizard, setActiveStepWizard] = useState(0)
  const [address, setAddress] = useState({} as Address)
  const [queryParams] = useSearchParams()
  let expertMode = queryParams.get('expertMode') ? true : false
  const [showScenarioWizard, setShowScenarioWizard] = useState(true)
  const [vehicle, setVehicle] = useState({} as Vehicle)

  return (
    <ProhibitorySignsPageContext.Provider
      value={{
        activeStepWizard,
        setActiveStepWizard,
        address,
        setAddress,
        expertMode,
        showScenarioWizard,
        setShowScenarioWizard,
        vehicle,
        setVehicle,
      }}
    >
      {children}
    </ProhibitorySignsPageContext.Provider>
  )
}

export default ProhibitorySignsPageProvider
