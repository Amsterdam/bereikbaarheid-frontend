import axios from 'axios'
import { Feature, FeatureCollection, Point } from 'geojson'

import { Vehicle } from '../../../pages/ProhibitorySigns/types/vehicle'

const API_ROOT = process.env.REACT_APP_API_ROOT

export type TrafficSignCategory =
  | 'verbod'
  | 'verbod, met uitzondering'
  | 'vooraankondiging verbod'

export interface TrafficSign extends Feature {
  geometry: Point
  properties: {
    additional_info: string | null
    category: TrafficSignCategory
    id: number
    label: string
    label_as_value: number
    link_to_panoramic_image: string
    network_link_id: number
    street_name: string
    traffic_decree_id: string
    type: string
    view_direction_in_degrees: number
  }
}

interface TrafficSignsFeatureCollection extends FeatureCollection {
  features: [] | TrafficSign[]
}

export type TrafficSignCategoryApi =
  | 'prohibition'
  | 'prohibition ahead'
  | 'prohibition with exception'

export function getTrafficSigns(
  trafficSignCategories: TrafficSignCategoryApi[],
  vehicle: Vehicle,
  vehicleMaxAllowedWeight: number,
  vehicleType: string,
  signal: AbortSignal | undefined
): Promise<TrafficSignsFeatureCollection> {
  const trafficSignsRequest = axios.create({
    // create an URL with repeated parameters,
    // it is required for trafficSignCategories array
    paramsSerializer: {
      serialize: query => {
        return Object.entries(query)
          .map(([key, value], i) =>
            Array.isArray(value)
              ? `${key}=${value.join('&' + key + '=')}`
              : `${key}=${value}`
          )
          .join('&')
      },
    },
  })

  return trafficSignsRequest
    .get(`${API_ROOT}v1/traffic-signs`, {
      params: {
        trafficSignCategories: trafficSignCategories,
        vehicleAxleWeight: vehicle.axleWeight,
        vehicleHasTrailer: vehicle.hasTrailer,
        vehicleHeight: vehicle.height,
        vehicleLength: vehicle.length,
        vehicleMaxAllowedWeight: vehicleMaxAllowedWeight,
        vehicleTotalWeight: vehicle.weight,
        vehicleType: vehicleType,
        vehicleWidth: vehicle.width,
      },
      signal,
    })
    .then(response => response.data)
}
