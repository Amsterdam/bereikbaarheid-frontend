import { useRdwGeneralInfo } from './useRdwGeneralInfo'
import { useRdwFuelInfo } from './useRdwFuelInfo'

/**
 * Determine if a permit for the Low Emission Zone is needed
 */
export const usePermitLowEmissionZone = (): boolean => {
  const rdwFuelInfo = useRdwFuelInfo()
  const rdwGeneralInfo = useRdwGeneralInfo()

  // vehicles not running on diesel do not need a permit
  if (rdwFuelInfo.data?.[0].server.brandstof_omschrijving !== 'Diesel') {
    return false
  }

  // Taxi's from 2009 or younger do not need a permit
  if (
    rdwGeneralInfo.data?.[0].derived.isTaxi &&
    rdwGeneralInfo.data?.[0].derived.buildDate >= 2009
  ) {
    return false
  }

  // electric vehicles do not need a permit
  if (rdwFuelInfo.data?.[0].server.emissiecode_omschrijving === 'Z') {
    return false
  }

  // Private cars & company cars running on diesel
  // & emission standard of at least 4 do not need a permit
  if (
    (rdwGeneralInfo.data?.[0].derived.isPrivateCar ||
      rdwGeneralInfo.data?.[0].derived.isCompanyCar) &&
    !rdwGeneralInfo.data?.[0].derived.isHeavyGoodsVehicle &&
    parseInt(rdwFuelInfo.data?.[0].server.emissiecode_omschrijving) >= 4
  ) {
    return false
  }

  // Heavy goods vehicles & buses running on diesel
  // & emission standard of at least 6 do not need a permit
  if (
    (rdwGeneralInfo.data?.[0].derived.isHeavyGoodsVehicle ||
      rdwGeneralInfo.data?.[0].derived.isBus) &&
    parseInt(rdwFuelInfo.data?.[0].server.emissiecode_omschrijving) >= 6
  ) {
    return false
  }

  return true
}
