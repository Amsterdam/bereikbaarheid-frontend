import { useQuery } from '@tanstack/react-query'

import { getPermitsByLocation } from '../../../api/bereikbaarheid/permits'

import { useProhibitorySignsPageContext } from '../contexts/PageContext'
import { usePermitHeavyGoodsVehicleZone } from './usePermitHeavyGoodsVehicleZone'
import { usePermitLowEmissionZone } from './usePermitLowEmissionZone'
import { useRdwGeneralInfo } from './useRdwGeneralInfo'

export const usePermitsByLocation = () => {
  const { address, vehicle } = useProhibitorySignsPageContext()
  const needsPermitHeavyGoodsVehicleZone = usePermitHeavyGoodsVehicleZone()
  const needsPermitLowEmissionZone = usePermitLowEmissionZone()
  const rdwGeneralInfo = useRdwGeneralInfo()
  const rdwGeneralData = rdwGeneralInfo.data

  // setting a higher stale time, so that if the user works with the
  // application for a while - and using the same vehicle & address -
  // our API doesn't get queried on every render of a component.
  const queryResult = useQuery({
    enabled:
      !!rdwGeneralData &&
      !!address.lat &&
      !!vehicle.axleWeight &&
      !!vehicle.weight,
    queryKey: ['permitsByLocation', address.lat, address.lon].concat(
      Object.values(vehicle)
    ),
    queryFn: ({ signal }) =>
      getPermitsByLocation(
        address,
        vehicle,
        rdwGeneralData![0].derived.maxAllowedWeight,
        rdwGeneralData![0].derived.vehicleType,
        needsPermitHeavyGoodsVehicleZone,
        needsPermitLowEmissionZone,
        signal
      ),
    staleTime: 1000 * 60 * 10,
  })

  return {
    data: queryResult.data,
    isInitialLoading: queryResult.isInitialLoading,
  }
}
