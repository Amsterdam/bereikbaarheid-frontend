import { useRdwAxlesInfo } from './useRdwAxlesInfo'
import { useRdwFuelInfo } from './useRdwFuelInfo'
import { useRdwGeneralInfo } from './useRdwGeneralInfo'
import { useRdwSubcategoryInfo } from './useRdwSubcategoryInfo'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'

export const useRdwInfo = () => {
  const { vehicle } = useProhibitorySignsPageContext()

  const axlesInfo = useRdwAxlesInfo()
  const fuelInfo = useRdwFuelInfo()
  const generalInfo = useRdwGeneralInfo(vehicle)
  const subcategoryInfo = useRdwSubcategoryInfo()
  const rdwDataIsLoading =
    axlesInfo.isLoading ||
    fuelInfo.isLoading ||
    generalInfo.isLoading ||
    subcategoryInfo.isLoading

  return {
    axlesInfo,
    fuelInfo,
    generalInfo,
    subcategoryInfo,
    rdwDataIsLoading,
  }
}
