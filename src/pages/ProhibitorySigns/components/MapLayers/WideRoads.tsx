import { useEffect } from 'react'

import { TileLayer } from '@amsterdam/react-maps'

import { wideRoads } from '../../../../shared/map/mapLayers'
import { useProhibitorySignsMapContext } from '../../contexts/MapContext'
import { useProhibitorySignsPageContext } from '../../contexts/PageContext'
import { usePermitHeavyGoodsVehicleZone } from '../../hooks/usePermitHeavyGoodsVehicleZone'
import { usePermitsByLocation } from '../../hooks/usePermitsByLocation'

const ProhibitorySignsWideRoads = () => {
  const permitsByLocation = usePermitsByLocation()
  const needsPermitBasedOnVehicle = usePermitHeavyGoodsVehicleZone()
  const { activeMapLayers, updateActiveMapLayers } =
    useProhibitorySignsMapContext()
  const { vehicle } = useProhibitorySignsPageContext()

  const heavyGoodsVehiclePermit = permitsByLocation.data
    ? permitsByLocation.data.data?.attributes.heavy_goods_vehicle_zone
    : needsPermitBasedOnVehicle

  const enableWideRoads = Boolean(
    heavyGoodsVehiclePermit && (vehicle.length > 10 || vehicle.weight > 30000)
  )

  useEffect(() => {
    updateActiveMapLayers({
      type: 'UPDATE',
      layerId: 'wideRoads',
      enabled: enableWideRoads,
    })
  }, [enableWideRoads, updateActiveMapLayers])

  return (
    <>
      {activeMapLayers[wideRoads.id] && (
        <TileLayer options={wideRoads.options} args={[wideRoads.url]} />
      )}
    </>
  )
}

export default ProhibitorySignsWideRoads
