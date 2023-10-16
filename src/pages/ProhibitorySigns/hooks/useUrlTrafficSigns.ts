import { useCallback } from 'react'

import { useRdwGeneralInfo } from './useRdwGeneralInfo'
import { useTrafficSignCategories } from './useTrafficSignCategories'

import { getUrl } from '../../../api/bereikbaarheid/traffic-signs'
import { Vehicle } from '../types/vehicle'

const useUrlTrafficSigns = (vehicle: Vehicle) => {
  const rdwGeneralInfo = useRdwGeneralInfo(vehicle)
  const trafficSignCategories = useTrafficSignCategories()

  const urlTrafficSigns = useCallback(
    (showScenarioWizard = false, vehicle?: Vehicle) => {
      if (rdwGeneralInfo.isLoading) return ''

      if (showScenarioWizard) {
        return 'https://api.data.amsterdam.nl/bereikbaarheid/v1/traffic-signs'
      }

      return getUrl({
        trafficSignCategories,
        vehicleAxleWeight: vehicle?.axleWeight || 10000,
        vehicleHasTrailer: vehicle?.hasTrailer || false,
        vehicleHeight: vehicle?.height || 2.65,
        vehicleLength: vehicle?.length || 8.23,
        vehicleMaxAllowedWeight:
          rdwGeneralInfo.data![0].derived.maxAllowedWeight,
        vehicleTotalWeight: vehicle?.weight || 26500,
        vehicleType: rdwGeneralInfo.data![0].derived.vehicleType,
        vehicleWidth: vehicle?.width || 2.55,
      })
    },
    [rdwGeneralInfo.isLoading, rdwGeneralInfo.data, trafficSignCategories]
  )

  return {
    urlTrafficSigns,
  }
}

export default useUrlTrafficSigns
