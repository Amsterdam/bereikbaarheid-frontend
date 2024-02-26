import { Point } from 'geojson'
import { Vehicle } from 'pages/ProhibitorySigns/types/vehicle'
import { Address } from 'types/address'

import config from '../../../config'
import { api } from '../index'

const ENDPOINT = `${config.API_ROOT}/permits`

export interface PermitsByLocationData {
  data: {
    attributes: {
      distance_to_destination_in_m: number
      geom: Point
      heavy_goods_vehicle_zone: boolean
      in_amsterdam: boolean
      low_emission_zone: boolean
      rvv_permit_needed: boolean
      time_window: string
      wide_road: boolean
    }
    id: number
  } | null
}

export function getPermitsByLocation(
  address: Address,
  vehicle: Vehicle,
  vehicleMaxAllowedWeight: number,
  vehicleType: string,
  permitHeavyGoodsVehicleZone: boolean,
  permitLowEmissionZone: boolean,
  signal: AbortSignal | undefined
): Promise<PermitsByLocationData> {
  return api
    .get(ENDPOINT, {
      params: {
        lat: address.lat,
        lon: address.lon,
        permitLowEmissionZone: permitLowEmissionZone,
        permitZzv: permitHeavyGoodsVehicleZone,
        vehicleAxleWeight: vehicle.axleWeight,
        vehicleHasTrailer: vehicle.hasTrailer,
        vehicleHeight: vehicle.height,
        vehicleLength: vehicle.length,
        vehicleTotalWeight: vehicle.weight,
        vehicleType: vehicleType,
        vehicleWidth: vehicle.width,
        vehicleMaxAllowedWeight: vehicleMaxAllowedWeight,
      },
      signal,
    })
    .then(response => response.data)
}
