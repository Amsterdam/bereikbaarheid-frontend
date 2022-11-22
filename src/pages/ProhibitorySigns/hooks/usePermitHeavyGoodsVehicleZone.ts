import { useProhibitorySignsPageContext } from '../contexts/PageContext'
import { useRdwGeneralInfo } from './useRdwGeneralInfo'

/**
 * Determine if a permit for the Heavy Goods Vehicle Zone is needed
 */
export const usePermitHeavyGoodsVehicleZone = (): boolean => {
  const { vehicle } = useProhibitorySignsPageContext()
  const rdwGeneralInfo = useRdwGeneralInfo()

  if (rdwGeneralInfo.data?.[0].derived.isBus) {
    return false
  }

  if (vehicle.weight <= 7500) {
    return false
  }

  return true
}
