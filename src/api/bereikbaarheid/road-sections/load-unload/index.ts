import { Feature, FeatureCollection } from 'geojson'
import { TimeHumanReadable_Hours_Minutes_Seconds } from '../../../../shared/utils/dateTime'

import config from '../../../../config'
import { api } from '../../index'

export const ENDPOINT = `${config.API_ROOT}/road-sections/load-unload/`

export interface LoadUnloadRegime {
  additional_info: string
  days: string[] | null
  direction: string
  start_time: TimeHumanReadable_Hours_Minutes_Seconds | null
  end_time: TimeHumanReadable_Hours_Minutes_Seconds | null
  text: string
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

export function getRoadSectionsLoadUnload(signal: AbortSignal | undefined): Promise<RoadSectionsLoadUnloadCollection> {
  return api
    .get(ENDPOINT, {
      signal,
    })
    .then(response => response.data)
}

export function getUrl() {
  return api.getUri({ url: ENDPOINT })
}
