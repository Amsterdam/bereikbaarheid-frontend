import axios from 'axios'
import { Feature, FeatureCollection } from 'geojson'

import { API_ROOT } from '../index'

export interface RoadObstruction {
  activity: string
  end_date: string
  reference: string | null
  start_date: string
  url: string | null
}

export interface RoadSectionObstructions extends Feature {
  properties: {
    obstructions: RoadObstruction[]
    road_element_accessibility_code: number
    road_element_id: number
    road_element_street_name: string
  }
}

export interface RoadSectionObstructionsCollection extends FeatureCollection {
  features: [] | RoadSectionObstructions[]
}

export interface RoadObstructionParams {
  date?: string
  timeFrom?: string
  timeTo?: string
}

export function getRoadObstructions(
  params: RoadObstructionParams,
  signal: AbortSignal | undefined
): Promise<RoadSectionObstructionsCollection> {
  return axios
    .get(`${API_ROOT}v1/road-obstructions/`, {
      params: params,
      signal,
    })
    .then(response => response.data)
}
