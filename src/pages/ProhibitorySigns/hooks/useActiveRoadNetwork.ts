import { usePermitHeavyGoodsVehicleZone } from './usePermitHeavyGoodsVehicleZone'
import { usePermitLowEmissionZone } from './usePermitLowEmissionZone'

import { layerIds } from '../contexts/mapLayersReducer'

export const useActiveRoadNetwork = () => {
  const permitHeavyGoodsVehicleZone = usePermitHeavyGoodsVehicleZone()
  const permitLowEmissionZone = usePermitLowEmissionZone()

  let activeRoadNetwork: (typeof layerIds)[number] = 'roadNetworkNoRestrictions'

  if (!permitLowEmissionZone && permitHeavyGoodsVehicleZone) {
    activeRoadNetwork = 'roadNetworkHeavyGoodsVehicleZone'
  }

  if (permitLowEmissionZone && permitHeavyGoodsVehicleZone) {
    activeRoadNetwork = 'roadNetworkHeavyGoodsVehicleAndLowEmissionZone'
  }

  if (!permitHeavyGoodsVehicleZone && permitLowEmissionZone) {
    activeRoadNetwork = 'roadNetworkLowEmissionZone'
  }

  return activeRoadNetwork
}
