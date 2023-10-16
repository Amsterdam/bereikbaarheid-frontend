import {
  Feature,
  FeatureCollection,
  LineString,
  MultiLineString,
} from 'geojson'
import { Vehicle } from 'pages/ProhibitorySigns/types/vehicle'

import { api } from '../../index'

export const ENDPOINT = 'v1/roads/prohibitory'

interface ProhibitoryRoad extends Feature {
  geometry: LineString | MultiLineString
  properties: {
    bereikbaar_status_code: number
    id: number
  }
}

export interface ProhibitoryRoadsFeatureCollection extends FeatureCollection {
  features: [] | ProhibitoryRoad[]
}

export function getProhibitoryRoads(
  permitHeavyGoodsVehicleZone: boolean,
  permitLowEmissionZone: boolean,
  vehicle: Vehicle,
  vehicleMaxAllowedWeight: number,
  vehicleType: string,
  signal: AbortSignal | undefined
): Promise<ProhibitoryRoadsFeatureCollection> {
  return api
    .get(ENDPOINT, {
      params: {
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
