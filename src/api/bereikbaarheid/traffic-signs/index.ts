import { Feature, FeatureCollection, Point } from 'geojson'
import { Vehicle } from 'pages/ProhibitorySigns/types/vehicle'

import config from '../../../config'
import { api } from '../index'

export const ENDPOINT = `${config.API_ROOT}/traffic-signs`

export type TrafficSignCategory = 'verbod' | 'verbod, met uitzondering' | 'vooraankondiging verbod'

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

export type TrafficSignCategoryApi = 'prohibition' | 'prohibition ahead' | 'prohibition with exception'

interface TrafficSignsParams {
  trafficSignCategories: TrafficSignCategoryApi[]
  vehicleAxleWeight: Vehicle['axleWeight']
  vehicleHasTrailer: Vehicle['hasTrailer']
  vehicleHeight: Vehicle['height']
  vehicleLength: Vehicle['length']
  vehicleMaxAllowedWeight: number
  vehicleTotalWeight: Vehicle['weight']
  vehicleType: string
  vehicleWidth: Vehicle['width']
}

export function getTrafficSigns(
  params: TrafficSignsParams,
  signal: AbortSignal | undefined
): Promise<TrafficSignsFeatureCollection> {
  return api
    .get(ENDPOINT, {
      params: params,
      signal,
    })
    .then(response => response.data)
}

export function getUrl(params: TrafficSignsParams) {
  return api.getUri({
    params: params,
    url: ENDPOINT,
  })
}
