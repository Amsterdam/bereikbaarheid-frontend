import { layerIds } from '../contexts/mapLayersReducer'

import { usePermitHeavyGoodsVehicleZone } from './usePermitHeavyGoodsVehicleZone'
import { usePermitLowEmissionZone } from './usePermitLowEmissionZone'

export const useActiveRoadNetwork = () => {
  const permitHeavyGoodsVehicleZone = usePermitHeavyGoodsVehicleZone()
  const permitLowEmissionZone = usePermitLowEmissionZone()

  let activeRoadNetwork: typeof layerIds[number] = 'roadNetworkNoRestrictions'

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
