import { useEffect } from 'react'

import { GeoJSON } from '@amsterdam/arm-core'
import { useQuery } from '@tanstack/react-query'
import { getProhibitoryRoads } from 'api/bereikbaarheid/roads/prohibitory'
import { PathOptions } from 'leaflet'

import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { prohibitoryRoadsLayerId } from '../../contexts/mapLayersReducer'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { usePermitHeavyGoodsVehicleZone } from '../../hooks/usePermitHeavyGoodsVehicleZone'
import { usePermitLowEmissionZone } from '../../hooks/usePermitLowEmissionZone'
import { useRdwGeneralInfo } from '../../hooks/useRdwGeneralInfo'

export const prohibitoryRoadsColors = {
  heavyGoodsRvv: '#ff9701',
  lowEmissionHeavyGoodsRvv: '#032369',
  lowEmissionRvv: '#27e0c0',
  rvv: '#ffd83d',
}

const statusCodesToColors = new Map([
  [11111, prohibitoryRoadsColors.lowEmissionHeavyGoodsRvv],
  [11101, prohibitoryRoadsColors.lowEmissionRvv],
  [11011, prohibitoryRoadsColors.heavyGoodsRvv],
  [11001, prohibitoryRoadsColors.rvv],
])

const ProhibitorySignsProhibitoryRoadsLayer = () => {
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { showScenarioWizard, vehicle } = useProhibitorySignsPageContext()
  const needsPermitHeavyGoodsVehicleZone = usePermitHeavyGoodsVehicleZone()
  const needsPermitLowEmissionZone = usePermitLowEmissionZone()
  const rdwGeneralInfo = useRdwGeneralInfo(vehicle)
  const rdwGeneralData = rdwGeneralInfo.data
  const prohibitoryRoads = useQuery({
    enabled: !!rdwGeneralData && !!vehicle.axleWeight && !!vehicle.weight,
    queryKey: ['prohibitoryRoads'].concat(Object.values(vehicle)),
    queryFn: ({ signal }) =>
      getProhibitoryRoads(
        needsPermitHeavyGoodsVehicleZone,
        needsPermitLowEmissionZone,
        vehicle,
        rdwGeneralData![0].derived.maxAllowedWeight,
        rdwGeneralData![0].derived.vehicleType,
        signal
      ),
  })

  useEffect(() => {
    updateActiveMapLayers({
      type: 'UPDATE',
      layerId: prohibitoryRoadsLayerId,
      enabled: true,
    })
  }, [prohibitoryRoads.data, updateActiveMapLayers])

  if (prohibitoryRoads.isError && prohibitoryRoads.error instanceof Error) {
    console.error(prohibitoryRoads.error.message)
  }

  if (prohibitoryRoads.isLoading) return null

  if (showScenarioWizard) return null

  if (!activeMapLayers[prohibitoryRoadsLayerId]) return null

  return (
    <GeoJSON
      args={[prohibitoryRoads.data!]}
      options={{
        interactive: false,
        style: (feature): PathOptions => {
          const statusCode = feature?.properties.bereikbaar_status_code

          return { color: statusCodesToColors.get(statusCode) ?? 'grey' }
        },
      }}
    />
  )
}

export default ProhibitorySignsProhibitoryRoadsLayer
