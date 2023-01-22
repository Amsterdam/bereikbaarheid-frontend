import axios from 'axios'
import { Feature, FeatureCollection } from 'geojson'

import { API_ROOT } from '../../index'

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
  return axios
    .get(`${API_ROOT}v1/road-sections/load-unload/`, {
      signal,
    })
    .then(response => response.data)
}
