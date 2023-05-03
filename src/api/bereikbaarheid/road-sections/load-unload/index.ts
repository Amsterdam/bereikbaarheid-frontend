import { Feature, FeatureCollection } from 'geojson'

import { api } from '../../index'

export const ENDPOINT = 'v1/road-sections/load-unload/'

export interface LoadUnloadRegime {
  additional_info: string
  days: string[] | null
  direction: string
  start_time: string | null
  end_time: string | null
}

export interface RoadSectionLoadUnload extends Feature {
  properties: {
    id: number
    load_unload: LoadUnloadRegime[]
    street_name: string
  }
}

export interface RoadSectionsLoadUnloadCollection extends FeatureCollection {
  features: [] | RoadSectionLoadUnload[]
}

export function getRoadSectionsLoadUnload(
  signal: AbortSignal | undefined
): Promise<RoadSectionsLoadUnloadCollection> {
  return api
    .get(ENDPOINT, {
      signal,
    })
    .then(response => response.data)
}

export function getUrl() {
  return api.getUri({ url: ENDPOINT })
}
