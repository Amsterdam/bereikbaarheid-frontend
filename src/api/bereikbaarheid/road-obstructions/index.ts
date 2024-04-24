import { Feature, FeatureCollection } from 'geojson'

import config from '../../../config'
import { api } from '../index'

export const ENDPOINT = `${config.API_ROOT}road-obstructions/`

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
  return api
    .get(ENDPOINT, {
      params: params,
      signal,
    })
    .then(response => response.data)
}

export function getUrl(params: RoadObstructionParams) {
  return api.getUri({ params: params, url: ENDPOINT })
}
