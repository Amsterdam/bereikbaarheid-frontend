import { Feature, FeatureCollection } from 'geojson'

import { RoadObstruction } from '../road-obstructions'

import { api } from '../index'

export const ENDPOINT = 'v1/road-elements/'

interface TrafficCount {
  direction_1: string
  direction_2: string
  known_interruptions: string
  langzaam_verkeer: boolean
  link_to_file: string
  location_name: string
  measures_between: string
  method: string
  remarks: string
  snelverkeer: boolean
  traffic_type: string
  year: number
}

export interface RoadSection extends Feature {
  properties: {
    id: number
    length_in_m: number | null
    max_speed_in_km: number | null
    street_name: string
    traffic_counts: TrafficCount[]
    traffic_obstructions: RoadObstruction[]
  }
}

export interface RoadSectionFeatureCollection extends FeatureCollection {
  features: RoadSection[]
}

export function getRoadSection(
  id: string | undefined,
  signal: AbortSignal | undefined
): Promise<RoadSectionFeatureCollection> {
  if (id === undefined) {
    throw new Error('please provide a road section id')
  }

  return api.get(ENDPOINT + id, { signal }).then(response => response.data)
}
