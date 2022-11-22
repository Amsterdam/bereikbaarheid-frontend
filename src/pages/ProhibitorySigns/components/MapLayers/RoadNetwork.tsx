import { TileLayer } from '@amsterdam/react-maps'
import { useEffect } from 'react'

import {
  roadNetworkHeavyGoodsVehicleZone,
  roadNetworkLowEmissionZone,
  roadNetworkHeavyGoodsVehicleAndLowEmissionZone,
  roadNetworkNoRestrictions,
} from '../../../../shared/map/mapLayers'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { useActiveRoadNetwork } from '../../hooks/useActiveRoadNetwork'

const ProhibitorySignsRoadNetwork = () => {
  const activeRoadNetwork = useActiveRoadNetwork()
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { showScenarioWizard } = useProhibitorySignsPageContext()

  useEffect(() => {
    updateActiveMapLayers({
      type: 'ACTIVE_ROAD_NETWORK',
      layerId: activeRoadNetwork,
    })
  }, [activeRoadNetwork, updateActiveMapLayers])

  if (showScenarioWizard) {
    return null
  }

  return (
    <>
      {activeMapLayers[roadNetworkHeavyGoodsVehicleZone.id] && (
        <TileLayer
          options={roadNetworkHeavyGoodsVehicleZone.options}
          args={[roadNetworkHeavyGoodsVehicleZone.url]}
        />
      )}

      {activeMapLayers[roadNetworkLowEmissionZone.id] && (
        <TileLayer
          options={roadNetworkLowEmissionZone.options}
          args={[roadNetworkLowEmissionZone.url]}
        />
      )}

      {activeMapLayers[roadNetworkHeavyGoodsVehicleAndLowEmissionZone.id] && (
        <TileLayer
          options={roadNetworkHeavyGoodsVehicleAndLowEmissionZone.options}
          args={[roadNetworkHeavyGoodsVehicleAndLowEmissionZone.url]}
        />
      )}

      {activeMapLayers[roadNetworkNoRestrictions.id] && (
        <TileLayer
          options={roadNetworkNoRestrictions.options}
          args={[roadNetworkNoRestrictions.url]}
        />
      )}
    </>
  )
}

export default ProhibitorySignsRoadNetwork
